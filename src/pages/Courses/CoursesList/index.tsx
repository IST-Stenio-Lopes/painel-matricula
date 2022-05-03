import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { HiPlus } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Forms/Buttons/Button';
import ListTable from '../../../components/ListTable';
import ListSearchArea from '../../../components/ListTable/components/ListSearchArea';
import PageContainer from '../../../components/PageContainer';
import { StatusOfCourse } from '../../../interfaces/ICourse';
import api, { ResponseData } from '../../../services/api';
import { currencyFormatted } from '../../../utils/currencyUtilities';
import wrapperNames from '../../../utils/wrapper.json';

const listTitles = [
  {
    id: '4',
    name: 'Curso',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 20%)',
  },
  {
    id: '1',
    name: 'Área',
    hasSorting: true,
    hasFilter: true,
    growFactor: 'minmax(150px, 20%)',
    filterOptions: [
      { value: 'Atendente', label: 'Atendente' },
      { value: 'Coordenador', label: 'Coordenador' },
      { value: 'Diretor', label: 'Diretor' },
      { value: 'Tesoureiro', label: 'Tesoureiro' },
      { value: 'Visitante', label: 'Visitante' },
    ],
  },
  {
    id: '2',
    name: 'Valor',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 10%)',
  },
  {
    id: '3',
    name: 'Modalidade',
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
    id: '5',
    name: 'Duração',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 15%)',
  },
];

interface CourseResponse {
  id: string,
  name: string,
  field: string,
  modality: string,
  duration: string,
  cost: number | string,
  payment_installment: number,
  enrollment_fee: number,
  description: string,
  prerequisites: string,
  status: string,
}

const initialValue = {
  max_pages: 1,
  max_itens: 1,
  object_list: [],
};

const CoursesList: React.FC = () => {
  const [responseData, setResponseData] = useState<ResponseData<CourseResponse>>(
    {} as ResponseData<CourseResponse>,
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
    id, name, field, cost, modality, duration,
  }) => ({
    name,
    field,
    cost: currencyFormatted(cost as string),
    modality,
    duration,
    object_id: id,
  })), [responseData]);

  const keywords = useMemo(() => {
    const searchWords = searchingValue.split(' ').filter((str) => !!str).map((value) => value.toLowerCase());

    return searchWords.concat(filters);
  }, [filters, searchingValue]);

  const getCourseList = useCallback(async () => {
    await api.get('/course/dashboard/list', {
      params: {
        itens_per_page: itemsPerPage,
        page: currentPage - 1,
        sort: sortType && wrapperNames[sortType],
        sort_type: order,
        keywords,
        status: [StatusOfCourse.Ativado],
      },
    }).then((response: any) => {
      setResponseData(response ? response.data : initialValue);
    });
  }, [currentPage, keywords, itemsPerPage, order, sortType]);

  const handleSubmitSearch = useCallback(() => {
    getCourseList();
  }, [getCourseList]);

  const handleClick = useCallback((item) => {
    navigate('curso', { state: { course: item } });
  }, [navigate]);

  useEffect(() => {
    getCourseList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, sortType, currentPage]);

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
          onClick={() => navigate('curso')}
          maxWidth="160px"
          maxHeight="100%"
          leftIcon={<HiPlus size={18} />}
        >
          NOVO CURSO
        </Button>
      </ListSearchArea>
      <ListTable
        onClickItem={handleClick}
        changePage={setCurrentPage}
        onSortChange={handleChangeSort}
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

export default CoursesList;
