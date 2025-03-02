// Each config has a "Title field" comfing from Contentful
// The name of this title field is very relative, but the value is not
const getConfigLabel = (config = {}) => {
    // For Padding and Margin this field name indicates if the config is for Mobile, Tablet, Desktop
    // For Layout flow this field name is the display Property for the element.
    // e.g. `displayFlex` would
    // map to a `display: flex` classname.
    // Extract first [attrName, attrValue] pair, then the first item from that pair.
    const [[labelName = ''] = []] = Object.entries(config) || [];

    return labelName;
};
/*
    * Remanider of legacy pattern. Receives values and maps them to tailwind utility classes.
    * This was actually an evoltion of the initial pattern, I do like it. It standardized
    * on common values that sent me towards the common value models (e.g. measurements, colors),
    * And landed on the more predominant patterns starting with buildColor.
    * Will eventually refactor this and buildTWString out.
*/
const tailWindMapper = {
    boxShadow: {
        boxShadowAttributes: {
            boxShadow: val => val,
        },
    },
    overflow: {
        overflowAttributes: {
            overflow: val => `overflow-${val}`,
            overflowX: val => `overflow-x-${val}`,
            overflowY: val => `overflow-Y-${val}`,
        },
    },
};

/*
This will be refactored probably out of existence.
@returns {string}
*/
const buildTWString = (conf, twMap) => {
    if (!conf || !twMap) return '';

    const configName = getConfigLabel(conf);
    const { [configName]: tailWindConf = {} } = twMap;
    const { twValue = '' } = tailWindConf;

    if (!tailWindConf) return '';

    return Object.entries(conf).reduce((designation, [label, value]) => {
        if (!label) return designation;

        const { [value]: twVal = '' } = tailWindConf;

        if (twVal) return twVal;

        const { [label]: twAttr = '' } = tailWindConf;

        if (!twAttr) return designation;

        // Some Items Like gap, columns will return a function
        // The function accectps a value and returns a string with a prefix
        const isItAfunction = typeof twAttr === 'function';
        const applyString = !isItAfunction ? twAttr[value] : twAttr(value, conf);

        // If there is no string to add return designation as is.
        // Or if there is a designation with the same root value do not add this
        // (e.g. flex-row and flex-row are not necessary)
        if (!applyString || /`${applyString.split(':')[1]}`/.test(designation)) return designation;

        // if this is the first designation add box model class from twValue
        if (!designation.length) return twValue.length ? `${twValue} ${applyString}` : `${applyString}`;

        // Default returns designation, spaced with new value.
        return `${designation} ${applyString}`;
    }, '');
};

