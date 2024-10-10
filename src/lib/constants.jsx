import { ArrowLeftRight, Download, UserPlus } from "lucide-react";
import { amico, mail, pana, transfer } from "@/assets";
import { Airplane } from "@/components/icons/Airplane";
import { Paintbrush } from "@/components/icons/Paintbrush";
import { LayoutIcon } from "@/components/icons/LayoutIcon";

export const IMAGES = [
  {
    bg: "bg-[#7C4CFF1A]",
    src: amico,
  },
  {
    bg: "bg-[#EC268F1A]",
    src: pana,
  },
  {
    bg: "bg-[#7C4CFF1A]",
    src: mail,
  },
  {
    bg: "bg-[#EC268F1A]",
    src: transfer,
  },
];

export const DEMODATA = [
  {
    icon: <LayoutIcon />,
    title: "Choose a design",
    description:
      "Select card design template, input both receiver and sender details and setup delivery option.",
  },
  {
    icon: <Paintbrush />,
    title: "Share link",
    description:
      "Generate a shareable link, distribute to friends, family, and colleagues to co-sign and track signage.",
  },
  {
    icon: <Airplane />,
    title: "Receive delivery Confirmation",
    description:
      "Receive delivery notification and thank you message from recipient.",
  },
  {
    icon: <Download />,
    title: "Generate PDF",
    description: "Download card as PDF for record-keeping.",
  },
];

export const sidebarItems = [
  {
    icon: <UserPlus />,
    text: "Dashboard",
    to: "/dashboard",
  },

  {
    icon: <ArrowLeftRight />,
    text: "Profile",
    to: "/account/profile",
  },
];

export const fonts = [
  "Inter",
  "Roboto",
  "Poppins",
  "Indie Flower",
  "Flamenco",
  "Boogaloo",
  "Pacifico",
  "Bricolage Grotesque",
  "Righteous",
  "Comic Neue",
  "Ribeye Marrow",
  "Satisfy",
  "Sacramento",
  "Zeyada",
  "Montserrat",
  "Dancing Script",
  "Playfair Display",
  "Caveat",
  "Lobster",
  "Calligraffitti",
];