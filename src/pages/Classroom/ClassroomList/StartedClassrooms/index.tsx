import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { HiPlus } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/Forms/Buttons/Button';
import ListTable from '../../../../components/ListTable';
import ListSearchArea from '../../../../components/ListTable/components/ListSearchArea';
import PageContainer from '../../../../components/PageContainer';
import ProgressBar from '../../../../components/ProgressBar';
import { useModal } from '../../../../hooks/modal';
import api, { ResponseData } from '../../../../services/api';
import wrapperNames from '../../../../utils/wrapper.json';
import StatusButton from '../../components/StatusButton';
import { categoryOptions, shiftOptions, typeOptions } from '../../data/options';
import { Container } from './styles';

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

const StartedClassrooms: React.FC = () => {
  const { configModal, handleVisible } = useModal();

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

  const keywords = useMemo(() => {
    const searchWords = searchingValue.split(' ').filter((str) => !!str).map((value) => value.toLowerCase());

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
        status: ['Aberta', 'Fechada', 'Finalizada'],
      },
    }).catch((err) => console.dir(err.response.data))
      .then((response: any) => {
        setResponseData(response ? response.data : initialValue);
        console.dir(response.data);
      });
  }, [currentPage, keywords, itemsPerPage, order, sortType]);

  const handleChangeStatus = useCallback(async (classroomId, status) => {
    await api.patch(`/classroom/dashboard/${classroomId}`, { status })
      .catch((error) => {
        configModal(error.response.data.message, 'error');
        handleVisible();
      })
      .then((response) => {
        if (response?.status && response.status >= 200 && response.status <= 299) {
          getClassroomList();
          configModal('Alteração de status feita com sucesso', 'success');
          handleVisible();
        }
      });
  }, [configModal, handleVisible, getClassroomList]);

  const listItems = useMemo(() => responseData.object_list
 && responseData.object_list.map(({
   id, code, course_name, shift,
   category, is_free, number_of_enrollments,
   number_of_vacancies, status,
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
   extra: <StatusButton classroomId={id} handleClick={handleChangeStatus} status={status} />,
   object_id: id,
 })), [handleChangeStatus, responseData.object_list]);

  const handleSubmitSearch = useCallback(() => {
    getClassroomList();
  }, [getClassroomList]);

  const handleClick = useCallback((item) => {
    navigate('detalhes', { state: { classroom: { ...item, extra: null } } });
  }, [navigate]);

  useEffect(() => {
    getClassroomList();
  }, [order, sortType]);

  const handleChangeSort = useCallback((newSortType, newSort) => {
    setSortType(newSortType);
    setOrder(newSort);
  }, []);

  return (
    <Container>
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
    </Container>
  );
};

export default StartedClassrooms;
