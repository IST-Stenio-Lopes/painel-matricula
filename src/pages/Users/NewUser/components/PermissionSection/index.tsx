/* eslint-disable no-nested-ternary */
import React, {
  useCallback, useEffect, useState,
} from 'react';
import CheckboxInput from '../../../../../components/Forms/Checkbox';
import { useRoles } from '../../../../../hooks/roles';
import { getRole } from '../../../../../interfaces/IUser';

import { Container, Header, Content } from './styles';

export interface IPermission {
  name: string;
  role: number;
}

interface PermissionSectionProps {
  title: string;
  allPermissions: IPermission;
  permissions: IPermission[];
  userRole: number | undefined;
  permissionValue: number;
  setPermissionValue: (value: number) => void;
}

const PermissionSection: React.FC<PermissionSectionProps> = ({
  title,
  allPermissions,
  permissions,
  userRole = 0,
  permissionValue,
  setPermissionValue,
}) => {
  const { updateUserRoles, getAnyRole } = useRoles();

  const [all, setAll] = useState(false);
  const [otherPermissions, setOtherPermissions] = useState<boolean[]>(
    () => permissions.map(() => false),
  );

  const changeAll = useCallback((value) => {
    const temp = permissions.map(() => value);

    setAll(value);
    setOtherPermissions([...temp]);
    setPermissionValue(value ? permissionValue + allPermissions.role
      : permissionValue - allPermissions.role);
  }, [allPermissions.role, permissionValue, permissions, setPermissionValue]);

  const changePermission = useCallback((value, index) => {
    const temp = [...otherPermissions];
    temp[index] = value;

    setAll(temp.every((p) => p));
    setOtherPermissions([...temp]);
    setPermissionValue(value ? permissionValue + permissions[index].role
      : permissionValue - permissions[index].role);
  }, [otherPermissions, permissionValue, permissions, setPermissionValue]);

  useEffect(() => {
    updateUserRoles(userRole);

    console.log(userRole);
    const temp = permissions.map((permission) => getAnyRole(permission.role));

    console.dir(temp);
    setOtherPermissions(temp);

    setAll(temp.every((p) => p));

    console.log();
  }, [allPermissions, getAnyRole, permissions, title, updateUserRoles, userRole]);

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
