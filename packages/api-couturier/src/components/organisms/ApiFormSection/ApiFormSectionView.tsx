import * as React from 'react';
import { Switch, Hidden, styled, Card, Box } from '@geo-ball/component-lib';
import { HiddenDebuggerSection } from '../../molecules/HiddenDebuggerSection/HiddenDebuggerSection';
import { DebuggerSwitch } from '../../molecules/DebuggerSwitch/DebuggerSwitch';
import { ApiFormSectionMgr } from '../../../utils/forms/ApiFormManager';
import { Form, FormApi } from 'informed';

const SectionCard = styled(Card)`
    margin: 30px 0px 20px 0px;
`;

export interface IApiFormSectionViewProps {
    title: string;
    formMgr: ApiFormSectionMgr<any>;
    MainForm: any;
    DebugForm: any;
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
    // state: IApiFormSectionViewState;
    formApi?: FormApi<any>;

    constructor(props: IApiFormSectionViewProps) {
        super(props);
        this.props = props;
        // this.state = {
        //     formState: {},
        // };
        this.setFormApi = this.setFormApi.bind(this);
    }

    setFormApi(formApi: FormApi<any>) {
        this.formApi = formApi;
    }

    render() {
        // const { title, mainForm, debugForm, ...rest } = this.props;
        const { MainForm, DebugForm } = this.props;
        if (!MainForm && !DebugForm) {
            return null;
        }
        // const paramsDbgProps = createParameterDebuggerProps(formState);
        // const sectionView = createApiFormSectionView(title, form, paramsDbgProps);
        // <HiddenDebuggerSection {...hidden} {...title} {...formToRender}>
        //     {debugForm}
        // </HiddenDebuggerSection>
        console.log('ApiFormSectionView.render PROPS', this.props);

        return (
            <Form getApi={this.setFormApi} initialValues={this.props.formMgr.initialValues}>
                <Hidden.Container initialState={{ visible: true }}>
                    {(hidden: any) => {
                        return (
                            <HiddenDebuggerSection
                                hidden={hidden}
                                {...this.props}
                                // formState={formState}
                            />
                        );
                    }}
                </Hidden.Container>
            </Form>
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
