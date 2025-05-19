/* eslint-disable import/no-unused-modules */
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import svg from 'rollup-plugin-svg-import';
import ts from 'rollup-plugin-typescript2';
import typescript from 'typescript';

import pack from './package.json' with { type: 'json' };

const banner = `/**
 * ${pack.name}
 * ${pack.description}
 * @author ${pack.author}
 * @version ${pack.version}
 * @license
 * Copyright (c) 2025-${new Date().getFullYear()} rubinen.no
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */`;

export default [
  {
    input: 'src/main.ts',
    output: {
      format: 'es',
      sourcemap: true,
      banner,
      exports: 'named',
      dir: 'dist',
      assetFileNames: '[name][extname]'
    },
    plugins: [
      nodeResolve(),
      commonjs({
        requireReturnsDefault: true
      }),
      json(),
      svg({
        // process SVG to DOM Node or String. Default: false
        stringify: true
      }),
      postcss({
        extract: 'css/rubinen.css',
        minimize: true
      }),
      ts({
        useTsconfigDeclarationDir: true,
        sourceMap: false,
        typescript
      }),
      terser()
    ]
  }
];
