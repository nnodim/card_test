import { Font } from "@react-pdf/renderer";

// Font configuration with CDN URLs and variants
const fontConfig = {
  // Standard fonts with multiple weights
  standardFonts: [
    {
      family: "Inter",
      fonts: [
        {
          src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",
          weight: 400,
        },
        {
          src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf",
          weight: "bold",
        },
        {
          src: "https://fonts.gstatic.com/s/inter/v18/UcCM3FwrK3iLTcvneQg7Ca725JhhKnNqk4j1ebLhAm8SrXTc2dthjZ-Ek-7MeA.ttf",
          weight: 400,
          style: "italic",
        },
        {
          src: "https://fonts.gstatic.com/s/inter/v18/UcCM3FwrK3iLTcvneQg7Ca725JhhKnNqk4j1ebLhAm8SrXTcB9xhjZ-Ek-7MeA.ttf",
          weight: "bold",
          style: "italic",
        },
      ],
    },
    {
      family: "Roboto",
      fonts: [
        {
          src: "https://fonts.gstatic.com/s/roboto/v32/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf",
          weight: 400,
        },
        {
          src: "https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf",
          weight: "bold",
        },
        {
          src: "https://fonts.gstatic.com/s/roboto/v32/KFOkCnqEu92Fr1Mu52xPKTM1K9nz.ttf",
          weight: 400,
          style: "italic",
        },
        {
          src: "https://fonts.gstatic.com/s/roboto/v32/KFOjCnqEu92Fr1Mu51TzBhc9AMX6lJBP.ttf",
          weight: "bold",
          style: "italic",
        },
      ],
    },
    {
      family: "Poppins",
      fonts: [
        {
          src: "https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrFJDUc1NECPY.ttf",
          weight: 400,
        },
        {
          src: "https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLEj6V1tvFP-KUEg.ttf",
          weight: "bold",
        },
        {
          src: "https://fonts.gstatic.com/s/poppins/v21/pxiGyp8kv8JHgFVrJJLed3FBGPaTSQ.ttf",
          weight: 400,
          style: "italic",
        },
        {
          src: "https://fonts.gstatic.com/s/poppins/v21/pxiDyp8kv8JHgFVrJJLmr19lEN2PQEhcqw.ttf",
          weight: "bold",
          style: "italic",
        },
      ],
    },
    {
      family: "Montserrat",
      fonts: [
        {
          src: "https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-Y3tcoqK5.ttf",
          weight: 400,
        },
        {
          src: "https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCu170w-Y3tcoqK5.ttf",
          weight: "bold",
        },
        {
          src: "https://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq6R9aX9-p7K5ILg.ttf",
          weight: 400,
          style: "italic",
        },
        {
          src: "https://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq3p6aX9-p7K5ILg.ttf",
          weight: "bold",
          style: "italic",
        },
      ],
    },
    {
      family: "Playfair Display",
      fonts: [
        {
          src: "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQZNLo_U2r.ttf",
          weight: 400,
        },
        {
          src: "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKebukDQZNLo_U2r.ttf",
          weight: "bold",
        },
        {
          src: "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_qiTbtbK-F2rA0s.ttf",
          weight: 400,
          style: "italic",
        },
        {
          src: "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_naUbtbK-F2rA0s.ttf",
          weight: "bold",
          style: "italic",
        },
      ],
    },
  ],

  // Decorative fonts (usually single weight)
  decorativeFonts: [
    {
      family: "Indie Flower",
      fonts: [
        {
          src: "https://fonts.gstatic.com/s/indieflower/v21/m8JVjfNVeKWVnh3QMuKkFcZlbkGG1dKEDw.ttf",
          weight: 400,
        },
        {
          src: "https://fonts.gstatic.com/s/indieflower/v21/m8JVjfNVeKWVnh3QMuKkFcZlbkGG1dKEDw.ttf",
          weight: "bold",
        },
        {
          src: "https://fonts.gstatic.com/s/indieflower/v21/m8JVjfNVeKWVnh3QMuKkFcZlbkGG1dKEDw.ttf",
          weight: 400,
          style: "italic",
        },
        {
          src: "https://fonts.gstatic.com/s/indieflower/v21/m8JVjfNVeKWVnh3QMuKkFcZlbkGG1dKEDw.ttf",
          weight: "bold",
          style: "italic",
        },
      ],
    },
    {
      family: "Flamenco",
      fonts: [
        {
          src: "https://fonts.gstatic.com/s/flamenco/v18/neIIzCehqYguo67ssaWGHK06UY30.ttf",
          weight: 400,
        },
        {
          src: "https://fonts.gstatic.com/s/flamenco/v18/neIIzCehqYguo67ssaWGHK06UY30.ttf",
          weight: "bold",
        },
        {
          src: "https://fonts.gstatic.com/s/flamenco/v18/neIIzCehqYguo67ssaWGHK06UY30.ttf",
          weight: 400,
          style: "italic",
        },
        {
          src: "https://fonts.gstatic.com/s/flamenco/v18/neIIzCehqYguo67ssaWGHK06UY30.ttf",
          weight: "bold",
          style: "italic",
        },
      ],
    },
    {
      family: "Boogaloo",
      fonts: [
        {
          src: "https://fonts.gstatic.com/s/boogaloo/v23/kmK-Zq45GAvOdnaW6x1F_SrQo_1K.ttf",
          weight: 400,
        },
        {
          src: "https://fonts.gstatic.com/s/boogaloo/v23/kmK-Zq45GAvOdnaW6x1F_SrQo_1K.ttf",
          weight: "bold",
        },
        {
          src: "https://fonts.gstatic.com/s/boogaloo/v23/kmK-Zq45GAvOdnaW6x1F_SrQo_1K.ttf",
          weight: 400,
          style: "italic",
        },
        {
          src: "https://fonts.gstatic.com/s/boogaloo/v23/kmK-Zq45GAvOdnaW6x1F_SrQo_1K.ttf",
          weight: "bold",
          style: "italic",
        },
      ],
    },
    {
      family: "Pacifico",
      fonts: [
        {
          src: "https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ96A4sijpFu_.ttf",
          weight: 400,
        },
        {
          src: "https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ96A4sijpFu_.ttf",
          weight: "bold",
        },
        {
          src: "https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ96A4sijpFu_.ttf",
          weight: 400,
          style: "italic",
        },
        {
          src: "https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ96A4sijpFu_.ttf",
          weight: "bold",
          style: "italic",
        },
      ],
    },
    {
      family: "Bricolage Grotesque",
      fonts: [
        {
          src: "https://fonts.gstatic.com/s/bricolagegrotesque/v7/3y9U6as8bTXq_nANBjzKo3IeZx8z6up5BeSl5jBNz_19PpbpMXuECpwUxJBOm_OJWiaaD30YfKfjZZoLvRviyM0vs-wJDtw.ttf",
          weight: 400,
        },
        {
          src: "https://fonts.gstatic.com/s/bricolagegrotesque/v7/3y9U6as8bTXq_nANBjzKo3IeZx8z6up5BeSl5jBNz_19PpbpMXuECpwUxJBOm_OJWiaaD30YfKfjZZoLvcXlyM0vs-wJDtw.ttf",
          weight: "bold",
        },
        {
          src: "https://fonts.gstatic.com/s/bricolagegrotesque/v7/3y9U6as8bTXq_nANBjzKo3IeZx8z6up5BeSl5jBNz_19PpbpMXuECpwUxJBOm_OJWiaaD30YfKfjZZoLvRviyM0vs-wJDtw.ttf",
          weight: 400,
          style: "italic",
        },
        {
          src: "https://fonts.gstatic.com/s/bricolagegrotesque/v7/3y9U6as8bTXq_nANBjzKo3IeZx8z6up5BeSl5jBNz_19PpbpMXuECpwUxJBOm_OJWiaaD30YfKfjZZoLvcXlyM0vs-wJDtw.ttf",
          weight: "bold",
          style: "italic",
        },
      ],
    },
    {
      family: "Righteous",
      fonts: [
        {
          src: "https://fonts.gstatic.com/s/righteous/v17/1cXxaUPXBpj2rGoU7C9mj3uEicG01A.ttf",
          weight: 400,
        },
        {
          src: "https://fonts.gstatic.com/s/righteous/v17/1cXxaUPXBpj2rGoU7C9mj3uEicG01A.ttf",
          weight: "bold",
        },
        {
          src: "https://fonts.gstatic.com/s/righteous/v17/1cXxaUPXBpj2rGoU7C9mj3uEicG01A.ttf",
          weight: 400,
          style: "italic",
        },
        {
          src: "https://fonts.gstatic.com/s/righteous/v17/1cXxaUPXBpj2rGoU7C9mj3uEicG01A.ttf",
          weight: "bold",
          style: "italic",
        },
      ],
    },
    {
      family: "Comic Neue",
      fonts: [
        {
          src: "https://fonts.gstatic.com/s/comicneue/v8/4UaHrEJDsxBrF37olUeDx63j5pN1MwI.ttf",
          weight: 400,
        },
        {
          src: "https://fonts.gstatic.com/s/comicneue/v8/4UaErEJDsxBrF37olUeD_xHMwpteLwtHJlc.ttf",
          weight: "bold",
        },
        {
          src: "https://fonts.gstatic.com/s/comicneue/v8/4UaFrEJDsxBrF37olUeD96_p4rFwIwJePw.ttf",
          weight: 400,
          style: "italic",
        },
        {
          src: "https://fonts.gstatic.com/s/comicneue/v8/4UaarEJDsxBrF37olUeD96_RXp5UKylCNlcw_Q.ttf",
          weight: "bold",
          style: "italic",
        },
      ],
    },
    {
      family: "Ribeye Marrow",
      fonts: [
        {
          src: "https://fonts.gstatic.com/s/ribeyemarrow/v24/GFDsWApshnqMRO2JdtRZ2d0vEAwTVWgKdtw.ttf",
          weight: 400,
        },
        {
          src: "https://fonts.gstatic.com/s/ribeyemarrow/v24/GFDsWApshnqMRO2JdtRZ2d0vEAwTVWgKdtw.ttf",
          weight: "bold",
        },
        {
          src: "https://fonts.gstatic.com/s/ribeyemarrow/v24/GFDsWApshnqMRO2JdtRZ2d0vEAwTVWgKdtw.ttf",
          weight: 400,
          style: "italic",
        },
        {
          src: "https://fonts.gstatic.com/s/ribeyemarrow/v24/GFDsWApshnqMRO2JdtRZ2d0vEAwTVWgKdtw.ttf",
          weight: "bold",
          style: "italic",
        },
      ],
    },
    {
      family: "Satisfy",
      fonts: [
        {
          src: "https://fonts.gstatic.com/s/satisfy/v21/rP2Hp2yn6lkG50LoOZSCHBeHFl0.ttf",
          weight: 400,
        },
        {
          src: "https://fonts.gstatic.com/s/satisfy/v21/rP2Hp2yn6lkG50LoOZSCHBeHFl0.ttf",
          weight: "bold",
        },
        {
          src: "https://fonts.gstatic.com/s/satisfy/v21/rP2Hp2yn6lkG50LoOZSCHBeHFl0.ttf",
          weight: 400,
          style: "italic",
        },
        {
          src: "https://fonts.gstatic.com/s/satisfy/v21/rP2Hp2yn6lkG50LoOZSCHBeHFl0.ttf",
          weight: "bold",
          style: "italic",
        },
      ],
    },
    {
      family: "Sacramento",
      fonts: [
        {
          src: "https://fonts.gstatic.com/s/sacramento/v15/buEzpo6gcdjy0EiZMBUG0CoV_NxLeiw.ttf",
          weight: 400,
        },
        {
          src: "https://fonts.gstatic.com/s/sacramento/v15/buEzpo6gcdjy0EiZMBUG0CoV_NxLeiw.ttf",
          weight: "bold",
        },
        {
          src: "https://fonts.gstatic.com/s/sacramento/v15/buEzpo6gcdjy0EiZMBUG0CoV_NxLeiw.ttf",
          weight: 400,
          style: "italic",
        },
        {
          src: "https://fonts.gstatic.com/s/sacramento/v15/buEzpo6gcdjy0EiZMBUG0CoV_NxLeiw.ttf",
          weight: "bold",
          style: "italic",
        },
      ],
    },
    {
      family: "Zeyada",
      fonts: [
        {
          src: "https://fonts.gstatic.com/s/zeyada/v19/11hAGpPTxVPUbgZDNGatWKaZ3g.ttf",
          weight: 400,
        },
        {
          src: "https://fonts.gstatic.com/s/zeyada/v19/11hAGpPTxVPUbgZDNGatWKaZ3g.ttf",
          weight: "bold",
        },
        {
          src: "https://fonts.gstatic.com/s/zeyada/v19/11hAGpPTxVPUbgZDNGatWKaZ3g.ttf",
          weight: 400,
          style: "italic",
        },
        {
          src: "https://fonts.gstatic.com/s/zeyada/v19/11hAGpPTxVPUbgZDNGatWKaZ3g.ttf",
          weight: "bold",
          style: "italic",
        },
      ],
    },
    {
      family: "Dancing Script",
      fonts: [
        {
          src: "https://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BMSoHTeB9ptDqpw.ttf",
          weight: 400,
        },
        {
          src: "https://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7B7y0HTeB9ptDqpw.ttf",
          weight: "bold",
        },
        {
          src: "https://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BMSoHTeB9ptDqpw.ttf",
          weight: 400,
          style: "italic",
        },
        {
          src: "https://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7B7y0HTeB9ptDqpw.ttf",
          weight: "bold",
          style: "italic",
        },
      ],
    },
    {
      family: "Caveat",
      fonts: [
        {
          src: "https://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjfJ9SIKjYBxPigs.ttf",
          weight: 400,
        },
        {
          src: "https://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjSx6SIKjYBxPigs.ttf",
          weight: "bold",
        },
        {
          src: "https://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjfJ9SIKjYBxPigs.ttf",
          weight: 400,
          style: "italic",
        },
        {
          src: "https://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjSx6SIKjYBxPigs.ttf",
          weight: "bold",
          style: "italic",
        },
      ],
    },
    {
      family: "Lobster",
      fonts: [
        {
          src: "https://fonts.gstatic.com/s/lobster/v30/neILzCirqoswsqX9_oWsMqEzSJQ.ttf",
          weight: 400,
        },
        {
          src: "https://fonts.gstatic.com/s/lobster/v30/neILzCirqoswsqX9_oWsMqEzSJQ.ttf",
          weight: "bold",
        },
        {
          src: "https://fonts.gstatic.com/s/lobster/v30/neILzCirqoswsqX9_oWsMqEzSJQ.ttf",
          weight: 400,
          style: "italic",
        },
        {
          src: "https://fonts.gstatic.com/s/lobster/v30/neILzCirqoswsqX9_oWsMqEzSJQ.ttf",
          weight: "bold",
          style: "italic",
        },
      ],
    },
    {
      family: "Calligraffitti",
      fonts: [
        {
          src: "https://fonts.gstatic.com/s/calligraffitti/v19/46k2lbT3XjDVqJw3DCmCFjE0vnFZM5ZBpYN-.ttf",
          weight: 400,
        },
        {
          src: "https://fonts.gstatic.com/s/calligraffitti/v19/46k2lbT3XjDVqJw3DCmCFjE0vnFZM5ZBpYN-.ttf",
          weight: "bold",
        },
        {
          src: "https://fonts.gstatic.com/s/calligraffitti/v19/46k2lbT3XjDVqJw3DCmCFjE0vnFZM5ZBpYN-.ttf",
          weight: 400,
          style: "italic",
        },
        {
          src: "https://fonts.gstatic.com/s/calligraffitti/v19/46k2lbT3XjDVqJw3DCmCFjE0vnFZM5ZBpYN-.ttf",
          weight: "bold",
          style: "italic",
        },
      ],
    },
  ],
};

