import React from 'react';
import { ExampleAppStore } from '@store/AppStore';
// import { OsmFetchManagerComponent } from '@ui/components/files/OsmFetchManagerComponent';
import {
    OverpassDataFileManager,
    IOverpassDataFileManagerProps,
} from '@ui/components/OsmQueryFiles';
import { OverpassQueryFilesService } from '@ui/services/OverpassQueryFilesService';

export const OverpassDataFileManagerPage: React.SFC<any> = (_props: any) => {
    const odfmProps: IOverpassDataFileManagerProps = {
        fileService: new OverpassQueryFilesService(ExampleAppStore.osmDataDir),
    };
    return <OverpassDataFileManager {...odfmProps} />;
};
