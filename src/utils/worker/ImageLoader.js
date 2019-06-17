import { isEmptyObject, ImageValidator, bytesKbMb } from "../helpers";

export const errorTypes = {
    loadPreviewError: "LOAD_FILE_FOR_PREVIEW_ERROR",
    maxImageCount: "MAX_IMAGE_COUNT_EXCEEDED",
    maxImageSize: "MAX_IMAGE_SIZE_EXCEEDED",
    unsupportedFile: "UNSUPPORTED_FILE"
}

/**
 * Image loader that, when called, loads the images
 */
export class ImageLoader {

    // Files with a problem
    problemFiles = [];
    // Files that have been processed - updated only by FileReader
    processedFiles = [];

    /**
     * Initiate Image Loader
     * @param {FileList} files - Files selected
     * @param {Object} state - Root Component state
     */
    constructor(files, state) {
        this.files = [...files];
        this.mockState = { ...state };
    }

    /**
     * Load images
     * @return { Promise } that resolves and/or rejects
     */
    load() {
        return new Promise((resolve, reject) => {
            this.loadImage(resolve, reject);
        })
    }
    
    loadImage(resolve, reject) {
        //imagesToPreview - the state where all image metadata is stored
        let imagesToPreview = isEmptyObject(this.mockState.imagesToPreview) ? [] : [...this.mockState.imagesToPreview];

        let imagesCount = imagesToPreview.length;

        for (let i = 0; i < this.files.length; i++) {

            let file = this.files[i];

            if (this.validator().isValid(file.name)) {

                // fill problem files and dropout of selection
                if (imagesCount >= this.mockState.max) {
                    this.fillProblemFiles(i);
                    this.release(resolve, reject);
                    break;
                }

                if (file.size <= this.mockState.maxImageSize) {

                    // increment here, since the remaining actions are async
                    imagesCount++;

                    // Generate unique sharable index
                    let index = new Date().getTime() + i;

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
                        this.errorHandler(file.name, errorTypes.loadPreviewError, `File type could not be read but can still be uploaded.`);
                        this.release(resolve, reject);
                    }
                    fileReader.onerror = () => errorOut();
                    fileReader.onabort = () => errorOut();

                    // Async read file and send status to supplied callbacks 
                    this.startReading(file, fileReader);

                } else {
                    this.errorHandler(file.name, errorTypes.maxImageSize, `Image is too large (max. ${bytesKbMb(this.mockState.maxImageSize)}).`);
                    this.release(resolve, reject)
                }

            } else {
                this.errorHandler(file.name, errorTypes.unsupportedFile, `Invalid file type. Only images of types (${this.mockState.allowedImages}) are supported.`);
                this.release(resolve, reject);
            }
        }
    }

    /**
     * Start reading file asynchronously
     * @param {Blob} file 
     * @param {FileReader} fileReader 
     */
    startReading(file, fileReader) {
        fileReader.readAsDataURL(file);    
    }

    /**
     * Resolve and/or reject promise
     * @param {Function} resolve 
     * @param {Function} reject 
     */
    release(resolve, reject) {
        // Be sure to have handled all submitted files before exiting
        if (this.files.length === (this.processedFiles.length + this.problemFiles.length)) {
            //set mock state first
            this.setMockState({
                ...this.mockState,
                fetching: false,
                problemFiles: this.problemFiles
            });
            // make new mockState available in promise.then
            resolve(this.mockState);
            // make problemFiles available in promise.catch
            if (this.problemFiles.length > 0) reject(this.problemFiles);
        }
    }

    /**
     * Trash multiple files as problem files
     * @param {number} startIndex - index in the files array to start trashing from
     * @param {string} type - type of error encountered before this method is triggered
     */
    fillProblemFiles(startIndex, type) {
        const badFiles = this.files.slice(startIndex);
        badFiles.forEach(badFile =>
            this.errorHandler(badFile.name, type, `Maximum image selection of ${this.mockState.max} exceeded.`))
    }

    /**
     * Put the display content for all errors
     * @param { string } e - error description
     * @param { string } name - title of error
     */
    errorHandler(name, type, e) {
        this.problemFiles.push({
            name: name,
            error: e,
            type: type
        });
    }

    /**
     * Set mock state
     * @param {object} obj
     */
    setMockState(obj) {
        this.mockState = obj;
    }

    /**
     * Lazy provision of validator
     */
    validator() {
        if (typeof this.imageValidator === 'undefined') {
            this.imageValidator = new ImageValidator(this.mockState.allowedImages);
        }
        return this.imageValidator;
    }
}

export default ImageLoader;