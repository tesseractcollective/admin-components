import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import css from 'rollup-plugin-css-porter'
import copy from 'rollup-plugin-copy'
import { createTransform } from 'rollup-copy-transform-css'
// import sassPlugin from 'rollup-plugin-scss'
// import postcsss from 'postcss'
// import autoprefixer from 'autoprefixer'
// import bundleScss from 'rollup-plugin-bundle-scss'
// import path from 'path'

import packageJson from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        inlineDynamicImports: true
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        inlineDynamicImports: true
      }
    ],
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({
        // inject(cssVariableName) {
        //   return `import styleInject from 'style-inject';\nstyleInject(${cssVariableName});`
        // }
      }),
      commonjs(),
      copy({
        targets: [
          {
            src: ['src/styles/main.css', 'src/styles/theme.css', 'src/styles/index.css'],
            dest: 'dist/styles',
            transform: createTransform({ minify: true })
          }
        ]
      }),
      nodeResolve(),
      json(),
      terser()
    ],
    external: [...Object.keys(packageJson.dependencies), 'style-inject']
  }
]
// {
//   failOnError: true,
//   output: 'dist/styles/index.scss',
//   exclude: /node_modules/,
//   includePaths: [
//     './src/styles/index.css',
//     './src/styles/theme.css',
//     './node_modules/primeicons/primeicons.css',
//     './node_modules/primereact/resources/primereact.min.css'
//   ]
// }
