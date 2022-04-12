import React from 'react';
import TrashButton from '../../../../../components/Forms/Buttons/TrashButton';
import { InputLine } from '../../../../../components/Forms/InputLine';

import { Container, ButtonArea } from './styles';

export interface GradeProps {
  index: number;
  title: string | undefined;
  credits:string | undefined;
  handleDelete?: Function;
  handleTitleChange: (value: string, id: string) => void;
  handleCreditsChange: (value: string, id: string) => void;
}

const Grade: React.FC<GradeProps> = ({
  index, title, credits, handleDelete = () => {}, handleTitleChange, handleCreditsChange,
}) => (
  <Container>
    <InputLine
      name={`grade${index}`}
      label=""
      defaultValue={title}
      onChange={(e) => handleTitleChange(e.target.value, `${index}`)}
    />
    <InputLine
      onChange={(e) => handleCreditsChange(e.target.value, `${index}`)}
      name={`hour${index}`}
      label=""
      defaultValue={credits}
    />
    <ButtonArea>
      <TrashButton hasMargin={false} onClick={() => handleDelete()} />
    </ButtonArea>
  </Container>
);

export default Grade;
