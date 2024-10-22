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
import { FlamencoRegular } from "@/fonts/Flamenco";
import {
  BoldFont,
  BoldItalicFont,
  RegularFont,
} from "@/fonts/Montserrat/static";
import {
  Document,
  Font,
  Page,
  pdf,
  Image as PDFImage,
  Text,
  View,
} from "@react-pdf/renderer";
import DOMPurify from "dompurify";
import { Download, Loader2 } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const imageCache = new Map();

Font.register({
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
});

Font.register({
  family: "Flamenco",
  src: FlamencoRegular
});

export const PDFDownloadButton = ({
  contentRef,
  // filename = "download.pdf",
  buttonText = "Save as PDF",
  dialogTitle = "Saving as PDF",
  dialogDescription = "Please wait...",
  cardData,
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

  const convertImageToPng = async (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // This is necessary for some external images
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = reject;
      img.src = src;
    });
  };

  const convertSvgToImg = async (svgUrl) => {
    try {
      // Check cache first
      if (imageCache.has(svgUrl)) {
        return imageCache.get(svgUrl);
      }

      // Fetch SVG content with proper headers
      const response = await fetch(svgUrl, {
        headers: {
          Accept: "image/svg+xml,image/*",
          "Cache-Control": "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch SVG: ${response.statusText}`);
      }

      const svgText = await response.text();

      // Create a sanitized SVG blob
      const sanitizedSvg = new Blob([svgText], { type: "image/svg+xml" });
      const blobUrl = URL.createObjectURL(sanitizedSvg);

      return new Promise((resolve, reject) => {
        const img = new Image();
        let cleaned = false;

        const cleanup = () => {
          if (!cleaned) {
            cleaned = true;
            URL.revokeObjectURL(blobUrl);
          }
        };

        // Set a timeout for the entire operation
        const timeoutId = setTimeout(() => {
          cleanup();
          reject(new Error("SVG conversion timed out"));
        }, 10000);

        img.onload = () => {
          try {
            // Create a canvas with maximum mobile-friendly dimensions
            const maxDimension = 2048; // Max texture size for most mobile devices
            const scale = Math.min(
              1,
              maxDimension / img.width,
              maxDimension / img.height
            );

            const canvas = document.createElement("canvas");
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            const ctx = canvas.getContext("2d", {
              alpha: true,
              willReadFrequently: true,
            });

            if (!ctx) {
              throw new Error("Canvas context creation failed");
            }

            // Draw with white background to prevent transparency issues
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw the image
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Convert to PNG with lower quality for mobile
            const pngUrl = canvas.toDataURL("image/png", 0.8);

            // Cache the result
            imageCache.set(svgUrl, pngUrl);

            clearTimeout(timeoutId);
            cleanup();
            resolve(pngUrl);
          } catch (err) {
            cleanup();
            clearTimeout(timeoutId);
            reject(new Error(`Canvas operation failed: ${err.message}`));
          }
        };

        img.onerror = (err) => {
          cleanup();
          clearTimeout(timeoutId);
          reject(
            new Error(`Image loading failed: ${err.message || "Unknown error"}`)
          );
        };

        // Set crossOrigin after setting up event handlers
        img.crossOrigin = "anonymous";
        img.src = blobUrl;
      });
    } catch (error) {
      console.error("SVG conversion error:", error);
      throw error;
    }
  };

  const prepareImageForPdf = async (src) => {
    if (!src) return null;

    try {
      const fileExtension = src.split(".").pop().toLowerCase();

      // Handle SVG files
      if (fileExtension === "svg") {
        try {
          return await convertSvgToImg(src);
        } catch (svgError) {
          console.error(
            "SVG conversion failed, attempting fallback:",
            svgError
          );
          // Fallback: Try loading as regular image
          return await loadImageAsDataUrl(src);
        }
      }

      // Handle other image types
      return await loadImageAsDataUrl(src);
    } catch (error) {
      console.error("Image preparation failed:", error);
      throw new Error(`Image preparation failed: ${error.message}`);
    }
  };

  const loadImageAsDataUrl = async (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const timeoutId = setTimeout(() => {
        reject(new Error("Image loading timed out"));
      }, 10000);

      img.onload = () => {
        try {
          clearTimeout(timeoutId);
          const canvas = document.createElement("canvas");
          const maxDimension = 2048;
          const scale = Math.min(
            1,
            maxDimension / img.width,
            maxDimension / img.height
          );

          canvas.width = img.width * scale;
          canvas.height = img.height * scale;

          const ctx = canvas.getContext("2d", {
            alpha: true,
            willReadFrequently: true,
          });

          if (!ctx) {
            throw new Error("Canvas context creation failed");
          }

          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          resolve(canvas.toDataURL("image/png", 0.8));
        } catch (err) {
          reject(new Error(`Canvas operation failed: ${err.message}`));
        }
      };

      img.onerror = () => {
        clearTimeout(timeoutId);
        reject(new Error("Image loading failed"));
      };

      img.crossOrigin = "anonymous";
      img.src = src;
    });
  };

  const generatePDFContent = async (cardData, messages, options) => {
    // Convert card image if necessary
    const cardImageSrc = await prepareImageForPdf(cardData.card.card.url);

    // Convert custom images if present
    const customImages = await Promise.all(
      (cardData.card.meta?.images || []).map(async (image) => ({
        ...image,
        content: await prepareImageForPdf(image.content),
      }))
    );

    // Convert message images
    const preparedMessages = await Promise.all(
      messages.map(async (message) => {
        if (message.type === "text") {
          return message;
        }
        return {
          ...message,
          content: await prepareImageForPdf(message.content),
        };
      })
    );

    return (
      <Document>
        {/* First page with card design and custom details */}
        <Page size="A4">
          <View style={{ width: "100%", height: "100%" }}>
            <PDFImage
              src={cardImageSrc}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {cardData.card.meta?.message && (
              <View
                style={{
                  position: "absolute",
                  left: `${(cardData.card.meta.message.x / 480) * 100}%`,
                  top: `${(cardData.card.meta.message.y / 678) * 100}%`,
                  width: `${(cardData.card.meta.message.width / 480) * 100}%`,
                  height: `${(cardData.card.meta.message.height / 678) * 100}%`,
                }}
              >
                <Text
                  style={{
                    // fontFamily: cardData.card.meta.message.fontFamily,
                    fontSize: cardData.card.meta.message.fontSize,
                    color: cardData.card.meta.message.color,
                    textAlign: cardData.card.meta.message.textAlign,
                    fontWeight: cardData.card.meta.message.bold
                      ? "bold"
                      : "normal",
                    fontStyle: cardData.card.meta.message.italic
                      ? "italic"
                      : "normal",
                    textDecoration: cardData.card.meta.message.strikeThrough
                      ? "line-through"
                      : "none",
                  }}
                >
                  {cardData.card.meta.message.name}
                </Text>
              </View>
            )}
            {customImages.map((image, index) => (
              <View
                key={index}
                style={{
                  position: "absolute",
                  left: `${(image.x / 480) * 100}%`,
                  top: `${(image.y / 670) * 100}%`,
                  width: `${(image.width / 480) * 100}%`,
                  height: `${(image.height / 670) * 100}%`,
                }}
              >
                <PDFImage
                  src={image.content}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </View>
            ))}
          </View>
        </Page>
        {/* Subsequent pages with messages */}
        {Array.from({
          length: Math.max(...preparedMessages.map((msg) => msg.page)),
        }).map((_, index) => (
          <Page key={index + 1} size="A4">
            <View style={{ width: "100%", height: "100%" }}>
              <PDFImage src={cardBg} style={{ width: "100%", height: "100%" }} />
              {preparedMessages
                .filter(({ page }) => page === index + 1)
                .map((message, messageIndex) => {
                  const viewStyle = calculateResponsiveStyles(message, options);

                  if (message.type === "text") {
                    const textSections = convertHTMLToPDFText(message.content);

                    return (
                      <View key={messageIndex} style={viewStyle}>
                        <Text
                          style={{
                            color: message.fontColor,
                            fontSize: parseInt(message.fontSize),
                            textAlign: message.textAlign,
                            lineHeight: 1.5,
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
                        <PDFImage
                          src={message.content}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
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
  };

  const generatePDF = async (cardData, messages, options) => {
    try {
      imageCache.clear();
      const pdfDoc = await generatePDFContent(cardData, messages, options);
      const blob = await pdf(pdfDoc).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cards.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw error;
    }
  };

  const handleGeneratePDF = async () => {
    try {
      setSaving(true);
      await generatePDF(cardData, messages, options);
      toast({
        title: "Success",
        description: "PDF generated successfully",
        variant: "success",
      });
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
        onClick={handleGeneratePDF}
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
  cardData: PropTypes.object.isRequired,
  messages: PropTypes.array,
};
