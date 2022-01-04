import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { DropZoneI } from "../../../../utils/utilities";
import { DropZoneContainer } from "./style";
import Dropzone, { defaultClassNames, IDropzoneProps, ILayoutProps } from 'react-dropzone-uploader';



/*const DropZone: React.FC<DropZoneI> = () => {

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    );

}

export default DropZone;*/
// add type defs to custom LayoutComponent prop to easily inspect props passed to injected components
const Layout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } }: ILayoutProps) => {
    return (
        <div>
            {previews}

            <div {...dropzoneProps}>{files.length < maxFiles && input}</div>

            {files.length > 0 && submitButton}
        </div>
    )
}

const CustomLayout = () => {
    // add type defs to function props to get TS support inside function bodies,
    // and not just where functions are passed as props into Dropzone
    const getUploadParams: IDropzoneProps['getUploadParams'] = () => ({ url: 'https://httpbin.org/post' })

    const handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }

    return (
        <Dropzone
            getUploadParams={getUploadParams}
            LayoutComponent={Layout}
            onSubmit={handleSubmit}
            classNames={{ inputLabelWithFiles: defaultClassNames.inputLabel }}
            inputContent="Drop Files (Custom Layout)"
        />
    )
}
