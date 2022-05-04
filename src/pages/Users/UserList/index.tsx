import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { HiPlus } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Forms/Buttons/Button';
import ListTable from '../../../components/ListTable';
import ListSearchArea from '../../../components/ListTable/components/ListSearchArea';
import PageContainer from '../../../components/PageContainer';
import { useModal } from '../../../hooks/modal';
import { useRoles } from '../../../hooks/roles';
import { roleOptions, UserResponse } from '../../../interfaces/IUser';
import api, { initialValue, ResponseData } from '../../../services/api';
import wrapperNames from '../../../utils/wrapper.json';

const listTitles = [
  {
    id: '4',
    name: 'Nome',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 20%)',
  },
  {
    id: '1',
    name: 'Nível de Acesso',
    hasSorting: true,
    hasFilter: true,
    growFactor: 'minmax(150px, 20%)',
    filterOptions: roleOptions,
  },
  {
    id: '2',
    name: 'Matrícula',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 10%)',
  },
  {
    id: '3',
    name: 'Email',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 15%)',
  },
];

const UserList: React.FC = () => {
  const { updateUserRoles } = useRoles();
  const { configModal, handleVisible } = useModal();

  const [responseData, setResponseData] = useState<ResponseData<UserResponse>>(
    {} as ResponseData<UserResponse>,
  );
  const [searchingValue, setSearchingValue] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState(null);
  const [order, setOrder] = useState(null);
  const [filters, setFilters] = useState<string[]>([]);
  const navigate = useNavigate();

  const keywords = useMemo(() => {
    const searchWords = searchingValue.split(' ').filter((str) => !!str).map((value) => value.toLowerCase());

    return searchWords.concat(filters);
  }, [filters, searchingValue]);

  const listItems = useMemo(() => responseData.object_list
  && responseData.object_list.map(({
    id, name, email, role_name, registration_number,
  }) => ({
    name,
    role_name,
    registration_number,
    email,
    object_id: id,
  })), [responseData]);

  const getUsersList = useCallback(async () => {
    await api.get('/users/dashboard', {
      params: {
        itens_per_page: itemsPerPage,
        page: currentPage - 1,
        sort: sortType && wrapperNames[sortType],
        sort_type: order,
        keywords,
        status: 'Ativado',
      },
    }).then((response: any) => {
      setResponseData(response ? response.data : initialValue);
    });
  }, [currentPage, keywords, itemsPerPage, order, sortType]);

  const handleSubmitSearch = useCallback(() => {
    getUsersList();
  }, [getUsersList]);

  useEffect(() => {
    getUsersList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, sortType, currentPage]);

  const handleClick = useCallback((item) => {
    updateUserRoles(item.role);
    navigate('detalhes', { state: { user: item } });
  }, [navigate, updateUserRoles]);

  const handleChangeSort = useCallback((newSortType, newSort) => {
    setSortType(newSortType);
    setOrder(newSort);
  }, []);

  const deleteUsers = useCallback(async (userId) => {
    await api.delete(`/users/dashboard/${userId}`).catch((err) => {
      configModal(err.response.data.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        configModal('O usuário foi removido com sucesso', 'success');
        handleVisible();
        getUsersList();
      }
    });
  }, [configModal, getUsersList, handleVisible]);

  const handleRemove = useCallback((userId) => {
    configModal(
      'Deseja realmente remover o usuário selecionado?',
      'message',
      true,
      true,
      () => deleteUsers(userId),
    );
    handleVisible();
  }, [configModal, deleteUsers, handleVisible]);

  return (
    <PageContainer gridTemplateRows="36px minmax(500px, 660px)" paddingTop="32px">
      <ListSearchArea
        listFilters={listTitles}
        setKeywords={setFilters}
        searchValue={searchingValue}
        handleChange={setSearchingValue}
        onSubmit={handleSubmitSearch}
      >
        <Button
          onClick={() => navigate('detalhes')}
          maxWidth="160px"
          maxHeight="100%"
          leftIcon={<HiPlus size={18} />}
        >
          NOVO Usuario
        </Button>
      </ListSearchArea>
      <ListTable
        onRemoveItem={handleRemove}
        changePage={setCurrentPage}
        onSortChange={handleChangeSort}
        onClickItem={handleClick}
        changeItemsCount={setItemsPerPage}
        indexToBold={0}
        listTitles={listTitles}
        listItems={listItems}
        itemsPerPages={itemsPerPage}
        currentPage={currentPage}
        totalOfItems={responseData.max_itens}
        gridRow="2 / 2"
        hasTrashButton
      />
    </PageContainer>
  );
};

export default UserList;
