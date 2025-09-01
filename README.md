# Layouts from Contentful model
![ComplexLayout](https://github.com/user-attachments/assets/e9a67bc5-8342-4f19-aa97-57b9668eaee0)

The above illustrates the benefit of making layout content. One main container containing an arrangement of other containers and atomic components are used to construct this whole layout. Where practical, this pattern should be used. Any box-model settings apply only to the direct descendants of the container, and therefore be conscientious of depth when constructing new page layoutouts.'

## layoutConfigs.js
This reads the layout config of the parent into the system, and standardizes to tailwind utility classes. 

## use
```js
import layoutConfig from 'contentful-layout';

layoutConfig(layout);

// returns a string of tailwind utility classes flex flex-col items-center justify-center....
```
Existing Concepts:
* Apply Color: **fully implemented and configurable**
  * https://tailwindcss.com/docs/background-color
  * https://tailwindcss.com/docs/text-color
  * https://tailwindcss.com/docs/fill
  * https://tailwindcss.com/docs/stroke
  * https://tailwindcss.com/docs/text-decoration-color
  * https://tailwindcss.com/docs/border-color
  * https://tailwindcss.com/docs/outline-color
  * https://tailwindcss.com/docs/box-shadow-color
  * https://tailwindcss.com/docs/ring-color
  * https://tailwindcss.com/docs/accent-color
* border: **partially implemented** - supports width, radius, and directional borders
  * https://tailwindcss.com/docs/border-width
  * https://tailwindcss.com/docs/border-color
  * https://tailwindcss.com/docs/border-radius
* boxShadow: **limited implementation** - needs full configuration support
* itemAttributes: fully implemented and configurable for flex-items
  * https://tailwindcss.com/docs/align-self
  * https://tailwindcss.com/docs/justify-self
  * https://tailwindcss.com/docs/flex-grow
  * https://tailwindcss.com/docs/flex-shrink
  * https://tailwindcss.com/docs/order
* layoutFlow: fully implemented (grid only partial) and configurable
  * https://tailwindcss.com/docs/display
  * https://tailwindcss.com/docs/flex
* layoutPosition: fully implemented and configurable
  * https://tailwindcss.com/docs/position
  * https://tailwindcss.com/docs/top-right-bottom-left
  * https://tailwindcss.com/docs/z-index
* whitespace: margin & padding fully implemented and configurable.
  * https://tailwindcss.com/docs/margin
  * https://tailwindcss.com/docs/padding
* overflow: **limited implementation** - needs configuration support
  * https://tailwindcss.com/docs/overflow
  * https://tailwindcss.com/docs/overscroll-behavior
* dimensions: fully implemented and configurable.
  * https://tailwindcss.com/docs/width
  * https://tailwindcss.com/docs/min-width
  * https://tailwindcss.com/docs/max-width
  * https://tailwindcss.com/docs/height
  * https://tailwindcss.com/docs/min-height
  * https://tailwindcss.com/docs/max-height
  * https://tailwindcss.com/docs/basis

## Upgraded patterns for all breakpoints:

### Dimension:
`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:[w, min-w, max-w, h, min-h, max-h, basis]-[static, relative]`

### White Space
####  Padding:
`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:[p, pt, pr, pb, pl, px, py]-[static]`

####  Margin:
`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:[m, mt, nr, mb, ml, mx, my]-[static]`

### Position
`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:[relative, absolute, sticky, fixed]`

`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:[top, right, bottom, left]-[static,relative]`

`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:z-[0,10,20,30,40,50,60,70,80,90]`

### Colors: **fully implemented and configurable**
`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:[bg, text, fill, decoration, border, outline, shadow, ring, accent, stroke]-[family]-[shade]`
`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:[bg, text, fill, decoration, border, outline, shadow, ring, accent, stroke]-[family]` (when no shade)
**With optional opacity:** `[prefix]-[family]-[shade]/[opacity]`

**Examples:**
- `bg-blue-500` (background blue 500)
- `text-red-700` (text red 700) 
- `border-gray` (border gray, no shade)
- `ring-purple-400/50` (purple ring with opacity)

### Display:
`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:[flex, grid, block...,]`
`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:[relatedAttrs...]`

### Item:
`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:[self-[auto,start,end,center,stretch,baseline], justify-self-[auto,start,end,center,stretch]]`

### Border: **partially implemented**
**Supported:**
`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:[border, border-x, border-y, border-t, border-r, border-b, border-l]-[width]`
`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:[rounded, rounded-t, rounded-r, rounded-b, rounded-l, rounded-tl, rounded-tr, rounded-bl, rounded-br]-[radius]`

**Not supported:** border-style, outline, ring, divide utilities

### Shadow: **needs expansion**
`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:[shadow]-[size]`
`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:[shadow]-[color]`

### Overflow: **needs implementation**
`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:[overflow, overflow-x, overflow-y]-[visible, hidden, scroll, auto]`

## Importable Layout Model for Contentful
### Model Data:
`support/contentful-layout-contentypes_editorinterfaces.json`
### Contentful Models for import, just enter in your SpaceId and Token
`support/import-contentModel-layout.json`
