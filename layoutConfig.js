import layoutConfigMapperTailWind from './layoutConfigMapper-TailWind';

/*
 * To be deprecated
 * This is the name of the "content model"
 * Contentful is awesome in that if something does not have a value it does not send it.
 * This assures that no necessary items get missed, if a user has not published an item
 it can exist w/o a "title" and we miss the attribute we are looking for.
 * considering moving the label to this anyway, but the model is reliable,
 and the item cannot be published without a title.
*/
const getLabelFromSysMetaData = ({
    contentType: {
        sys: {
            id,
        } = {},
    } = {},
} = {}) => {
    if (!id) return '';

    const firstChar = id.charAt(6).toLowerCase();
    const appendage = id.slice(7);

    return `${firstChar}${appendage}`;
};
/*
    Main Actor here
*/
const layoutConfig = ({ fields = {} } = {}) => {
    if (!Object.keys(fields).length) return '';

    const layoutRawConfig = Object.entries(fields);

    const buildConfig = layoutRawConfig.reduce((
        styleConfig,
        [
            layoutTreeItemLabel,
            entry = {},
        ] = [],
    ) => {
        // This covers all cases in the model where only one config is allowed
        // layoutFlow, layoutPosition, layoutItem
        const {
            // This is the legacy pattern, and will be deprecated.
            fields: layoutTreeItemFields,
            sys = {},
        } = entry;

        const appliedLabel = layoutTreeItemLabel || getLabelFromSysMetaData(sys);

        // There has to be a label to build the config
        if (!appliedLabel) return styleConfig;

        if (layoutTreeItemFields) {
            return {
                ...styleConfig,
                [appliedLabel]: layoutTreeItemFields,
            };
        }

        // This covers all cases in the model where more than one entry is allowed
        // padding, margin, dimensions, position, background color...
        if (Array.isArray(entry) && entry.length) {
            const dimensionMap = entry.map(({
                fields: {
                    breakpointPrefix: { fields: { value: breakpointPrefix = '' } = {} } = {},
                    valuePrefix = '',
                    valueSuffix: { fields: { value: valueSuffix = '' } = {} } = {},
                    ...otherProps
                } = {},
            } = {}) => ({
                ...(breakpointPrefix && { breakpointPrefix }),
                ...(valuePrefix && { valuePrefix }),
                ...(valueSuffix && { valueSuffix }),
                ...(Object.entries(otherProps) && otherProps),
            }));

            return {
                ...styleConfig,
                [appliedLabel]: dimensionMap,
            };
        }

        // Currently, anything that is not an Object or an Array is extraneous
        // return turn accumluator as is.
        return styleConfig;
    }, {});

    return layoutConfigMapperTailWind(buildConfig);
};


export default layoutConfig;
