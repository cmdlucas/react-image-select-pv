import React from 'react';
import Root from './components';

export const ImageSelectPreview = (props) => {
    return (
        <React.Fragment>
            { !props.hide ? <Root { ...props } /> : null }
        </React.Fragment>
    );
};

export default React.memo(ImageSelectPreview);
