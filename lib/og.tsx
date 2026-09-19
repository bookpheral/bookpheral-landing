import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/site-config";

/*
  Shared 1200×630 share-image template for route-level opengraph-image.tsx files.
  Uses the gradient logo mark from app/opengraph-image.tsx. Renders with the
  built-in font: the image renderer can't parse BDO Grotesk's variable TTF, so
  a static (non-variable) export of the font would be needed to use it here.
*/

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const LOGO_PATH =
  "M191.794 79.0735C185.715 72.9549 178.491 68.1015 170.536 64.7922C162.581 61.4828 154.053 59.7828 145.441 59.7897H140.382C138.902 43.451 131.385 28.2579 119.308 17.1948C107.23 6.1318 91.4646 -0.00142243 75.1086 4.50323e-06H11.4236C9.92309 -0.00133043 8.43701 0.294144 7.05043 0.869519C5.66385 1.4449 4.40399 2.28888 3.34294 3.35317C2.28189 4.41747 1.44049 5.68118 0.866866 7.07201C0.293246 8.46283 -0.00132637 9.95346 4.48948e-06 11.4586V65.7474C4.48948e-06 83.1847 6.90581 99.9078 19.1982 112.238C31.4906 124.568 48.1627 131.495 65.5468 131.495H70.3226V179.856C70.3213 181.362 70.6162 182.854 71.1905 184.245C71.7647 185.637 72.607 186.901 73.6692 187.965C74.7313 189.03 75.9923 189.874 77.3801 190.448C78.7678 191.023 80.255 191.318 81.7564 191.315H145.441C158.404 191.312 171.075 187.453 181.852 180.228C192.63 173.003 201.03 162.735 205.991 150.723C210.951 138.71 212.25 125.492 209.724 112.739C207.197 99.9857 200.957 88.2703 191.794 79.0735ZM168.805 136.925C168.1 138.291 167.281 139.595 166.356 140.822C162.485 145.985 156.929 149.621 150.658 151.094C144.386 152.567 137.799 151.783 132.045 148.881C129.616 147.962 127.351 146.656 125.336 145.014C123.908 143.852 122.597 142.554 121.42 141.137C116.938 135.788 113.852 128.795 109.713 121.579C108.833 120.046 107.902 118.534 106.901 116.961C106.88 116.914 106.852 116.869 106.82 116.829C101.035 107.933 92.3237 101.353 82.2016 98.2354H82.06C80.3331 97.7144 78.6231 97.2476 76.9299 96.8348C68.8352 94.805 61.2566 93.79 54.8719 90.9482C53.1928 90.1946 51.59 89.2803 50.0859 88.218C47.9606 86.7289 46.0855 84.9097 44.5309 82.8287C40.1536 78.0917 37.575 71.9624 37.2458 65.512C36.9166 59.0615 38.8577 52.7001 42.7299 47.5395C43.6421 46.3111 44.6576 45.1634 45.7654 44.109C50.477 39.6269 56.6191 36.9638 63.1021 36.5922C69.5851 36.2206 75.9897 38.1646 81.1797 42.0791C81.6856 42.4648 82.1915 42.8708 82.6569 43.2768C84.8067 45.1438 86.6535 47.3353 88.131 49.7723C92.492 55.5676 95.6084 62.9665 100.162 70.4059C100.566 71.0657 100.971 71.7254 101.406 72.3851L101.487 72.5069C107.275 81.4066 115.995 87.984 126.125 91.0903H126.267C129.11 91.953 131.903 92.6431 134.635 93.2521C140.706 94.6324 146.514 95.6575 151.603 97.6062C154.346 98.3616 156.957 99.5357 159.344 101.087C159.87 101.432 160.356 101.798 160.902 102.184C166.113 106.096 169.768 111.738 171.216 118.104C172.663 124.469 171.809 131.143 168.805 136.935V136.925Z";

type OgImageOptions = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export function renderOgImage({ eyebrow, title, subtitle }: OgImageOptions): ImageResponse {
  const domain = SITE_URL.replace(/^https?:\/\//, "");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0137e0",
        backgroundImage:
          "radial-gradient(circle at 88% 12%, rgba(128,245,46,0.28), transparent 38%), radial-gradient(circle at 0% 100%, rgba(4,40,156,0.9), transparent 55%)",
        padding: "72px 80px",
        color: "#ffffff",
      }}
    >
      {/* Logo wordmark */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <svg width="46" height="42" viewBox="0 0 211 192" fill="none" style={{ marginRight: "14px" }}>
          <path d={LOGO_PATH} fill="url(#og_logo_gradient)" />
          <defs>
            <linearGradient id="og_logo_gradient" x1="105.491" y1="0" x2="105.491" y2="191.315" gradientUnits="userSpaceOnUse">
              <stop stopColor="#80F52E" />
              <stop offset="1" stopColor="#69FF00" />
            </linearGradient>
          </defs>
        </svg>
        <span style={{ fontSize: "38px", fontWeight: 600, letterSpacing: "-1.5px" }}>Bookpheral</span>
      </div>

      {/* Title block */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "22px" }}>
          <div style={{ width: "36px", height: "3px", backgroundColor: "#80f52e", marginRight: "14px" }} />
          <span style={{ fontSize: "22px", letterSpacing: "3px", textTransform: "uppercase", color: "#b6f98a" }}>
            {eyebrow}
          </span>
        </div>
        <div
          style={{
            fontSize: title.length > 48 ? "62px" : "74px",
            fontWeight: 600,
            lineHeight: 1.04,
            letterSpacing: "-3px",
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div style={{ marginTop: "22px", fontSize: "28px", lineHeight: 1.35, color: "rgba(219,229,255,0.9)", maxWidth: "940px" }}>
            {subtitle}
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "22px", color: "rgba(219,229,255,0.75)" }}>
        <span>{domain}</span>
        <span>Protect · Publish · Profit</span>
      </div>
    </div>,
    ogSize,
  );
}
