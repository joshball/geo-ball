import React from 'react';
import { Button, ButtonGroup, Divider } from '@blueprintjs/core';
import { DirFileMgrDialogType } from 'react-data-file-manager';

import { IOverpassQueryFile } from '@ui/services/OverpassQueryFilesService';

export type OverpassQueryFileTableRowActionFile = (
    dialogType: DirFileMgrDialogType,
    file: IOverpassQueryFile
) => void;

export type OverpassQueryFileTableRowEventAction = (event: any) => void;

export interface IOverpassQueryFileTableRowEventActions {
    onEditClickEvent: OverpassQueryFileTableRowEventAction;
    onEditJsonClickEvent: OverpassQueryFileTableRowEventAction;
    onDeleteEvent: OverpassQueryFileTableRowEventAction;
}

export const createFileBoundActions = (
    file: IOverpassQueryFile,
    onOpenDialog: OverpassQueryFileTableRowActionFile
): IOverpassQueryFileTableRowEventActions => {
    return {
        onEditClickEvent: (_event: any) => onOpenDialog('edit', file),
        onEditJsonClickEvent: (_event: any) => onOpenDialog('editJson', file),
        onDeleteEvent: (_event: any) => onOpenDialog('delete', file),
    };
};

export const OverpassQueryFileTableRowActions = (
    eventActions: IOverpassQueryFileTableRowEventActions
) => {
    const {
        onEditClickEvent,
        onEditJsonClickEvent,
        onDeleteEvent,
    } = eventActions;
    return (
        <ButtonGroup minimal={true}>
            <Button icon="edit" onClick={onEditClickEvent} />
            <Divider />
            <Button icon="manually-entered-data" onClick={onEditJsonClickEvent}>
                JSON
            </Button>
            <Divider />
            {/* <Button onClick={onDeleteEvent}>Rename</Button>
            <Button onClick={onDeleteEvent}>Move</Button>
            <Button onClick={onDeleteEvent}>Edit Raw</Button>
            <Divider /> */}
            <Button icon="delete" onClick={onDeleteEvent} />
        </ButtonGroup>
    );
};
