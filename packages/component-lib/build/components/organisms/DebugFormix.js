"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const formik_1 = require("formik");
exports.DebugFormix = () => (React.createElement("div", { style: {
        margin: '3rem 0',
        borderRadius: 4,
        background: '#f6f8fa',
        boxShadow: '0 0 1px  #eee inset',
    } },
    React.createElement("div", { style: {
            textTransform: 'uppercase',
            fontSize: 11,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            fontWeight: 500,
            padding: '.5rem',
            background: '#555',
            color: '#fff',
            letterSpacing: '1px',
        } }, "Formik State"),
    React.createElement(formik_1.FormikConsumer, null, (_a) => {
        var { validate, resetForm } = _a, rest = __rest(_a, ["validate", "resetForm"]);
        console.log('DEBUG:');
        // console.log('DEBUG:', validate, resetForm, rest)
        // console.log('DEBUG rest...', rest)
        // console.log('DEBUG.this:', this)
        // console.log('formiksProps', JSON.stringify(formikProps, null, 4))
        return (React.createElement("pre", { style: {
                fontSize: '.65rem',
                height: '500px',
                padding: '.25rem .5rem',
                overflowX: 'scroll',
            } }, JSON.stringify(rest, null, 2)));
    })));
//# sourceMappingURL=DebugFormix.js.map