import { SvgIconComponent } from "@mui/icons-material";
import {
  Home as HomeIcon,
  AccountCircle as ProfileIcon,
  Work as InterviewsIcon
} from "@mui/icons-material";

export interface NavbarItems {
  label: string;
  href: string;
  icon: SvgIconComponent;
}

export const navItems: NavbarItems[] = [
  { 
    label: "HOME", 
    href: "#", 
    icon: HomeIcon
  },
  {
    label: "PROFILE",
    href: "#",
    icon: ProfileIcon,
  },
  {
    label: "INTERVIEWS",
    href: "#",
    icon: InterviewsIcon,
  },
];
