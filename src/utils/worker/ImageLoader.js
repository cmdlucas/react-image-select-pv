import { isEmptyObject, ImageValidator } from "../helpers";

/**
 * Image loader that, when called, loads the images
 */
export class ImageLoader {

    problemFiles = []

    constructor(files, state) {
        this.files = [ ...files ];
        this.mockState = { ...state };
    }

    /**
     * Load images
     * @return { Promise } that resolves and/or rejects
     */
    load() {
        let imagesToUpload = isEmptyObject(this.mockState.imagesToUpload) ? [] : [...this.mockState.imagesToUpload];
        let imagesToPreview = isEmptyObject(this.mockState.imagesToPreview) ? [] : [...this.mockState.imagesToPreview];

        return new Promise((resolve, reject) => {

            for (let i = 0; i < this.files.length; i++) {
    
                let file = this.files[i];
    
                if (this.validator().isValid(file.name)) {
    
                    //Generate unique sharable index
                    let index = new Date().getTime() + i;
    
                    //Store each valid for Upload
                    imagesToUpload.push({ index: index, image: file });
    
                    // Async read file and send to supplied callback 
                    let fileReader = new FileReader();
    
                    fileReader.onloadend = e => {
                        //Store image into list for view
                        imagesToPreview.push({ index: index, content: e.target.result });
                        this.setMockState({
                            ...this.mockState,
                            imagesToUpload: imagesToUpload,
                            imagesToPreview: imagesToPreview,
                        });
                        this.release(resolve, reject);
                    }

                    fileReader.onerror = this.errorHandler;
                    fileReader.onabort = this.errorHandler;
    
                    fileReader.readAsDataURL(file);
                    
                } else {
                    this.errorHandler(`Invalid file type. Only images are supported`, file.name);
                    this.release(resolve, reject)
                }
            }

        })
        
    }

    release(resolve, reject) {
        //Be sure to have handled all submitted files before exiting

        if(this.files.length == (this.mockState.imagesToPreview.length + this.problemFiles.length)) {

            this.setMockState({
                ...this.mockState,
                fetching: false,
                problemFiles: this.problemFiles
            });
            
            resolve(this.mockState);

            if(this.problemFiles.length > 0) reject(this.problemFiles);
        }
    }
    
    /**
     * Handle all errors
     * @param { any } e
     */
    errorHandler(e, name = "Err") {
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