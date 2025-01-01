import fs from 'fs';

const {
    contentTypes,
    editorInterfaces,
} = JSON.parse(fs.readFileSync('', 'utf-8'));

const layoutProps = [
    'borders',
    'color',
    'colorName',
    'layout',
    'layoutDimensionAttribute',
    'layoutDisplayBlockAttribute',
    'layoutDisplayFlexAttribute',
    'layoutDisplayGridAttribute',
    'layoutDisplayHidden',
    'layoutItemFlexAttribute',
    'layoutItemGrid',
    'layoutMarginAttribute',
    'layoutPaddingAttribute',
    'layoutPositionAttribute',
    'layoutPositionOrientationAttribute',
    'measurementBreakPoints',
    'measurementsRelative',
    'measurementsStatic',
    'stylesBoxShadow',
    'stylesOverflow',
];

const layoutModel = contentTypes.filter(({
    sys: {
        id,
    } = {},
} = {}) => layoutProps.includes(id)).sort(({
    sys: {
        id: aid,
    } = {},
} = {}, {
    sys: {
        id: bid,
    } = {},
}) => {
    if (aid < bid) return -1;

    if (aid > bid) return 1;

    return 0;
});

const layoutModelInterfaces = editorInterfaces.filter(({
    sys: {
        contentType: {
            sys: {
                id,
            } = {},
        } = {},
    } = {},
} = {}) => layoutProps.includes(id)).sort(({
    sys: {
        contentType: {
            sys: {
                id: aid,
            } = {},
        } = {},
    } = {},
} = {}, {
    sys: {
        contentType: {
            sys: {
                id: bid,
            } = {},
        } = {},
    } = {},
} = {}) => {
    if (aid < bid) return -1;

    if (aid > bid) return 1;

    return 0;
});

const exportLayout = {
    contentTypes: layoutModel,
    editorInterfaces: layoutModelInterfaces,
};

if (
    (layoutModel.length === layoutProps.length) &&
    (layoutModelInterfaces.length === layoutProps.length)) {
    fs.writeFileSync('support/contentful-layout-contentypes_editorinterfaces.json', JSON.stringify(exportLayout, null, 2), 'utf-8');
} else {
    console.error('Not valid');
    console.log({
        lml: layoutModel.length,
        eIl: layoutModelInterfaces.length,
        lpl: layoutProps.length,
    });
}
