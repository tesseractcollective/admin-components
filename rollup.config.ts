// eslint-disable import/no-extraneous-dependencies
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import external from 'rollup-plugin-peer-deps-external'
import dts from 'rollup-plugin-dts'
import scss from 'rollup-plugin-scss'
import json from '@rollup/plugin-json'
import builtinModules from 'builtin-modules'

import packageJson from './package.json'

export default [
  {
    input: 'src/Admin/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        name: packageJson.name
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      external({
        includeDependencies: true,
        packageJsonPath: './package.json'
      }),
      nodeResolve({
        preferBuiltins: true,
        moduleDirectories: ['node_modules', 'src']
      }),
      commonjs(),
      terser(),
      scss(),
      json(),
      typescript({ tsconfig: './tsconfig.json' })
    ],
    external: [...builtinModules]
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/lib/index.d.ts', format: 'esm' }],
    external: [/\.scss$/, /\.css$/],
    plugins: [dts()]
  }
]
