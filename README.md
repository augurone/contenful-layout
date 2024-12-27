# Layouts from Contentful model
![ComplexLayout](https://github.com/user-attachments/assets/6b6b8cda-d3c1-43b3-a0bc-aaa024c7452f)


The above illustrates the benefit of making layout content. One main container containing an arrangement of other containers and atomic components are used to construct this whole layout. Where practical, this pattern should be used. Any box-model settings apply only to the direct descendants of the container, and therefore be conscientious of depth when constructing new page layoutouts.'

## use
```js
import { layoutConfig } from 'contentful-layout';

layoutConfig(layout);

// returns a string of tailwind utility classes flex flex-col items-center justify-center....
```


## layoutConfigs.js
This reads the layout config from the page component fields being read into the system, and standardizes the config to be handed off to a specific mapper. In this case layoutConfigMapper-TailWind, but techincally any similar system could be used.

## layoutConfigMapper-TailWind.js
This receives the layoutConfig from layoutConfigs.js, and maps it to a string that is the css class declaration to be applied to the current component (container or atomic component).

Existing Concepts:
* backgroundColor: 
* border: default only
* boxShadow: default only
* itemAttributes: 
* layoutFlow: fully implemented (grid only partial) and configurable
  * https://tailwindcss.com/docs/display
  * https://tailwindcss.com/docs/flex

* layoutPosition: fully implemented and configurable
  * https://tailwindcss.com/docs/position
  * https://tailwindcss.com/docs/top-right-bottom-left
  * https://tailwindcss.com/docs/z-index
* margin: fully implemented and configurable.
  * https://tailwindcss.com/docs/margin
* overflow: default only
* padding: fully implemented and configurable.
  * https://tailwindcss.com/docs/padding
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

### Padding:
`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:[p, pt, pr, pb, pl, px, py]-[static]`

### Margin:
`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:[m, mt, nr, mb, ml, mx, my]-[static]`

### Position
`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:[relative, absolute, sticky, fixed]`

`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:[top, right, bottom, left]-[static,relative]`

`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:z-[0,10,20,30,40,50,60,70,80,90]`

### Colors: (background exists in model currently now)
`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:[bg, text, fill, path]-[color]`
- Currently this idea exists for default and md. 

### Display:
`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:[flex, grid, block...,]`
`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:[relatedAttrs...]`

### Item:
`[xxs, xs, default, md, lg, xl, 2xl, 3xl]:[self-[auto,start,end,center,stretch,baseline], justify-self-[auto,start,end,center,stretch]]`

## Importable Layout Model for Contentful
### Model Data:
`support/contentful-layout-contentypes_editorinterfaces.json`
### Contentful Models for import, just enter in your SpaceId and TOken
`support/import-contentModel-layout.json`
