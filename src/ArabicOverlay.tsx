import { loadFont } from "@remotion/google-fonts/Tajawal";
import React, { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const { fontFamily } = loadFont("normal", {
  subsets: ["arabic"],
  weights: ["400", "700"],
});

const ACCENT_COLOR = "#E8A020";
const disappearBeforeEnd = 20;

export const ArabicOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width } = useVideoConfig();

  const slideIn = spring({
    fps,
    frame,
    config: { mass: 0.6, damping: 18 },
  });

  const out = spring({
    fps,
    frame: frame - durationInFrames + disappearBeforeEnd,
    config: { damping: 200 },
    durationInFrames: disappearBeforeEnd,
  });

  const slideX = interpolate(slideIn, [0, 1], [width, 0]);
  const slideOutX = interpolate(out, [0, 1], [0, width]);

  const container: React.CSSProperties = useMemo(
    () => ({
      position: "absolute",
      bottom: 120,
      right: 0,
      translate: `${slideX + slideOutX}px 0`,
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "stretch",
      direction: "rtl",
    }),
    [slideX, slideOutX],
  );

  const accentBar: React.CSSProperties = {
    width: 10,
    backgroundColor: ACCENT_COLOR,
    borderRadius: "4px 0 0 4px",
    flexShrink: 0,
  };

  const textBlock: React.CSSProperties = {
    backgroundColor: "rgba(10, 10, 10, 0.88)",
    padding: "22px 28px 22px 40px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    direction: "rtl",
    unicodeBidi: "embed",
  };

  const nameStyle: React.CSSProperties = {
    fontFamily,
    fontSize: 52,
    fontWeight: "700",
    color: "#ffffff",
    lineHeight: 1.3,
    direction: "rtl",
    unicodeBidi: "embed",
    textAlign: "right",
  };

  const roleStyle: React.CSSProperties = {
    fontFamily,
    fontSize: 30,
    fontWeight: "400",
    color: ACCENT_COLOR,
    direction: "rtl",
    unicodeBidi: "embed",
    textAlign: "right",
  };

  return (
    <AbsoluteFill>
      <div style={container}>
        <div style={accentBar} />
        <div style={textBlock}>
          <div style={nameStyle}>فاطمة الزهراء</div>
          <div style={roleStyle}>مراسلة أخبار دولية</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
