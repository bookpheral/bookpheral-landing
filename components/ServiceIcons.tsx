// 20px stroke icons for service feature lists. Decorative (aria-hidden).

type IconName =
  | "shield"
  | "search"
  | "card"
  | "clipboard"
  | "chart"
  | "pen"
  | "image"
  | "file"
  | "barcode"
  | "badge";

const paths: Record<IconName, string> = {
  shield: "M10 2.5 3.75 5v4.5c0 3.9 2.66 7.02 6.25 8 3.59-.98 6.25-4.1 6.25-8V5L10 2.5Zm-2.5 7.75 1.75 1.75 3.25-3.5",
  search: "M9 15.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Zm8.5 2-3.9-3.9",
  card: "M2.5 5.5A1.5 1.5 0 0 1 4 4h12a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 16 16H4a1.5 1.5 0 0 1-1.5-1.5v-9Zm0 2.5h15M5.5 12.5h3",
  clipboard: "M7 3.5H5.5A1.5 1.5 0 0 0 4 5v11a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 16 16V5a1.5 1.5 0 0 0-1.5-1.5H13M7 3.5A1.5 1.5 0 0 1 8.5 2h3A1.5 1.5 0 0 1 13 3.5 1.5 1.5 0 0 1 11.5 5h-3A1.5 1.5 0 0 1 7 3.5Zm0 6h6m-6 3.5h4",
  chart: "M3 17h14M5.5 13.5v-3m4.5 3V6.5m4.5 7V9.5",
  pen: "m12.5 4.5 3 3M3 17l1-4L13.5 3.5a2.12 2.12 0 0 1 3 3L7 16l-4 1Z",
  image: "M3.5 4h13a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm-1 9 4-4 4 4 2-2 5 5M13 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z",
  file: "M11.5 2.5H6A1.5 1.5 0 0 0 4.5 4v12A1.5 1.5 0 0 0 6 17.5h8a1.5 1.5 0 0 0 1.5-1.5V6.5l-4-4Zm0 0v4h4M7.5 10.5h5m-5 3h3",
  barcode: "M3 4v12m3-12v12m2.5-12v12M12 4v12m2-12v12m3-12v12",
  badge: "m7 10 2 2 4-4m-3-5.5 1.8 1.3 2.2-.1.7 2.1 1.8 1.3-.7 2.1.7 2.1-1.8 1.3-.7 2.1-2.2-.1L10 17.5l-1.8-1.3-2.2.1-.7-2.1-1.8-1.3.7-2.1-.7-2.1 1.8-1.3.7-2.1 2.2.1L10 2.5Z",
};

export function ServiceIcon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" className={className}>
      <path d={paths[name]} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export type { IconName };
