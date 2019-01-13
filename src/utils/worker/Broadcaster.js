export class Broadcaster {
    constructor(data) {
        this.data = data;
    }

    /**
     * Emit available data to caller
     * @param {Function} callBack 
     */
    emitData(callBack) {
        try {
            if (typeof callBack === 'function') {
                const images = this.data.imagesToPreview;
                let filesArray = [];
                images.forEach(data => {
                    filesArray.push({ content: data.content, blob: data.image});
                });
                callBack(filesArray);
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Emit available errors to caller
     * @param {Function} callBack 
     */
    emitErrors(callBack) {
        try {
            if (typeof callBack === 'function') {
                callBack(this.data.problems)
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default Broadcaster;