import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { HiPlus } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Forms/Buttons/Button';
import ListTable from '../../../components/ListTable';
import ListSearchArea from '../../../components/ListTable/components/ListSearchArea';
import PageContainer from '../../../components/PageContainer';
import ProgressBar from '../../../components/ProgressBar';
import api, { ResponseData } from '../../../services/api';
import wrapperNames from '../../../utils/wrapper.json';
import StatusButton from '../components/StatusButton';
import { categoryOptions, shiftOptions, typeOptions } from '../data/options';

const listTitles = [
  {
    id: '4',
    name: 'ID - Turma',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 10%)',
  },
  {
    id: '1',
    name: 'Curso',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 20%)',
  },
  {
    id: '2',
    name: 'Turno',
    hasSorting: true,
    hasFilter: true,
    growFactor: 'minmax(150px, 10%)',
    filterOptions: shiftOptions,
  },
  {
    id: '3',
    name: 'Modalidade',
    hasSorting: true,
    hasFilter: true,
    growFactor: 'minmax(150px, 15%)',
    filterOptions: categoryOptions,
  },
  {
    id: '5',
    name: 'Tipo',
    hasSorting: true,
    hasFilter: true,
    growFactor: 'minmax(150px, 10%)',
    filterOptions: typeOptions,
  },
  {
    id: '6',
    name: 'Vagas Preenchidas',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 1fr)',
  },
];

interface ClassroomResponse {
  id: string,
  object_id: string,
  code: string,
  course_name: string,
  category: string,
  shift: string[],
  is_free: string,
  number_of_vacancies: number,
  number_of_enrollments: number,
  status: string
}

const initialValue = {
  max_pages: 1,
  max_itens: 1,
  object_list: [],
};

const ClassroomList: React.FC = () => {
  const [responseData, setResponseData] = useState<ResponseData<ClassroomResponse>>(
    {} as ResponseData<ClassroomResponse>,
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
   id, code, course_name, shift, category, is_free, number_of_enrollments, number_of_vacancies,
 }) => ({
   code,
   course_name,
   shift,
   category,
   is_free: is_free ? 'Gratuito' : 'Pago',
   vagas: <ProgressBar
     current={number_of_enrollments}
     total={number_of_vacancies}
     label={`${number_of_enrollments}/${number_of_vacancies}`}
   />,
   extra: <StatusButton onClick={(e) => { e.stopPropagation(); console.log('Status'); }} />,
   object_id: id,
 })), [responseData]);

  const keywords = useMemo(() => {
    const searchWords = searchingValue.split(' ');

    return searchWords.concat(filters);
  }, [filters, searchingValue]);

  const getClassroomList = useCallback(async () => {
    await api.get('/classroom/dashboard/list', {
      params: {
        itens_per_page: itemsPerPage,
        page: currentPage - 1,
        sort: sortType && wrapperNames[sortType],
        sort_type: order,
        keywords,
        status: ['Aberta', 'Fechada'],
      },
    }).catch((err) => console.dir(err.response.data))
      .then((response: any) => {
        setResponseData(response ? response.data : initialValue);
        console.dir(response.data);
      });
  }, [currentPage, keywords, itemsPerPage, order, sortType]);

  const handleSubmitSearch = useCallback(() => {
    getClassroomList();
  }, [getClassroomList]);

  const handleClick = useCallback((item) => {
    navigate('detalhes', { state: { classroom: { ...item, extra: null } } });
  }, [navigate]);

  useEffect(() => {
    getClassroomList();
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
          NOVA TURMA
        </Button>
      </ListSearchArea>
      <ListTable
        onClickItem={handleClick}
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

export default ClassroomList;
