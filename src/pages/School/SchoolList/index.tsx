import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { HiPlus } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Forms/Buttons/Button';
import ListTable from '../../../components/ListTable';
import ListSearchArea from '../../../components/ListTable/components/ListSearchArea';
import PageContainer from '../../../components/PageContainer';
import { ISchoolListResponse } from '../../../interfaces/ISchool';
import api, { initialValue, ResponseData } from '../../../services/api';
import { telMasked } from '../../../utils/masks';
import wrapperNames from '../../../utils/wrapper.json';

const listTitles = [
  {
    id: '4',
    name: 'Sigla',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 10%)',
  },
  {
    id: '1',
    name: 'Nome',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 20%)',
  },
  {
    id: '2',
    name: 'Telefone',
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
  {
    id: '5',
    name: 'Estado',
    hasSorting: true,
    hasFilter: true,
    growFactor: 'minmax(150px, 10%)',
    filterOptions: [
      { value: 'Atendente', label: 'Atendente' },
      { value: 'Coordenador', label: 'Coordenador' },
      { value: 'Diretor', label: 'Diretor' },
      { value: 'Tesoureiro', label: 'Tesoureiro' },
      { value: 'Visitante', label: 'Visitante' },
    ],
  },
  {
    id: '6',
    name: 'Cidade',
    hasSorting: true,
    hasFilter: true,
    growFactor: 'minmax(150px, 15%)',
    filterOptions: [
      { value: 'Atendente', label: 'Atendente' },
      { value: 'Coordenador', label: 'Coordenador' },
      { value: 'Diretor', label: 'Diretor' },
      { value: 'Tesoureiro', label: 'Tesoureiro' },
      { value: 'Visitante', label: 'Visitante' },
    ],
  },
  {
    id: '7',
    name: 'Status',
    hasSorting: true,
    hasFilter: true,
    growFactor: 'minmax(150px, 10%)',
    filterOptions: [
      { value: 'Atendente', label: 'Atendente' },
      { value: 'Coordenador', label: 'Coordenador' },
      { value: 'Diretor', label: 'Diretor' },
      { value: 'Tesoureiro', label: 'Tesoureiro' },
      { value: 'Visitante', label: 'Visitante' },
    ],
  },
];

const SchoolList: React.FC = () => {
  const [responseData, setResponseData] = useState<ResponseData<ISchoolListResponse>>(
    {} as ResponseData<ISchoolListResponse>,
  );

  const [searchingValue, setSearchingValue] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState(null);
  const [order, setOrder] = useState(null);
  const [filters, setFilters] = useState<string[]>([]);
  const navigate = useNavigate();

  const listItems = useMemo(() => responseData.object_list
 && responseData.object_list.map(({
   id, initials, name, phone, email, estate, city, status,
 }) => ({
   initials,
   name,
   phone: telMasked(phone),
   email,
   estate,
   city,
   status,
   object_id: id,
 })), [responseData]);

  const keywords = useMemo(() => searchingValue.split(' ').filter((str) => !!str).map((value) => value.toLowerCase()), [searchingValue]);

  const getSchoolList = useCallback(async () => {
    const currentKeywords = keywords.concat(filters);

    await api.get('/school/dashboard/list', {
      params: {
        itens_per_page: itemsPerPage,
        page: currentPage - 1,
        sort: sortType && wrapperNames[sortType],
        sort_type: order,
        keywords: currentKeywords.length > 0 ? currentKeywords : undefined,
      },
    }).then((response: any) => {
      setResponseData(response ? response.data : initialValue);
    });
  }, [currentPage, keywords, itemsPerPage, order, sortType, filters]);

  const handleSubmitSearch = useCallback(() => {
    getSchoolList();
  }, [getSchoolList]);

  const handleClick = useCallback((item) => {
    navigate('detalhes', { state: { school: item } });
  }, [navigate]);

  useEffect(() => {
    getSchoolList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, sortType, currentPage, filters]);

  const handleChangeSort = useCallback((newSortType, newSort) => {
    setSortType(newSortType);
    setOrder(newSort);
  }, []);

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
          maxWidth="200px"
          maxHeight="100%"
          leftIcon={<HiPlus size={18} />}
        >
          NOVA UNIDADE
        </Button>
      </ListSearchArea>
      <ListTable
        changeItemsCount={setItemsPerPage}
        onClickItem={handleClick}
        changePage={setCurrentPage}
        onSortChange={handleChangeSort}
        indexToBold={1}
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

export default SchoolList;
