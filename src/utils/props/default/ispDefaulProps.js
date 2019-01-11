import { supportedImageTypes, selectorPromptLabel, maxUploadableImages } from "../../opconstants";

const imageSelectPreviewDefaultProps = () => ({
    preview: true,
    hide: false,
    max: maxUploadableImages,
    imageTypes: supportedImageTypes,
    imageStyle: null,
    selectorStyle: null,
    label: selectorPromptLabel,
    onChange: null,
    onItemsChecked: null,
    onError: null,
    formData: null,
    renderTo: null
});

export default imageSelectPreviewDefaultProps;