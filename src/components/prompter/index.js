import React from 'react';
import prompterIcon from "../../static/icons/mock-image.png"

const trigger = () => document.querySelector('#image-prompt').click();

export const Prompter = ({ onChange }) => {
    return (
        <div className="prompter no-user-select">
            <div className="box" onClick={() => trigger()}>
                <p className="text-center">
                    <input id="image-prompt" type="file" multiple className="gone" accept="image/*"
                        onChange={e => onChange(e)} />
                    <img alt=" " src={ prompterIcon } />
                    <br />
                    <small>Add Images</small>
                </p>
            </div>
        </div>
    );
}

export default React.memo(Prompter)