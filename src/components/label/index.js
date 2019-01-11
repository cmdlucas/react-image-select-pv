import React from 'react';

export const Label = ({ value }) => {
    return (
        <div className="label">
            <span className="label-text">
                { value }
            </span>
        </div>
    );
}

export default React.memo(Label)