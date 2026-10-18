import React from "react";
import { MUSE_THEME } from "./tokens";

interface HardShadowCardProps {
  children: React.ReactNode;
  bg?: string;
  shadowOffset?: number;
  borderRadius?: number;
  borderWidth?: number;
  padding?: string | number;
  style?: React.CSSProperties;
  className?: string;
}

export const HardShadowCard: React.FC<HardShadowCardProps> = ({
  children,
  bg = MUSE_THEME.colors.white,
  shadowOffset = 4,
  borderRadius = 20,
  borderWidth = 3,
  padding = 24,
  style = {},
}) => {
  return (
    <div
      style={{
        backgroundColor: bg,
        border: `${borderWidth}px solid ${MUSE_THEME.colors.ink}`,
        borderRadius,
        boxShadow: `${shadowOffset}px ${shadowOffset}px 0px ${MUSE_THEME.colors.ink}`,
        padding,
        position: "relative",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