/*
    @param {[{}]} colors
    @param {String} prefix
    @returns {string}
*/
const buildColor = (colors = [{}]) => colors.map(({
    colorType = 'bg',
    backgroundOpacity = '',
    breakpointPrefix = '',
    color: {
        fields: {
            colorFamily = '',
            colorValue = '',
        } = {},
    } = {},
} = {}) => {
    if (!colorFamily) return 'badColorConfig';

    const colorBase = colorValue ? `${colorFamily}-${colorValue}` : colorFamily;
    const colorStr = `${colorType}-${colorBase}`;
    const colorWOpacity = backgroundOpacity ? `${colorStr}/${backgroundOpacity}` : `${colorStr}`;

    if (breakpointPrefix) {
        return `${breakpointPrefix}:${colorWOpacity}`;
    }

    return colorWOpacity;
}).join(' ');
/*
    @param {[{}]} borderProps
    @returns {string}
*/
const buildBorder = ({
    borderColor: {
        fields: {
            colorType = '',
            color: {
                fields: {
                    colorFamily = '',
                    colorValue = '',
                } = {},
            } = {},
        } = {},
    } = {},
    borderRadius = '',
    borderWidth = '',
} = {}) => [borderWidth, `rounded-${borderRadius}`, `${colorType}-${colorFamily}-${colorValue}`].join(' ').trim();
/*
    @param {[{}]} flowConfigs
    @returns {string}
*/
const buildFlow = (flowConfigs = [{}]) => flowConfigs.map(({
    breakpointPrefix = '',
    title,
    ...configAbridged
} = {}) => {
    const flowString = Object.entries(configAbridged).reduce((flowStr, [name, value]) => {
        if (!value) return flowStr;

        if (name === 'gap') {
            const {
                fields: { value: gapVal = '' } = {},
            } = value;

            return breakpointPrefix ? `${flowStr} ${breakpointPrefix}:gap-${gapVal}` : `${flowStr} gap-${gapVal}`;
        }

        return breakpointPrefix ? `${flowStr} ${breakpointPrefix}:${value}` : `${flowStr} ${value}`;
    }, '');

    return flowString;
}).join(' ');
/*
    @param {[{}]} layout configs from the content model.
    @returns {String} flat string of item attribute utility classes.
*/
/*
    @param {[{}]} layout configs from the content model.
    @returns {String} flat string of item attribute utility classes.
*/
const buildItemAttrs = (itemAttributes = [{}]) => itemAttributes.map(({
    breakpointPrefix = '',
    alignSelf = '',
    justifySelf = '',
    flexGrow,
    flexShrink,
    order = '',
} = {}) => {
    const grow = flexGrow ? 'grow' : '';
    const useGrow = !grow && flexGrow !== undefined ? 'grow-0' : grow;
    const shrink = flexShrink ? 'shink' : '';
    const useShrink = !shrink && flexShrink !== undefined ? 'shrink-0' : shrink;
    const baseStr = `${alignSelf} ${justifySelf} ${useGrow} ${useShrink} ${order}`.trim();

    if (breakpointPrefix && baseStr) return baseStr.split(' ').map((setting = '') => `${breakpointPrefix}:${setting}`).join(' ').trim();

    return baseStr;
}).join(' ').trim();
/*
    @param {[{}]} orientation
    @param {String} breakpointPrefix
    @returns {[String]}
*/
const layoutPositionOrientation = (orientation = [{}], breakpointPrefix = '') => orientation.map(({
    fields: {
        locationPrefix = '',
        locationSuffix: { fields: { value: locationSuffix = '' } = {} } = {},
        valuePositiveOrNegative = '+',
    } = {},
}) => {
    // top, right, bottom, left and static or relative value
    const locationString = (locationPrefix && locationSuffix) ? `${locationPrefix}-${locationSuffix}` : '';
    // has a positive or negative value
    const locationBase = locationString && valuePositiveOrNegative !== '+' ? `-${locationString}` : locationString;

    // matched break point for positionSelector
    return locationBase && breakpointPrefix ? `${breakpointPrefix}:${locationBase}` : locationBase;
});
/*
@param {[{}]} values
@returns {string}
*/
const buildComplexStrings = (values = [{}]) => values.map(({
    breakpointPrefix = '',
    positionOrientation = [],
    positionValue = '',
    stacking = '',
    valuePositiveOrNegative = '+',
    valuePrefix = '',
    valueSuffix = '',
} = {}) => {
    // relative, absoluted, fixed, sticky w/ or w/out breakpoint
    const positionSelector = breakpointPrefix && positionValue ? `${breakpointPrefix}:${positionValue}` : positionValue;
    // z-index for element if set, z-index: 0 is default, it is the natural stacking order
    const stackString = stacking ? `z-${stacking}` : '';
    const stackStringMod = stackString && valuePositiveOrNegative !== '+' ? `-${stackString}` : stackString;
    const stackStringFinal = stackStringMod || stackString;

    // breakpoint: [xxs||xs||default||md||lg||xl||2xl||3xl]
    // Position selector: [breakpoint]?:[relative||absolute||fixed||sticky]
    // Position Orientation: [breakpoint]?:[top||right||bottom||left]-[relative||static]
    // Stacking: [breakpoint]?:z-[0,10,20,30,40,50,60,70,80,90]
    if (positionSelector) {
        return [
            positionSelector,
            ...layoutPositionOrientation(positionOrientation, breakpointPrefix),
            stackStringFinal,
        ].join(' ').trim();
    }

    // This applies to Dimensions, Padding, and Margin—this is the simplest form of this pattern
    const valueString = valuePrefix ? `${valuePrefix}-${valueSuffix}` : valueSuffix;
    const valueMod = valuePrefix && valuePositiveOrNegative !== '+' ? `-${valueString}` : valueString;

    return (valueMod && breakpointPrefix) ? `${breakpointPrefix}:${valueMod}` : valueMod;
}).join(' ').trim();

/*
@param {Object} configMap
@returns {string}
*/
const layoutConfigMapperTailWind = (configMap = {}) => {
    if (!Object.keys(configMap).length) return '';
    /*
        Items from config to be processed. Most items default to [], otherwise undefined for the legacy items.
    */
    const {
        color = [],
        border,
        boxShadow,
        itemAttributes = [],
        layoutFlow = [],
        layoutPosition = [],
        overflow = [],
        dimensions = [],
        whiteSpace = [],
    } = configMap;

    // concepts to be refactored
    const setBoxShadow = boxShadow ? buildTWString(boxShadow, tailWindMapper.boxShadow) : '';
    const setOverflow = overflow ? buildTWString(overflow, tailWindMapper.overflow) : '';

    // Final string to be applied to a container.
    // An array of strings, where each entry can be '', joined by ' ', and trimmed
    // Final value can be  very complex or an empty string.
    return [
        buildComplexStrings(layoutPosition),
        buildFlow(layoutFlow),
        buildItemAttrs(itemAttributes),
        buildComplexStrings(dimensions),
        buildComplexStrings(whiteSpace),
        setOverflow,
        buildBorder(border),
        buildColor(color),
        setBoxShadow,
    ].join(' ').replace(/\s{2,}/g, ' ').trim();
};

export default layoutConfigMapperTailWind;
