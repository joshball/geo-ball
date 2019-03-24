// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...

// export * from './ApiTypes';

// tslint:disable: no-submodule-imports
// import * as HiddenTypes from 'fannypack/ts/Hidden/Hidden';
// export { HiddenTypes };

// export { HiddenProps } from 'fannypack/ts/Hidden/Hidden';
// export { HiddenContainerProps } from 'fannypack/ts/Hidden/HiddenContainer';
// export { HiddenHideProps } from 'fannypack/ts/Hidden/HiddenHide';
// export { HiddenShowProps } from 'fannypack/ts/Hidden/HiddenShow';
// export { HiddenToggleProps } from 'fannypack/ts/Hidden/HiddenToggle';

// export * from 'fannypack/ts/Card/CardCard';
// export * from 'fannypack/ts/Card/CardContent';
// export * from 'fannypack/ts/Card/CardFooter';
// export * from 'fannypack/ts/Card/CardHeader';
// export * from 'fannypack/ts/Card/CardTitle';

export interface IHiddenProps {
    isVisible: boolean;
    show: () => void;
    hide: () => void;
    toggle: () => void;
}
