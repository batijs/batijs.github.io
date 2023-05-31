export interface Definition {
  disabled?: boolean;
  label: string;
  features: Feature[];
}

export interface Feature {
  label: string;
  value?: string;
  selected?: boolean;
  disabled?: boolean;
}
