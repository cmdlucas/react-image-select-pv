/**
 * fetching: boolean value to show if images are being fetched
 * imagesToPreview: array of objects of all previewable image metadata
 * problemFiles: array of objects of selected files metadata that don't meet general criteria
 * allowedImages: string of supported image types separated by |
 */
const rootDefaultState = () => ({
    fetching: false,
    imagesToPreview: [],
    problemFiles: []
})

export default rootDefaultState;