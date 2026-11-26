import { isAxiosError } from "axios";

export function getErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError(error)) {
    if (!error.response) return "No hay conexión con la API. Verifica que esté corriendo.";
    if (error.response.status === 404) return "El recurso solicitado no existe.";
  }
  return fallback;
}