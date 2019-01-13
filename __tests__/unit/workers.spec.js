import ImageLoader from "../../src/utils/worker/ImageLoader";
import rootDefaultState from "../../src/utils/state/default/rootState";
import Broadcaster from "../../src/utils/worker/Broadcaster";

const setMockFunctions = imageLoader => {
    imageLoader.errorHandler = jest.fn();
    imageLoader.release = jest.fn();  
    imageLoader.fillProblemFiles = jest.fn();  
    imageLoader.startReading = jest.fn();  
}

const presetBadFileName = () => {
    let blob = new Object();
    blob.name = "image.pdf";
    blob.size = 500;
    return new Array(1).fill(blob);
}

const presetGoodFileName = () => {
    let blob = new Object;
    blob.name = "image.jpg";
    blob.size = 500;
    return new Array(1).fill(blob);
}

const setFileReaderMock = () => ({
    readAsDataURL: jest.fn()
})

let resolve = jest.fn();
let reject = jest.fn();

describe('ImageLoader', () => {  
    let mockState = {
        ...rootDefaultState(), 
        max: 1,
        maxImageSize: 999
    }   
    let imageLoader = new ImageLoader([], mockState);
    presetGoodFileName(imageLoader);
    setMockFunctions(imageLoader);

    afterEach(() => { 
        imageLoader.files = presetGoodFileName(); 
        imageLoader.mockState = mockState; 
    })

    it('load() should return promise', () => {
        expect( imageLoader.load() ).toBeInstanceOf(Promise);
    })
    
    it('loadImage() should call startReading() when all is good', () => {
        imageLoader.loadImage(resolve, reject);
        expect( imageLoader.startReading ).toHaveBeenCalled();
    })

    it('loadImage() should call errorHandler() when a file extension is not supported', () => {
        imageLoader.files = presetBadFileName();
        imageLoader.loadImage(resolve, reject);
        expect( imageLoader.errorHandler ).toHaveBeenCalled();
    })
    
    it('loadImage() should call release() when a file extension is not supported', () => {
        imageLoader.files = presetBadFileName();
        imageLoader.loadImage(resolve, reject);
        expect( imageLoader.release ).toHaveBeenCalled();        
    })
    
    it('loadImage() should call fillProblemFiles() when max selectable files have been exceeded', () => {
        imageLoader.mockState.max = 0;
        imageLoader.loadImage(resolve, reject);
        expect( imageLoader.fillProblemFiles ).toHaveBeenCalled(); 
    })
    
    it('loadImage() should call release() when max selectable files have been exceeded', () => {
        imageLoader.mockState.max = 0;
        imageLoader.loadImage(resolve, reject);
        expect( imageLoader.release ).toHaveBeenCalled();         
    })
    
    it('loadImage() should call errorHandler() when a file size has been exceeded', () => {
        imageLoader.mockState.maxImageSize = 1000;
        imageLoader.loadImage(resolve, reject);
        expect( imageLoader.errorHandler ).toHaveBeenCalled(); 

    })
    
    it('loadImage() should call release() when  a file size has been exceeded', () => {
        imageLoader.mockState.maxImageSize = 1000;
        imageLoader.loadImage(resolve, reject);
        expect( imageLoader.release ).toHaveBeenCalled();         
    })
    
    it('startReading() should call fileReader.readAsDataURL()', () => {
        let fileReader = setFileReaderMock();
        let imageLoader = new ImageLoader([], mockState);
        imageLoader.startReading(new Blob(), fileReader)
        expect( fileReader.readAsDataURL ).toHaveBeenCalled();         
    })
})


describe('Broadcaster', () => {
    let blob = new Blob();
    blob.name = "image.jpg";
    let imagesToPreview = new Array(3).fill({content: "bas64-content", image: blob});
    let broadcaster = new Broadcaster({imagesToPreview: imagesToPreview});

    it('emitData() should call the callback function', () => {
        let callback = jest.fn();
        broadcaster.emitData(callback);
        expect( callback ).toHaveBeenCalled();
    })
    
    it('emitErrors() should call the callback function', () => {
        let callback = jest.fn();
        broadcaster.emitErrors(callback);
        expect( callback ).toHaveBeenCalled();
    })
})