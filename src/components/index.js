import React, { Component } from 'react';
import ispPropTypesChecker from '../utils/props/checkers/ispChecker';
import rootDefaultState from '../utils/state/default/rootState';
import Label from './label';
import Errors from './errors';
import Preview from './preview';
import Prompter from './prompter';
import ImageLoader from '../utils/worker/ImageLoader';
import Broadcaster from '../utils/worker/Broadcaster';

import '../static/css/base.css';


export class Root extends Component {

    state = rootDefaultState();

    ownOnChange(e) {
        this.setState({
            ...this.state,
            fetching: true
        })
        new ImageLoader(e.target.files, { 
            ...this.state, 
            max: this.props.max,
            maxImageSize: this.props.maxImageSize
        }).load()
            .then(newState => {
                if (this._mounted) {
                    this.setState({ ...newState });
                    this.broadcastNewState();
                }
            })
    }

    ownOnRemove(index) {
        let imagesToPreview = [...this.state.imagesToPreview];
        for (let i = 0; i < imagesToPreview.length; i++) {
            if (imagesToPreview[i].index === index) {
                imagesToPreview.splice(i, 1);
                break;
            }
        }
        if (this._mounted) {
            this.setState({
                ...this.state, problemFiles: [],
                imagesToPreview: imagesToPreview,
            })
        }
    }

    broadcastNewState() {        
        const broadcast = new Broadcaster({
            imagesToPreview: this.state.imagesToPreview,
            problems: this.state.problemFiles
        })
        broadcast.emitData(this.props.onChange);
        broadcast.emitErrors(this.props.onError);
    }

    componentDidMount() {
        this._mounted = true;
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    render() {
        const { max, preview, componentLabel, buttonText, imageStyle} = this.props;
        const { fetching, imagesToPreview, problemFiles } = this.state;

        return (
            <div className="rt-image-select-pv">
                <div className="holder">

                    {componentLabel !== null ?
                        <Label value={componentLabel} />
                        : null
                    }

                    {preview ?
                        <Preview images={imagesToPreview} 
                                onRemove={index => this.ownOnRemove(index)} imageStyle={imageStyle} />
                        : null
                    }

                    {problemFiles.length > 0 ?
                        <Errors errors={problemFiles} />
                        : null
                    }

                    {imagesToPreview.length < max ?
                        <Prompter onChange={e => this.ownOnChange(e)} fetching={fetching} buttonText={buttonText} />
                        : null
                    }

                </div>
            </div>
        );
    }
}

Root.propTypes = ispPropTypesChecker();

export default Root;