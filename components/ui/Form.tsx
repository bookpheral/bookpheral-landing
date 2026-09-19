import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "./cn";

/*
  Form primitives. Server-safe (no hooks) — interactive forms compose them.
  Inputs are 48px tall with a 16px font so iOS doesn't zoom on focus.
*/

export const controlClasses =
  "w-full rounded-input border border-ink-200 bg-white px-4 font-switzer text-body text-ink-950 shadow-[0_1px_2px_rgb(11_16_32/0.04)] " +
  "placeholder:text-ink-400 transition-[border-color,box-shadow] duration-200 ease-out-quint " +
  "hover:border-ink-300 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10 " +
  "aria-[invalid=true]:border-error-600 aria-[invalid=true]:focus:ring-error-600/10 " +
  "disabled:cursor-not-allowed disabled:bg-ink-50 disabled:text-ink-500";

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
};

export function Field({ id, label, hint, optional, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-small font-medium text-ink-950">
        {label}
        {optional && <span className="text-small font-normal text-ink-400">Optional</span>}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="text-small text-ink-500">
          {hint}
        </p>
      )}
    </div>
  );
}

export function Input({ className, ...props }: ComponentPropsWithoutRef<"input">) {
  return <input className={cn(controlClasses, "h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentPropsWithoutRef<"textarea">) {
  return <textarea className={cn(controlClasses, "min-h-32 resize-y py-3 leading-relaxed", className)} {...props} />;
}

export function Select({ className, children, ...props }: ComponentPropsWithoutRef<"select">) {
  return (
    <div className="relative">
      <select className={cn(controlClasses, "h-12 cursor-pointer appearance-none pr-11", className)} {...props}>
        {children}
      </select>
      <svg
        aria-hidden
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-500"
      >
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

type SegmentedProps = {
  name: string;
  legend: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
};

/** Radio group rendered as a segmented pill control. Native radios keep keyboard + SR support. */
export function Segmented({ name, legend, options, value, onChange }: SegmentedProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-small font-medium text-ink-950">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const id = `${name}-${option}`;
          const checked = value === option;
          return (
            <div key={option}>
              <input
                type="radio"
                id={id}
                name={name}
                value={option}
                checked={checked}
                onChange={() => onChange(option)}
                className="peer sr-only"
              />
              <label
                htmlFor={id}
                className={cn(
                  "inline-flex h-10 cursor-pointer select-none items-center rounded-full px-4 text-small font-medium ring-1 ring-inset transition-[background-color,color,box-shadow] duration-200 ease-out-quint",
                  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-500",
                  checked
                    ? "bg-primary-500 text-white ring-primary-500 shadow-soft"
                    : "bg-white text-ink-700 ring-ink-200 hover:bg-ink-50 hover:ring-ink-300",
                )}
              >
                {option}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

type CheckboxProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
};

export function Checkbox({ id, checked, onChange, children }: CheckboxProps) {
  return (
    <label htmlFor={id} className="group flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md ring-1 ring-inset transition-colors duration-200",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-500",
          checked ? "bg-primary-500 ring-primary-500" : "bg-white ring-ink-300 group-hover:ring-ink-400",
        )}
      >
        <svg
          width="12"
          height="9"
          viewBox="0 0 14 10"
          fill="none"
          className={cn("transition-[opacity,transform] duration-200 ease-out-quint", checked ? "scale-100 opacity-100" : "scale-50 opacity-0")}
        >
          <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-body text-ink-700">{children}</span>
    </label>
  );
}

type AlertProps = {
  tone?: "error" | "success" | "info";
  children: ReactNode;
  className?: string;
};

export function Alert({ tone = "error", children, className }: AlertProps) {
  const tones = {
    error: "bg-error-50 text-error-600 ring-error-600/20",
    success: "bg-success-50 text-success-600 ring-success-600/20",
    info: "bg-info-50 text-info-600 ring-info-600/20",
  };
  return (
    <p role={tone === "error" ? "alert" : "status"} className={cn("rounded-input px-4 py-3 text-small ring-1 ring-inset", tones[tone], className)}>
      {children}
    </p>
  );
}

/** Small inline spinner for submit buttons. */
export function Spinner() {
  return (
    <svg aria-hidden className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  );
}
