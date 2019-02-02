# ImageSelectPreview

[![Build Status](https://travis-ci.org/cmdlucas/react-image-select-pv.svg?branch=master)](https://travis-ci.org/cmdlucas/react-image-select-pv)

## About

A configurable react component that allows preview of images and some other functionalities.

## Requirements

As a pre-requisite you need to have npm installed. You also need to have react and react-dom installed in your project. 

[See here](https://reactjs.org/) to start using react in your project.


## Usage
To use this component, do

```
npm install --save react-image-select-pv
```

or as the case may be

```
yarn add react-image-select-pv
```

#### Note: 
If you use `redux`, you would need to be on version `>=6.0.0` or `^6.0.0` (depending on the semantics required by your project) because of known issues with `React.memo` on previous versions. [See here](https://github.com/reduxjs/react-redux/issues/1061)

## Example

Say we have a simple `<div>` element that we want to select and preview images to, we can use `<ImageSelectPreview />` as is, without any configuration

```
import React from 'react'
import ImageSelectPreview from 'react-image-select-pv';

const SimpleDiv = () => {
    return (
        <div>
            <ImageSelectPreview />
        </div>
    )
}

export default React.memo(SimpleForm)

```

We can add some configurations as props

```
//....

<ImageSelectPreview 
    max={2}
    imageTypes="png|jpg|gif"
    onChange={ data => { // handle images data here } }
/>

//....

```


## API as Props

Here is a list of the supported props that can be used to provide or override  the component's behaviours.


### Functional Bahaviour

You can configure the functionality of this component to suit your app's logic flow.

##### max [number] (optional) - default: 12

Maximum selectable images.

##### preview [boolean] (optional) - default: true

Enables/Disables the preview of images after user selection. Does **not** turn off supply of images data.

Can be useful when you want the images to be shown in a separate component in your application.


##### hide [boolean] (optional) - default: false

Decides whether `<ImageSelectPreview />` component should be active or not. Disables every other functionality when set to `true`.

##### imageTypes [string] (optional) - default: "bmp|cmx|cod|cr2|eps|gif|ico|ief|jfif|jpe|jpeg|jpg|nef|orf|pbm|pgm|png|pnm|ppm|ras|raw|rgb|sr2|svg|tif|tiff|xbm|xpm|xwd"

A string of image file extensions separated by `|`. When specified, all other image file extensions will be ignored.

##### maxImageSize [number] (optional) - default: 512000000

Highest size (in bytes) acceptable for each image in the selection.

The default, 512000000, is interpreted as 512MB.


### Reactive Behaviour

These props give you the ability to react when an internal action occurs.

##### onChange [function] (optional) - default: null

A function that, if specified, will be called when there is a change observed in the list of images.

On call, the complete array of dataObjects will be passed as an argument.

Where each dataObject is represented thus:

```
{
    content: // base64 string
    blob:  // blobfile in event.target.files
}
```

##### onError [function] (optional) - default: null

This function will be called after a selection process triggers some errors based on the constraints set.

On call, the complete array of errors will be  passed as an argument.

Where each error is represented as:

```
{
    name: // string of file name
    error: // string of error description
    type: // string of error type
}
```
Error types: `LOAD_FILE_FOR_PREVIEW_ERROR`, `MAX_IMAGE_COUNT_EXCEEDED`, `MAX_IMAGE_SIZE_EXCEEDED`, `UNSUPPORTED_FILE`


### Presentation

You can specify the style or text for some elements within the component and it will be applied directly on them.

##### componentLabel [string] (optional) - default: null

The text to be used as the label for the component.

##### buttonLabel [string] (optional) - default: "Add Images"

The text to be used in the component's prompt button.

##### imageStyle [object] (optional) - default: null

An object of react-like styles to apply on the images in the preview.

## Version

All releases starting from v1.1.0 follow [Semantic Versioning](https://semver.org)

## License

MIT