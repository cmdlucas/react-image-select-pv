import { isEmptyObject, ImageValidator, bytesKbMb } from "../../src/utils/helpers";
import { supportedImageTypes } from "../../src/utils/opconstants";



describe('isEmptyObject()', () => {
    let testObject = {};
    
    it('should return true when object is empty', () => {
        expect( isEmptyObject(testObject) ).toBe( true );
    })
    
    it('should return false when object is not empty', () => {
        testObject = { baker: true};
        expect( isEmptyObject(testObject) ).toBe( false );        
    })
})

describe('bytesKbMb()', () => {

    it('should return 5MB', () => {
        let bytesValue = 5000000;
        expect( bytesKbMb(bytesValue) ).toEqual('5MB');
    })

    it('should return 500KB', () => {
        let bytesValue = 500000;
        expect( bytesKbMb(bytesValue) ).toEqual('500KB');
    })
})

describe('ImageValidator', () => {
    let fileName = "BBssgOO_sh.h.jpeg";
    let imageValidator = new ImageValidator(supportedImageTypes);
    
    it('isValid() should return true', () => {
        expect( imageValidator.isValid(fileName) ).toBe( true );
    })
    
    it('isValid() should return false', () => {
        fileName = "Gsye_tdh.pdf"
        expect( imageValidator.isValid(fileName) ).toBe( false );
    })
})