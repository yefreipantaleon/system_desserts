import type { Product } from "../types/product";

const img = (slug: string) => `/images/${slug}.jpg`;

export const products: Product[] = [
  { id: 1, name: "Waffle with Berries", category: "Waffle", price: 6.5, image: img("waffle") },
  { id: 2, name: "Vanilla Bean Creme Brulee", category: "Creme Brulee", price: 7, image: img("creme-brulee") },
  { id: 3, name: "Macaron Mix of Five", category: "Macaron", price: 8, image: img("macaron") },
  { id: 4, name: "Classic Tiramisu", category: "Tiramisu", price: 5.5, image: img("tiramisu") },
  { id: 5, name: "Pistachio Baklava", category: "Baklava", price: 4, image: img("baklava") },
  { id: 6, name: "Lemon Meringue Pie", category: "Pie", price: 5, image: img("meringue") },
  { id: 7, name: "Red Velvet Cake", category: "Cake", price: 4.5, image: img("cake") },
  { id: 8, name: "Salted Caramel Brownie", category: "Brownie", price: 5.5, image: img("brownie") },
  { id: 9, name: "Vanilla Panna Cotta", category: "Panna Cotta", price: 6.5, image: img("panna-cotta") },
];