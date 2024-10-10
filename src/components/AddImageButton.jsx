import { useRef } from "react";
import { Button } from "./ui/button";
import PropTypes from "prop-types";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "@/api/cards";
import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";

export const AddImageButton = ({ onImageUpload, disabled }) => {
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const { mutate: uploadFileMutation, isPending } = useMutation({
    mutationKey: ["uploadFile"],
    mutationFn: async (data) => await uploadFile(data),
    onSuccess: (data) => {
      if (data) {
        onImageUpload(data.url);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    onError: (error) => {
      console.log(error);
      let errorMessage = error.response
        ? error.response.data.message
        : "No server response";
      toast({
        className: "border-0 border-l-4 border-red-500",
        title: "Error",
        description: errorMessage,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
  });

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      uploadFileMutation(formData);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        style={{ display: "none" }}
      />
      <Button
        onClick={() => fileInputRef.current.click()}
        disabled={disabled || isPending}
        variant="link"
        className="text-primary md:text-xl/6 h-auto font-normal"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading image...
          </>
        ) : (
          "Add Image"
        )}
      </Button>
    </>
  );
};

AddImageButton.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
