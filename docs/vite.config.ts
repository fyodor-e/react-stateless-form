import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mdx from "@mdx-js/rollup";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        /* jsxImportSource: …, otherOptions… */
      }),
    },
    react({
      jsxImportSource: "@emotion/react",
      // include: /\.(jsx|js|mdx|md|tsx|ts)$/,
    }),
  ],
  optimizeDeps: {
    include: ["react-flexible-form"],
  },
  base: "/react-flexible-form/",
});
