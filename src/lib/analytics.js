import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID);
};

export const logPageView = () => {
  if (import.meta.env.VITE_MODE === "production") {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  } else {
    console.log("Page view:", window.location.pathname);
  }
};

export const logEvent = (category, action, label) => {
  if (import.meta.env.VITE_MODE === "production") {
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    });
  } else {
    console.log({ category, action, label });
  }
};
