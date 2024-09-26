# Layouts from Contentful model
![ComplexLayout](https://raw.githubusercontent.com/augurone/contenful-layout/refs/heads/main/LayoutContainerExample.png)


The above illustrates the benefit of making layout content. One main container containing an arrangement of other containers and atomic components are used to construct this whole layout. Where practical, this pattern should be used. Any box-model settings apply only to the direct descendants of the container, and therefore be conscientious of depth when constructing new page layoutouts.

## layoutConfigs.js
This reads the layout config from a contentful component, and standardizes the config to be handed off to a specific mapper. In this case layoutConfigMapper-TailWind, but techincally any similar system could be used.

## layoutConfigMapper-TailWind.js
This receives the layoutConfig from layoutConfigs.js, and maps it to a string that is the css class declaration to be applied to the current component (container or atomic component).

## Importable Layout Model for Contentful
- contentful-export_layoutModel_2024-06.json: an export from the contentful CLI
  - [Contentful Layout Models JSON](https://github.com/augurone/contenful-layout/blob/main/contentful-layout-contentype_editorinterfaces.json)
  - `contentful space export --config ./migration-configs/export-contentModel-layout.json`
- Setting up CLI, and importing the layout Model
  - npm install -g contentful-cli
  - `contentful space import --config ./import-contentModel-layout.json`
    - This has will import all the models and editor configs for the layout model. 
