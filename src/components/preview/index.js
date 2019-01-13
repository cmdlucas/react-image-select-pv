import React from 'react';

export const Preview = ({ images, onRemove }) => {

    const loadedImages = images.map((image, index) => {
        return (
            <div className="each-image" key={index}>
                <div className="box no-user-select">
                    <img alt=" " className="loader-center" src={image.content} />
                    <div className="ab-position-cancel" data-index={image.index} onClick={() => onRemove(image.index)}>
                        <div className="small-cancel">
                            <span>x</span>
                        </div>
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