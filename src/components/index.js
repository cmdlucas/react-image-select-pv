import React, { Component } from 'react';
import ispPropTypesChecker from '../utils/props/checkers/ispChecker';
import rootDefaultState from '../utils/state/default/rootState';
import Label from './label';
import Errors from './errors';
import Preview from './preview';
import Prompter from './prompter';
import ImageLoader from '../utils/worker/ImageLoader';

import '../static/css/base.css';

export class Root extends Component {

    state = rootDefaultState();

    ownOnChange(e) {
        this.setState({
            ...this.state,
            fetching: true
        })
        new ImageLoader(e.target.files, this.state).load()
            .then(newState => {
                if (this._mounted) {
                    this.setState({
                        ...newState
                    })
                }
            })
    }

    ownOnRemove(index) {
        let imagesToUpload = [...this.state.imagesToUpload];
        let imagesToPreview = [...this.state.imagesToPreview];
        //Different comparison because the storage method for both were async and sync 
        //Therefore different order could have been produced
        for (let i = 0; i < imagesToUpload.length; i++) {
            if (imagesToUpload[i].index === index) {
                imagesToUpload.splice(i, 1);
                break;
            }
        }
        for (let i = 0; i < imagesToPreview.length; i++) {
            if (imagesToPreview[i].index === index) {
                imagesToPreview.splice(i, 1);
                break;
            }
        }
        if (this._mounted) {
            this.setState({
                ...this.state,
                imagesToUpload: imagesToUpload,
                imagesToPreview: imagesToPreview,
            })
        }
    }

    componentDidMount() {
        this._mounted = true;
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    render() {
        const { max, preview, label } = this.props;
        const { fetching, imagesToUpload, imagesToPreview, problemFiles } = this.state;

        return (
            <div className="rt-image-select-pv">
                <div className="holder">

                    {preview ? <Preview images={imagesToPreview} onRemove={index => this.ownOnRemove(index)} /> : null}

                    <Errors errors={ problemFiles }/>

                    <Label value={label} />

                    {imagesToUpload.length < max ?
                        <Prompter max={ max } onChange={e => this.ownOnChange(e)} fetching={ fetching } /> 
                        : null
                    }

                </div>
            </div>
        );
    }
}

Root.propTypes = ispPropTypesChecker();

export default Root;