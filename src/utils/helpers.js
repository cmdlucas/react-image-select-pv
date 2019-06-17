import { supportedImageTypes } from "./opconstants";

/**
 * Check if an object is empty
 * @param {Object} obj 
 */
export const isEmptyObject = obj => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

/**
 * Convert an object to an array
 * @param {Object} obj 
 */
export const objectToArray = (obj) => {
    let arr = [];
    if(typeof obj !== 'object') return arr;    
    return Object.values(obj);
}

/**
 * Convert Bytes to KB / MB
 * @param {number} value
 */
export const bytesKbMb = value => {
    let bKbMb = value / 1000000;
    if(bKbMb < 1)
        return `${Math.ceil(value / 1000)}KB`
    else 
        return `${Math.ceil(bKbMb)}MB`
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
        let ext = arr[arr.length - 1].toLowerCase();
        return this.imgex.includes(ext) || (this.imgex.includes('jpg') && ext === 'jpeg') || (this.imgex.includes('jpeg') && ext === 'jpg');
    }
}