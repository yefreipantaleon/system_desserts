import type { ProductFormValues } from "../schemas/productSchema";

export interface ProductFormProps {
  defaultValues?: ProductFormValues;
  submitLabel: string;
  isSubmitting: boolean;
  onSubmit: (values: ProductFormValues) => void;
  onCancel: () => void;
}