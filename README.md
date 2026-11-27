# Taller de Repostería — Sistema de Gestión y Catálogo de Postres

Aplicación web desarrollada con **React 19, TypeScript y Vite** para la gestión integral de un catálogo de postres (CRUD completo, búsqueda en tiempo real, filtrado por categorías y paginación del lado del servidor) junto con un **carrito de compras persistente**.

---

## Tecnologías Utilizadas

- **Core:** React 19, TypeScript, Vite
- **Estilos:** Framework Tailwind CSS
- **Enrutamiento:** React Router DOM
- **Estado del Servidor y Caché:** TanStack Query + Axios
- **Estado Global (Cliente):** Zustand (con persistencia en localStorage)
- **Formularios y Validación:** React Hook Form + Zod (@hookform/resolvers)
- **Backend Mock (API REST):** json-server@1.0.0-beta.15

---

## Instalación

1. **Clonar el repositorio e ingresar al proyecto:**
   
   ```
   git clone "URL-REPOSITORIO"
   cd system_desserts
   ```

2. **Instalar las dependencias:**
   
   ```
   npm install
   ```

3. **Configurar variables de entorno**

   ```
   VITE_API_URL= http://localhost:3000
   VITE_API_DELAY=1200
   ```

---

## Scripts Disponibles

En el archivo `package.json` se encuentran configurados los siguientes comandos:

| Script | Comando | Descripción |
| :--- | :--- | :--- |
| npm run dev | vite | Inicia el servidor de desarrollo local con recarga rápida (HMR). |
| npm run build | tsc -b && vite build | Verifica el tipado estricto de TypeScript y genera la build de producción en dist/. |
| npm run preview | vite preview | Previsualiza localmente la versión compilada para producción. |
| npm run lint | oxlint | Ejecuta el linter para detectar errores de sintaxis y mantener buenas prácticas. |

---

## Cómo Ejecutar el Proyecto

Para ejecutar el sistema completo de forma local, abre dos terminales en la raíz del proyecto:

1. Terminal 1 — Levantar la API Mock
   
   ```
   npx json-server db.json --port 3000
   ```

2. Terminal 2 — Levantar el Frontend
   
   ```
   npm run dev
   ```

---

# Arquitectura

El proyecto sigue una arquitectura modular basada en separación de responsabilidades, aislando la interfaz de usuario, el acceso a datos, el estado global, las interfaces de TypeScript y las reglas de validación:

```
system_desserts/
├── public/
│   └── images/                  
├── src/
│   ├── components/              
│   │   ├── CartDrawer.tsx
│   │   ├── CartIcon.tsx
│   │   ├── CategoryBadge.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── ConfirmDialog.tsx
│   │   ├── ConfirmOrderModal.tsx
│   │   ├── Header.tsx
│   │   ├── Pagination.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductCardSkeleton.tsx
│   │   ├── ProductForm.tsx
│   │   ├── QuantityStepper.tsx
│   │   ├── SearchBar.tsx
│   │   └── StateMessage.tsx
│   ├── hooks/                   
│   │   ├── useProductsQueries.ts
│   │   └── useProductsMutations.ts
│   ├── interfaces/              
│   │   ├── cart.ts
│   │   ├── CartStateProps.ts
│   │   ├── category.ts
│   │   ├── ConfirmDialogProps.ts
│   │   ├── FieldProps.ts
│   │   ├── NotFoundPageProps.ts
│   │   ├── product.ts
│   │   ├── ProductFormProps.ts
│   │   └── StateMessageProps.ts
│   ├── pages/                   
│   │   ├── HomePage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── ProductCreatePage.tsx
│   │   ├── ProductEditPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── rutas/                   
│   │   └── AppRoutes.tsx
│   ├── schemas/                 
│   │   └── productSchema.ts
│   ├── services/                
│   │   ├── categoryService.ts
│   │   ├── clientService.ts
│   │   ├── errorsService.ts
│   │   └── productService.ts
│   ├── stores/                  
│   │   └── cartStore.ts
│   ├── App.tsx                  
│   └── main.tsx                 
└── db.json                                    
```

---

## Decisiones Técnicas

* **Separación entre Estado del Servidor y Estado del Cliente:**
  * **TanStack Query** gestiona todo el estado asíncrono proveniente de la API (caché, revalidación automática tras mutaciones con `invalidateQueries`, estados `isPending`/`isError` y paginación).

  * **Zustand** administra exclusivamente el estado global del cliente (**carrito de compras**), empleando el middleware `persist` para sincronizar automáticamente los productos seleccionados con `localStorage`.

* **Cliente HTTP Centralizado (`client.ts`):** Se creó una instancia única de **Axios** con `baseURL` configurable mediante variables de entorno y un interceptor de respuesta (`API_DELAY`) que simula latencia en peticiones `GET` para validar *Skeletons* y estados de carga.

* **Validación Declarativa como Fuente Única de Verdad:** Se integró **React Hook Form** con **Zod** (`zodResolver`), infiriendo los tipos de TypeScript directamente desde el esquema (`z.infer<typeof productSchema>`) para evitar duplicidad de tipos y garantizar datos válidos antes de enviar peticiones `POST` o `PUT`.

* **Reutilización de Formularios (`ProductForm`):** Tanto `ProductCreatePage` como `ProductEditPage` comparten el mismo componente de formulario, recibiendo `defaultValues`, `submitLabel` y `onSubmit` mediante props.

* **Flujo de Git y Convención de Commits:** Desarrollo incremental por ramas (`nivel-1`, `nivel-2`, `nivel-3`) aplicando **Commits** con **Gitmojis** (`✨ feat`, `🐛 fix`, `💄 style`, `♻️ refactor`, `📝 docs`, `🚀 deploy`, `🧪 test`, `⚡ perf`).

---

## Funcionamiento de la API

El backend mock se ejecuta con `json-server@1.0.0-beta.15` leyendo `db.json` y expone los recursos `/products` y `/categories`.

---

### Endpoints Principales

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/products?_page=1&_per_page=8` | Obtiene el listado paginado de postres (retorna metadatos como data, pages, items, next y prev). |
| `GET` | `/products/:id` | Consulta el detalle de un producto específico por su ID. |
| `POST` | `/products` | Registra un nuevo postre en db.json. |
| `PUT` | `/products/:id` | Actualiza la información de un postre existente. |
| `DELETE` | `/products/:id` | Elimina un postre por su ID. |
| `GET` | `/categories` | Lista todas las categorías disponibles para los filtros y el selector del formulario. |

---

### Flujo de Comunicación en el Frontend

- **Servicios (`productService.ts` / `categoryService.ts`):** Ejecutan las peticiones HTTP utilizando la instancia `api` de `client.ts` y normalizan la respuesta paginada de `json-server v1`.

- **Normalización de Errores (`errors.ts`):** Traduce errores técnicos de Axios o códigos de estado HTTP en mensajes claros para la interfaz.

- **Hooks (`useProductsQueries` / `useProductsMutations`):** Encapsulan las consultas (`useQuery`) y mutaciones (`useMutation`); tras crear, editar o eliminar un postre, invalidan la caché de `["products"]` para actualizar la lista automáticamente sin recargar la página.
