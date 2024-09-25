# Layouts from Contentful model
![ComplexLayout](https://github.com/user-attachments/assets/9640ed70-a53e-4ada-8702-7ff0abe56a7f)


The above illustrates the benefit of making layout content. One main container containing an arrangement of other containers and atomic components are used to construct this whole layout. Where practical, this pattern should be used. Any box-model settings apply only to the direct descendants of the container, and therefore be conscientious of depth when constructing new page layoutouts.

## layoutConfigs.js
This reads the layout config from the page component fields being read into the system, and standardizes the config to be handed off to a specific mapper. In this case layoutConfigMapper-TailWind, but techincally any similar system could be used.

## layoutConfigMapper-TailWind.js
This receives the layoutConfig from layoutConfigs.js, and maps it to a string that is the css class declaration to be applied to the current component (container or atomic component).

## Importable Layout Model for Contentful
[Contentful Layout Models JSON](https://github.com/user-attachments/files/16397475/contentful-export_layoutModel_2024-06.json)
