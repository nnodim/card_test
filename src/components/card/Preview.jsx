import { getPurchasedCard, updateCard } from "@/api/cards";
import BackgroundColor from "@/extentions/BackgroundColor";
import FontSize from "@/extentions/FontSize";
import NewLine from "@/extentions/NewLine";
import useAxiosPrivate from "@/hooks/useAxioPrivate";
import { useDataStore } from "@/hooks/useDataStore";
import { cn } from "@/lib/utils";
import NotFound from "@/pages/NotFound";
import { useMutation, useQuery } from "@tanstack/react-query";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Check, CircleAlert, Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { AddImageButton } from "../AddImageButton";
import DraggableImageEditor from "../DraggableImageEditor";
import DraggableTextEditor from "../DraggableTextEditor";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import Stepper from "./Stepper";

const fontSizes = [
  8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 48, 64, 72, 96,
];
export const Preview = () => {
  const { toast } = useToast();
  const [optimisticCard, setOptimisticCard] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [imageEditorOpen, setImageEditorOpen] = useState(false);
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { id: purchaseId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { setActiveTab } = useDataStore();
  const [maxWidth, setMaxWidth] = useState(Infinity);
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const parentRef = useRef(null);

  const {
    data: card,
    isLoading: isCardLoading,
    isError,
  } = useQuery({
    queryKey: ["purchasedCard", purchaseId],
    queryFn: async () => await getPurchasedCard(purchaseId, axiosPrivate),
    enabled: !!purchaseId,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateCard"],
    mutationFn: async (data) => await updateCard(data, card.id, axiosPrivate),
    onSuccess: ({ card }) => {
      setEditorOpen(false);
      setImageEditorOpen(false);
      setOptimisticCard(card);
      console.log(card);
      toast({
        className: "border-0 border-l-4 border-primary text-primary shadow-lg",
        title: (
          <span className="flex items-center gap-2 text-primary">
            <Check className="w-4 h-4" />
            Success
          </span>
        ),
        description: "Card updated successfully",
      });
    },
    onError: (error, newData, context) => {
      setOptimisticCard(context.previousCard);
      console.log(error);
      let errorMessage;
      if (!error.response) {
        errorMessage = "No server response";
      } else {
        errorMessage = error.response.data.message;
      }
      toast({
        className: "border-0 border-l-4 border-red-500",
        title: (
          <span className="flex items-center gap-2 text-red-500">
            <CircleAlert className="w-4 h-4" />
            Error
          </span>
        ),
        description: errorMessage,
      });
    },
  });

  useEffect(() => {
    const handleResize = () => {
      if (parentRef.current) {
        const parent = parentRef.current.getBoundingClientRect();
        setMaxWidth(parent.width - editingMessage?.x);
        setWidth(parent.width);
        setHeight(parent.height);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [editingMessage, parentRef]);

  const handleProceedToCheckout = () => {
    if ((optimisticCard || card)?.id && card?.paymentStatus === "PENDING") {
      navigate(`/explore/card/${(optimisticCard || card).id}/checkout`);
    } else {
      navigate(`/account/my-cards`);
    }
  };

  const { field } = useController({
    name: "content",
    control,
    defaultValue: " ",
    rules: {
      required: true,
    },
  });

  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder: "Add name",
        emptyNodeClass: "is-node-empty",
        showOnlyCurrent: false,
        includeChildren: true,
      }),
      FontFamily,
      TextStyle,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      FontSize,
      Color,
      BackgroundColor,
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      NewLine,
    ],
    content: field.value,
    editorProps: {
      attributes: {
        class:
          "prose focus:outline-none cursor-text prose-sm sm:prose lg:prose-lg xl:prose-2xl h-full w-full file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-[#7C4CFF] disabled:cursor-not-allowed disabled:opacity-50",
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

  const handleAddMessage = () => {
    if (!editorOpen && !imageEditorOpen) {
      setEditingMessage({
        x: 140,
        y: 320,
        width: 200,
        height: 75,
        rotation: 0,
        fontFamily: "sans-serif",
        fontSize: 16,
        color: "#000000",
        textAlign: "left",
        xPercent: (140 / 480) * 100,
        yPercent: (535 / 678) * 100,
      });
      setEditorOpen(true);

      if (editor) {
        editor.commands.setContent("");
        editor.commands.focus();
      }
    }
  };

  const handleEditMessage = () => {
    const currentCard = optimisticCard || card;
    if (!editor) return;
    setImageEditorOpen(false);
    setEditingMessage({
      ...currentCard.meta?.message,
      xPercent: (currentCard.meta?.message?.x / 480) * 100,
      yPercent: (currentCard.meta?.message?.y / 678) * 100,
    });

    handleSetContent(currentCard.meta.message.name);
    editor
      .chain()
      .focus()
      .selectAll()
      .setTextAlign(currentCard.meta.message.textAlign)
      .setColor(currentCard.meta.message.color)
      .setFontSize(currentCard.meta.message.fontSize)
      .setFontFamily(currentCard.meta.message.fontFamily)
      .run();

    if (currentCard.meta.message.bold) {
      editor.chain().focus().toggleBold().run();
    }

    if (currentCard.meta.message.italic) {
      editor.chain().focus().toggleItalic().run();
    }

    if (currentCard.meta.message.strikeThrough) {
      editor.chain().focus().toggleStrike().run();
    }
    setEditorOpen(true);
  };

  useEffect(() => {
    setActiveTab("2");
    const currentCard = optimisticCard || card;
    if (currentCard?.meta?.message) {
      setEditingMessage({
        x: currentCard.meta.message.x || 140,
        y: currentCard.meta.message.y || 320,
        width: currentCard.meta.message.width || 200,
        height: currentCard.meta.message.height || 75,
        rotation: currentCard.meta.message.rotation || 0,
        fontFamily: currentCard.meta.message.fontFamily || "sans-serif",
        fontSize: currentCard.meta.message.fontSize || 16,
        color: currentCard.meta.message.color || "#000000",
        textAlign: currentCard.meta.message.textAlign || "left",
        xPercent: ((currentCard.meta.message.x || 140) / 480) * 100,
        yPercent: ((currentCard.meta.message.y || 320) / 678) * 100,
      });

      if (editor && currentCard.meta.message) {
        handleSetContent(currentCard.meta.message.name);
        editor
          .chain()
          .focus()
          .selectAll()
          .setTextAlign(currentCard.meta.message.textAlign)
          .setColor(currentCard.meta.message.color)
          .setFontSize(currentCard.meta.message.fontSize)
          .setFontFamily(currentCard.meta.message.fontFamily)
          .run();

        if (currentCard.meta.message.bold) {
          editor.chain().focus().toggleBold().run();
        }

        if (currentCard.meta.message.italic) {
          editor.chain().focus().toggleItalic().run();
        }

        if (currentCard.meta.message.strikeThrough) {
          editor.chain().focus().toggleStrike().run();
        }
      }
    }
  }, [setActiveTab, card, optimisticCard, editor, handleSetContent]);
  const getFirstParagraphContent = (content) => {
    const firstParagraphNode = content.find(
      (node) =>
        node.type === "paragraph" && node.content && node.content.length > 0
    );

    if (!firstParagraphNode) {
      return { hasContent: false, text: "" };
    }

    return { hasContent: true, text: firstParagraphNode.content[0].text };
  };

  const onSubmit = () => {
    const messageContent = editor.getJSON();
    const { hasContent, text } = getFirstParagraphContent(
      messageContent.content
    );

    if (!hasContent) {
      toast({
        className: "border-0 border-l-4 border-red-500 bg-white",
        title: (
          <span className="flex items-center gap-2 text-red-500">
            <CircleAlert className="w-4 h-4" />
            Error
          </span>
        ),
        description: "Message cannot be empty",
      });
      return;
    }

    const newData = {
      meta: {
        ...(optimisticCard || card)?.meta,
        message: {
          type: "text",
          name: text || "Name",
          x: (editingMessage.xPercent / 100) * 480,
          y: (editingMessage.yPercent / 100) * 678,
          width: editingMessage.width,
          height: editingMessage.height,
          rotation: editingMessage.rotation,
          fontFamily:
            editor.getAttributes("textStyle").fontFamily || "monospace",
          fontSize: editor.getAttributes("textStyle").fontSize,
          color: editor.getAttributes("textStyle").color || "#000000",
          textAlign: editor.getAttributes("paragraph").textAlign || "left",
          bold: editor.isActive("bold"),
          italic: editor.isActive("italic"),
          strikeThrough: editor.isActive("strike"),
        },
      },
    };
    mutate(newData);
  };

  const handleImageUpload = (imageUrl) => {
    setEditingMessage({
      id: null,
      content: imageUrl,
      rotation: 0,
      x: 50,
      y: 100,
      width: 250,
      height: 400,
      xPercent: (115 / 480) * 100,
      yPercent: (300 / 678) * 100,
    });
    setEditorOpen(false);
    setImageEditorOpen(true);
  };

  const saveImage = () => {
    if (editingMessage.id) {
      const updatedImages = (optimisticCard || card)?.meta?.images.map(
        (image) => {
          if (image.id === editingMessage.id) {
            return editingMessage;
          }
          return image;
        }
      );
      const newData = {
        meta: {
          ...(optimisticCard || card)?.meta,
          images: updatedImages,
        },
      };
      mutate(newData);
      return;
    }

    const newData = {
      meta: {
        ...(optimisticCard || card)?.meta,
        images: [
          ...((optimisticCard || card)?.meta?.images || []),
          {
            id: Date.now().toString(),
            content: editingMessage.content,
            x: (editingMessage.xPercent / 100) * 480,
            y: (editingMessage.yPercent / 100) * 678,
            width: editingMessage.width,
            height: editingMessage.height,
            rotation: editingMessage.rotation,
          },
        ],
      },
    };

    mutate(newData);
  };

  const handleEditImage = (id) => {
    const image = (optimisticCard || card)?.meta?.images.find(
      (image) => image.id === id
    );

    setEditingMessage({
      ...image,
      xPercent: (image.x / 480) * 100,
      yPercent: (image.y / 678) * 100,
    });
    setEditorOpen(false);
    setImageEditorOpen(true);
  };

  const handleDeleteMessage = () => {
    const newData = {
      meta: {
        ...(optimisticCard || card)?.meta,
        message: null,
      },
    };
    mutate(newData);
  };

  const handleRemoveImage = (id) => {
    const updatedImages = (optimisticCard || card)?.meta?.images.filter(
      (image) => image.id !== id
    );

    const newData = {
      meta: {
        ...(optimisticCard || card)?.meta,
        images: updatedImages,
      },
    };

    mutate(newData);
  };

  const onCancel = () => {
    setEditingMessage(null);
    setEditorOpen(false);
    setImageEditorOpen(false);
  };

  if (isCardLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !card) return <NotFound text="Card not found" />;
  return (
    <main className="max-w-7xl mx-auto font-inter flex justify-center items-center w-full lg:p-16">
      <div className="w-full flex flex-col lg:flex-row justify-between gap-x-20 gap-y-8 sm:gap-y-16 mb-10 items-center">
        <Stepper card={card?.card} />
        <div className="w-full flex flex-col justify-center items-center gap-y-8 sm:gap-y-14">
          <div className="flex flex-col justify-center items-center w-full px-5">
            <h1 className="text-2xl sm:text-5xl font-semibold font-bricolage">
              Preview your Card Design
            </h1>
            <p className="my-1 sm:my-5 sm:text-xl text-center text-[#333]">
              Heyyy! Your card is ready. Just one more thing for you to do. Take
              a look at your card to ensure that it is exactly how you want{" "}
              <span className="font-bold capitalize">{card?.receiverName}</span>{" "}
              to view it. 😉
            </p>
            {(optimisticCard || card)?.card?.meta?.image.isActive && (
              <AddImageButton
                onImageUpload={handleImageUpload}
                disabled={editorOpen || imageEditorOpen || isCardLoading}
              />
            )}
            {(optimisticCard || card)?.card?.meta?.text.isActive && (
              <Button
                onClick={handleAddMessage}
                disabled={
                  editorOpen ||
                  imageEditorOpen ||
                  isCardLoading ||
                  !!(optimisticCard || card)?.meta?.message
                }
                variant="link"
                className="text-primary md:text-xl/6 h-auto font-normal"
              >
                Add Name
              </Button>
            )}
          </div>
          <div className="w-full h-full flex flex-col items-center justify-center gap-y-6 px-5 py-8 sm:px-20 sm:py-10 max-w-2xl bg-[#F7F5FF]">
            <div
              ref={parentRef}
              className="relative h-full w-full max-w-[480px] shadow-lg min-w-0 shrink-0 grow-0 basis-full max-h-[678px]"
            >
              <img
                className="w-full h-full object-cover object-center"
                src={card?.card?.url}
                alt={card?.card?.name}
              />
              {(optimisticCard || card) && (
                <div
                  style={{
                    color: (optimisticCard || card).meta?.message?.color,
                    left: `${
                      ((optimisticCard || card).meta?.message?.x / 480) * 100
                    }%`,
                    top: `${
                      ((optimisticCard || card).meta?.message?.y / 678) * 100
                    }%`,
                    position: "absolute",
                    width: `${
                      ((optimisticCard || card).meta?.message?.width / 480) *
                      100
                    }%`,
                    height: `${
                      ((optimisticCard || card).meta?.message?.height / 678) *
                      100
                    }%`,
                    textAlign: (optimisticCard || card).meta?.message
                      ?.textAlign,
                    fontSize: `${(
                      parseFloat(
                        (optimisticCard || card).meta?.message?.fontSize
                      ) *
                      (width / 480)
                    ).toFixed()}px`,
                    fontFamily: (optimisticCard || card).meta?.message
                      ?.fontFamily,
                  }}
                  onClick={handleEditMessage}
                  className={cn(
                    `*:break-words border border-transparent flex flex-col py-3 select-none`,
                    {
                      hidden: editorOpen,
                    }
                  )}
                >
                  <p
                    className={cn("break-words", {
                      "line-through": (optimisticCard || card).meta?.message
                        ?.strikeThrough,
                      "font-bold": (optimisticCard || card).meta?.message?.bold,
                      italic: (optimisticCard || card).meta?.message?.italic,
                      "cursor-pointer": !editorOpen,
                    })}
                  >
                    {(optimisticCard || card).meta?.message?.name}
                  </p>
                </div>
              )}
              {(optimisticCard || card) &&
                (optimisticCard || card)?.meta?.images?.map((image, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        position: "absolute",
                        left: `${(image.x / 480) * 100}%`,
                        top: `${(image.y / 670) * 100}%`,
                        width: `${(image.width / 480) * 100}%`,
                        height: `${(image.height / 670) * 100}%`,
                      }}
                      onClick={() => handleEditImage(image.id)}
                      className={cn({
                        hidden:
                          imageEditorOpen && editingMessage?.id === image.id,
                      })}
                    >
                      <img src={image.content} alt="" />
                    </div>
                  );
                })}
              {editor && editorOpen && (
                <DraggableTextEditor
                  editorOpen={editorOpen}
                  editingMessage={editingMessage}
                  setEditingMessage={setEditingMessage}
                  editor={editor}
                  maxWidth={maxWidth}
                  width={width}
                  height={height}
                  onSubmit={onSubmit}
                  handleSubmit={handleSubmit}
                  onCancel={onCancel}
                  isDisabled={isPending}
                  bgColor={false}
                  fontSizes={fontSizes}
                  showDelete={!!(optimisticCard || card)?.meta?.message}
                  onDelete={handleDeleteMessage}
                />
              )}

              <DraggableImageEditor
                imageEditorOpen={imageEditorOpen}
                editingMessage={editingMessage}
                setEditingMessage={setEditingMessage}
                maxWidth={250}
                width={width}
                height={height}
                onSave={saveImage}
                onCancel={onCancel}
                onDelete={() => handleRemoveImage(editingMessage?.id)}
                isDisabled={isPending}
                showDelete={!!editingMessage?.id}
              />
            </div>
          </div>

          <div className="w-full px-5">
            <Button
              onClick={handleProceedToCheckout}
              disabled={isPending || editorOpen || imageEditorOpen}
              className="w-full h-auto text-base/6 max-w-[500px] font-normal bg-primary rounded-lg py-[18px] text-white mx-auto block"
            >
              {(optimisticCard || card)?.paymentStatus === "PENDING"
                ? "Proceed to checkout"
                : "Done"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};
