import { defineConfig } from "vite";
import path from "path";
// import { envDtsGen } from '@liuli-util/vite-plugin-env-dts-gen'
import rollupTs from 'rollup-plugin-typescript2';
const packageJson = require("./package.json");

import { ViteMinifyPlugin } from 'vite-plugin-minify'
const getPackageName = () => {
  return packageJson.name;
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
  //  envDtsGen()
  ViteMinifyPlugin({}),
  ],
  resolve: {
      alias: {
        '@/': new URL('./src/', import.meta.url).pathname,
      },
      extensions: [
        '.cjs',
        '.mjs',
        '.js',
        '.mts',
        '.ts',
        '.jsx',
        '.tsx',
        '.json',
      ],
    },
  
  optimizeDeps: {
    include: ["esm-dep > cjs-dep","linked-dep"],
  },
  build: {
    target: "esnext",
   // minify:false,
  
    commonjsOptions: {
      include: [/linked-dep/, /node_modules/],
    },
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: getPackageName(),
      formats: ['es','cjs', 'iife', 'umd'],
      fileName: function (format) {
        return `${getPackageName()}.`.concat(format, ".js");
      },
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["@ionic/core/dist/types/components"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        // format:'umd',
        inlineDynamicImports: true,
        globals: {},
      },
    },
    
  },
});
