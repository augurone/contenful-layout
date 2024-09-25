import layoutConfigMapperTailWind from './layoutConfigMapper-TailWind';

// Each config has a "Title field" comfing from Contentful
// The name of this title field is very relative, but the value is not
export const getConfigLabel = (config = {}) => {
    // For Padding and Margin this field name indicates if the config is for Mobile, Tablet, Desktop
    // For Layout flow this field name is the display Property for the element. e.g. `displayFlex` would map to a `display: flex` classname.
    // Extract first [attrName, attrValue] pair, then the first item from that pair.
    const [[labelName = ''] = []] = Object.entries(config);

    return labelName;
};

const getConfig = (config = {}) => {
    const clone = structuredClone(config);
    const labelName = getConfigLabel(clone);

    if (labelName) {
        // removes the a:v pair from which the label is derived in order to clean up data
        delete clone[labelName];

        return {
            [labelName]: clone
        };
    }

    return {};
};

// All single configs are in an layOutGroup: {..layoutGroupAttributes },  e.g. { layoutFlow: { display: flex, ...}}
// This sets up configs with multiple entries in a similar fashion (e.g. margin & padding across break points)
const extractComplexConfig = entries => entries.reduce((subConfig, entry = {}) => {
    const { fields = {} } = entry;
    const subConfigSetUp = getConfig(fields);
    const keyValueForTest = getConfigLabel(fields);

    if (keyValueForTest && !subConfig[keyValueForTest]) {
        return {
            ...subConfig,
            ...subConfigSetUp
        };
    }
    // if boolean fails returns subConfig as it is.
    return subConfig;
}, {});

/*
 * This is the name of the "content model"
 * ContentFul is awesome in that if something does not have a value it does not send it.
 * This assures that no necessary items get missed, if a user has not published an item
 it can exist w/o a "title" and we miss the attribute we are looking for.
 * considering moving the label to this anyway, but the model is reliable,
 and the item cannot be published without a title.
*/
const getLabelFromSysMetaData = ({
    contentType: {
        sys: {
            id
        } = {}
    } = {}
} = {}) => {
    if (!id) return '';

    const firstChar = id.charAt(6).toLowerCase();
    const appendage = id.slice(7);

    return `${firstChar}${appendage}`;
};

export const layoutConfig = ({ fields = {} } = {}) => {
    if (!Object.keys(fields).length) return undefined;

    const layoutRawConfig = Object.entries(fields);
    const buildConfig = layoutRawConfig.reduce((
        styleConfig,
        [
            layoutTreeItemLabel,
            entry
        ]
    ) => {
        // This covers all cases in the model where only one config is allowed
        // layoutFlow, layoutPosition, layoutItem
        const {
            fields: layoutTreeItemFields,
            sys
        } = entry;

        const appliedLabel = layoutTreeItemLabel || getLabelFromSysMetaData(sys);

        // There has to be a label to build the config
        if (!appliedLabel) return styleConfig;

        if (layoutTreeItemFields) {
            return {
                ...styleConfig,
                [appliedLabel]: layoutTreeItemFields
            };
        }

        // This covers all cases in the model where more than one entry is allowed
        // padding, margin
        if (Array.isArray(entry) && entry.length) {
            return {
                ...styleConfig,
                [appliedLabel]: extractComplexConfig(entry)
            };
        }

        // Currently, anything that is not an Object or an Array is exraneous
        // return turn accumluator as is.
        return styleConfig;
    }, {});

    return layoutConfigMapperTailWind(buildConfig);
};
