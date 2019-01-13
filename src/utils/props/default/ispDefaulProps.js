import { supportedImageTypes, maxUploadableImages, maxImageSize, buttonText } from "../../opconstants";

const imageSelectPreviewDefaultProps = () => ({
    preview: true,
    hide: false,
    max: maxUploadableImages,
    maxImageSize: maxImageSize,
    imageTypes: supportedImageTypes,
    buttonText: buttonText,
    imageStyle: null,
    componentLabel: null,
    onChange: null,
    onError: null,
    renderTo: null
});

export default imageSelectPreviewDefaultProps;