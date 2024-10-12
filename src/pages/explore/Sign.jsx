import {
  getSignatures,
  signCard,
  updateSignature,
  viewCard,
} from "@/api/cards";
import { ActionButtons } from "@/components/cardSigning/ActionButtons";
import { CardCarousel } from "@/components/cardSigning/CardCarousel";
import { CarouselPagination } from "@/components/cardSigning/CarouselPagination";
import { ShareButton } from "@/components/cardSigning/ShareButton";
import { SideSignatureList } from "@/components/cardSigning/SideSignatureList";
import { useToast } from "@/components/ui/use-toast";
import extensions from "@/extentions/extensions";
import useAuthStore from "@/hooks/useAuthStore";
import useCardSigning from "@/hooks/useCardSigningStore";
import { findAvailableSpaceAcrossPages } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEditor } from "@tiptap/react";
import { AlertTriangle, Check, CircleAlert, Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { useParams, useSearchParams } from "react-router-dom";
import NotFound from "../NotFound";

const existingToken = localStorage.getItem("userToken");

export const Sign = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { toast } = useToast();
  const { setValue, handleSubmit, control } = useForm();
  const { field } = useController({
    name: "content",
    control,
    rules: {
      required: true,
    },
  });
  const [emblaApi, setEmblaApi] = useState();
  const {
    maxPage,
    newMessage,
    current,
    editingMessage,
    setEditingMessage,
    setEditorOpen,
    setImageEditorOpen,
    setNewMessage,
    setMaxPage,
    setCurrent,
    setNewImage,
  } = useCardSigning();

  const { purchaseId } = useParams();
  const [searchParams] = useSearchParams();
  const cardToken = searchParams.get("cardToken");

  const handleMutationSuccess = (message) => {
    toast({
      className: "border-0 border-l-4 border-primary text-primary shadow-lg",
      title: (
        <span className="flex items-center gap-2 text-primary">
          <Check className="w-4 h-4" />
          Success
        </span>
      ),
      description: message,
    });
    queryClient.invalidateQueries(["cardMessages", purchaseId]);
    setEditingMessage(null);
    setEditorOpen(false);
    setImageEditorOpen(false);
    setNewMessage(false);
    setNewImage(false);
  };

  const handleMutationError = (error) => {
    const errorMessage = error.response
      ? error.response.data.message
      : "No server response";
    toast({
      className: "border-0 border-l-4 border-red-500 bg-white",
      title: (
        <span className="flex items-center gap-2 text-red-500">
          <CircleAlert className="w-4 h-4" />
          Error
        </span>
      ),
      description: errorMessage,
    });
  };

  const { data: messages } = useQuery({
    queryKey: ["cardMessages", purchaseId],
    queryFn: () => getSignatures(purchaseId, existingToken),
    enabled: !!purchaseId,
  });

  const {
    data: cardData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["viewCard", cardToken],
    queryFn: () => viewCard(cardToken),
    enabled: !!cardToken,
  });

  const { mutate: sign, isPending: isSigning } = useMutation({
    mutationKey: ["sign"],
    mutationFn: async (data) =>
      await signCard(data, purchaseId, existingToken, user?.id),
    onSuccess: () =>
      handleMutationSuccess("Your message has been signed successfully"),
    onError: (error) => handleMutationError(error),
  });

  const { mutate: updateSig, isPending: isUpdating } = useMutation({
    mutationKey: ["updateSignature"],
    mutationFn: async (data) =>
      await updateSignature(
        data,
        editingMessage?.id,
        purchaseId,
        existingToken,
        user?.id
      ),
    onSuccess: () =>
      handleMutationSuccess("Your message has been updated successfully"),
    onError: (error) => handleMutationError(error),
  });

  const editor = useEditor({
    extensions,
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose focus:outline-none cursor-text prose-sm sm:prose lg:prose-lg xl:prose-2xl h-full w-full file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-[#7C4CFF] disabled:cursor-not-allowed disabled:opacity-50 flex flex-col gap-4",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      field.onChange(html);
    },
  });

  const handleSetContent = useCallback(
    (content) => {
      if (editor && editor.getHTML() !== content) {
        editor.commands.setContent(content, false);
      }
    },
    [editor]
  );

  const handleNewMessage = useCallback(() => {
    if (!editor) return;

    const availableSpace = findAvailableSpaceAcrossPages(
      messages,
      maxPage,
      480, // containerWidth
      678 // containerHeight
    );

    // Scroll to the page where space was found
    if (emblaApi && availableSpace.page !== current - 1) {
      emblaApi.scrollTo(availableSpace.page);
    }

    setNewMessage(true);
    setEditingMessage({
      id: null,
      content: "",
      rotation: 0,
      ...availableSpace,
      xPercent: (availableSpace.x / 480) * 100,
      yPercent: (availableSpace.y / 678) * 100,
    });

    const str = `
    <p></p>
    <react-component>${user?.fullName || ""}</react-component>
    `;
    handleSetContent(str);
    setValue("content", str);
    setEditorOpen(true);
    editor.commands.focus("start");
  }, [
    editor,
    emblaApi,
    maxPage,
    current,
    setValue,
    handleSetContent,
    user?.fullName,
    setEditingMessage,
    setEditorOpen,
    setNewMessage,
    messages,
  ]);

  const handleEdit = useCallback(
    (messageId, pos, size) => {
      if (!editor) return;
      const message = messages.find((msg) => msg.id === messageId);
      if (!message) return;

      const currentPage = current - 1;
      const isCardOwner = cardData?.card?.user === user?.id;

      const canEdit = isCardOwner || message.userToken === existingToken;
      if (!canEdit || cardData?.card?.sent) return;

      if (emblaApi && currentPage !== message?.page)
        emblaApi.scrollTo(message?.page, true);

      setEditingMessage({
        ...message,
        x: pos.x,
        y: pos.y,
        width: size.width,
        height: size.height,
        xPercent: (pos.x / 480) * 100,
        yPercent: (pos.y / 678) * 100,
      });

      if (message.type === "image") {
        setEditorOpen(false);
        setImageEditorOpen(true);
      } else {
        handleSetContent(message.content);
        setValue("content", message.content);
        editor
          .chain()
          .focus()
          .selectAll()
          .setFontSize(message.fontSize.toString() || "16px")
          .setColor(message.fontColor || "#000000")
          .setBackgroundColor(message.bgColor)
          .setTextAlign(message.textAlign || "left")
          .setFontFamily(message.fontFamily || "sans-serif")
          .run();
        setImageEditorOpen(false);
        setEditorOpen(true);
      }
    },
    [
      editor,
      emblaApi,
      current,
      setValue,
      handleSetContent,
      messages,
      cardData?.card?.sent,
      setEditingMessage,
      setEditorOpen,
      setImageEditorOpen,
      cardData?.card?.user,
      user?.id,
    ]
  );

  const checkOverlap = useCallback((id, pos, size, page, messages) => {
    return messages.some((msg) => {
      if (msg.id === id) {
        return false;
      }
      const isOverlapping =
        msg.x < pos.x + size.width &&
        msg.x + msg.width > pos.x &&
        msg.y < pos.y + size.height &&
        msg.y + msg.height > pos.y &&
        msg.page === page;
      return isOverlapping;
    });
  }, []);

  const handleContentSubmission = useCallback(
    (payload, newItem, isLastPage) => {
      if (newItem) {
        sign(payload);
      } else {
        updateSig(payload);
      }
      if (isLastPage) {
        setMaxPage((prevMaxPage) => prevMaxPage + 1);
      }
    },
    [sign, updateSig, setMaxPage]
  );

  const onSubmit = useCallback(
    (data) => {
      if (!editor) return;
      const { id, x, y, width, height, rotation } = editingMessage;
      const messageContent = editor.getJSON();
      const currentPage = current - 1;
      const isLastPage = currentPage === maxPage;
      let hasMessage = false;
      // let hasUsername = false;
      let username = "";
      let message = "";

      const editorContainer = editor.view.dom.getBoundingClientRect();
      console.log(editor.getHTML());

      messageContent.content.some((node) => {
        if (
          node.type === "paragraph" &&
          node.content &&
          node.content.length > 0
        ) {
          message = node.content[0].text;
          hasMessage = true;
        }
        if (
          node.type === "reactComponent" &&
          node.content &&
          node.content.length > 0
        ) {
          username = node.content[0].text;
          // hasUsername = true;
        }
        return false;
      });

      if (!hasMessage) {
        alert(
          `Message content cannot be empty. 
Click the cancel button if you no longer want to add a signature.`
        );
        return;
      }

      //       if (!hasUsername) {
      //         alert(
      //           `Name cannot be empty.
      // Click the cancel button if you no longer want to add a signature.`
      //         );
      //         return;
      //       }

      if (
        checkOverlap(id, { x, y }, { width, height }, current - 1, messages)
      ) {
        alert(`Overlapping signatures!
Drag and drop your signature to a free spot or Change pages by using the arrows below the card.`);
        return;
      }

      if (currentPage === 0) {
        alert("Cannot add message on first page");
        return;
      }

      const payload = {
        content: data.content,
        x: x,
        y: y,
        width: width,
        height: editorContainer.height,
        rotation: rotation,
        name: username || "",
        message: message,
        fontFamily:
          editor.getAttributes("textStyle").fontFamily || "sans-serif",
        fontSize:
          typeof editor.getAttributes("textStyle").fontSize === "object"
            ? "16px"
            : editor.getAttributes("textStyle").fontSize || "16px",
        fontColor: editor.getAttributes("textStyle").color || "#000000",
        bgColor:
          typeof editor.getAttributes("textStyle").backgroundColor === "object"
            ? "transparent"
            : editor.getAttributes("textStyle").backgroundColor ||
              "transparent",
        textAlign: editor.getAttributes("paragraph").textAlign || "left",
        bold: editor.isActive("bold") || false,
        italic: editor.isActive("italic") || false,
        strikeThrough: editor.isActive("strike") || false,
        page: current - 1,
      };

      handleContentSubmission(payload, newMessage, isLastPage);
    },
    [
      checkOverlap,
      handleContentSubmission,
      messages,
      editor,
      editingMessage,
      newMessage,
      current,
      maxPage,
    ]
  );

  useEffect(() => {
    if (messages && messages.length > 0) {
      const highestPage = Math.max(...messages.map((msg) => msg.page));
      setMaxPage(Math.max(highestPage + 2, maxPage));
    } else {
      setMaxPage(2);
    }
  }, [messages, maxPage, setMaxPage]);

  useEffect(() => {
    if (!emblaApi) return;

    setCurrent(emblaApi.selectedScrollSnap() + 1);

    emblaApi.on("select", () => setCurrent(emblaApi.selectedScrollSnap() + 1));
  }, [emblaApi, setCurrent]);

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-300px)] w-full flex items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !cardData) return <NotFound text="Card not found" />;

  return (
    <main className="max-w-7xl mx-auto font-inter flex flex-col justify-center items-center w-full p-3 lg:py-16 lg:px-10">
      <div className="flex flex-col gap-6 items-center w-full max-w-6xl mx-auto leading-normal mb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl/[60px] text-center font-bold font-bricolage capitalize">
          sign {`${cardData?.card?.receiverName}'s`} Greeting Card
        </h1>
        {cardData?.card?.sent ? (
          <p className="text-center text-[#4F4F4F] font-light text-base md:text-xl leading-6 flex items-center py-3 px-5 bg-[#FEF9EC]">
            <span>
              <AlertTriangle className="inline mr-2" />
            </span>
            The card has been sent. You can no longer sign it
          </p>
        ) : (
          <p className="text-center text-[#4F4F4F] text-base md:text-xl font-light leading-6">
            Compose your heartfelt message and include your name.
          </p>
        )}
      </div>
      <div
        className={`w-full flex flex-col lg:flex-row  justify-between gap-8 lg:gap-16 ${
          !cardData?.card?.sent && "mt-10 lg:mt-[74px]"
        }`}
      >
        <div className="flex flex-col gap-5 w-full items-center">
          {!cardData?.card?.sent && (
            <p className="text-[#333333] font-light">
              Tap on a message to edit it.
            </p>
          )}
          <CardCarousel
            card={cardData?.card}
            setEmblaApi={setEmblaApi}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            editor={editor}
            isSigning={isSigning}
            isUpdating={isUpdating}
            handleEdit={handleEdit}
            messages={messages}
            checkOverlap={checkOverlap}
            handleContentSubmission={handleContentSubmission}
          />
          <CarouselPagination emblaApi={emblaApi} />
        </div>

        {!cardData?.card?.sent && (
          <div className="flex flex-col gap-5 lg:gap-10 w-full max-w-[536px] mx-auto mb-10">
            <ActionButtons
              handleNewMessage={handleNewMessage}
              emblaApi={emblaApi}
            />
            {cardData?.card?.cardType === "group" && <ShareButton />}
            <SideSignatureList
              messages={messages}
              handleEdit={handleEdit}
              purchaseId={purchaseId}
              queryClient={queryClient}
              card={cardData?.card}
            />
          </div>
        )}
      </div>
    </main>
  );
};
