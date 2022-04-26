/* eslint-disable no-nested-ternary */
import React, {
  useCallback, useEffect, useState,
} from 'react';
import CheckboxInput from '../../../../../components/Forms/Checkbox';
import { useRoles } from '../../../../../hooks/roles';

import { Container, Header, Content } from './styles';

export interface IPermission {
  name: string;
  role: number;
}

interface PermissionSectionProps {
  title: string;
  allPermissions: IPermission;
  permissions: IPermission[];
  userRole: number;
}

const PermissionSection: React.FC<PermissionSectionProps> = ({
  title,
  allPermissions,
  permissions,
  userRole,
}) => {
  const { getRole, updateUserRoles } = useRoles();

  const [all, setAll] = useState(false);
  const [otherPermissions, setOtherPermissions] = useState<boolean[]>(
    () => permissions.map(() => false),
  );
  const [permissionValue, setPermissionValue] = useState(userRole);

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
    updateUserRoles(userRole);
    // console.log(title);
    permissions.map((permission, index) => {
      changePermission(
        getRole(permission.role),
        index,
      );
      // console.log(permission.role, getRole(permission.role));
      return true;
    });
    changeAll(getRole(allPermissions.role));

    // console.log(allPermissions.role, getRole(allPermissions.role));
  }, [allPermissions, getRole, permissions, title, userRole]);

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
