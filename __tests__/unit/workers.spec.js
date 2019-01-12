import ImageLoader from "../../src/utils/worker/ImageLoader";
import rootDefaultState from "../../src/utils/state/default/rootState";

describe('ImageLoader', () => { 
    let imageLoader = new ImageLoader([], rootDefaultState());

    it('load() should return promise', () => {
        expect( imageLoader.load() ).toBeInstanceOf(Promise);
    })
})