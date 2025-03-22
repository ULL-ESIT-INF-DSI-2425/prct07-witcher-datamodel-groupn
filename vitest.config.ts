import { defineConfig } from "vitest/config";

/**
 * Configuración para hacer pruebas
 */
export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["./tests/setup.ts"], // Archivo de configuración para pruebas
    env: {
      NODE_ENV: "test",
    },
  },
});