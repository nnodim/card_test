import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Loader2 } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

export const PDFDownloadButton = ({
  contentRef,
  filename = "download.pdf",
  buttonText = "Save as PDF",
  dialogTitle = "Saving as PDF",
  dialogDescription = "Please wait...",
  options = {},
}) => {
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const generatePDF = async () => {
    if (!contentRef.current) return;
    setSaving(true);

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const slides = contentRef.current.querySelectorAll(".embla__slide");

      // A4 dimensions in points (pt)
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];

        // Create a temporary container
        const tempContainer = document.createElement("div");
        tempContainer.style.position = "absolute";
        tempContainer.style.left = "-9999px";
        tempContainer.style.overflow = "hidden";

        // Set fixed dimensions based on A4 aspect ratio
        const containerWidth = 480;
        const containerHeight = (containerWidth / pageWidth) * pageHeight;

        tempContainer.style.width = `${containerWidth}px`;
        tempContainer.style.height = `${containerHeight}px`;
        document.body.appendChild(tempContainer);

        // Clone the slide content
        const clonedSlide = slide.cloneNode(true);
        clonedSlide.style.width = "100%";
        clonedSlide.style.height = "100%";

        // Special handling for the first slide (PurchaseCardImg)
        if (i === 0) {
          const imgElement = clonedSlide.querySelector("img");
          if (imgElement) {
            const imgContainer = document.createElement("div");
            imgContainer.style.width = "100%";
            imgContainer.style.height = "100%";
            imgContainer.style.display = "flex";
            imgContainer.style.alignItems = "center";
            imgContainer.style.justifyContent = "center";

            imgElement.style.maxWidth = "100%";
            imgElement.style.maxHeight = "100%";
            imgElement.style.objectFit = "contain";

            // Wrap the image in the container
            imgElement.parentNode.insertBefore(imgContainer, imgElement);
            imgContainer.appendChild(imgElement);
          }
        }

        tempContainer.appendChild(clonedSlide);

        try {
          const canvas = await html2canvas(tempContainer, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: null,
            windowWidth: containerWidth,
            windowHeight: containerHeight,
            ...options.html2canvasOptions,
          });

          // Clean up
          document.body.removeChild(tempContainer);

          if (i > 0) pdf.addPage();

          // Add the image to the PDF, maintaining aspect ratio
          const imgData = canvas.toDataURL("image/jpeg", 1.0);
          pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight);
        } catch (err) {
          console.error("Error processing slide:", err);
        }
      }

      pdf.save(filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Button
        onClick={generatePDF}
        className="text-white px-10 py-5 rounded-full text-xl/6 h-auto font-normal"
      >
        {buttonText}
        <Download className="w-8 h-8 ml-2 text-primary rounded-full shrink-0 p-2 bg-[#EAE2FF]" />
      </Button>

      <Dialog open={saving} onOpenChange={setSaving}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-primary font-bold">
              {dialogTitle}
            </DialogTitle>
            <DialogDescription className="text-primary">
              {dialogDescription}
              <span className="flex items-center justify-center w-full">
                <Loader2 className="w-16 h-16 animate-spin text-primary" />
              </span>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

PDFDownloadButton.propTypes = {
  contentRef: PropTypes.object.isRequired,
  filename: PropTypes.string,
  buttonText: PropTypes.string,
  dialogTitle: PropTypes.string,
  dialogDescription: PropTypes.string,
  options: PropTypes.object,
};
