import React, { ComponentType } from "react";
import { Stack, Link, SvgIconProps } from "@mui/material";

interface DesktopNavigationProps {
  navItems: { label: string; href: string; icon: ComponentType<SvgIconProps> }[];
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  navItems,
}) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "#13678A",
            textDecoration: "none",
            fontFamily: "system-ui",
            fontSize: "0.9rem",
            fontWeight: "600",
            px: 2,
            py: 1,
            borderRadius: 2,
            transition: "all 0.3s ease",
            "&:hover": {
              color: "#012030",
              backgroundColor: "#f0f7ff",
              transform: "translateY(-1px)",
            },
          }}
        >
          <item.icon fontSize="small" />
          {item.label}
        </Link>
      ))}
    </Stack>
  );
};
