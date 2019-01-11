import React, { Component } from 'react';
import ispDefaulProps from '../utils/props/default/ispDefaulProps';
import ispPropTypesChecker from '../utils/props/checkers/ispChecker';

export class Root extends Component {
    render() {
        return (
            <div className="rt-image-select-pv">


            </div>
        );
    }
}

Root.defaultProps = ispDefaulProps();

Root.propTypes = ispPropTypesChecker();

export default Root;