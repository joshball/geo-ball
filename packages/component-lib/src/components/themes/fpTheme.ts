// import { ThemeProvider } from '../atoms';

// https://fannypack.style/styling/theming
// https://fannypack.style/styling/fonts
const fonts = {
    systemUi: 'system-ui',
    appleSystem: '-apple-system',
    blinkMacSystemFont: 'BlinkMacSystemFont',
    segoeUi: 'Segoe UI',
    roboto: 'Roboto',
    o2: 'Oxygen',
    ubuntu: 'Ubuntu',
    cantarell: 'Cantarell',
    fira: 'Fira Sans',
    droid: 'Droid Sans',
    helvetica: 'Helvetica Neue',
    sansSerif: 'sans-serif',
    ConcertOne: "Concert One, cursive",
    Lato: "Lato, sans-serif",
    OpenSans: "Open Sans, sans-serif",
    Roboto: "Roboto, sans-serif",
    Oswald: "Oswald, sans-serif",
    Montserrat: "Montserrat, sans-serif",
    themeDefault: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    default: "Fira Code, Operator Mono, -apple-system, Helvetica Neue, Segoe UI, Roboto, Liberation Sans",
}

export const theme = {
    global: {
        fontFamily: fonts.default
    },
    webFontLoader: {
        google: {
            families: ['Lato:400,700']
        }
    },
    fontWeights: {
        normal: 400,
        bold: 700
    },
}

// https://fonts.adobe.com/collections/productivity-infographics-pack
// Source Serif Pro Regular
// Source Serif Pro Bold
// Source Code  Pro Regular
// Fira Sans Book
// Fira Sans Condensed Boo
// Halyard Text Medium
// Fira


// <style>
// @import url('https://fonts.googleapis.com/css?family=Cantarell|Fira+Mono|Fira+Sans+Condensed|Montserrat|Montserrat+Alternates|Oswald|Oxygen|Oxygen+Mono|Roboto|Roboto+Slab');
// @import url('https://fonts.googleapis.com/css?family=Cantarell:400,700|Fira+Mono:400,700|Fira+Sans+Condensed:400,700|Montserrat+Alternates:400,700|Montserrat:400,700|Oswald:400,700|Oxygen+Mono|Oxygen:400,700|Roboto+Slab:400,700|Roboto:400,700');
// </style>


// <link href="https://fonts.googleapis.com/css?family=Cantarell|Fira+Mono|Fira+Sans+Condensed|Montserrat|Montserrat+Alternates|Oswald|Oxygen|Oxygen+Mono|Roboto|Roboto+Slab" rel="stylesheet">
// <link href="https://fonts.googleapis.com/css?family=Cantarell:400,700|Fira+Mono:400,700|Fira+Sans+Condensed:400,700|Montserrat+Alternates:400,700|Montserrat:400,700|Oswald:400,700|Oxygen+Mono|Oxygen:400,700|Roboto+Slab:400,700|Roboto:400,700" rel="stylesheet">
// font-family: 'Fira Mono', monospace;
// font-family: 'Fira Sans Condensed', sans-serif;
// font-family: 'Roboto', sans-serif;
// font-family: 'Roboto Slab', serif;
// font-family: 'Oxygen', sans-serif;
// font-family: 'Oxygen Mono', monospace;
// font-family: 'Montserrat', sans-serif;
// font-family: 'Montserrat Alternates', sans-serif;
// font-family: 'Oswald', sans-serif;
// font-family: 'Cantarell', sans-serif;
