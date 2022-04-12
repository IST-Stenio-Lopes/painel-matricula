import React, {
  InputHTMLAttributes, useCallback, useEffect, useRef, useState,
} from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useDropzone } from 'react-dropzone';
import { useField } from '@unform/core';
import { Container, Dropzone, Error } from './styles';
import ArchiveUploaded from './ArchiveUploaded';

interface DropzoneProps extends InputHTMLAttributes<HTMLInputElement>{
  name: string;
  handleSetFile: Function;
  gridRow?: string;
  gridColumn?: string;
}

const DropzoneInput: React.FC<DropzoneProps> = ({
  name, handleSetFile, gridColumn, gridRow, ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    fieldName, error, registerField,
  } = useField(name);

  const [isFileRejected, setIsFileRejected] = useState(false);
  const [isFileAccepted, setIsFileAccepted] = useState<any>();

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    setIsFileRejected(fileRejections.length > 0);
    setIsFileAccepted(acceptedFiles.length > 0 ? acceptedFiles : null);
    handleSetFile(acceptedFiles.length > 0 ? acceptedFiles : null);
  }, [handleSetFile]);

  const {
    getRootProps, getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: 'image/jpeg,image/png,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,application/zip,application/vnd.rar,application/x-zip-compressed',
  });

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <Dropzone
        {...getRootProps({
          isFocused,
          isDragAccept,
          isDragReject,
          className: 'dropzone',
          maxFiles: 1,
        })}
        isFocused={isFocused}
        isDragAccept={isFileAccepted || isDragAccept}
        isDragReject={isFileRejected || isDragReject || !!error}
      >
        <input ref={inputRef} {...rest} {...getInputProps()} />
        {!isFileAccepted ? (
          <>
            <IoCloudUploadOutline size={40} />
            <h3>. PDF  . JPG  . PNG  . DOC  . ZIP</h3>
            <p>Arraste um arquivo para cá ou, se preferir...</p>
            <button type="button" onClick={open}>Procurar e selecionar arquivo</button>
          </>
        )
          : (
            <>
              <ArchiveUploaded name={isFileAccepted && isFileAccepted.name} />
              <button type="button" onClick={open}>Substituir</button>
            </>
          )}
      </Dropzone>
      {(isFileRejected || isDragReject || error) && (
      <Error>
        {error || 'Arquivo inválido'}
      </Error>
      )}
    </Container>
  );
};

export default DropzoneInput;
