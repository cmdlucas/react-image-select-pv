import React, { Component } from 'react';
import ispPropTypesChecker from '../utils/props/checkers/ispChecker';
import rootDefaultState from '../utils/state/default/rootState';
import Label from './label';
import Images from './images';
import Prompter from './prompter';

import '../static/css/base.css';

export class Root extends Component {
    
    state = rootDefaultState()

    render() {
        const { max, preview, label } = this.props;
        const { images } = this.state;

        return (
            <div className="rt-image-select-pv">
                <div className="holder">

                    <Label value={ label } />

                    { preview ?  <Images /> : null }

                    { images.length < max ? <Prompter /> : null}

                </div>
            </div>
        );
    }
}

Root.propTypes = ispPropTypesChecker();

export default Root;