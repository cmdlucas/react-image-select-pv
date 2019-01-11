import rootDefaultState from "../../src/utils/state/default/rootState";

describe('components default state', () =>  {
    it('should return default state for Root', () =>  {
        expect( rootDefaultState() ).toEqual( rootDefaultState() )
    })
})