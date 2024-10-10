import { CircleAlert, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { deleteSignature } from "@/api/cards";
import { useToast } from "../ui/use-toast";
import propTypes from "prop-types";
import useCardSigning from "@/hooks/useCardSigningStore";
import useAuthStore from "@/hooks/useAuthStore";

const existingToken = localStorage.getItem("userToken");

export const DeleteSignatureModal = ({
  signatureId,
  purchaseId,
  queryClient,
  disabled,
}) => {
  const {
    setEditorOpen,
    setEditingMessage,
    setNewMessage,
    setNewImage,
    setImageEditorOpen,
  } = useCardSigning();
  const { user } = useAuthStore();
  const { toast } = useToast();
  const { mutate: deleteMessage, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteMessage"],
    mutationFn: async ({ signatureId }) =>
      await deleteSignature(signatureId, purchaseId, existingToken, user?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cardMessages", purchaseId],
      });
      toast({
        title: "Success",
        description: "Your message has been deleted successfully",
        variant: "success",
        className: "bg-white",
      });
      setEditorOpen(false);
      setEditingMessage(null);
      setNewMessage(false);
      setNewImage(false);
      setImageEditorOpen(false);
    },
    onError: (error) => {
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
  const handleDelete = () => {
    deleteMessage({ signatureId });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-inherit hover:bg-inherit">
          <Trash2 className="w-6 h-6 text-[#FC5757]" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Signature</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this signature. This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isDeleting} type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <Button
            disabled={isDeleting}
            type="button"
            variant="destructive"
            onClick={handleDelete}
          >
            delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

DeleteSignatureModal.propTypes = {
  signatureId: propTypes.string.isRequired,
  purchaseId: propTypes.string.isRequired,
  queryClient: propTypes.object.isRequired,
  disabled: propTypes.bool,
};
