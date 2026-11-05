/** Shared types for the Apollo Physicians site. */

export interface PhoneNumber {
  label: string;
  /** Printed form, e.g. "916-236-5800". */
  display: string;
  /** E.164 value used for tel: links, e.g. "+19162365800". */
  tel: string;
}

export interface PostalAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface NavLink {
  label: string;
  href: string;
  /** Opens in a new tab. */
  external?: boolean;
  /** Extra text for screen readers when the visible label is not enough. */
  description?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  items: readonly NavLink[];
}

export interface FaqItem {
  question: string;
  answer: string;
}
