import React from 'react';

export const Errors = ({ errors }) => {
    const errorsLoaded = errors.map((e, index) => {
        return (
            <div className="each-error" key={index}>
                <span>{ e.name }: { e.error }</span>
            </div>
        )
    })
    return (
        <React.Fragment>
            {
                errors.length > 0 ?
                    <div className="errors">
                        <p>There were some errors with your selection:</p>
                        {errorsLoaded}
                    </div>
                    : null
            }
        </React.Fragment>
    )
}

export default React.memo(Errors);