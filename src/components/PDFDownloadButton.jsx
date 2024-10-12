import { cardBg } from "@/assets";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  Document,
  Font,
  Image,
  Page,
  pdf,
  Text,
  View,
} from "@react-pdf/renderer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Loader2 } from "lucide-react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import {
  BoldFont,
  BoldItalicFont,
  RegularFont,
} from "@/fonts/Montserrat/static";

Font.register(
  {
    family: "Montserrat",
    fonts: [
      {
        src: RegularFont,
      },
      {
        src: BoldFont,
        fontWeight: "bold",
      },
      {
        src: BoldItalicFont,
        fontWeight: "bold",
        fontStyle: "italic",
      },
    ],
  },
  {
    family: "sans-serif",
    fonts: [
      {
        src: "https://fonts.gstatic.com/s/sans-serif/v15/4UaGrENHsxJlGDuGo6OEBLPM.ttf",
      },
      {
        src: "https://fonts.gstatic.com/s/sans-serif/v15/4UaGrENHsxJlGDuGo6OEBLPM.ttf",
        fontWeight: "bold",
      },
      {
        src: "https://fonts.gstatic.com/s/sans-serif/v15/4UaGrENHsxJlGDuGo6OEBLPM.ttf",
        fontWeight: "bold",
        fontStyle: "italic",
      },
    ],
  }
);

