import React from 'react';

export interface MediaProps {
    query: string;
    children: any;
}
export interface MediaState {
    matches: boolean;
}

class Media extends React.Component<MediaProps, MediaState> {
    state = {
        matches: window.matchMedia(this.props.query).matches,
    };
    removeListener?: () => void | undefined;

    componentDidMount() {
        this.setup();
    }

    componentWillUnmount() {
        this.removeListener!();
    }

    componentDidUpdate(prevProps: MediaProps) {
        if (prevProps.query !== this.props.query) {
            this.removeListener!();
            this.setup();
        }
    }

    setup() {
        const media = window.matchMedia(this.props.query);
        if (media.matches !== this.state.matches) {
            this.setState({ matches: media.matches });
        }
        const listener = () => this.setState({ matches: media.matches });
        media.addListener(listener);
        this.removeListener = () => media.removeListener(listener);
    }

    render() {
        return this.props.children(this.state.matches);
    }
}

const mq = () => {
    return (
        <Media query="(max-width: 400px)">
            {(small: boolean) => (
                <Media query="(min-width: 800px)">
                    {(large: boolean) => (
                        <div className="Media">
                            <h1>Media</h1>
                            <p>Small? {small ? 'Yep' : 'Nope'}</p>
                            <p>Large? {large ? 'Yep' : 'Nope'}</p>
                        </div>
                    )}
                </Media>
            )}
        </Media>
    );
};

const mqh = () => {
    const small = useMedia('(max-width: 400px)');
    const large = useMedia('(min-width: 800px)');
    return (
        <div className="Media">
            <h1>Media</h1>
            <p>Small? {small ? 'Yep' : 'Nope'}</p>
            <p>Large? {large ? 'Yep' : 'Nope'}</p>
        </div>
    );
};

const useMedia = (query: string) => {
    const [matches, setMatches] = React.useState(window.matchMedia(query).matches);
    React.useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        media.addListener(listener);
        return () => media.removeListener(listener);
    }, [query]);

    return matches;
};

const App = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    return <div />;
};
