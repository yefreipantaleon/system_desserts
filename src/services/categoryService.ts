import { api } from "./clientService";
import type { Category } from "../interfaces/category";

export async function getCategories(){
  const { data } = await api.get<Category[]>("/categories");
  return data;
}