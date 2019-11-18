import React from 'react'
import { shallow } from 'enzyme';
import { ImageSelectPreview } from '../../src/index';
import Root from '../../src/components';
import Label from '../../src/components/label';
import Errors from '../../src/components/errors'
import Preview from '../../src/components/preview';
import Prompter from '../../src/components/prompter';
import ispDefaultProps from '../../src/utils/props/default/ispDefaulProps';
import rootDefaultState from '../../src/utils/state/default/rootState';
import { maxUploadableImages, componentLabel } from '../../src/utils/opconstants';

const defaultProps = ispDefaultProps();

describe('ImageSelectPreview component', () =>  {
    const wrapper = shallow( <ImageSelectPreview /> )

    afterEach(() => { wrapper.setProps(defaultProps) });

    it('should render <Root /> when hide is false', () => {
        expect( wrapper.find( Root ) ).toHaveLength(1);
    })

    it('should not render <Root /> when hide is true', () =>  {
        wrapper.setProps({ ...defaultProps, hide: true });
        expect( wrapper.find( Root ) ).toHaveLength(0);
    })

    it('should render <Root /> when max > 0', () => {
        expect( wrapper.find( Root ) ).toHaveLength(1);
    })

    it('should not render <Root /> when max value == 0', () => {
        wrapper.setProps({ ...defaultProps, max: 0 });
        expect( wrapper.find( Prompter ) ).toHaveLength(0);
    })
});

describe('Root component', () => {
    const defaultState = rootDefaultState();

    const wrapper = shallow( <Root { ...defaultProps }  /> );

    afterEach(() => { wrapper.setProps(defaultProps); wrapper.setState(defaultState) });
    
    it('should render <Label /> when label is not null', () => {
        wrapper.setProps({ ...defaultProps, componentLabel: componentLabel });
        expect( wrapper.find( Label ) ).toHaveLength(1);
    })
    
    it('should not render <Label /> when label is null', () => {
        expect( wrapper.find( Label ) ).toHaveLength(0);
    })
    
    it('should render <Preview /> when preview is true', () => {
        expect( wrapper.find( Preview ) ).toHaveLength(1);
    })
    
    it('should not render <Preview /> when preview is false', () => {
        wrapper.setProps({ ...defaultProps, preview: false });
        expect( wrapper.find( Preview ) ).toHaveLength(0);
    })

    it('should not render <Preview /> after a reset', () => {
        wrapper.setProps({ ...defaultProps, reset: true });
        expect( wrapper.find('.preview') ).toHaveLength(0);
    })
    
    it('should render <Errors /> when problemFiles is not empty ', () => {
        let problemFiles = [{}, {}];
        wrapper.setState({ ...defaultState, problemFiles: problemFiles});
        expect( wrapper.find( Errors ) ).toHaveLength(1);
    })
    
    it('should not render <Errors /> when problemFiles is empty ', () => {
        expect( wrapper.find( Errors ) ).toHaveLength(0);
    })

    it('should render <Prompter /> when images selected < max value', () => {
        expect( wrapper.find( Prompter ) ).toHaveLength(1);
    })

    it('should not render <Prompter /> when images selected >= max value', () => {
        wrapper.setState({ ...defaultState, imagesToPreview: new Array(maxUploadableImages).fill("image.jpg") })
        expect( wrapper.find( Prompter ) ).toHaveLength(0);
    })
    
})