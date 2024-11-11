import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { RsbuildPlugin } from '@rsbuild/core';

export type SvgSpriteLoaderOptions = {
  path: string;
  // default: icon-[name]
  symbolId?: string;
};

// 正则表达式定义
const svgTitle = /<svg([^>]*)>/;
const clearHeightWidth = /(width|height)="([^"]*)"/g;
const hasViewBox = /viewBox="[^"]*"/;
const clearReturn = /[\r\n]/g;

// 查找并处理 SVG 文件
function svgFind(directoryPath: string, idPrefix: string): string[] {
  const svgs: string[] = [];
  const directs = readdirSync(directoryPath, { withFileTypes: true });

  for (const dirent of directs) {
    if (dirent.isDirectory()) {
      svgs.push(...svgFind(join(directoryPath, dirent.name, '/'), idPrefix));
    } else if (dirent.name.endsWith('.svg')) {
      const svgContent = readFileSync(join(directoryPath, dirent.name), 'utf-8')
        .replace(clearReturn, '')
        .replace(svgTitle, ($1, $2: string) => {
          let width = 0;
          let height = 0;
          let content = $2.replace(
            clearHeightWidth,
            (match: string, prop: string, value: number) => {
              if (prop === 'width') width = value;
              else if (prop === 'height') height = value;
              return ''; // 移除匹配的宽度和高度属性
            },
          );

          // 添加 viewBox 属性，如果不存在
          if (!hasViewBox.test(content)) {
            content += `viewBox="0 0 ${width} ${height}"`;
          }

          const name = idPrefix.replace(
            '[name]',
            dirent.name.replace('.svg', ''),
          );
          return `<symbol id="${name}" ${content}>`;
        })
        .replace('</svg>', '</symbol>')
        .replace('prefix_', () => {
          return idPrefix.replace('[name]', dirent.name.replace('.svg', ''));
        });

      svgs.push(svgContent);
    }
  }

  return svgs;
}

// 创建 SVG 字符串
function createSvg(path: string, prefix: string): string {
  if (path === '') return '';

  const res = svgFind(path, prefix);
  return res.join('');
}

export const pluginSvgSpriteLoader = (
  options: SvgSpriteLoaderOptions,
): RsbuildPlugin => ({
  name: 'plugin-svg-sprite-loader',

  setup(api) {
    const str = createSvg(options.path, options.symbolId || 'icon-[name]');
    api.modifyHTMLTags(({ headTags, bodyTags }) => {
      bodyTags.unshift({
        tag: 'svg',
        attrs: {
          xmlns: 'http://www.w3.org/2000/svg',
          'xmlns:xlink': 'http://www.w3.org/1999/xlink',
          style: 'position: absolute; width: 0; height: 0',
        },
        children: str,
      });

      return { headTags, bodyTags };
    });
  },
});