// Font name mapping for special cases
const fontNameMap = {
  "Indie Flower": "Indie Flower",
  "Comic Neue": "Comic Neue",
  "Bricolage Grotesque": "Bricolage Grotesque",
  "Ribeye Marrow": "Ribeye Marrow",
  "Dancing Script": "Dancing Script",
  "Playfair Display": "Playfair Display",
};

// Export the font registration function
export const registerPDFFonts = async () => {
  try {
    // Register standard fonts
    for (const fontFamily of fontConfig.standardFonts) {
      await Font.register({
        family: fontFamily.family,
        fonts: fontFamily.fonts.map((font) => ({
          src: font.src,
          fontWeight: font.weight,
          fontStyle: font.style || "normal",
        })),
      });
    }

    // Register decorative fonts
    for (const fontFamily of fontConfig.decorativeFonts) {
      await Font.register({
        family: fontFamily.family,
        fonts: fontFamily.fonts.map((font) => ({
          src: font.src,
          fontWeight: font.weight,
          fontStyle: font.style || "normal",
        })),
      });
    }

    console.log("All fonts registered successfully");
  } catch (error) {
    console.error("Error registering fonts:", error);
    throw error;
  }
};

// Helper function to get font family name that matches PDF requirements
export const getPDFFontFamily = (fontName) => {
  return fontNameMap[fontName] || fontName;
};

// Function to check if a font is available
export const isFontAvailable = (fontName) => {
  const standardFontNames = fontConfig.standardFonts.map((f) => f.family);
  const decorativeFontNames = fontConfig.decorativeFonts.map((f) => f.family);
  return [...standardFontNames, ...decorativeFontNames].includes(fontName);
};

// Export the font list for reference
export const availableFonts = [
  ...fontConfig.standardFonts.map((f) => f.family),
  ...fontConfig.decorativeFonts.map((f) => f.family),
];
