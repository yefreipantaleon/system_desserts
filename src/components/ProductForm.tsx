import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCategories } from "../hooks/useProductsQueries";
import { productSchema, type ProductFormValues } from "../schemas/productSchema";
import type { ProductFormProps } from "../interfaces/ProductFormProps";
import type { FieldProps } from "../interfaces/FieldProps";

function Field({ label, htmlFor, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-[#26160e]">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs font-medium text-[#b84214]">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-[#e3d6ca] bg-white px-4 py-2.5 text-sm text-[#26160e] outline-none transition-colors placeholder:text-[#a8958a] focus:border-[#b84214]";

export default function ProductForm({ defaultValues, submitLabel, isSubmitting, onSubmit, onCancel }: ProductFormProps) {
  const { data: categories, isPending: loadingCategories } = useCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <Field label="Nombre" htmlFor="name" error={errors.name?.message}>
        <input id="name" type="text" placeholder="Ej: Cheesecake de frutos rojos" className={inputClass} {...register("name")} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Categoría" htmlFor="categoryId" error={errors.categoryId?.message}>
          <select
            id="categoryId"
            disabled={loadingCategories}
            className={inputClass}
            {...register("categoryId", { valueAsNumber: true })}
          >
            <option value="">{loadingCategories ? "Cargando..." : "Selecciona una categoría"}</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Precio (USD)" htmlFor="price" error={errors.price?.message}>
          <input
            id="price"
            type="number"
            step="0.01"
            placeholder="0.00"
            className={inputClass}
            {...register("price", { valueAsNumber: true })}
          />
        </Field>
      </div>

      <Field label="Imagen (ruta o URL)" htmlFor="image" error={errors.image?.message}>
        <input id="image" type="text" placeholder="/images/waffle.jpg" className={inputClass} {...register("image")} />
      </Field>

      <Field label="Descripción" htmlFor="description" error={errors.description?.message}>
        <textarea id="description" rows={4} placeholder="Cuenta de qué está hecho el postre..." className={inputClass} {...register("description")} />
      </Field>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="cursor-pointer rounded-full border border-[#e3d6ca] bg-white px-6 py-2.5 text-sm font-semibold text-[#26160e] transition-colors hover:border-[#b84214] hover:text-[#b84214] disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer rounded-full bg-[#b84214] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#9a3610] disabled:opacity-60"
        >
          {isSubmitting ? "Guardando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}