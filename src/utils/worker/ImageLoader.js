import { isEmptyObject, ImageValidator } from "../helpers";

/**
 * Image loader that, when called, loads the images
 */
export class ImageLoader {

    // Files with a problem
    problemFiles = [];
    // Files that have been processed - updated only by FileReader
    processedFiles = [];

    constructor(files, state) {
        this.files = [ ...files ];
        this.mockState = { ...state };
    }

    /**
     * Load images
     * @return { Promise } that resolves and/or rejects
     */
    load() {
        //imagesToPreview state where all image metadata is stored
        let imagesToPreview = isEmptyObject(this.mockState.imagesToPreview) ? [] : [...this.mockState.imagesToPreview];

        return new Promise((resolve, reject) => {

            let imagesCount = imagesToPreview.length;

            for (let i = 0; i < this.files.length; i++) {
    
                let file = this.files[i];
    
                if (this.validator().isValid(file.name)) {

                    // fill problem files and dropout of selection
                    if(imagesCount >= this.mockState.max){
                        this.fillProblemFiles(i);
                        this.release(resolve, reject);
                        break;
                    }

                    // increment here, since the remaining actions are async
                    imagesCount++;
    
                    // Generate unique sharable index
                    let index = new Date().getTime() + i;    
                    
                    // Async read file and send to supplied callback 
                    let fileReader = new FileReader();
    
                    fileReader.onloadend = e => {
                        // Store image into list for view
                        imagesToPreview.push({ index: index, content: e.target.result, image: file });
                        // Mark as a processed file
                        this.processedFiles.push(index);
                        // Set state to reflect newly processed file
                        this.setMockState({
                            ...this.mockState,
                            imagesToPreview: imagesToPreview,
                        });
                        // resolve and/or reject promise
                        this.release(resolve, reject);
                    }

                    const errorOut = () => {
                        this.errorHandler(`Read error (${file.name}): ", "File type could not be read but will be uploaded.`);
                        this.release(resolve, reject);
                    }
                    fileReader.onerror = () => errorOut();
                    fileReader.onabort = () => errorOut();
    
                    fileReader.readAsDataURL(file);
                    
                } else {
                    this.errorHandler(file.name, "Invalid file type. Only images are supported.");
                    this.release(resolve, reject)
                }
            }
        })        
    }

    /**
     * Resole and/or reject promise
     * @param {Function} resolve 
     * @param {Function} reject 
     */
    release(resolve, reject) {
        // Be sure to have handled all submitted files before exiting
        if(this.files.length == (this.processedFiles.length + this.problemFiles.length)) {
            //set mock state first
            this.setMockState({
                ...this.mockState,
                fetching: false,
                problemFiles: this.problemFiles
            });            
            // make new mockState available in promise.then
            resolve(this.mockState);
            // make problemFiles available in promise.catch
            if(this.problemFiles.length > 0) reject(this.problemFiles);
        }
    }

    /**
     * Trash multiple files as problem files
     * @param {number} startIndex - index in the files array to start trashing from
     */
    fillProblemFiles(startIndex) {
        const badFiles = this.files.slice(startIndex);
        badFiles.map(badFile => 
            this.errorHandler(badFile.name, `Maximum image selection of ${this.mockState.max} exceeded.`) )
    }
    
    /**
     * Put the display content for all errors
     * @param { string } e - error description
     * @param { string } name - title of error
     */
    errorHandler(name, e) {
        this.problemFiles.push({ 
            name: name, 
            error: e
        });
    }

    /**
     * Set mock state
     * @param {object} obj
     */
    setMockState(obj){
        this.mockState = obj;
    }
    
    /**
     * Lazy provision of validator
     */
    validator() {
        if(typeof this.imageValidator === 'undefined' ){
            this.imageValidator = new ImageValidator(this.mockState.allowedImages);
        }
        return this.imageValidator;  
    }
}

export default ImageLoader;