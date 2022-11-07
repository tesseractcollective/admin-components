import { resolve } from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === "serve") {
    return {
      plugins: [react()],
      root: "src/example",
      server: {
        port: 3000,
      },
    };
  } else {
    // command === 'build'
    return {
      plugins: [react(), tsconfigPaths()],
      // Library mode: https://vitejs.dev/guide/build.html#library-mode
      build: {
        lib: {
          entry: resolve(__dirname, "src/lib/index"),
          name: "admin-components",
          // the proper extensions will be added
          fileName: "admin-components",
        },
        sourcemap: "inline",
        emptyOutDir: true,
        rollupOptions: {
          external: [
            "@date-io/moment",
            "@material-ui/core",
            "@material-ui/pickers",
            "graphql",
            "graphql-request",
            "moment",
            "nanoid",
            "primeicons",
            "primereact",
            "quill",
            "react",
            "react-dom",
            "react-hook-form",
            "react-router-dom",
            "react-ace",
            "react-phone-input-2",
            "react-phone-number-input",
          ],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDom",
            },
          },
        },
      },
    };
  }
});
