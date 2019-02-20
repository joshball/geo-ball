import * as React from 'react'
import { Field, FieldProps } from "formik";
import { css } from 'glamor';
import { FormikSwitch } from '../../common/input/FormikWrapped';


const toggleItem = css({
    boxSizing: 'border-box',
    padding: '0px 10px 0px 10px',
    // backgroundColor: colors.white,
    writingMode: 'horizontal-tb',
});

const toggleBox = css({
    writingMode: 'vertical-lr',
    display: 'inline-flex',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: '10px',
    // margin: '10px',
    // padding: '10px',
    height: '110px',
    // width: '100%',
    // border: '1px solid black',
    // backgroundColor: colors.primaryScale[3]
});
const WrappedField = (elem: any) => <div {...toggleItem}>{elem}</div>;

export const getSwitchesFormBox = () => (
    <div {...toggleBox}>
        {WrappedField(<Field name="toggles.addressdetails" label="Address Details" component={FormikSwitch} />)}
        {WrappedField(<Field name="toggles.bounded" label="Bounded" component={FormikSwitch} />)}
        {WrappedField(<Field name="toggles.dedupe" label="DeDupe" component={FormikSwitch} />)}
        {WrappedField(<Field name="toggles.debug" label="Debug" component={FormikSwitch} />)}
        {WrappedField(<Field name="toggles.extratags" label="Extra Tags" component={FormikSwitch} />)}
        {WrappedField(<Field name="toggles.namedetails" label="Name Details" component={FormikSwitch} />)}
        {WrappedField(<Field name="toggles.polygon_geojson" label="Polygon GeoJSON" component={FormikSwitch} />)}
        {WrappedField(<Field name="toggles.polygon_kml" label="Polygon KML" component={FormikSwitch} />)}
        {WrappedField(<Field name="toggles.polygon_svg" label="Polygon SVG" component={FormikSwitch} />)}
        {WrappedField(<Field name="toggles.polygon_text" label="Polygon Text" component={FormikSwitch} />)}
    </div>
);
