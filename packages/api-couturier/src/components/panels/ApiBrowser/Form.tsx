import * as React from 'react';
import { Card, styled } from '@geo-ball/component-lib';

const SectionCard = styled(Card)`
    margin: 50px 0px 30px 0px;
`;
export class FormContainer extends React.Component {
    render() {
        return (
            <div>
                <SectionCard elevation="400">BBB: {this.props.children}</SectionCard>
            </div>
        );
    }
}
