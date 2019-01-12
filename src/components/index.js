import React, { Component } from 'react';
import ispPropTypesChecker from '../utils/props/checkers/ispChecker';
import rootDefaultState from '../utils/state/default/rootState';
import Label from './label';
import Preview from './preview';
import Prompter from './prompter';

import '../static/css/base.css';

export class Root extends Component {
    
    state = rootDefaultState();

    ownOnChange(e) {

    }

    render() {
        const { max, preview, label } = this.props;
        const { images } = this.state;

        return (
            <div className="rt-image-select-pv">
                <div className="holder">

                    <Label value={ label } />

                    { preview ?  <Preview /> : null }

                    { images.length < max ? <Prompter onChange={ e => this.ownOnChange(e) } /> : null}

                </div>
            </div>
        );
    }
}

Root.propTypes = ispPropTypesChecker();

export default Root;