import React from 'react'
import { shallow } from 'enzyme';
import { ImageSelectPreview } from '../../src/index';
import Root from '../../src/components';

describe('ImageSelectPreview component', () =>  {
    const props = { hide: false };
    const wrapper = shallow( <ImageSelectPreview {...props} /> )

    afterEach(() => { wrapper.setProps(props) });

    it('should render <Root /> when hide is false', () => {
        expect( wrapper.find( Root ) ).toHaveLength(1);
    });

    it('should not render <Root /> when hide is true', () =>  {
        wrapper.setProps({ ...props, hide: true });
        expect( wrapper.find( Root ) ).toHaveLength(0);
    })
});