export const PDFDownloadButton = ({
  contentRef,
  // filename = "download.pdf",
  buttonText = "Save as PDF",
  dialogTitle = "Saving as PDF",
  dialogDescription = "Please wait...",
  options = {},
  messages,
}) => {
  const [saving, setSaving] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { toast } = useToast();

  const calculateResponsiveStyles = (message) => {
    const baseWidth = 480;
    const baseHeight = 678;

    const scaleFactor = Math.min(
      options.width / baseWidth,
      options.height / baseHeight
    );

    console.log(message);

    return {
      position: "absolute",
      left: `${(message.x / baseWidth) * 100}%`,
      top: `${(message.y / baseHeight) * 100}%`,
      width: `${(message.width / baseWidth) * 100}%`,
      height: `${(message.height / baseHeight) * 100}%`,
      fontSize: (parseFloat(message.fontSize) * scaleFactor).toFixed(),
      textAlign: message.textAlign,
      fontFamily: message.fontFamily === "sans-serif" ? "" : message.fontFamily,
      fontWeight: message.bold ? "bold" : "normal",
      fontStyle: message.italic ? "italic" : "normal",
      color: message.fontColor,
      backgroundColor: message.bgColor,
    };
  };

  // Check if images within contentRef are fully loaded
  useEffect(() => {
    const checkImagesLoaded = async () => {
      if (!contentRef.current) return;

      const slides = contentRef.current.querySelectorAll(".embla__slide");
      const allImages = Array.from(slides).flatMap((slide) =>
        Array.from(slide.getElementsByTagName("img"))
      );

      if (allImages.length === 0) {
        setImagesLoaded(true);
        return;
      }

      const areAllImagesLoaded = allImages.every((img) => img.complete);

      if (areAllImagesLoaded) {
        setImagesLoaded(true);
      } else {
        const loadPromises = allImages.map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        });

        await Promise.all(loadPromises);
        setImagesLoaded(true);
      }
    };

    checkImagesLoaded();

    const observer = new MutationObserver(checkImagesLoaded);
    if (contentRef.current) {
      observer.observe(contentRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => observer.disconnect();
  }, [contentRef]);

  // Generate PDF function
  // const generatePDF = async () => {
  //   if (!contentRef.current || !imagesLoaded) {
  //     toast({
  //       title: "Error",
  //       description: "Images are still loading. Please wait.",
  //       variant: "warning",
  //     });
  //     return;
  //   }
  //   setSaving(true);

  //   try {
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const slides = contentRef.current.querySelectorAll(".embla__slide");

  //     const pageWidth = pdf.internal.pageSize.getWidth();
  //     const pageHeight = pdf.internal.pageSize.getHeight();

  //     for (let i = 0; i < slides.length; i++) {
  //       const slide = slides[i];

  //       // Create a temporary container for each slide
  //       const tempContainer = document.createElement("div");
  //       tempContainer.style.width = "480px";
  //       tempContainer.style.height = "678px";
  //       tempContainer.style.position = "absolute";
  //       tempContainer.style.left = "-9999px";
  //       tempContainer.style.overflow = "hidden";
  //       document.body.appendChild(tempContainer);

  //       const clonedSlide = slide.cloneNode(true);
  //       clonedSlide.style.width = "100%";
  //       clonedSlide.style.height = "100%";

  //       // Adjust the first slide (cover image)
  //       if (i === 0) {
  //         const imgElement = clonedSlide.querySelector("img");

  //         if (imgElement) {
  //           imgElement.style.width = "100%";
  //           imgElement.style.height = "100%";
  //           imgElement.style.objectFit = "cover";
  //         }
  //       }

  //       tempContainer.appendChild(clonedSlide);

  //       try {
  //         // Improved performance using willReadFrequently
  //         const canvas = await html2canvas(tempContainer, {
  //           scale: 3, // Increased scale for better quality
  //           useCORS: true,
  //           logging: false,
  //           backgroundColor: null,
  //           windowWidth: 480,
  //           windowHeight: 678,
  //           willReadFrequently: true, // Add this to improve getImageData performance
  //           ...options.html2canvasOptions,
  //         });

  //         // Clean up temp container
  //         document.body.removeChild(tempContainer);

  //         if (i > 0) pdf.addPage();

  //         const imgAspectRatio = canvas.width / canvas.height;
  //         const pageAspectRatio = pageWidth / pageHeight;

  //         let renderWidth = pageWidth;
  //         let renderHeight = pageHeight;

  //         if (imgAspectRatio > pageAspectRatio) {
  //           renderHeight = pageWidth / imgAspectRatio;
  //         } else {
  //           renderWidth = pageHeight * imgAspectRatio;
  //         }

  //         const xOffset = (pageWidth - renderWidth) / 2;
  //         const yOffset = (pageHeight - renderHeight) / 2;

  //         const imgData = canvas.toDataURL("image/jpeg", 0.8); // Reduced quality for memory optimization
  //         pdf.addImage(
  //           imgData,
  //           "JPEG",
  //           xOffset,
  //           yOffset,
  //           renderWidth,
  //           renderHeight
  //         );
  //       } catch (err) {
  //         console.error("Error processing slide:", err);
  //         toast({
  //           title: "Error",
  //           description: `Error processing slide ${i + 1}: ${err.message}`,
  //           variant: "destructive",
  //         });
  //       }
  //     }

  //     pdf.save(filename);
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //     toast({
  //       title: "Error",
  //       description: "Failed to generate PDF. Please try again.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setSaving(false);
  //   }
  // };

  const convertHTMLToPDFText = (htmlString) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = DOMPurify.sanitize(htmlString);

    function processNode(node) {
      let textSections = [];

      // Handle text nodes
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent.trim();
        if (text) {
          let style = {};
          let parentNode = node.parentNode;

          // Traverse up the parent nodes to accumulate styles
          while (parentNode && parentNode.nodeType === Node.ELEMENT_NODE) {
            switch (parentNode.tagName.toLowerCase()) {
              case "strong":
                style.fontWeight = "bold";
                break;
              case "em":
                style.fontStyle = "italic";
                break;
              case "s":
                style.textDecoration = "line-through";
                break;
            }
            parentNode = parentNode.parentNode;
          }

          textSections.push({ text, style });
        }
        return textSections;
      }

      // Handle block-level elements
      if (node.nodeType === Node.ELEMENT_NODE) {
        const tagName = node.tagName.toLowerCase();

        // Add line break before block elements except the first one
        if (
          ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6"].includes(tagName) &&
          node.previousElementSibling
        ) {
          textSections.push({ text: "\n", style: {} });
        }

        // Handle line breaks
        if (tagName === "br") {
          textSections.push({ text: "\n", style: {} });
          return textSections;
        }
      }

      // Recursively process child nodes
      for (const childNode of node.childNodes) {
        textSections = textSections.concat(processNode(childNode));
      }

      // Add line break after certain block elements
      if (node.nodeType === Node.ELEMENT_NODE) {
        const tagName = node.tagName.toLowerCase();
        if (
          ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6"].includes(tagName)
        ) {
          textSections.push({ text: "\n\n", style: {} });
        }
      }

      return textSections;
    }

    const sections = processNode(tempDiv);

    // Clean up multiple consecutive line breaks
    let cleanedSections = [];
    let lastWasNewline = false;

    for (const section of sections) {
      if (section.text === "\n") {
        if (!lastWasNewline) {
          cleanedSections.push(section);
          lastWasNewline = true;
        }
      } else {
        cleanedSections.push(section);
        lastWasNewline = false;
      }
    }

    return cleanedSections;
  };

  // PDF generation part of the code remains the same
  const generatePDF = async () => {
    try {
      if (!contentRef.current) return;
      setSaving(true);

      const slides = Array.from(
        contentRef.current.querySelectorAll(".embla__slide")
      );

      const pdfDoc = (
        <Document>
          {slides.map((slide, index) => (
            <Page key={index} size="A4">
              <View style={{ width: "100%", height: "100%" }}>
                <Image src={cardBg} style={{ width: "100%", height: "100%" }} />
                {messages &&
                  messages
                    .filter(({ page }) => page === index)
                    .map((message, messageIndex) => {
                      const {
                        content,
                        x,
                        y,
                        width,
                        height,
                        fontColor,
                        textAlign,
                        fontSize,
                        fontFamily,
                        bold,
                        italic,
                        type,
                      } = message;

                      const viewStyle = calculateResponsiveStyles({
                        x,
                        y,
                        width,
                        height,
                        fontColor,
                        textAlign,
                        fontSize,
                        fontFamily,
                        bold,
                        italic,
                      });

                      if (type === "text") {
                        const textSections = convertHTMLToPDFText(content);

                        return (
                          <View key={messageIndex} style={viewStyle}>
                            <Text
                              style={{
                                color: fontColor,
                                fontSize: parseInt(fontSize),
                                textAlign: textAlign,
                                lineHeight: 1.5, // Added for better readability
                              }}
                            >
                              {textSections.map((section, i) => (
                                <Text key={i} style={section.style}>
                                  {section.text}
                                </Text>
                              ))}
                            </Text>
                          </View>
                        );
                      } else {
                        return (
                          <View key={messageIndex} style={viewStyle}>
                            <Image
                              src={content}
                              style={{ width: "100%", height: "100%" }}
                            />
                          </View>
                        );
                      }
                    })}
              </View>
            </Page>
          ))}
        </Document>
      );

      const blob = await pdf(pdfDoc).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cards.pdf";
      a.click();
      URL.revokeObjectURL(url);
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
  messages: PropTypes.array,
};
