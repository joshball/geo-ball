import { readdirSync, lstatSync } from 'fs';
import { resolve, join, dirname, basename } from 'path';
import { getAllIndexFiles } from './getAllIndexFiles';

// First:
// Get all Directories and index files:
// Now get all the subdirs and build index files for them
const x = [
    {
        dir: 'src/components/',
        subDirs: ['atoms', 'molecules'],
        index: { existing: [], name: 'index.ts' },
    },
    {
        dir: 'src/components/atoms/',
        subDirs: ['Button', 'Header'],
        index: { existing: [], name: 'index.ts' },
    },
    {
        dir: 'src/components/atoms/Buttons/',
        subDirs: [],
        subFiles: ['Button.tsx', 'Button.css', 'Button.mdx'],
        index: { existing: ['index.tsx'], name: 'index.ts' },
    },
    {
        dir: 'src/components/molecules/',
        subDirs: [],
        index: { existing: [], name: 'index.ts' },
    },
];

const root = join(__dirname, '../src/components');

getAllIndexFiles(root);

// ATOMS
// $ w:\bin\find . -name index.ts
// ./Button/index.ts
// ./Heading/index.ts
// ./index.ts
// ./Placeholder/index.ts

// [ 'Button\\index.ts',
//   'Heading\\index.ts',
//   'Placeholder\\index.ts',
//   'atoms\\index.ts' ]

// components
// ./atoms/Button/index.ts
// ./atoms/Heading/index.ts
// ./atoms/index.ts
// ./atoms/Placeholder/index.ts
// ./index.ts
// ./molecules/index.ts
// ./organisms/ActionBar/index.ts
// ./organisms/ActionButton/index.ts
// ./organisms/ActionToggle/index.ts
// ./organisms/index.ts
// ./panels/ApiBrowser/index.ts
// ./panels/index.ts
// ./templates/index.ts
// ./themes/index.ts
