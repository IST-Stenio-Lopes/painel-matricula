import React, { useMemo } from 'react';

import { ReactComponent as MobileSvg } from '../../../../assets/icons/dashboard/mobile-icon.svg';
import { ReactComponent as WebSvg } from '../../../../assets/icons/dashboard/web-icon.svg';
import { ReactComponent as PercentSvg } from '../../../../assets/icons/dashboard/percent-icon.svg';
import { ReactComponent as DropUpIcon } from '../../../../assets/icons/dropup-icon.svg';
import { ReactComponent as DropDownIcon } from '../../../../assets/icons/dropdown-icon.svg';

import {
  Container, Content, IconArea, TextArea, Title, Number, Description, Percent, Footer,
} from './styles';
import ProgressBar from '../../../../components/ProgressBar';
import { theme } from '../../../../global/styles/styles';

interface DashboardCardProps {
  title: string;
  type: 'mobile' | 'web' | 'percent';
  value: {value: number, percentage: number};
  color?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title, type, value, color,
}) => {
  const currentIcon = useMemo(() => {
    switch (type) {
      case 'mobile':
        return <MobileSvg />;
      case 'web':
        return <WebSvg />;
      default:
        return <PercentSvg color={color} />;
    }
  }, [type, color]);

  const arrowIcon = useMemo(() => {
    const size = '15px';

    return (value.percentage >= 0 ? (
      <DropUpIcon
        height={size}
        width={size}
      />
    ) : (
      <DropDownIcon
        height={size}
        width={size}
      />
    ));
  }, [value]);

  return (
    <Container>
      <Content>
        <TextArea>
          <Title>{title}</Title>
          <Number>{type === 'percent' ? `${value.value}%` : `${value.value}` }</Number>
        </TextArea>
        <IconArea>
          {currentIcon}
        </IconArea>
      </Content>
      <Footer color={value.percentage >= 0 ? 'green' : 'red'}>
        { type === 'percent'
          ? <ProgressBar current={value.value} total={100} color={color} />
          : (
            <>
              { arrowIcon}
              <Percent>
                {`${value.percentage}%`}
              </Percent>
              <Description>Desde o último mês</Description>
            </>
          )}
      </Footer>
    </Container>
  );
};

export default DashboardCard;
