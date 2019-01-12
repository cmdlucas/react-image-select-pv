import { supportedImageTypes } from "../../opconstants";

/**
 * fetching: boolean value to show if images are being fetched
 * imagesToUpload: array of objects of all valid image metadata (relevant info)
 * imagesToPreview: array of objects of all previewable image metadata
 * problemFiles: array of objects of selected files metadata that don't meet general criteria
 * allowedImages: string of supported image types separated by |
 */
const rootDefaultState = () => ({
    fetching: false,
    imagesToUpload: [],
    imagesToPreview: [],
    problemFiles: [],
    allowedImages: supportedImageTypes
})

export default rootDefaultState;