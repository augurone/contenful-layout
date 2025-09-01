/**
 * @fileoverview
 * Generates a Tailwind utility‑class string from a Contentful v‑7
 * "layout" entry.
 *
 * @param   {Object} layoutEntry  – Resolved entry JSON (includes linked atom fields)
 * @returns {string}              – Tailwind class list
 *
 * Internal:
 *   normalizeLayout  →  flattens atoms to descriptors
 *   buildTailwindClass → joins descriptors into a string
 */

/**
 * Collects all atom `fields` objects for a given group.
 * @param {Object} layoutFields – layout entry `fields` object
 * @param {string} groupId – group identifier
 * @returns {Object[]} raw `fields` objects for each atom in the group
 */
const collectGroup = (layoutFields = {}, groupId = '') => {
    // Ensure layoutFields is a valid plain object
    if (!layoutFields || Array.isArray(layoutFields) || Object.prototype.toString.call(layoutFields) !== '[object Object]') {
        return [];
    }

    const { [groupId]: group } = layoutFields;

    // Handle missing groups gracefully by returning empty array
    if (!group || !Array.isArray(group)) {
        return [];
    }

    // Safely map over the group, handling malformed items
    return group
        .filter(item => item && typeof item === 'object')
        .map(({ fields = {} }) => fields || {});
};

/** @typedef {import('./types').AtomFields} AtomFields */

/**
 * Generic helper to extract nested field values from Contentful entries.
 * Handles both resolved entries and direct field objects.
 * @param {Object} entry - The Contentful entry object or field object
 * @param {string} fieldName - The field name to extract
 * @param {*} defaultValue - Default value if field is missing
 * @returns {*} The extracted field value or default
 */
const extractFieldValue = (
    entry = {},
    fieldName = 'value',
    defaultValue = '',
) => {
    if (!entry || !Object.keys(entry).length) return defaultValue;

    const { fields: { [fieldName]: fieldValueAtDepth } = {} } = entry;
    const { [fieldName]: fieldValueShallow } = entry;

    return fieldValueAtDepth || fieldValueShallow || defaultValue;
};

/**
 * Extracts the breakpoint token value.
 * @param {AtomFields} atom
 * @returns {string} breakpoint code or empty string
 */
const extractBreakpoint = ({ breakpoint = {} }) => {
    const breakpointCode = extractFieldValue(breakpoint, 'value', '');

    // Treat Contentful's literal "default" token as "no prefix" for Tailwind.
    return breakpointCode === 'default' ? '' : breakpointCode;
};

/**
 * Extracts the measurement value.
 * @param {AtomFields} atom
 * @returns {string} measurement value or empty string
 */
const extractMeasurement = ({ measurement = {} }) => {
    // BUG: Object.keys.length should be Object.keys(measurement).length
    if (!measurement || !Object.keys(measurement).length) return '';

    return extractFieldValue(measurement, 'value', '');
};

/**
 * Extracts the opacity value.
 * @param {AtomFields} atom
 * @returns {string} opacity value or empty string
 */
const extractOpacity = ({ opacity = {} }) => extractFieldValue(opacity, 'value', '');

/**
 * Extracts the gridColumns value.
 * @param {AtomFields} atom
 * @returns {string} gridColumns value or empty string
 */
const extractGridColumns = ({ gridColumns = '' }) => gridColumns;

/**
 * Maps a spacing atom into a descriptor.
 * @param {AtomFields} atom
 * @returns {{ breakpoint: string, parts: string[] }}
 */
const mapSpacing = atom => ({
    breakpoint: extractBreakpoint(atom),
    parts: [
        atom.negative ? `-${atom.prefix}` : atom.prefix,
        extractMeasurement(atom),
    ],
});

/**
 * Maps a position atom into a descriptor.
 * @param {AtomFields} atom
 * @returns {{ breakpoint: string, parts: string[] }}
 */
const mapPosition = atom => ({
    breakpoint: extractBreakpoint(atom),
    parts: [
        atom.negative ? `-${atom.prefix}` : atom.prefix,
        extractMeasurement(atom),
        atom.float,
    ],
});

/**
 * Maps a flow atom into multiple descriptors (one per class).
 * @param {AtomFields} atom
 * @returns {{ breakpoint: string, parts: string[] }[]}
 */
