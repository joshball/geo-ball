import * as React from 'react';
import { Switch, Hidden, styled, Card, Box } from '@geo-ball/component-lib';
import { HiddenDebuggerSection } from '../../molecules/HiddenDebuggerSection/HiddenDebuggerSection';
import { DebuggerSwitch } from '../../molecules/DebuggerSwitch/DebuggerSwitch';
import { ApiFormSectionMgr } from '../../../utils/forms/ApiFormManager';

const SectionCard = styled(Card)`
    margin: 30px 0px 20px 0px;
`;

export interface IApiFormSectionViewProps {
    title: string;
    formMgr: ApiFormSectionMgr<any>;
    mainForm: any;
    debugForm: any;
    // config: ActionFormikConfig<any>;
}

export interface IApiFormSectionViewState {
    formState: any;
}

export class ApiFormSectionView extends React.Component<
    IApiFormSectionViewProps,
    IApiFormSectionViewState
> {
    props: IApiFormSectionViewProps;
    state: IApiFormSectionViewState;

    constructor(props: IApiFormSectionViewProps) {
        super(props);
        this.props = props;
        this.state = {
            formState: {},
        };
    }

    render() {
        // const { title, mainForm, debugForm, ...rest } = this.props;
        const { mainForm, debugForm } = this.props;
        const { formState } = this.state;
        if (!mainForm && !debugForm) {
            return null;
        }
        // const paramsDbgProps = createParameterDebuggerProps(formState);
        // const sectionView = createApiFormSectionView(title, form, paramsDbgProps);
        // <HiddenDebuggerSection {...hidden} {...title} {...formToRender}>
        //     {debugForm}
        // </HiddenDebuggerSection>

        return (
            <Hidden.Container initialState={{ visible: true }}>
                {(hidden: any) => {
                    return (
                        <HiddenDebuggerSection
                            hidden={hidden}
                            {...this.props}
                            formState={formState}
                        />
                    );
                }}
            </Hidden.Container>
        );
    }
}
// export class ApiFormSectionView extends React.Component<
//     IApiFormSectionViewProps,
//     IApiFormSectionViewState
// > {
//     props: IApiFormSectionViewProps;
//     state: IApiFormSectionViewState;

//     constructor(props: IApiFormSectionViewProps) {
//         super(props);
//         this.props = props;
//         this.state = {
//             formState: {},
//         };
//     }

//     render() {
//         const { title, form } = this.props;
//         const { formState } = this.state;
//         if (!form) {
//             return null;
//         }
//         const paramsDbgProps = createParameterDebuggerProps(formState);
//         const sectionView = createApiFormSectionView(title, form, paramsDbgProps);

//         return <Hidden.Container initialState={{ visible: false }}>{sectionView}</Hidden.Container>;
//     }
// }

// const DebugColumn = styled(Box)`
//     display: block;
//     overflow-wrap: break-word;
//     overflow: auto;
// `;

// const createParameterDebuggerProps = (formState: any): IParameterDebuggerPanelProps => {
//     return {
//         debugParamersView: (
//             <DebugColumn>
//                 <pre>{JSON.stringify(formState, null, 4)}</pre>
//             </DebugColumn>
//         ),
//         debugEncodedParamersView: (
//             <DebugColumn>
//                 <pre>{JSON.stringify(formState, null, 4)}</pre>
//             </DebugColumn>
//         ),
//         debugFormView: (
//             <DebugColumn>
//                 <pre>{JSON.stringify(formState, null, 4)}</pre>
//             </DebugColumn>
//         ),
//     };
// };

// const createApiFormSectionView = (sectionTitle: string, form: any) => {
//     return (hiddenProps: any) => {
//         return (
//             <SectionCard
//                 elevation="400"
//                 title={sectionTitle}
//                 headerActions={<DebuggerSwitch {...hiddenProps} />}
//             >
//                 {form}
//                 <Box>
//                     <Hidden {...hiddenProps} />
//                 </Box>
//             </SectionCard>
//         );
//     };
// };
