import React from 'react';
import prompterIcon from "../../static/icons/mock-image.png"
import spinner from '../../static/icons/ajax-loader.gif';

const trigger = () => document.querySelector('#image-prompt').click();

export const Prompter = ({ fetching, max, onChange }) => {
    return (
        <div className="prompter no-user-select">
            <div className="box">
                <div className="text-center">

                    {
                        !fetching ?
                            <React.Fragment>
                                <div onClick={() => trigger()}>
                                    <input id="image-prompt" type="file" max={max} multiple className="gone" accept="image/*"
                                        onInput={e => onChange(e)} />
                                    <img alt=" " src={prompterIcon} />
                                    <br />
                                    <small>Add Images</small>
                                </div>
                            </React.Fragment>
                            :
                            <img alt="Loading..." src={spinner} />
                    }

                </div>
            </div>
        </div>
    );
}

export default React.memo(Prompter)