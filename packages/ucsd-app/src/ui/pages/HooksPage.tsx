import * as React from 'react';
// import { Form } from 'informed';
// import Text from './IF/Text';
import { Form, Text } from 'informed';
import { useState, useContext, useEffect } from 'react';
import { css } from 'glamor';

const rowCss = css({
    display: 'block',
    margin: '10px',
    padding: '10px',
    borderRadius: '6px',
    backgroundColor: '#ebf1f5',
});

export function Row(props: any) {
    return (
        <div {...rowCss}>
            <span>
                {props.label}: {props.children}
            </span>
        </div>
    );
}

export interface IRowProp {
    label: string;
}
export interface IGreetingProp {
    name: string;
    surname: string;
}
export interface IGreetingState {
    name: string;
    surname: string;
}
export class GreetingClass extends React.Component<IGreetingProp, IGreetingState> {
    state: IGreetingState;

    constructor(props: IGreetingProp) {
        super(props);
        this.state = {
            name: props.name,
            surname: props.surname,
        };
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    handleNameChange(e: any) {
        this.setState({ name: e.target.value });
    }
    handleSurNameChange(e: any) {
        this.setState({ name: e.target.value });
    }
    componentDidMount() {
        document.title = this.state.name + ' ' + this.state.surname;
    }
    componentDidUpdate() {
        document.title = this.state.name + ' ' + this.state.surname;
    }
    render() {
        return (
            <section>
                <h3>GreetingClass</h3>
                <Row label="GreetingClass.Name">
                    <input value={this.state.name} onChange={this.handleNameChange} />
                </Row>
                <Row label="GreetingClass.Surname">
                    <input value={this.state.surname} onChange={this.handleSurNameChange} />
                </Row>
            </section>
        );
    }
}

export function GreetingHook(props: any) {
    const [name, setName] = useState(props.name);
    const [surname, setsSurname] = useState(props.surname);

    function handleNameChange(e: any) {
        setName(e.target.value);
    }
    function handleSurnameChange(e: any) {
        setsSurname(e.target.value);
    }
    useEffect(() => {
        document.title = name + ' ' + surname;
    });
    return (
        <section>
            <h3>GreetingHook</h3>
            <Row label="GreetingHook.Name">
                <div>{name}</div>
                <input value={name} onChange={handleNameChange} />
            </Row>
            <Row label="GreetingHook.Surname">
                <div>{surname}</div>
                <input value={surname} onChange={handleSurnameChange} />
            </Row>
        </section>
    );
}

export function Greeting(props: any) {
    return (
        <section>
            <h3>Greeting</h3>
            <Row label="Greeting.Name">{props.name}</Row>
            <Row label="Greeting.Surname">
                {props.surname}
                {/* <input value={name} onChange={handleNameChange} /> */}
            </Row>
        </section>
    );
}
export function Informed() {
    return (
        <section>
            <h2>InformedNotWorking</h2>
            <Form>
                {() => (
                    <div>
                        <label>
                            First name:
                            <Text field="name" />
                        </label>
                    </div>
                )}
            </Form>{' '}
        </section>
    );
}
function ReactHooksWorking() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h2>ReactHooksWorking</h2>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
}
export const HooksPage: React.SFC<any> = (props: any) => {
    return (
        <div>
            <ReactHooksWorking />
            <Informed />
        </div>
    );
};
