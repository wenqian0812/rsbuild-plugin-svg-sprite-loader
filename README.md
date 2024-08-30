# rsbuild-svg-sprite-loader

rsbuild-svg-sprite-loader is a Rsbuild plugin to do something.

<p>
  <a href="https://npmjs.com/package/rsbuild-svg-sprite-loader">
   <img src="https://img.shields.io/npm/v/rsbuild-svg-sprite-loader?style=flat-square&colorA=564341&colorB=EDED91" alt="npm version" />
  </a>
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="license" />
</p>

## Usage

Install:

```bash
npm add rsbuild-svg-sprite-loader -D
```

Add plugin to your `rsbuild.config.ts`:

```ts
// rsbuild.config.ts
import { pluginSvgSpriteLoader } from "rsbuild-svg-sprite-loader";

export default {
  plugins: [
    pluginSvgSpriteLoader({
      path: join(__dirname, 'src/icons'),
      symbolId: 'icon-[name]',
    }),
  ],
};
```

## Options

### SvgSpriteLoaderOptions

Some description.

- path: `string`
- symbolId: `string`
- Example:

```js
pluginSvgSpriteLoader({
  path: join(__dirname, 'src/icons'),
  symbolId: 'icon-[name]',
})
```

## License

[MIT](./LICENSE).
