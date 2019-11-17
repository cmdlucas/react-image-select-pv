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


class Root extends Component {

    state = rootDefaultState();

    /**
     * Load images supplied by user
     * @param {FileList[]} files 
     */
    loadImages(files) {
        this.setState({
            ...this.state,
            fetching: true
        })
        new ImageLoader(files, {
            ...this.state,
            max: this.props.max,
            maxImageSize: this.props.maxImageSize,
            allowedImages: this.props.imageTypes
        }).load()
            .then(newState => {
                if (this._mounted) {
                    this.setState({ ...newState }, () => this.broadcastNewState());
                }
            })
    }

    /**
     * React to changes from input event
     * @param {Event} e 
     */
    ownOnChange(e) {
        this.loadImages(e.target.files);
    }

    /**
     * React to user's request to remove item
     * @param {string} imgIndex 
     */
    ownOnRemove(imgIndex) {
        let imagesToPreview = [...this.state.imagesToPreview];
        if (this._mounted) {
            this.setState({
                ...this.state, problemFiles: [],
                imagesToPreview: imagesToPreview.filter(({ index }) => imgIndex !== index)
            }, () => this.broadcastNewState());
        }
    }

    /**
     * Broadcast new state to API user
     */
    broadcastNewState() {
        const broadcast = new Broadcaster({
            problems: this.state.problemFiles,
            images: this.state.imagesToPreview
        })
        broadcast.emitData(this.props.onChange);
        broadcast.emitErrors(this.props.onError);
    }

    /**
     * Respond when something is dragged over
     * @param {DragEvent} e 
     */
    handleDragOver(e) {
        e.preventDefault();
        return false;
    }

    /**
     * Respond when something is dropped
     * @param {DragEvent} e 
     */
    handleDrop(e) {
        e.preventDefault();
        this.loadImages(e.dataTransfer.files);
        return false;
    }

    /**
     * Handle reset event
     * @param {boolean} reset 
     */
    handleReset(reset) {
        if (reset && this._mounted) {
            this.setState({ ...rootDefaultState() })
        }
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.reset !== this.props.reset) {
            this.handleReset(this.props.reset);
        }
    }

    componentDidMount() {
        this._mounted = true;
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    render() {
        const { max, preview, componentLabel, buttonText, dropAreaText, imageStyle } = this.props;
        const { fetching, imagesToPreview, problemFiles } = this.state;

        return (
            <div className="rt-image-select-pv" onDrop={e => this.handleDrop(e)} onDragOver={e => this.handleDragOver(e)}>
                <div className="holder">

                    {componentLabel && <Label value={componentLabel} />}

                    {preview && <Preview images={imagesToPreview}
                        onRemove={index => this.ownOnRemove(index)} imageStyle={imageStyle} />}

                    {problemFiles.length > 0 && <Errors errors={problemFiles} />}

                    {imagesToPreview.length < max &&
                        <Prompter onChange={e => this.ownOnChange(e)} fetching={fetching} buttonText={buttonText} dropAreaText={dropAreaText} />}

                </div>
            </div>
        );
    }
}

Root.propTypes = ispPropTypesChecker();

export default Root;