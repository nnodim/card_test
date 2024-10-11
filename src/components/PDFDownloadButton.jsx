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
import { useEffect, useState } from "react";

export const PDFDownloadButton = ({
  contentRef,
  filename = "download.pdf",
  buttonText = "Save as PDF",
  dialogTitle = "Saving as PDF",
  dialogDescription = "Please wait...",
  options = {},
}) => {
  const [saving, setSaving] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkImagesLoaded = async () => {
      if (!contentRef.current) return;

      const slides = contentRef.current.querySelectorAll(".embla__slide");
      const allImages = Array.from(slides).flatMap((slide) =>
        Array.from(slide.getElementsByTagName("img"))
      );

      // If no images, consider it loaded
      if (allImages.length === 0) {
        setImagesLoaded(true);
        return;
      }

      // Check if all images are loaded
      const areAllImagesLoaded = allImages.every((img) => img.complete);

      if (areAllImagesLoaded) {
        setImagesLoaded(true);
      } else {
        // Wait for images to load
        const loadPromises = allImages.map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve; // Handle error case as well
          });
        });

        await Promise.all(loadPromises);
        setImagesLoaded(true);
      }
    };

    checkImagesLoaded();

    // Optional: Re-check when slides change
    const observer = new MutationObserver(checkImagesLoaded);
    if (contentRef.current) {
      observer.observe(contentRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => observer.disconnect();
  }, [contentRef]);

  const generatePDF = async () => {
    if (!contentRef.current || !imagesLoaded) return;
    setSaving(true);

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const slides = contentRef.current.querySelectorAll(".embla__slide");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];

        if (i > 0) pdf.addPage();

        // Create a temporary container
        const tempContainer = document.createElement("div");
        tempContainer.style.position = "absolute";
        tempContainer.style.left = "-9999px";

        const containerWidth = 480;
        const containerHeight = (containerWidth / pageWidth) * pageHeight;

        tempContainer.style.width = `${containerWidth}px`;
        tempContainer.style.height = `${containerHeight}px`;
        document.body.appendChild(tempContainer);

        // Clone the slide content
        const clonedSlide = slide.cloneNode(true);
        clonedSlide.style.width = "100%";
        clonedSlide.style.height = "100%";
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

          const imgData = canvas.toDataURL("image/jpeg", 1.0);
          pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight);
        } catch (err) {
          console.error("Error processing slide:", err);
          document.body.removeChild(tempContainer);
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
        disabled={!imagesLoaded || saving}
        className="text-white px-10 py-5 rounded-full text-xl/6 h-auto font-normal"
      >
        {!imagesLoaded ? (
          <>
            Loading...
            <Loader2 className="w-8 h-8 ml-2 animate-spin" />
          </>
        ) : (
          <>
            {buttonText}
            <Download className="w-8 h-8 ml-2 text-primary rounded-full shrink-0 p-2 bg-[#EAE2FF]" />
          </>
        )}
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
