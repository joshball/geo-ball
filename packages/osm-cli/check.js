const { readFileSync } = require('fs');

const file = JSON.parse(readFileSync('./points.json', 'utf8'));
const ALL_ELEMENTS = file.elements;

const setOrInc = (obj, key) => {
    if (!obj[key]) {
        obj[key] = 0;
    }
    obj[key]++;
}
const getInValOrder = (obj, sortAsc = true) => {
    const a = Object.keys(obj).map(k => ({ key: k, val: obj[k] }));
    return sortAsc ? a.sort((a, b) => a.val - b.val) : a.sort((a, b) => b.val - a.val);
}
const dumpKeyVal = (header, keyValues, sortAsc = true) => {
    console.log('==================================================================');
    console.log(header);
    console.log('------------------------------------------------------------------');
    getInValOrder(keyValues, sortAsc)
        .forEach((kvp) => { console.log(` - ${kvp.key}: ${kvp.val}`) })
    console.log('==================================================================');
}

// console.log('Element Keys:\n', JSON.stringify(elementKeys, undefined, 4));





const getHighwayElementStats = (allElems) => {
    const types = {};
    const keys = {};
    const tags = {};

    allElems.forEach(e => {

        setOrInc(types, e.type);

        Object.keys(e).forEach(k => {
            setOrInc(keys, k);
        })

        if (e.tags) {
            Object.keys(e.tags).forEach(k => {
                setOrInc(tags, k);
            })
        }
    });

    return {
        types,
        keys,
        tags
    };
}


const dumpHighElementStats = (elements) => {
    const highwayElements = {
        total: 0,
        withId: 0,
        withLat: 0,
        withLon: 0,
        withTags: 0,
        withNodes: 0,
    }
    elements
        .filter(e => e.type == 'highway')
        .forEach(he => {
            highwayElements.total++;
            if (he.lat) setOrInc(highwayElements, 'withLat');
            if (he.lng) setOrInc(highwayElements, 'withLon');
            if (he.tags) setOrInc(highwayElements, 'withTags');
            if (he.nodes) setOrInc(highwayElements, 'withNodes');
        });
    return highwayElements;
}

const { keys, tags, types } = getHighwayElementStats(ALL_ELEMENTS);
dumpKeyVal('All Element Keys:', keys, false);
dumpKeyVal('All Element Tags:', tags, false);
dumpKeyVal('All Element Types:', types, false);

const hes = dumpHighElementStats(ALL_ELEMENTS);
console.log('Highway ELements:\n', JSON.stringify(hes, undefined, 4))

console.log('STATS:')
console.log(` - ${Object.keys(keys).length} element keys`);
console.log(` - ${Object.keys(tags).length} element tags`);
console.log(` - ${Object.keys(types).length} element types`);


const doesEveryElementWithKeyHaveOtherKey = (elements, keyOne, keyTwo) => {
    const onesWithout = [];
    const onesWith = [];
    const baseCount = elements.filter(e => e[keyOne]).length;
    const withCount = elements.filter(e => e[keyTwo]).length;
    elements
        .filter(e => e[keyOne])
        .forEach(e => {
            if (!e[keyTwo]) {
                onesWithout.push(e)
            } else {
                onesWith.push(e)
            }
        });
    return {
        baseCount,
        withCount,
        onesWithout,
        onesWith
    };
}

const assertNoElementsWithBaseHasWithSet = (elements, baseElem, withElem) => {
    const elems = elements.filter(e => e[baseElem] && e[withElem]);
    if (elems.length > 0) {
        throw Error(`There are ${elems.length} elements with both ${baseElem} and ${withElem} set!`)
    }
}

const fetchAnddumpStuff = (elements, baseElem, withElem, dump) => {
    const o = doesEveryElementWithKeyHaveOtherKey(elements, baseElem, withElem);
    console.log('=====================================================================');
    console.log(`Element PROPS: ${baseElem} and ${withElem}`);
    console.log(`  TOTAL Elements: ${elements.length} (${baseElem}:${o.baseCount}, ${withElem}:${o.withCount}) (SUM: ${o.baseCount + o.withCount}) (EQUALS TOTAL ELEMS: ${o.baseCount + o.withCount == elements.length})`);
    // console.log(`  Elements with ${baseElem}:`, o.baseCount);
    // console.log(`  Elements with ${withElem}:`, o.withCount);
    // console.log(`  Does ${o.baseCount} + ${o.withCount} = ${elements.length} ?= ${o.baseCount + o.withCount} => ${o.baseCount + o.withCount == elements.length}`);
    console.log(`  Elements with BOTH ${baseElem} and ${withElem} set:`, o.onesWith.length);
    if (o.onesWith.length == 0) {
        console.log(`   * there are NO elements with ${baseElem} set and ${withElem} set`);
    }
    else {
        console.log(`   * there are SOME elements with ${baseElem} set and ${withElem} set`);
    }

    if (dump) console.log(o.onesWith[0])
    console.log(`  Elements with ONLY ${baseElem} set (and ${withElem} is NOT SET):`, o.onesWithout.length);
    if (o.onesWithout.length == 0) {
        console.log(`   * ALL elements with ${baseElem} HAVE ${withElem} set`);
    }
    else {
        console.log(`   * there are SOME elements with ${baseElem} set and ${withElem} NOT set`);
    }
    if (o.onesWithout.length == o.baseCount) {
        console.log(`   ** ALL elements with ${baseElem} DO NOT HAVE ${withElem} set`);
        assertNoElementsWithBaseHasWithSet(elements, baseElem, withElem)
    }
    if (dump) console.log(o.onesWithout[0])
}
const dumpWithWithout = (elements, baseElem, withElem, dump) => {
    fetchAnddumpStuff(elements, baseElem, withElem, dump);
    fetchAnddumpStuff(elements, withElem, baseElem, dump);
    // const o = doesEveryElementWithKeyHaveOtherKey(elements, baseElem, withElem);
    // console.log('=====================================================================');
    // console.log(`Element PROPS: ${baseElem} and ${withElem}`);
    // console.log(`  TOTAL Elements:`, elements.length);
    // console.log(`  Elements with ${baseElem}:`, o.baseCount);
    // console.log(`  Elements with ${withElem}:`, o.withCount);
    // console.log(`  Does ${o.baseCount} + ${o.withCount} = ${elements.length} => ${o.baseCount + o.withCount}`);
    // console.log(`  Elements with ${baseElem} and HAS ${withElem}:`, o.onesWith.length);
    // if (dump) console.log(o.onesWith[0])
    // console.log(`  Elements with ${baseElem} and NO ${withElem}:`, o.onesWithout.length);
    // if (dump) console.log(o.onesWithout[0])


    // const p = doesEveryElementWithKeyHaveOtherKey(elements, withElem, baseElem);
    // console.log(`  Elements with ${withElem} and HAS ${baseElem}:`, p.onesWith.length);
    // if (dump) console.log(p.onesWith[0])
    // console.log(`  Elements with ${withElem} and NO ${baseElem}:`, p.onesWithout.length);
    // if (dump) console.log(p.onesWithout[0])
}
dumpWithWithout(ALL_ELEMENTS, 'nodes', 'lat');
dumpWithWithout(ALL_ELEMENTS, 'tags', 'lat');
dumpWithWithout(ALL_ELEMENTS, 'tags', 'nodes');

