import type { ReactNode } from "react";

export interface StateMessageProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
}