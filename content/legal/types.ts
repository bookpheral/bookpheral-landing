export type LegalBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  /** Lettered list — rendered as a., b., c. */
  | { type: "ol"; items: string[] }
  /** Bookpheral contact details, rendered from site config. */
  | { type: "contact"; channels: ("general" | "support")[] };
