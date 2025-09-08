import { Support, School, Work } from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";
import { ComponentType } from "react";

export interface FooterLink {
  label: string;
  href: string;
  tag?: string;
}

export interface FooterSection {
  title: string;
  icon: ComponentType<SvgIconProps>;
  links: FooterLink[];
}

export const footerSections: FooterSection[] = [
  {
    title: "Interview Types",
    icon: Work,
    links: [
      { label: "Frontend Developer", href: "#", tag: "Popular" },
      { label: "Backend Developer", href: "#", tag: "New" },
      { label: "Full Stack", href: "#" },
    ],
  },
  {
    title: "Resources",
    icon: School,
    links: [
      { label: "Interview Guide", href: "#" },
      { label: "Templates", href: "#" },
    ],
  },
  {
    title: "Support",
    icon: Support,
    links: [
      { label: "Help Center", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
];