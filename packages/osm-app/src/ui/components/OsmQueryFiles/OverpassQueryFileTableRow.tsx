import React from 'react';

import { IOverpassQueryFile } from '@ui/services/OverpassQueryFilesService';
import {
    OverpassQueryFileStyledTableRow,
    OverpassQueryFileStyledTableRowFilenameData,
} from './OverpassQueryFileFormStyles';

import {
    IOverpassQueryFileTableRowEventActions,
    OverpassQueryFileTableRowActions,
} from './OverpassQueryFileTableRowActions';

export const OverpassQueryFileTableRowHeader = () => (
    <OverpassQueryFileStyledTableRow>
        <th style={{ width: '20%' }}>Filename</th>
        <th>Name</th>
        <th style={{ width: '10%' }}>Age</th>
        <th style={{ width: '15%' }}>Color</th>
        <th style={{ width: '180px', textAlign: 'center' }}>Actions</th>
    </OverpassQueryFileStyledTableRow>
);

export const OverpassQueryFileTableRow = (
    rowData: IOverpassQueryFile,
    eventActions: IOverpassQueryFileTableRowEventActions,
    index: number
) => {
    const { onEditClickEvent } = eventActions;
    const { filename } = rowData;
    const { name, age, color } = rowData.contents;
    // const [promptDelete, setPromptDelete] = useState();
    return (
        <OverpassQueryFileStyledTableRow key={`${index}-2`}>
            <OverpassQueryFileStyledTableRowFilenameData
                onClick={onEditClickEvent}
            >
                {filename}
            </OverpassQueryFileStyledTableRowFilenameData>
            <td onClick={onEditClickEvent}>{name}</td>
            <td onClick={onEditClickEvent}>{age}</td>
            <td onClick={onEditClickEvent}>{color}</td>
            <td>{OverpassQueryFileTableRowActions(eventActions)}</td>
        </OverpassQueryFileStyledTableRow>
    );
};
