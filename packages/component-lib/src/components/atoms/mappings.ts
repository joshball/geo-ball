import * as React from 'react';

// import { ReakProvider } from '../../atoms';
// import theme from 'reakit-theme-default';
import { ButtonProps } from 'fannypack/ts/Button/Button';
import PropTypes from 'prop-types';

// Themes
export { ThemeProvider } from 'fannypack';

// Utils
export { Set, Group, Modal, Overlay, Backdrop, Hidden, Portal } from 'fannypack';

// Styles???
export { styled, css } from 'fannypack';

// Animations
// export { Slide } from 'fannypack';

// Primitives
export { Box, Block, Inline, InlineBlock, Flex, InlineFlex, Grid } from 'fannypack';

// Typography
export { Blockquote, Code, Heading, Link, List, Paragraph, Text } from 'fannypack';

// Layout
export { Column, Columns, Container, LayoutSet, Pane } from 'fannypack';

// Containers
// export { Hidden } from 'reakit';
export { Card as RkCard } from 'reakit';

// Components
export { Button, Card, Divider, Table, Tabs, Tag, Timeline, Toast, Tooltip } from 'fannypack';

// Forms
export {
    Checkbox,
    FieldSet,
    FieldWrapper,
    Input,
    InputField,
    Label,
    Radio,
    RadioGroup,
    Select,
    SelectMenu,
    Switch,
    SwitchField,
    Textarea,
} from 'fannypack';

// Props
// export { buttonPropTypes, buttonDefaultProps } from 'fannypack/ts/Button/Button';
// export { ButtonProps, LocalButtonProps } from 'fannypack';
// export { Card } from 'fannypack/ts/Card';
// export { SwitchProps } from 'fannypack/ts/Switch/Switch';

// Formik Field Adaptor
// https://fannypack.style/form/form-libraries

import {
    CheckboxField,
    InputField,
    // RadioField,
    RadioGroupField,
    SelectField,
    SelectMenuField,
    SwitchField,
    TextareaField,
} from 'fannypack';

import { formikField } from '../_external/fannypack';
// export { formikField };

export const FormikCheckboxField = formikField(CheckboxField);
export const FormikInputField = formikField(InputField);
// export const FormikRadioField = formikField(RadioField);
export const FormikRadioGroupField = formikField(RadioGroupField);
export const FormikSelectField = formikField(SelectField);
export const FormikSelectMenuField = formikField(SelectMenuField);
export const FormikSwitchField = formikField(SwitchField);
export const FormikTextareaField = formikField(TextareaField);
