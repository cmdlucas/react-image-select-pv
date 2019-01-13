import React from 'react';
import prompterIcon from "../../static/icons/mock-image.png"
import spinner from '../../static/icons/ajax-loader.gif';

const trigger = () => document.querySelector('#image-prompt').click();

export const Prompter = ({ fetching, onChange }) => {
    return (
        <div className="prompter no-user-select">
            <div className="box text-center">
                    {
                        !fetching ?
                            <React.Fragment>
                                <div className="prompter-button" onClick={() => trigger()}>
                                    <input id="image-prompt" type="file" multiple className="gone" accept="image/*"
                                        onInput={e => onChange(e)} />
                                    <span className="prompter-icon">
                                        <img alt=" " src={prompterIcon} />
                                    </span>
                                    <span className="prompter-label">
                                        <small>Add Images</small>
                                    </span>
                                </div>
                            </React.Fragment>
                            :
                            <img alt="Loading..." className="prompter-spinner" src={spinner} />
                    }
            </div>
        </div>
    );
}

export default React.memo(Prompter)