import React, {
  useCallback, useState,
} from 'react';

import { MdOutlineCameraAlt } from 'react-icons/md';
import DefaultImg from '../../assets/icons/default-img.svg';
import { theme } from '../../global/styles/styles';

import {
  Container,
  TextLetter,
} from './styles';

interface AvatarProps {
  avatar_url?: string;
  alt_name: string;
  imgFile?: any;
  edit?: boolean;
  size?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  avatar_url, alt_name, imgFile, edit = false, size = '40px',
}) => {
  const [imgError, setImgError] = useState(false);

  const renderLetters = useCallback(() => {
    if (!alt_name) return null;
    const name = alt_name.split(' ');

    const firstLetter = name[0][0];
    const lastLetter = name.length > 1 ? name[name.length - 1][0] || '' : '';

    const letters = `${firstLetter}${lastLetter}`;

    return letters
      ? <TextLetter>{letters}</TextLetter>
      : <MdOutlineCameraAlt size={30} color={theme.colors.secondary00} />;
  }, [alt_name]);

  return (
    <Container size={size} edit={edit}>
      {(avatar_url && !imgError) || imgFile
        ? (
          <img
            src={avatar_url || window.URL.createObjectURL(imgFile) || DefaultImg}
            alt={alt_name}
            onError={() => setImgError(true)}
          />
        )
        : renderLetters()}
    </Container>
  );
};

export default Avatar;
