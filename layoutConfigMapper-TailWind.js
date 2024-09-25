import {
    getConfigLabel
} from './layoutConfigs';

/*
    * This takes our Laout Model and Maps to Tailwind Standards
    * Our Standardized Model is proessed from the Contentful content model
    * It  top level model looks like this
    {
        layoutPosition: {},
        layoutFlow: {},
        itemAttributes: {},
        padding: [],
        margin: []
    }

    ADD:
    Add fxied width values
    layoutDimensionsMinWidth : minWidthAttributes
    layoutDimensionsMaxWidth : maxWidthAttributes

    FIX:
    Margin Auto Optons

*/
const tailWindMapper = {
    backgroundColor: {
        backgroundColors: {
            'ab-white-dark': 'bg-ab-white-dark',
            'ab-white-medium': 'bg-ab-white-medium',
            'ab-primary-dark': 'bg-ab-primary-dark',
            'ab-primary-darker': 'bg-ab-primary-darker',
            'ab-primary-dark-highlight': 'bg-ab-primary-dark-highlight',
            'ab-primary-medium': 'bg-ab-primary-medium',
            'ab-primary-light': 'bg-ab-primary-light',
            'ab-primary-lighter': 'bg-ab-primary-lighter',
            'ab-primary-inactive': 'bg-ab-primary-inactive',
            'ab-secondary-dark': 'bg-ab-secondary-dark',
            'ab-secondary-medium': 'bg-ab-secondary-medium',
            'ab-secondary-light': 'bg-ab-secondary-light',
            'ab-accent-2-dark': 'bg-ab-accent-2-dark',
            'ab-accent-2-medium': 'bg-ab-accent-2-medium',
            'ab-accent-2-light': 'bg-ab-accent-2-light',
            'ab-accent-3-dark': 'bg-ab-accent-3-dark',
            'ab-accent-3-medium': 'bg-ab-accent-3-medium',
            'ab-accent-3-light': 'bg-ab-accent-3-light',
            'ab-accent-4-dark': 'bg-ab-accent-4-dark',
            'ab-accent-4-medium': 'bg-ab-accent-4-medium',
            'ab-accent-4-light': 'bg-ab-accent-4-light',
            'ab-accent-5-medium': 'bg-ab-accent-5-medium',
            'ab-accent-6-medium': 'bg-ab-accent-6-medium',
            'ab-accent-7-medium': 'bg-ab-accent-7-medium'
        },
        backgroundColorOverride: {
            'ab-white-dark': 'md:bg-ab-white-dark',
            'ab-white-medium': 'md:bg-ab-white-medium',
            'ab-primary-dark': 'md:bg-ab-primary-dark',
            'ab-primary-darker': 'md:bg-ab-primary-darker',
            'ab-primary-dark-highlight': 'md:bg-ab-primary-dark-highlight',
            'ab-primary-medium': 'md:bg-ab-primary-medium',
            'ab-primary-light': 'md:bg-ab-primary-light',
            'ab-primary-lighter': 'md:bg-ab-primary-lighter',
            'ab-primary-inactive': 'md:bg-ab-primary-inactive',
            'ab-secondary-dark': 'md:bg-ab-secondary-dark',
            'ab-secondary-medium': 'md:bg-ab-secondary-medium',
            'ab-secondary-light': 'md:bg-ab-secondary-light',
            'ab-accent-2-dark': 'md:bg-ab-accent-2-dark',
            'ab-accent-2-medium': 'md:bg-ab-accent-2-medium',
            'ab-accent-2-light': 'md:bg-ab-accent-2-light',
            'ab-accent-3-dark': 'md:bg-ab-accent-3-dark',
            'ab-accent-3-medium': 'md:bg-ab-accent-3-medium',
            'ab-accent-3-light': 'md:bg-ab-accent-3-light',
            'ab-accent-4-dark': 'md:bg-ab-accent-4-dark',
            'ab-accent-4-medium': 'md:bg-ab-accent-4-medium',
            'ab-accent-4-light': 'md:g-ab-accent-4-light',
            'ab-accent-5-medium': 'md:bg-ab-accent-5-medium',
            'ab-accent-6-medium': 'md:bg-ab-accent-6-medium',
            'ab-accent-7-medium': 'md:bg-ab-accent-7-medium'
        }
    },
    border: {
        borderAttributes: {
            borderColor: val => `border-${val}`,
            borderRadius: val => `rounded-${val}`,
            borderWidth: val => val
        }
    },
    boxShadow: {
        boxShadowAttributes: {
            boxShadow: val => val
        }
    },
    layoutPosition: {
        positionAbsolute: {
            twValue: 'absolute',
            bottom: val => `bottom-${val}`,
            left: val => `left-${val}`,
            right: val => `right-${val}`,
            top: val => `top-${val}`,
            stacking: val => `z-${val}`
        },
        positionFixed: {
            twValue: 'fixed',
            bottom: val => `bottom-${val}`,
            left: val => `left-${val}`,
            right: val => `right-${val}`,
            top: val => `top-${val}`,
            stacking: val => `z-${val}`
        },
        positionRelative: {
            twValue: 'relative',
            stacking: val => `z-${val}`
        },
        positionSticky: {
            twValue: 'sticky',
            bottom: (val, conf) => {
                const {
                    bottomValuePositiveOrNegative = ''
                } = conf;

                return bottomValuePositiveOrNegative ? `-bottom-${val}` : `bottom-${val}`;
            },
            top: (val, conf) => {
                const {
                    topValuePositiveOrNegative = ''
                } = conf;

                return topValuePositiveOrNegative ? `-top-${val}` : `top-${val}`;
            },
            stacking: val => `z-${val}`
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
                first: 'order-first',
                last: 'order-last',
                none: 'order-0',
                numerical: val => `order-${val}`
            },
            orderOverrideDefault: {
                first: 'md:order-first',
                last: 'md:order-last',
                none: 'md:order-0',
                numerical: val => `md:order-${val}`
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
    margin: {
        marginDefault: {
            marginXAuto: val => (val ? 'mx-auto' : ''),
            marginLeftAuto: val => (val ? 'ml-auto' : ''),
            marginTopAuto: val => (val ? 'mt-auto' : ''),
            margin: val => `m-${val}`,
            marginBottom: val => `mb-${val}`,
            marginLeft: val => `ml-${val}`,
            marginRight: val => `mr-${val}`,
            marginTop: val => `mt-${val}`
        },
        marginTablet: {
            marginXAuto: val => (val ? 'md:mx-auto' : ''),
            marginLeftAuto: val => (val ? 'md:ml-auto' : ''),
            marginTopAuto: val => (val ? 'md:mt-auto' : ''),
            margin: val => `md:m-${val}`,
            marginBottom: val => `md:mb-${val}`,
            marginLeft: val => `md:ml-${val}`,
            marginRight: val => `md:mr-${val}`,
            marginTop: val => `md:mt-${val}`
        },
        marginDesktop: {
            marginXAuto: val => (val ? 'lg:mx-auto' : ''),
            marginLeftAuto: val => (val ? 'lg:ml-auto' : ''),
            marginTopAuto: val => (val ? 'lg:mt-auto' : ''),
            margin: val => `lg:m-${val}`,
            marginBottom: val => `lg:mb-${val}`,
            marginLeft: val => `lg:ml-${val}`,
            marginRight: val => `lg:mr-${val}`,
            marginTop: val => `lg:mt-${val}`
        }
    },
    padding: {
        paddingDefault: {
            padding: val => `p-${val}`,
            paddingBottom: val => `pb-${val}`,
            paddingLeft: val => `pl-${val}`,
            paddingRight: val => `pr-${val}`,
            paddingTop: val => `pt-${val}`
        },
        paddingTablet: {
            padding: val => `md:p-${val}`,
            paddingBottom: val => `md:pb-${val}`,
            paddingLeft: val => `md:pl-${val}`,
            paddingRight: val => `md:pr-${val}`,
            paddingTop: val => `md:pt-${val}`
        },
        paddingDesktop: {
            padding: val => `lg:p-${val}`,
            paddingBottom: val => `lg:pb-${val}`,
            paddingLeft: val => `lg:pl-${val}`,
            paddingRight: val => `lg:pr-${val}`,
            paddingTop: val => `lg:pt-${val}`
        }
    },
    dimensions: {
        widthAttributes: {
            width: val => val,
            widthDefaultOverride: val => `md:${val}`
        },
        maxWidthAttributes: {
            width: val => `max-${val}`,
            widthDefaultOverride: val => `md:max-${val}`
        },
        minWidthAttributes: {
            width: val => `min-${val}`,
            widthDefaultOverride: val => `md:min-${val}`
        },
        flexBasisAttributes: {
            flexBasis: val => val,
            flexBasisOverrideDefault: val => `md:${val}`
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

        // Some Items Like gap, padding, margin, columns will return a function
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

const multiEntryString = (config, twNode) => {
    if (!config || !twNode) return '';

    return Object.entries(config).map(([device, settings]) => {
        const strFncs = twNode[device];

        return Object.entries(settings).reduce((pd, [setting, value]) => {
            if (strFncs && strFncs[setting]) {
                return `${pd} ${strFncs[setting](value)}`;
            }

            return pd;
        }, '');
    }).join(' ');
};

const getDimensions = (dimensions = {}) => {
    const processDimension = (
        [
            lookupVal = '',
            attributes = {}
        ] = []
    ) => Object.entries(attributes).reduce((designation, [label, value]) => {
        if (!value || value === 'none') return designation;

        const {
            dimensions: {
                [lookupVal]: twNode
            } = {}
        } = tailWindMapper;

        const additional = twNode && twNode[label] ? ` ${twNode[label](value)}` : '';

        return `${designation.trim()}${additional}`;
    }, '');

    return Object.entries(dimensions).map(avpair => processDimension(avpair)).join(' ');
};

export default (configMap) => {
    if (!configMap) return '';
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
    const setMargin = margin ? multiEntryString(margin, tailWindMapper.margin) : '';
    const setOverflow = overflow ? buildTWString(overflow, tailWindMapper.overflow) : '';
    const setPadding = padding ? multiEntryString(padding, tailWindMapper.padding) : '';
    const setPosition = layoutPosition ? buildTWString(layoutPosition, tailWindMapper.layoutPosition) : '';
    const setDimensions = dimensions ? getDimensions(dimensions) : '';

    // Final string to be applied to a container.
    return `${setPosition} ${setFlow} ${setItem} ${setPadding} ${setMargin} ${setDimensions} ${setBorder} ${setBackground} ${setOverflow} ${setBoxShadow}`.replace(/\s{2,}/g, ' ').trim();
};
