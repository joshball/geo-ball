import React from 'react';
import styled from '@emotion/styled';

export const CenteredContent = styled.div`
    display: flex;
    flex: 1; // same as: flex-grow: 1; flex-shrink: 1; flex-basis: auto;
    flex-direction: column;
    overflow: hidden;
        justify-content: center;
        align-items: center;
`;

// export interface CenteredContentProps {
//     children: React.ReactNode;
//     style?: React.CSSProperties | Array<React.CSSProperties> | false | null;
// }

// const BASE = compose(
//     styles.flex1,
//     styles.column,
//     cssProps({
//         overflow: 'hidden',
//         justifyContent: 'center',
//         alignItems: 'center',
//     }),
// );

// export function CenteredContent(props: CenteredContentProps) {
//     return <div {...css(BASE, props.style)}>{props.children}</div>;
// }
