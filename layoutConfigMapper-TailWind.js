import {
    getConfigLabel
} from './layoutConfigs';

/*
    * This takes our Layout Model and Maps to Tailwind Standards
    * Our Standardized Model is processed from the Contentful content model
    * It  top level model looks like this
    {
        backgroundColor = {},
        border = {},
        boxShadow = {},
        itemAttributes = {},
        layoutFlow = {},
        layoutPosition = {},
        margin = [],
        overflow = {},
        padding = [],
        dimensions = []
    }

    ADD:
    Background Image handling

    TK:
    Eliminate most of this map, it can come from the model
*/
const tailWindMapper = {
    backgroundColor: {
        backgroundColors: {
            backgroundColor: val => `bg-${val}`,
            backgroundColorOverride: val => `md:bg-${val}`
        }
    },
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
    itemAttributes: {
        itemGrid: {

        },
        flexItem: {
            alignSelf: {
                baseline: 'self-baseline',
                center: 'self-center',
                'flex-end': 'self-end',
                'flex-start': 'self-start',
                stretch: 'self-stretch'
            },
            flexGrow: {
                0: 'grow-0',
                1: 'grow'
            },
            flexShrink: {
                0: 'shrink-0',
                1: 'shrink'
            },
            flexBasis: {
                auto: 'basis-auto',
                full: 'basis-full',
                numerical: val => `basis-[${val}]`
            },
            order: {
                0: 'order-none',
                9999: 'order-last',
                '-9999': 'order-first',
                1: 'order-1',
                2: 'order-2',
                3: 'order-3',
                4: 'order-4',
                5: 'order-5',
                6: 'order-6',
                7: 'order-7',
                8: 'order-8',
                9: 'order-9',
                10: 'order-10'
            },
            orderOverrideDefault: {
                0: 'xl:order-none',
                9999: 'xl:order-last',
                '-9999': 'xl:order-first',
                1: 'xl:order-1',
                2: 'xl:order-2',
                3: 'xl:order-3',
                4: 'xl:order-4',
                5: 'xl:order-5',
                6: 'xl:order-6',
                7: 'xl:order-7',
                8: 'xl:order-8',
                9: 'xl:order-9',
                10: 'xl:order-10'
            }
        }
    },
    layoutFlow: {
        displayFlex: {
            twValue: 'flex',
            alignContent: {
                baseline: 'content-baseline',
                center: 'content-center',
                'flex-end': 'content-end',
                'flex-start': 'content-start',
                'space-around': 'content-around',
                'space-between': 'content-between',
                'space-evenly': 'content-evenly',
                stretch: 'content-stretch'
            },
            alignItems: {
                baseline: 'items-baseline',
                center: 'items-center',
                'flex-end': 'items-end',
                'flex-start': 'items-start',
                stretch: 'items-stretch'
            },
            alignItemsOverrideDefault: {
                baseline: 'md:items-baseline',
                center: 'md:items-center',
                'flex-end': 'md:items-end',
                'flex-start': 'md:items-start',
                stretch: 'md:items-stretch'
            },
            flexDirection: {
                column: 'flex-col',
                'column-reverse': 'flex-col-reverse',
                row: 'flex-row',
                'row-reverse': 'flex-row-reverse'
            },
            flexDirectionOverrideDefault: {
                column: 'md:flex-column',
                'column-reverse': 'md:flex-column-reverse',
                row: 'md:flex-row',
                'row-reverse': 'md:flex-row-reverse'
            },
            flexWrap: {
                nowrap: 'flex-nowrap',
                wrap: 'flex-wrap',
                'wrap-reverse': 'flex-wrap-reverse'
            },
            flexWrapOverrideDefault: {
                nowrap: 'md:flex-nowrap',
                wrap: 'md:flex-wrap',
                'wrap-reverse': 'md:flex-wrap-reverse'
            },
            gap: {
                0: 'gap-0',
                1: 'gap-1',
                2: 'gap-2',
                3: 'gap-3',
                4: 'gap-4',
                5: 'gap-5',
                6: 'gap-6',
                7: 'gap-7',
                8: 'gap-8',
                9: 'gap-9',
                10: 'gap-10',
                11: 'gap-11',
                12: 'gap-12',
                14: 'gap-14',
                16: 'gap-16',
                20: 'gap-20',
                24: 'gap-24',
                28: 'gap-28',
                32: 'gap-32',
                36: 'gap-36',
                40: 'gap-40'
            },
            gapOverrideDefault: {
                0: 'md:gap-0',
                1: 'md:gap-1',
                2: 'md:gap-2',
                3: 'md:gap-3',
                4: 'md:gap-4',
                5: 'md:gap-5',
                6: 'md:gap-6',
                7: 'md:gap-7',
                8: 'md:gap-8',
                9: 'md:gap-9',
                10: 'md:gap-10',
                11: 'md:gap-11',
                12: 'md:gap-12',
                14: 'md:gap-14',
                16: 'md:gap-16',
                20: 'md:gap-20',
                24: 'md:gap-24',
                28: 'md:gap-28',
                32: 'md:gap-32',
                36: 'md:gap-36',
                40: 'md:gap-40'
            },
            justifyContent: {
                center: 'justify-center',
                'flex-end': 'justify-end',
                'flex-start': 'justify-start',
                'space-around': 'justify-around',
                'space-between': 'justify-between',
                'space-evenly': 'justify-evenly',
                stretch: 'justify-stretch'
            },
            justifyContentOverrideDefault: {
                center: 'md:justify-center',
                'flex-end': 'md:justify-end',
                'flex-start': 'md:justify-start',
                'space-around': 'md:justify-around',
                'space-between': 'md:justify-between',
                'space-evenly': 'md:justify-evenly',
                stretch: 'md:justify-stretch'
            }
        },
        displayBlock: {
            twValue: 'block',
            float: {
                left: 'float-left',
                right: 'float-right'
            }
        },
        displayGrid: {
            twValue: 'grid',
            // This is not 100% correct.
            gridColumns: val => `grid-cols-1 xl:grid-cols-${val}`,
            gap: val => `gap-${val}`
        },
        displayInline: {
            twValue: 'inline-block'
        },
        displayInlineFlex: {
            twValue: 'inline-flex',
            alignContent: {
                baseline: 'content-baseline',
                center: 'content-center',
                'flex-end': 'content-end',
                'flex-start': 'content-start',
                'space-around': 'content-around',
                'space-between': 'content-between',
                'space-evenly': 'content-evenly',
                stretch: 'content-stretch'
            },
            alignItems: {
                baseline: 'items-baseline',
                center: 'items-center',
                'flex-end': 'items-end',
                'flex-start': 'items-start',
                stretch: 'items-stretch'
            },
            alignItemsOverrideDefault: {
                baseline: 'md:items-baseline',
                center: 'md:items-center',
                'flex-end': 'md:items-end',
                'flex-start': 'md:items-start',
                stretch: 'md:items-stretch'
            },
            flexDirection: {
                column: 'flex-col',
                'column-reverse': 'flex-col-reverse',
                row: 'flex-row',
                'row-reverse': 'flex-row-reverse'
            },
            flexDirectionOverrideDefault: {
                column: 'md:flex-column',
                'column-reverse': 'md:flex-column-reverse',
                row: 'md:flex-row',
                'row-reverse': 'md:flex-row-reverse'
            },
            flexWrap: {
                nowrap: 'flex-nowrap',
                wrap: 'flex-wrap',
                'wrap-reverse': 'flex-wrap-reverse'
            },
            flexWrapOverrideDefault: {
                nowrap: 'md:flex-nowrap',
                wrap: 'md:flex-wrap',
                'wrap-reverse': 'md:flex-wrap-reverse'
            },
            gap: val => `gap-${val}`,
            gapOverrideDefault: val => `md:gap-${val}`,
            justifyContent: {
                center: 'justify-center',
                'flex-end': 'justify-end',
                'flex-start': 'justify-start',
                'space-around': 'justify-around',
                'space-between': 'justify-between',
                'space-evenly': 'justify-evenly',
                stretch: 'justify-stretch'
            },
            justifyContentOverrideDefault: {
                center: 'md:justify-center',
                'flex-end': 'md:justify-end',
                'flex-start': 'md:justify-start',
                'space-around': 'md:justify-around',
                'space-between': 'md:justify-between',
                'space-evenly': 'md:justify-evenly',
                stretch: 'md:justify-stretch'
            }
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
        backgroundColor,
        border,
        boxShadow,
        itemAttributes,
        layoutFlow,
        layoutPosition,
        margin,
        overflow,
        padding,
        dimensions
    } = configMap;

    // These values will always be strings, an undefined will return an empty string that will get purged.
    const setBackground = backgroundColor ? buildTWString(backgroundColor, tailWindMapper.backgroundColor) : '';
    const setBorder = border ? buildTWString(border, tailWindMapper.border) : '';
    const setBoxShadow = boxShadow ? buildTWString(boxShadow, tailWindMapper.boxShadow) : '';
    const setFlow = layoutFlow ? buildTWString(layoutFlow, tailWindMapper.layoutFlow) : '';
    const setItem = itemAttributes ? buildTWString(itemAttributes, tailWindMapper.itemAttributes) : '';
    const setMargin = margin ? buildComplexStrings(margin) : '';
    const setOverflow = overflow ? buildTWString(overflow, tailWindMapper.overflow) : '';
    const setPadding = padding ? buildComplexStrings(padding) : '';
    const setPosition = layoutPosition ? buildComplexStrings(layoutPosition) : '';
    const setDimensions = dimensions ? buildComplexStrings(dimensions) : '';

    // Final string to be applied to a container.
    // An array of strings, where each entry can be '', joined but ' ', and trimmed
    // Final value can be  very complex or an empty string.
    return [
        setPosition,
        setFlow,
        setItem,
        setDimensions,
        setPadding,
        setMargin,
        setOverflow,
        setBorder,
        setBackground,
        setBoxShadow
    ].join(' ').trim();
};
