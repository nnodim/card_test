import { OURSTORY, PRICING } from "@/lib/routes";
import { Link } from "react-router-dom";
import Facebook from "./icons/Facebook";
import Instagram from "./icons/Instagram";
import Linkedin from "./icons/Linkedin";
import Pinterest from "./icons/Pinterest";
import XSocial from "./icons/XSocial";
import YouTube from "./icons/YouTube";
import useOverviewNavigation from "@/hooks/useOverviewNavigation";
import { logEvent } from "@/lib/analytics";

const SocialLink = [
  {
    name: "Facebook",
    icon: <Facebook />,
    url: "https://www.facebook.com/profile.php?id=61566170784089&mibextid=ZbWKwL", // Replace with your Facebook URL
  },
  {
    name: "Linkedin",
    icon: <Linkedin />,
    url: "https://www.linkedin.com/company/celebration-e-cards/",
  },
  {
    name: "Pinterest",
    icon: <Pinterest />,
    url: "https://www.pinterest.com/celebrationecards/",
  },
  {
    name: "Instagram",
    icon: <Instagram />,
    url: "https://www.instagram.com/celebratione_cards/",
  },
  {
    name: "YouTube",
    icon: <YouTube />,
    url: "https://www.youtube.com/channel/UCO9hb_D23gsjif3E4WYDU-A",
  },
  {
    name: "XSocial",
    icon: <XSocial />,
    url: "https://x.com/celebratnecards",
  },
];

const FooterLink = [
  {
    name: "Overview",
    link: "/",
    useCustomHandler: true,
  },
  {
    name: "Explore Occassions",
    link: "/explore",
  },
  {
    name: "Plans & Pricing",
    link: PRICING,
  },
  {
    name: "About Us",
    link: OURSTORY,
  },
  {
    name: "Terms of Use",
    link: "/terms-of-use",
  },
  {
    name: "Privacy",
    link: "/privacy",
  },
  {
    name: "Admin Login",
    link: "/admin-login",
  },
];

export const Footer = () => {
  const handleOverviewClick = useOverviewNavigation();
  const handleClick = (label) => {
    logEvent("Social Links", "Click", label);
  };

  return (
    <footer className="bg-primary">
      <div className="mx-auto max-w-7xl py-12 px-6 md:flex flex-col md:items-center md:py-16 md:justify-between lg:px-8 text-white font-inter">
        <div className="flex flex-col gap-y-8">
          <img
            src="https://cdn.hashnode.com/res/hashnode/image/upload/v1724065645141/4f8fcd33-4da3-47d2-9952-f087c959aa87.png"
            className="w-40 sm:w-56 mx-auto"
            alt=""
          />
          <ul className="flex gap-x-11 justify-center items-center gap-y-4 flex-wrap">
            <ul className="flex gap-x-11 justify-center items-center gap-y-4 flex-wrap">
              {FooterLink.map((item) => (
                <li key={item.name}>
                  {item.useCustomHandler ? (
                    <button onClick={handleOverviewClick}>{item.name}</button>
                  ) : (
                    <Link to={item.link}>{item.name}</Link>
                  )}
                </li>
              ))}
            </ul>
          </ul>
        </div>

        <hr className="h-px w-full my-10 bg-gray-200 dark:bg-gray-700" />

        <div className="flex flex-col-reverse md:flex-row justify-between text-center items-center w-full gap-y-4">
          <p>© 2024 Celebration E-cards Limited. All Right Reserved</p>
          <ul className="flex">
            {SocialLink.map((item) => (
              <li
                key={item.name}
                className="mr-4 h-8 w-8 bg-[#9879ECE3] p-2 rounded-full flex flex-shrink-0 items-center justify-center"
              >
                <a
                  href={item.url}
                  onClick={() => handleClick(item.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
