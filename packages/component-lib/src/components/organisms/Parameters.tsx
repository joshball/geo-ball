import * as React from 'react'
import { Card, Elevation, Collapse } from '@blueprintjs/core';
import { css } from 'glamor';
import { cardStyle } from '../themes/ApiStyles';

export interface IApiUrlParametersViewState {
    isOpen: boolean
}
export interface IApiUrlParametersViewProps {
    formData: any
}


export class ApiUrlParametersView extends React.Component<IApiUrlParametersViewProps, IApiUrlParametersViewState> {
    state: IApiUrlParametersViewState;
    constructor(props: IApiUrlParametersViewProps) {
        super(props);
        this.state = {
            isOpen: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    private handleClick = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    render() {
        const mainFormWrapDiv = {
            display: 'flex',
            // height: '440px',
        };
        const colCard = {
            flexGrow: 1,
            margin: ' 0px 10px 0px 10px ',
            flex: '1 1 0',
        };
        const mainQueryStyle = css({
            display: 'flex',
            flexDirection: 'row',
            // margin: '10px',
            padding: '10px',
            // justifyContent: 'space-between',
            // alignContent: 'flex-end',
            // width: '90%',
            // align:'right',
            // backgroundColor: colors.pastels.litBlue,
        });
        const queryColStyle = css({
            display: 'block',
            overflowWrap: 'break-word',
            overflow: 'auto',
            // margin: '10px',
            // padding: '10px',
            // width: '100%',
            // width: '325px',
            // maxWidth: '325px',
            // backgroundColor: colors.pastels.litBlue,
        });
        const qp = this.getQueryParams(this.props.formData);
        return <Card style={cardStyle} interactive={false} elevation={Elevation.FOUR}>
            <div {...mainQueryStyle}>
                <Collapse isOpen={this.state.isOpen}>
                    <Card style={colCard} interactive={false} elevation={Elevation.TWO}>
                        <div {...queryColStyle}>
                            <pre>{JSON.stringify(this.props.formData, null, 4)}</pre>
                        </div>
                    </Card>
                    <Card style={colCard} interactive={false} elevation={Elevation.TWO}>
                        <div {...queryColStyle}>
                            <pre>{JSON.stringify(qp.map, null, 4)}</pre>
                        </div>
                    </Card>
                    <Card style={colCard} interactive={false} elevation={Elevation.TWO}>
                        <div {...queryColStyle}>
                            <pre>{qp.map.join('\n')}</pre>
                        </div>
                    </Card>
                </Collapse>
            </div>
            <div>
                EnodedURL: <pre>{qp.url}</pre>
            </div>
        </Card>;
    }

    getQueryParams(obj: any) {
        const map = Object.keys(obj)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent((obj as any)[k]))
        return {
            map,
            url: map.join('&')

        }
    }
}


export class ApiFormParametersView extends React.Component {
    render() {
        return <div>ApiFormParametersView</div>
    }
}