const mapFlow = atom => {
    const breakpoint = extractBreakpoint(atom);
    const flowClasses = [
        atom.display,
        atom.alignPrefix && atom.alignValue && `${atom.alignPrefix}-${atom.alignValue}`,
        atom.overflowPrefix && atom.overflowValue && `${atom.overflowPrefix}-${atom.overflowValue}`,
        atom.order && `order-${atom.order}`,
    ].filter(Boolean);

    // Return array of descriptors, one for each class
    return flowClasses.map(flowClass => ({
        breakpoint,
        parts: [flowClass],
    }));
};

/**
 * Maps a grid atom into a descriptor.
 * @param {AtomFields} atom
 * @returns {{ breakpoint: string, parts: string[] }}
 */
const mapGrid = atom => ({
    breakpoint: extractBreakpoint(atom),
    parts: [
        atom.prefix,
        atom.prefix === 'grid-flow'
            ? atom.flowValue
            : extractGridColumns(atom),
    ],
});

/**
 * Maps a border atom into a descriptor.
 * @param {AtomFields} atom
 * @returns {{ breakpoint: string, parts: string[] }}
 */
const mapBorder = atom => ({
    breakpoint: extractBreakpoint(atom),
    parts: [atom.prefix, extractMeasurement(atom)],
});

/**
 * Maps a color atom into a descriptor.
 * @param {AtomFields} atom
 * @returns {{ breakpoint: string, parts: string[] }}
 */
const mapColor = atom => ({
    breakpoint: extractBreakpoint(atom),
    parts: [
        atom.shade
            ? `${atom.prefix}-${atom.family}-${atom.shade}${extractOpacity(atom) ? `/${extractOpacity(atom)}` : ''}`
            : `${atom.prefix}-${atom.family}`,
    ],
});

/**
 * Maps a shadow atom into a descriptor.
 * @param {AtomFields} atom
 * @returns {{ breakpoint: string, parts: string[] }}
 */
const mapShadow = atom => ({
    breakpoint: extractBreakpoint(atom),
    parts: ['shadow', atom.value],
});

/**
 * Maps a background atom into a descriptor.
 * @param {AtomFields} atom
 * @returns {{ breakpoint: string, parts: string[] }}
 */
const mapBackground = atom => ({
    breakpoint: extractBreakpoint(atom),
    parts: [atom.utility],
});

/**
 * Flattens all atom arrays into a single descriptor list.
 * @param {Object} layoutEntry
 * @returns {{ breakpoint: string, parts: string[] }[]}
 */
const normalizeLayout = (layoutEntry = {}) => {
    // Ensure we have a valid layout entry that's a plain object
    if (!layoutEntry || Array.isArray(layoutEntry) || Object.prototype.toString.call(layoutEntry) !== '[object Object]') {
        return [];
    }

    const { fields: layoutFields = {} } = layoutEntry;

    // Ensure layoutFields is a valid plain object
    if (!layoutFields || Array.isArray(layoutFields) || Object.prototype.toString.call(layoutFields) !== '[object Object]') {
        return [];
    }

    const groupMap = [
        ['spacing', mapSpacing],
        ['position', mapPosition],
        ['flow', mapFlow],
        ['grid', mapGrid],
        ['border', mapBorder],
        ['color', mapColor],
        ['shadow', mapShadow],
        ['background', mapBackground],
    ];

    return groupMap
        .flatMap(([groupId, mapper]) => {
            const atoms = collectGroup(layoutFields, groupId);
            if (groupId === 'flow') {
                // mapFlow returns arrays, so we need to flatten them
                return atoms.flatMap(mapper);
            }
            return atoms.map(mapper);
        })
        .filter(({ parts }) => parts.some(Boolean));
};

/**
 * Builds Tailwind CSS class string from atom descriptors.
 * @param {Array<{breakpoint: string, parts: string[]}>} atoms - Array of atom descriptors
 * @returns {string} - Space-separated Tailwind class string
 */
const buildTailwindClass = (atoms = []) =>
    atoms
        .reduce((classes, { breakpoint, parts }) => {
            const core = parts.filter(Boolean).join('-');

            if (!core) return classes;

            const prefixedClass = breakpoint === '' ? core : `${breakpoint}:${core}`;

            return [...classes, prefixedClass];
        }, [])
        .join(' ');

/**
 * Wrapper that converts a layout entry directly into a Tailwind class string.
 * @param {Object} config – resolved layout entry
 * @returns {string} Tailwind class list
 */
const layoutConfig = config => buildTailwindClass(normalizeLayout(config));

export default layoutConfig;
