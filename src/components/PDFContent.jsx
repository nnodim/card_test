import { cardBg } from "@/assets";
import { getPDFFontFamily } from "@/lib/font";
import { convertHTMLToPDFText, convertImageToPng, convertSvgToPng, ensureHttps } from "@/lib/imageProcessing";
import {
  Document,
  Page,
  Image as PDFImage,
  Text,
  View,
} from "@react-pdf/renderer";
import PropTypes from "prop-types";

const PDF_HEIGHT = 842;

export const PDFContent = async (cardData, messages, options) => {
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
      fontFamily:
        message.fontFamily === "sans-serif"
          ? ""
          : getPDFFontFamily(message.fontFamily),
      fontWeight: message.bold ? "bold" : "normal",
      fontStyle: message.italic ? "italic" : "normal",
      color: message.fontColor,
      backgroundColor: message.bgColor,
    };
  };

    const prepareImageForPdf = async (src) => {
      if (!src) return null;
      const url = ensureHttps(src);

      try {
        const fileExtension = url.split(".").pop().toLowerCase();
        if (fileExtension === "svg") {
          return await convertSvgToPng(url);
        }
        return await convertImageToPng(url);
      } catch (error) {
        console.error("Error preparing image for PDF:", error);
        return url;
      }
    };

  const cardImageSrc = await prepareImageForPdf(cardData.card.card.url);
  const customImages = await Promise.all(
    (cardData.card.meta?.images || []).map(async (image) => {
      return {
        ...image,
        content: await prepareImageForPdf(image.content),
      };
    })
  );

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
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: getPDFFontFamily(
                    cardData.card.meta.message.fontFamily
                  ),
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
                          paddingTop: 10,
                          paddingBottom: 10,
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

PDFContent.propTypes = {
  cardData: PropTypes.shape({
    card: PropTypes.shape({
      meta: PropTypes.shape({
        message: PropTypes.shape({
          x: PropTypes.number,
          y: PropTypes.number,
          width: PropTypes.number,
          height: PropTypes.number,
          name: PropTypes.string,
          color: PropTypes.string,
          fontSize: PropTypes.string,
          fontFamily: PropTypes.string,
          textAlign: PropTypes.string,
          bold: PropTypes.bool,
          italic: PropTypes.bool,
          strikeThrough: PropTypes.bool,
        }),
        images: PropTypes.arrayOf(
          PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
            width: PropTypes.number,
            height: PropTypes.number,
            content: PropTypes.string,
          })
        ),
      }),
    }),
  }),
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      content: PropTypes.string,
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
      fontColor: PropTypes.string,
      fontSize: PropTypes.string,
      fontFamily: PropTypes.string,
      textAlign: PropTypes.string,
      bold: PropTypes.bool,
      italic: PropTypes.bool,
      strikeThrough: PropTypes.bool,
    })
  ),
  options: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};
