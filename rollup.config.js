import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import copy from 'rollup-plugin-copy'
import { createTransform } from 'rollup-copy-transform-css'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

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
      peerDepsExternal(),
      postcss(),
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
    external: Object.keys(packageJson.dependencies)
  },
  {
    input: 'dist/esm/index.js',
    output: [{ file: 'dist/types/index.d.ts', format: 'esm', inlineDynamicImports: true }],
    plugins: [typescript({ outDir: 'dist/types' })]
  }
]
