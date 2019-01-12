import React from 'react';

export const Preview = ({ images, onRemove }) => {

    const loadedImages = images.map((image, index) => {
        return (
            <div className="each-image" key={index}>
                <div className="box">
                    <div className="new-post-image no-user-select rel-position">
                        <div className="new-post-image-selector">
                            <p className="text-center">
                                <img alt=" " className="selected-image loader-center" src={image.content} />
                            </p>
                        </div>
                        <span className="ab-position small-cancel" data-index={image.index} onClick={() => onRemove(image.index)}>
                            <i className="material-icons">close</i>
                        </span>
                    </div>
                </div>
            </div>
        )

    })

    return (
        <React.Fragment>
            {
                images.length > 0 ? <div className="preview"> {loadedImages} </div> : null
            }
        </React.Fragment>
    );
}

export default React.memo(Preview)