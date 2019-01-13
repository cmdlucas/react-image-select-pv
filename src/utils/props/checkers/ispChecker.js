import PropTypes from 'prop-types';

//Keys marked as required are required internally - either supplied by us or the user when component is being rendered
//Other keys are also required internally but may be supplied after component has been rendered (typically when not supplied by the user)

const imageSelectPreviewPropTypesChecker = () => ({
    preview: PropTypes.bool.isRequired,
    hide: PropTypes.bool.isRequired,
    max: PropTypes.number.isRequired,
    imageTypes: PropTypes.string.isRequired,
    imageStyle: PropTypes.object,
    selectorStyle: PropTypes.object,
    label: PropTypes.string,
    onChange: PropTypes.func,
    onItemsChecked: PropTypes.func,
    onError: PropTypes.func,
    formData: PropTypes.object,
    renderTo: PropTypes.string    
});

export default imageSelectPreviewPropTypesChecker;