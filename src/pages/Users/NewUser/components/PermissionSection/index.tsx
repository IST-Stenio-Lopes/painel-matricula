/* eslint-disable no-nested-ternary */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import CheckboxInput from '../../../../../components/Forms/Checkbox';

import { Container, Header, Content } from './styles';

export interface IPermission {
  name: string;
  role: number;
}

interface PermissionSectionProps {
  title: string;
  allPermissions: IPermission;
  permissions: IPermission[];
}

const PermissionSection: React.FC<PermissionSectionProps> = ({
  title,
  allPermissions,
  permissions,
}) => {
  const [all, setAll] = useState(false);
  const [otherPermissions, setOtherPermission] = useState<boolean[]>(() => (
    permissions.map(() => false)
  ));

  const otherValue = useCallback((index: number) => {
    if (all) return all;
    return otherPermissions[index];
  }, [all, otherPermissions]);

  const changePermission = useCallback((value, index) => {
    console.log(value);
    if (!value) setAll(false);

    const temp = otherPermissions;
    temp[index] = value;

    setOtherPermission(temp);
  }, [otherPermissions]);

  useEffect(() => {
    console.log(all);
    console.log(otherPermissions);
  }, [all, otherPermissions]);

  return (
    <Container>
      <Header>
        <CheckboxInput
          label={allPermissions.name}
          name={allPermissions.name}
          checked={all}
          onChange={() => setAll(!all)}
        />
      </Header>
      <Content>
        {permissions.map((item, index) => (
          <CheckboxInput
            label={item.name}
            name={item.name}
            checked={otherValue(index)}
            onChange={() => changePermission(!otherPermissions[index], index)}
          />
        ))}
      </Content>
    </Container>
  );
};

export default PermissionSection;
