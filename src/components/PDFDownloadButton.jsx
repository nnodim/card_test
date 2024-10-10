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
    console.log(options);
    
    if (!contentRef.current) return;
    setSaving(true);

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const slides = contentRef.current.querySelectorAll(".embla__slide");

      // A4 dimensions in points (pt)
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      console.log(pageWidth, pageHeight);
      

      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];

        // Force consistent dimensions for canvas
        const tempContainer = document.createElement("div");
        tempContainer.style.width = options.width || "480px";
        tempContainer.style.height = options.height || "678px";
        tempContainer.style.position = "absolute";
        tempContainer.style.left = "-9999px";
        document.body.appendChild(tempContainer);

        // Clone the slide content into our temp container
        const clonedSlide = slide.cloneNode(true);
        clonedSlide.style.width = "100%";
        clonedSlide.style.height = "100%";
        tempContainer.appendChild(clonedSlide);

        try {
          const canvas = await html2canvas(tempContainer, {
            scale: options.scale || 2,
            useCORS: true,
            logging: false,
            backgroundColor: null,
            windowWidth: parseInt(options.width) || 480,
            windowHeight: parseInt(options.height) || 678,
            ...options.html2canvasOptions,
          });

          // Clean up
          document.body.removeChild(tempContainer);

          if (i > 0) pdf.addPage();

          // Calculate scaling to fit the page while maintaining aspect ratio
          const imgAspectRatio = canvas.width / canvas.height;
          const pageAspectRatio = pageWidth / pageHeight;

          let renderWidth = pageWidth;
          let renderHeight = pageHeight;

          if (imgAspectRatio > pageAspectRatio) {
            renderHeight = pageWidth / imgAspectRatio;
          } else {
            renderWidth = pageHeight * imgAspectRatio;
          }

          // Center the image on the page
          const xOffset = (pageWidth - renderWidth) / 2;
          const yOffset = (pageHeight - renderHeight) / 2;

          const imgData = canvas.toDataURL("image/jpeg", 1.0);
          pdf.addImage(
            imgData,
            "JPEG",
            xOffset,
            yOffset,
            renderWidth,
            renderHeight
          );
        } catch (err) {
          console.error("Error processing slide:", err);
          // Continue with next slide if one fails
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
  contentRef: PropTypes.object,
  filename: PropTypes.string,
  buttonText: PropTypes.string,
  dialogTitle: PropTypes.string,
  dialogDescription: PropTypes.string,
  options: PropTypes.object,
};
