import localFont from "next/font/local";

export const switzer = localFont({
  src: "./Switzer/Switzer-Variable.woff2",
  variable: "--switzer",
  display: "swap",
  weight: "100 900",
});

export const switzer_italic = localFont({
  src: "./Switzer/Switzer-VariableItalic.woff2",
  variable: "--switzer-italic",
  display: "swap",
  weight: "100 900",
});

export const bdo_grotesk = localFont({
  src: "./BDO_Grotesk/BDOGrotesk-VF-BF648a657078401.ttf",
  variable: "--bdo-grotesk",
  display: "swap",
  weight: "100 900",
});
