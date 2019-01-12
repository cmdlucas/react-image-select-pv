import { supportedImageTypes } from "./opconstants";

/**
 * Check if an object is empty
 * @param {object} obj 
 */
export const isEmptyObject = (obj) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

/**
 * Validate an image
 */
export class ImageValidator {

    constructor(allowedImages) { 
        this.setAllowedImages(allowedImages);
    }

    /**
     * Set valid extensions
     * @param {string} allowedImages 
     */
    setAllowedImages(allowedImages) {
        this.imgex = allowedImages.split('|');
    }

    /**
     * Check if image extension is valid.
     * @param {string} img
     */
    isValid(imgName) {
        let arr = imgName.split('.');
        return this.imgex.includes(arr[arr.length - 1]);
    }


}