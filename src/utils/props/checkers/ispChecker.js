import PropTypes from 'prop-types';

//Keys marked as required are required internally - either supplied by us or the user when component is being rendered
//Other keys are also required internally but may be supplied after component has been rendered (typically when not supplied by the user)

const imageSelectPreviewPropTypesChecker = () => ({
    preview: PropTypes.bool.isRequired,
    hide: PropTypes.bool.isRequired,
    max: PropTypes.number.isRequired,
    maxImageSize: PropTypes.number.isRequired,
    imageTypes: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    dropAreaText: PropTypes.string.isRequired,
    imageStyle: PropTypes.object,
    componentLabel: PropTypes.string,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    renderTo: PropTypes.string    
});

export default imageSelectPreviewPropTypesChecker;