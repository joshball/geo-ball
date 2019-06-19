import styled from '@emotion/styled';

const DefaultFontFamilies = {
    serif: `"Palatino Linotype", "Book Antiqua", Palatino, serif`,
    sanSerif: `Arial, Helvetica, sans-serif`,
    monospace: `"Courier New", Courier, monospace`,
};

const Fonts = {
    serif: {
        merriweather: 'Merriweather',
        lato: 'Lato',
        libreBaskerville: 'Libre Baskerville',
        playfairDisplaySC: 'Playfair Display SC',
    },
    sanSerif: {
        roboto: 'Roboto',
        lato: 'Lato',
        montserrat: 'Montserrat',
        sourceSansPro: 'Source Sans Pro',
        bahnschrift: 'Bahnschrift',
        footlight: 'Footlight MT',
        agencyFB: 'Agency FB',
    },
    monospace: {
        firaCode: 'Fira Code',
        unbuntuMono: 'Ubuntu Mono',
        robotoMono: 'Roboto Mono',
        overpassMono: 'Overpass  Mono',
        nanumGothicCoding: 'Nanum Gothic Coding',
    },
};

const firstSanSerif = Fonts.sanSerif.lato;
// const firstSanSerif = Fonts.serif.libreBaskerville;
const sanSerifFonts = `"${firstSanSerif}", ${DefaultFontFamilies.sanSerif}`;
const firstMono = Fonts.monospace.nanumGothicCoding;
const monoFonts = `"${firstMono}", ${DefaultFontFamilies.monospace}`;

export const OverpassQueryFileStyledTableRow = styled.tr`
    font-family: ${sanSerifFonts};
    font-size: 1.2em;
`;

export const OverpassQueryFileStyledTableRowFilenameData = styled.td`
    font-family: ${monoFonts};
    font-size: 1em;
`;