const getAllElementsOfTypeAndPropData = (elements, elemType, propToCheck) => {
    const ofType = elements.filter(e => e.type == elemType);
    const elemsWithProp = ofType.filter(e => e[propToCheck]);
    return {
        total: elements.length,
        type: elemType,
        ofType: ofType.length,
        prop: propToCheck,
        withProp: elemsWithProp.length,
        withOutProp: ofType.length - elemsWithProp.length,
    }
}
const dumpStuff = (o) => {
    console.log(` There are ${o.ofType} elements of type "${o.type}" (out of ${o.total} elements)`);
    console.log(`   - there are ${o.withProp} with the prop "${o.prop}" and ${o.withOutProp} without`);
    if (o.withProp == o.ofType) console.log(`   - ALL elements of type "${o.type}" have the prop "${o.prop}" set`);
    else if (o.withProp > 0) console.log(`   - SOME elements of type "${o.type}" have the prop "${o.prop}" set`);
    if (o.withOutProp == o.ofType) console.log(`   - NO elements of type "${o.type}" have the prop "${o.prop}" set`);
    else if (o.withOutProp > 0) console.log(`   - SOME elements of type "${o.type}" do NOT have the prop "${o.prop}" set`);
}
console.log('=====================================================================');

// const nodeElemsWithLat = getAllElementsOfTypeAndPropData(ALL_ELEMENTS, 'node', 'lat');
// // console.log('nodeELemWithLat', nodeElemsWithLat);
// dumpStuff(nodeElemsWithLat);
dumpStuff(getAllElementsOfTypeAndPropData(ALL_ELEMENTS, 'node', 'lat'));
dumpStuff(getAllElementsOfTypeAndPropData(ALL_ELEMENTS, 'node', 'tags'));
dumpStuff(getAllElementsOfTypeAndPropData(ALL_ELEMENTS, 'node', 'nodes'));
console.log('=====================================================================');

dumpStuff(getAllElementsOfTypeAndPropData(ALL_ELEMENTS, 'way', 'lat'));
dumpStuff(getAllElementsOfTypeAndPropData(ALL_ELEMENTS, 'way', 'tags'));
dumpStuff(getAllElementsOfTypeAndPropData(ALL_ELEMENTS, 'way', 'nodes'));

const collectTags= (elements, tagName) => {
    const values = {};
    elements.forEach(e => {
        const tags = e.tags || {};
        const tagVal = tags[tagName] || '';
        values[tagVal] = values[tagVal] || 0;
        values[tagVal]++;
    })
    console.log('Tags of type:', tagName);
    console.log(Object.keys(values));
    console.log(JSON.stringify(values, undefined, 4));
    return values;
}
collectTags(ALL_ELEMENTS, 'highway');

// ELEMENT TYPE of 'NODE':
//  All element.type == 'node' has LAT/LNG
//  SOME element.type == 'node' may have tags (id: 49774233 has tags.highway)
//  NO element.type == 'node' will nodes set

// ELEMENT TYPE of 'WAY':
//  All element.type == 'way' DO NOT have LAT/LNG
//  All element.type == 'way' have tags set
//  All element.type == 'way' have nodes set



// const dumpElemsWithoutLatLon = (elements) => {
//     elements
//         .filter(e => e.lat == undefined)
//         .forEach(he => {
//             console.log(` - type: ${he.type}  id: ${he.id}`);
//         });

// }
// dumpElemsWithoutLatLon(ALL_ELEMENTS);

const OverpassHighwayFile = () => { }

// Highway Files:
// Fetch a Highway File with Bounds
// Save a Highway File with Fetch and Bounds info as JSON
// Load a Highway File with Fetch and Bounds info from JSON

// RoadLine Files (StartEndNameType)
// Load a RoadLine File as lines of start, end, "street", type
// Save a RoadLine File as lines of start, end, "street", type
// Save a RoadLine File with Highway File, Fetch and Bounds info as JSON
// Load a RoadLine File with Highway File, Fetch and Bounds info from JSON

// Intersection File (Start,End)
// Load an Intersection File with Fetch and Bounds info from JSON
