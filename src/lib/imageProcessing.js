import DOMPurify from "dompurify";

export const ensureHttps = (url) => {
  if (url && url.startsWith("http://")) {
    return url.replace("http://", "https://");
  }
  return url;
};

export const convertImageToPng = async (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
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

export const convertSvgToPng = async (svgUrl) => {
  const response = await fetch(svgUrl);
  const svgText = await response.text();
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
  const svgElement = svgDoc.documentElement;

  const viewBox = svgElement.getAttribute("viewBox");
  const [, , width, height] = viewBox
    ? viewBox.split(" ").map(Number)
    : [null, null, 1000, 1000];

  const canvas = document.createElement("canvas");
  const scale = 2;
  canvas.width = width * scale;
  canvas.height = height * scale;

  const ctx = canvas.getContext("2d");
  const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/png"));
      URL.revokeObjectURL(url);
    };
    img.onerror = reject;
    img.src = url;
  });
};

// utils/htmlProcessing.js
export const convertHTMLToPDFText = (htmlString) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = DOMPurify.sanitize(htmlString);

  function processNode(node) {
    let textSections = [];

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.trim();
      if (text) {
        let style = {};
        let parentNode = node.parentNode;

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

    if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();
      const blockElements = ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6"];

      if (blockElements.includes(tagName) && node.previousElementSibling) {
        textSections.push({ text: "\n", style: {} });
      }

      if (tagName === "br") {
        textSections.push({ text: "\n", style: {} });
        return textSections;
      }
    }

    for (const childNode of node.childNodes) {
      textSections = textSections.concat(processNode(childNode));
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();
      if (["p", "div", "h1", "h2", "h3", "h4", "h5", "h6"].includes(tagName)) {
        textSections.push({ text: "\n\n", style: {} });
      }
    }

    return textSections;
  }

  const sections = processNode(tempDiv);
  return sections.reduce((acc, section) => {
    if (section.text === "\n" && acc[acc.length - 1]?.text === "\n") {
      return acc;
    }
    return [...acc, section];
  }, []);
};
