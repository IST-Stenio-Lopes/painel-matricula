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
  const [otherPermissions, setOtherPermissions] = useState<boolean[]>(
    () => permissions.map(() => false),
  );
  const [permissionValue, setPermissionValue] = useState(0);

  const changeAll = useCallback((value) => {
    const temp = permissions.map(() => value);

    setAll(value);
    setOtherPermissions([...temp]);
    setPermissionValue(value ? permissionValue + allPermissions.role
      : permissionValue - allPermissions.role);
  }, [allPermissions.role, permissionValue, permissions]);

  const changePermission = useCallback((value, index) => {
    const temp = [...otherPermissions];
    temp[index] = value;

    setAll(temp.every((p) => p));
    setOtherPermissions([...temp]);
    setPermissionValue(value ? permissionValue + permissions[index].role
      : permissionValue - permissions[index].role);
  }, [otherPermissions, permissionValue, permissions]);

  useEffect(() => {
    console.log(permissionValue);
  }, [permissionValue]);

  return (
    <Container>
      <Header>
        <CheckboxInput
          label={allPermissions.name}
          name={allPermissions.name}
          checked={all}
          onChange={() => changeAll(!all)}
        />
      </Header>
      <Content>
        {permissions.map((item, index) => (
          <CheckboxInput
            key={item.name}
            label={item.name}
            name={item.name}
            checked={otherPermissions[index]}
            onChange={() => changePermission(!otherPermissions[index], index)}
          />
        ))}
      </Content>
    </Container>
  );
};

export default PermissionSection;
