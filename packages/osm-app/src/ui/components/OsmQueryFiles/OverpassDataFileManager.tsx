import React from 'react';
import {
    DataFileManager,
    IDataFileManagerProps,
} from 'react-data-file-manager';

import { IOverpassQueryFilesService } from '@ui/services/OverpassQueryFilesService';
import { OverpassQueryFileEditForm } from './OverpassQueryFileEditForm';
import {
    OverpassQueryFileTableRowHeader,
    OverpassQueryFileTableRow,
} from './OverpassQueryFileTableRow';

import { createFileBoundActions } from './OverpassQueryFileTableRowActions';

export interface IOverpassDataFileManagerProps {
    fileService: IOverpassQueryFilesService;
}

export const OverpassDataFileManager: React.FC<
    IOverpassDataFileManagerProps
> = props => {
    const dmProps: IDataFileManagerProps = {
        // This wont change
        fileMgrTitle: 'Overpass Query File Manager',

        // this service is used to fetch/save/delete files
        fileEditorService: props.fileService,

        // Form for editing the file contents
        editFileForm: OverpassQueryFileEditForm,
        editJsonFileForm: OverpassQueryFileEditForm,

        // The Table that displays the Directory files has a header and many rows
        // This is the table header:
        dirFilesTableHeader: OverpassQueryFileTableRowHeader,

        // This is the table row (for each file)
        dirFilesTableRow: OverpassQueryFileTableRow,

        // This function takes a single file and creates the bound actions
        createFileBoundActions,
    };
    return <DataFileManager {...dmProps} />;
};
