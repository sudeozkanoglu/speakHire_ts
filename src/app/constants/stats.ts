import { SvgIconComponent } from "@mui/icons-material";
import { Person, PlayArrow, EmojiEvents, Star } from "@mui/icons-material";

export interface Stat {
  label: string;
  value: string;
  icon: SvgIconComponent;
}

export const stats: Stat[] = [
  {
    label: "Active Users",
    value: "50K+",
    icon: Person,
  },
  {
    label: "Interview Sessions",
    value: "200K+",
    icon: PlayArrow,
  },
  {
    label: "Success Rate",
    value: "85%",
    icon: EmojiEvents,
  },
  {
    label: "Avg. Rating",
    value: "4.8★",
    icon: Star,
  }
];