import * as React from 'react'
import { css } from 'glamor'
import { observer, inject } from 'mobx-react';
import { colors, fontSizes, fonts } from "../../config/theme"
import { RootStore } from '../../stores/RootStore';


export interface ChangeMapTilesComponentProps {
    stores?: RootStore;
}


const singleResultCss = css({
    border: '1px solid grey',
    marginTop: '10px',
    padding: '6px'
})

const labelCss = css({
    color: colors.text,
    fontSize: fontSizes.medium,
    fontFamily: fonts.Roboto,
    padding: 0,
    margin: 0,
})

const llCss = css({
    marginLeft: '16px'
})

const outerBoxCss = css({
    flex: '0 0 auto',
    margin: '15px',
    padding: '15px',
    borderRadius: '6px',
    backgroundColor: '#ebf1f5',
})

const headingCss = css({
    marginBlockStart: '0',
    marginBlockEnd: '0',
})

// [40.7563038, -111.8781928]
@inject("stores")
@observer
export class ChangeMapTilesComponent extends React.Component<ChangeMapTilesComponentProps> {
    state = {
        selected: undefined,
    }

    handleChange = (e: any) => {
        this.setState({
            selected: e.target.value
        })
    }

    handleSearch = (e: any) => {
        e.preventDefault()
    }

    render() {
        // console.log('render. results', this.state.results)
        return (
            <div className={`${outerBoxCss}`}>
                <form onSubmit={this.handleSearch}>
                    <h3 className={`${headingCss}`}>Change Map Tiles</h3>
                    <div className="bp3-select .modifier">
                        <select value={this.state.selected} onChange={this.handleChange}>
                            <option>Choose an item...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            <option value="4">Four</option>
                        </select>
                    </div>
                </form>
            </div >
        )
    }
}

