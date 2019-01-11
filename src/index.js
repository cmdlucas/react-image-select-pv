import React from 'react';
import Root from './components';
import ispDefaulProps from './utils/props/default/ispDefaulProps';
import ispPropTypesChecker from './utils/props/checkers/ispChecker';

export const ImageSelectPreview = (props) => {
    return (
        <React.Fragment>
            { (!props.hide && props.max > 0 ) ? <Root { ...props } /> : null }
        </React.Fragment>
    );
};

ImageSelectPreview.defaultProps = ispDefaulProps();

ImageSelectPreview.propTypes = ispPropTypesChecker();

export default React.memo(ImageSelectPreview);
