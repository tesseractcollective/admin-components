import { resolve } from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig(function (_a) {
    var command = _a.command, mode = _a.mode, ssrBuild = _a.ssrBuild;
    if (command === "serve") {
        return {
            plugins: [react()],
            root: "src/example",
            server: {
                port: 3000
            }
        };
    }
    else {
        // command === 'build'
        return {
            plugins: [react(), tsconfigPaths()],
            // Library mode: https://vitejs.dev/guide/build.html#library-mode
            build: {
                lib: {
                    entry: resolve(__dirname, "src/lib/index"),
                    name: "admin-components",
                    // the proper extensions will be added
                    fileName: "admin-components"
                },
                sourcemap: "inline",
                emptyOutDir: true
            }
        };
    }
});
