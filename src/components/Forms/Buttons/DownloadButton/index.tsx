import React, { ButtonHTMLAttributes } from 'react';

import { IoCloudDownloadOutline } from 'react-icons/io5';

import { Container } from './styles';

interface DownloadButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hasMargin?: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ hasMargin = true, ...rest }) => (
  <Container hasMargin={hasMargin} {...rest}>
    <IoCloudDownloadOutline size={24} />
  </Container>
);

export default DownloadButton;
