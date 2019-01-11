import ispPropTypesChecker from "../../src/utils/props/checkers/ispChecker";

describe('components proptypes checker', () =>  {
    it('should return an object usable by PropTypes to typecheck ImageSelectPreview props', () =>  {
        expect( ispPropTypesChecker() ).toEqual( ispPropTypesChecker() )
    })
})