import React from 'react';
import { shallow } from 'enzyme';
import { Errors } from '../../src/components/errors';
import { Preview } from '../../src/components/preview';
import { Prompter } from '../../src/components/prompter';
import { maxUploadableImages } from '../../src/utils/opconstants';

describe('Preview component', () => {
    const loadedImages = new Array(maxUploadableImages).fill("images.jpg");
    const prProps = { images: loadedImages, onRemove: jest.fn()}

    const wrapper = shallow( <Preview { ...prProps } /> )

    it('should render equal number of .each-image as loadedImages', () => {
        expect( wrapper.find('.each-image') ).toHaveLength( loadedImages.length );
    })
})

describe('Errors component', () => {
    const loadedErrors = new Array(3).fill({ name: "Err", error: "error" });
    const erProps = { errors: loadedErrors}

    const wrapper = shallow( <Errors { ...erProps } /> )

    it('should render equal number of .each-error as loadedErrors', () => {
        expect( wrapper.find('.each-error') ).toHaveLength( loadedErrors.length );
    })
})

describe('Prompter component', () => {
    const ppProps = { fetching: false, onChange: jest.fn()}

    const wrapper = shallow( <Prompter { ...ppProps } /> )

    it('should render .prompter-button when not fetching', () => {
        expect( wrapper.find('.prompter-button') ).toHaveLength(1);
    })

    it('should not render .prompter-button when fetching', () => {
        wrapper.setProps({ ...ppProps, fetching: true })
        expect( wrapper.find('.prompter-button') ).toHaveLength(0);
    })
})