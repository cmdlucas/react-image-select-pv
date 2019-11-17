import { supportedImageTypes, maxUploadableImages, maxImageSize, buttonText, dropAreaText } from "../../opconstants";

const imageSelectPreviewDefaultProps = () => ({
    preview: true,
    hide: false,
    reset: false,
    max: maxUploadableImages,
    maxImageSize: maxImageSize,
    imageTypes: supportedImageTypes,
    buttonText: buttonText,
    dropAreaText: dropAreaText,
    imageStyle: null,
    componentLabel: null,
    onChange: null,
    onError: null,
    renderTo: null
});

export default imageSelectPreviewDefaultProps;