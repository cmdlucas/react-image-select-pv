import React from 'react';

export const Errors = ({ errors }) => {
    const errorsLoaded = errors.map((e, index) => {
        return (
            <div>
                <span>{ e.name }: { e.error }</span>
            </div>
        )
    })
    return (
        <React.Fragment>
            {
                errors.length > 0 ?
                    <div className="errors">
                        <h3>There were some errors with your images</h3>
                        {errorsLoaded}
                    </div>
                    : null
            }
        </React.Fragment>
    )
}

export default React.memo(Errors);