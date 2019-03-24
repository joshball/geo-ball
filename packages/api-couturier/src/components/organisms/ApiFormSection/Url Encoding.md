

// URI's
// encodeURI and encodeURIComponent
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
// Hence encodeURI does not encode characters that are necessary to formulate a complete URI. Also, encodeURI does not encode a few additional characters, known as "unreserved marks", which do not have a reserved purpose but are allowed in a URI "as is".  (See RFC2396)
// encodeURI escapes all characters except:
//  A-Z a-z 0-9 ; , / ? : @ & = + $ - _ . ! ~ * ' ( ) #
// encodeURIComponent escapes all characters except:
//  A-Z a-z 0-9 - _ . ! ~ * ' ( )
//
// For application/x-www-form-urlencoded, spaces are to be replaced by '+', so one may

// Query Parameter Encoding:
// Simple Object:
// const userObj = {
//     id: 3,
//     name: 'Abby',
// };
// // As JSON:
// // ?userObj={id:3, name:'Abby'}
// // ?userObj={id:3, name:'Abby'}

// const obj = {
//     num: 7,
//     numUndef: undefined,
//     str: 'some string',
//     strEmpty: '',
//     strUndef: undefined,
//     obj: {
//         subNum: 77,
//         subStr: 'sub str',
//     },
//     objUndef: undefined,
//     numArray: [1, 2, 3],
//     strArray: ['a', 'b', 'c'],
//     mixedArray: ['a', 1, ['x'], { whoa: 'nelly' }],
//     emptyArray: [],
//     checkboxes: [],
// };

//
// Encoding objects as Query Params
// As JSON:


