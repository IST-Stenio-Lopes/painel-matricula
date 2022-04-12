import styled from 'styled-components';
import { theme } from '../../../../../global/styles/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 111px;
  padding: 0 24px;

  overflow: hidden;

  border-bottom: 1px solid ${theme.colors.secondary10};


  :hover {
    background-color: ${theme.colors.secondary05};

    cursor: pointer;
  }
`;

export const AvatarArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  `;

export const TextArea = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;

  margin-left: 32px;
  max-width: calc(100% - 96px);
`;

export const TimeText = styled.h1`
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  margin-bottom: 5px;

  color: ${theme.colors.secondary70};


  text-align: right;
  max-width: calc(100% - 14px);
`;

export const NameText = styled.h2`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 5px;
  color: ${theme.colors.secondary100};


  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  direction: ltr;

  max-width: calc(100% - 14px);
`;

export const MessageText = styled.h1`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: ${theme.colors.secondary70};

  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  direction: ltr;

  max-width: calc(100% - 14px);
`;
