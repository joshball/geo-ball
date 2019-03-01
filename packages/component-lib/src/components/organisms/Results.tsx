import * as React from 'react';
import stringify from 'json-stringify-safe';

import { Card } from '../atoms';
import { cardStyle } from '../themes/ApiStyles';

export class ResultsContainer extends React.Component {
    render() {
        return (
            <Card style={cardStyle} elevation="400">
                <h4>Results</h4>
                <pre>{stringify(this.props.children, null, 4)}</pre>
            </Card>
        );
    }
}

const AltApiResultsView = (json: any) => (
    <div
        style={{
            margin: '3rem 0',
            borderRadius: 4,
            background: '#f6f8fa',
            boxShadow: '0 0 1px  #eee inset',
        }}
    >
        <div
            style={{
                textTransform: 'uppercase',
                fontSize: 11,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                fontWeight: 500,
                padding: '.5rem',
                background: '#555',
                color: '#fff',
                letterSpacing: '1px',
            }}
        >
            API RESULT
        </div>
        <pre
            style={{
                fontSize: '.65rem',
                padding: '.25rem .5rem',
                overflowX: 'scroll',
            }}
        >
            {stringify(json, null, 4)}
        </pre>
    </div>
);
