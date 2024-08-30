import { join } from 'node:path';
import { defineConfig } from '@rsbuild/core';
import { pluginSvgSpriteLoader } from '../src';

export default defineConfig({
  plugins: [
    pluginSvgSpriteLoader({
      path: join(__dirname, 'src/icons'),
      symbolId: 'icon-[name]',
    }),
  ],
});
