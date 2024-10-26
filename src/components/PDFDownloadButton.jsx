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

const PDF_WIDTH = 596; // Standard A4 width in points
const PDF_HEIGHT = 842;

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
  const [imageCache, setImageCache] = useState(new Map());
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
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  // Function to create a proxy URL for Cloudinary images
  const getProxyImageUrl = (url) => {
    if (url.includes("cloudinary.com")) {
      // Add format-auto and quality-auto parameters
      const cloudinaryUrl = new URL(url);
      cloudinaryUrl.searchParams.set("f", "auto");
      cloudinaryUrl.searchParams.set("q", "auto");
      // Add timestamp to prevent caching issues
      cloudinaryUrl.searchParams.set("t", Date.now());
      return cloudinaryUrl.toString();
    }
    return url;
  };

  const convertToValidFormat = async (base64String, originalUrl) => {
    try {
      // If it's already a PNG or JPEG, return as is
      if (
        base64String.includes("data:image/png;base64,") ||
        base64String.includes("data:image/jpeg;base64,")
      ) {
        return base64String;
      }

      // Create an image element to draw to canvas
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = base64String;
      });

      // Create canvas and convert to PNG
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      // For SVG backgrounds, ensure we fill with white first
      if (originalUrl?.toLowerCase().endsWith(".svg")) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      // Convert to PNG
      return canvas.toDataURL("image/png");
    } catch (error) {
      console.error("Error converting image format:", error);
      throw new Error("Failed to convert image format");
    }
  };

  const loadImageWithRetry = async (url, retries = 3) => {
    if (!url) return null;

    const fileExtension = url.split(".").pop().toLowerCase();
    if (!["png", "jpg", "jpeg", "gif", "svg"].includes(fileExtension)) {
      console.error("Invalid image extension:", fileExtension);
      return null;
    }

    // Create Cloudinary URL with optimization parameters
    const optimizedUrl = url.includes("cloudinary.com")
      ? `${url}?f=auto&q=auto&w=1000&t=${Date.now()}`
      : url;

    for (let i = 0; i < retries; i++) {
      try {
        // Use fetch API instead of XMLHttpRequest
        const response = await fetch(optimizedUrl);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const blob = await response.blob();
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            // For SVGs, we need to ensure proper conversion
            if (fileExtension === "svg") {
              resolve(convertSvgToDataUrl(reader.result));
            } else {
              resolve(reader.result);
            }
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.warn(`Attempt ${i + 1} failed for ${url}:`, error);
        if (i === retries - 1) {
          console.error("All retries failed for:", url);
          return null;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
    return null;
  };

  const convertSvgToDataUrl = async (svgData) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width || 800; // Fallback width
        canvas.height = img.height || 600; // Fallback height
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff00";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = reject;
      img.src = svgData;
    });
  };
  // Modified image loading check
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

      try {
        const loadPromises = allImages.map((img) => {
          return new Promise((resolve) => {
            if (img.complete) {
              resolve();
            } else {
              img.onload = resolve;
              img.onerror = () => {
                console.error("Failed to load image:", img.src);
                resolve(); // Resolve anyway to prevent blocking
              };
            }
          });
        });

        await Promise.all(loadPromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error checking images:", error);
        setImagesLoaded(true); // Set to true anyway to allow generation attempt
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

  const convertSvgToPng = async (svgUrl) => {
    const response = await fetch(svgUrl);
    const svgText = await response.text();
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
    const svgElement = svgDoc.documentElement;

    // Get the viewBox attributes
    const viewBox = svgElement.getAttribute("viewBox");
    const [, , width, height] = viewBox
      ? viewBox.split(" ").map(Number)
      : [null, null, 1000, 1000];

    // Create a high-resolution canvas
    const canvas = document.createElement("canvas");
    const scale = 2; // Increase this for higher resolution
    canvas.width = width * scale;
    canvas.height = height * scale;

    const ctx = canvas.getContext("2d");
    const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/png"));
        URL.revokeObjectURL(url);
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  // const prepareImageForPdf = async (src) => {
  //   const fileExtension = src.split(".").pop().toLowerCase();
  //   if (fileExtension === "gif") {
  //     return await convertImageToPng(src);
  //   } else if (fileExtension === "svg") {
  //     return await convertSvgToPng(src);
  //   }
  //   return src; // Return original source for other image types
  // };

  
const prepareImageForPdf = async (src) => {
  if (!src) return null;

  try {
    console.log("Preparing image:", src);
    const fileExtension = src.split(".").pop().toLowerCase();

    // Validate file extension
    if (!["png", "jpg", "jpeg", "gif", "svg"].includes(fileExtension)) {
      console.error("Not valid image extension:", fileExtension);
      return null;
    }

    const base64Data = await loadImageWithRetry(src);
    console.log("Image prepared successfully");
    return base64Data;
  } catch (error) {
    console.error("Failed to prepare image:", src, error);
    return null; // Return null instead of throwing to allow PDF generation to continue
  }
};

  const generatePDFContent = async (cardData, messages, options) => {
    // Convert card image if necessary
    const [cardImageSrc, customImages, preparedMessages] = await Promise.all([
      prepareImageForPdf(cardData.card.card.url),
      Promise.all(
        (cardData.card.meta?.images || []).map(async (image) => ({
          ...image,
          content: await prepareImageForPdf(image.content),
        }))
      ),
      Promise.all(
        messages.map(async (message) => {
          if (message.type === "text") return message;
          return {
            ...message,
            content: await prepareImageForPdf(message.content),
          };
        })
      ),
    ]);

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
                  top: `${(image.y / PDF_HEIGHT) * 100}%`,
                  width: `${(image.width / 480) * 100}%`,
                  height: `${(image.height / PDF_HEIGHT) * 100}%`,
                }}
              >
                <PDFImage
                  cache={false}
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
              <PDFImage
                src={cardBg}
                style={{ width: "100%", height: "100%" }}
              />
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
                          cache={false}
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
