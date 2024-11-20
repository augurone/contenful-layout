import {
    getConfigLabel
} from './layoutConfigs';

/*
    * Remanider of legacy pattern. Receives values and maps them to tailwind utility classes.
    * This was actually an evoltion of the initial pattern, I do like it. It standardized on common values
    * that sent me towards the common value models (e.g. measurements, colors),
    * And landed on the more predominant patterns starting with buildColor.
    * Will eventually refactor this and buildTWString out.
*/
const tailWindMapper = {
    border: {
        borderAttributes: {
            borderColor: val => `border-${val}`,
            borderRadius: val => (val === 'rounded' ? val : `rounded-${val}`),
            borderWidth: val => val
        }
    },
    boxShadow: {
        boxShadowAttributes: {
            boxShadow: val => val
        }
    },
    overflow: {
        overflowAttributes: {
            overflow: val => `overflow-${val}`,
            overflowX: val => `overflow-x-${val}`,
            overflowY: val => `overflow-Y-${val}`
        }
    }
};

/*
This will be refactored probably out of existence.
@returns {string}
*/
const buildTWString = (conf, twMap) => {
    if (!conf || !twMap) return '';

    const configName = getConfigLabel(conf);
    const tailWindConf = twMap[configName];
    const { twValue = '' } = tailWindConf || {};

    if (!tailWindConf) return '';

    return Object.entries(conf).reduce((designation, [label, value]) => {
        if (!label) return designation;

        const twVal = tailWindConf[value];

        if (twVal) return twVal;

        const twAttr = tailWindConf[label];

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
const buildColor = (colors = [{}], prefix = 'bg-') => colors.map(({
    breakpointPrefix = '',
    colorName: { fields: { color = '' } = {} } = {},
    opacity
}) => {
    if (!color) return '';

    const colorStr = `${prefix}${color}`;

    if (breakpointPrefix) {
        return !opacity ? `${breakpointPrefix}:${colorStr}` : `${breakpointPrefix}:${colorStr}/${opacity}`;
    }

    return opacity ? `${colorStr}/${opacity}` : `${colorStr}`;
}).join(' ');
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
                fields: { value: gapVal = '' } = {}
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
const buildItemAttrs = (itemAttributes = [{}]) => itemAttributes.map(({
    breakpointPrefix = '',
    alignSelf = '',
    justifySelf = '',
    grow = '',
    shrink = '',
    order = ''
} = {}) => {
    const baseStr = `${alignSelf} ${justifySelf} ${grow} ${shrink} ${order}`.trim();

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
        valuePositiveOrNegative = '+'
    } = {}
}) => {
    // top, right, bottom, left and static or relative value
    const locationString = (locationPrefix && locationSuffix) ? `${locationPrefix}-${locationSuffix}` : '';
    // has a positive or negative value
    const locationBase = locationString && valuePositiveOrNegative !== '+' ? `${valuePositiveOrNegative}${locationString}` : locationString;

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
    valuePrefix = '',
    valueSuffix = ''
} = {}) => {
    // relative, absoluted, fixed, sticky w/ or w/out breakpoint
    const positionSelector = breakpointPrefix && positionValue ? `${breakpointPrefix}:${positionValue}` : positionValue;
    // z-index for element if set, z-index: 0 is default, it is the natural stacking order
    const stackString = stacking ? `z-${stacking}` : '';

    // breakpoint: [xxs||xs||default||md||lg||xl||2xl||3xl]
    // Position selector: [breakpoint]?:[relative||absolute||fixed||sticky]
    // Position Orientation: [breakpoint]?:[top||right||bottom||left]-[relative||static]
    // Stacking: [breakpoint]?:z-[0,10,20,30,40,50,60,70,80,90]
    if (positionSelector) {
        return [
            positionSelector,
            ...layoutPositionOrientation(positionOrientation, breakpointPrefix),
            stackString
        ].join(' ').trim();
    }

    // This applies to Dimensions, Padding, and Margin—this is the simplest form of this pattern
    const valueString = valuePrefix ? `${valuePrefix}-${valueSuffix}` : valueSuffix;

    return (valueString && breakpointPrefix) ? `${breakpointPrefix}:${valueString}` : valueString;
}).join(' ').trim();

/*
@param {Object} configMap
@returns {string}
*/
export default (configMap = {}) => {
    if (!Object.keys(configMap).length) return '';
    /*
        We just destructure here, because we either get a value or, "undefined" is a falsey to setup the next phase.
        All the type sensitivity is moved upwards
    */
    const {
        backgroundColor = [],
        border,
        boxShadow,
        itemAttributes = [],
        layoutFlow = [],
        layoutPosition = [],
        margin = [],
        overflow = [],
        padding = [],
        dimensions = []
    } = configMap;

    // concepts to be refactored
    const setBorder = border ? buildTWString(border, tailWindMapper.border) : '';
    const setBoxShadow = boxShadow ? buildTWString(boxShadow, tailWindMapper.boxShadow) : '';
    const setOverflow = overflow ? buildTWString(overflow, tailWindMapper.overflow) : '';

    // Final string to be applied to a container.
    // An array of strings, where each entry can be '', joined but ' ', and trimmed
    // Final value can be  very complex or an empty string.
    return [
        buildComplexStrings(layoutPosition),
        buildFlow(layoutFlow),
        buildItemAttrs(itemAttributes),
        buildComplexStrings(dimensions),
        buildComplexStrings(padding),
        buildComplexStrings(margin),
        setOverflow,
        setBorder,
        buildColor(backgroundColor),
        setBoxShadow
    ].join(' ').trim();
};
