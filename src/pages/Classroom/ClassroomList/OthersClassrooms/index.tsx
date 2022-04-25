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
import { IClassroomResponse, StatusOfClassroom } from '../../../../interfaces/IClassroom';
import api, { initialValue, ResponseData } from '../../../../services/api';
import wrapperNames from '../../../../utils/wrapper.json';
import StatusButton, { ActionButtonProps } from '../../components/StatusButton';
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
    name: 'Status',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 1fr)',
  },
];
const OthersClassrooms: React.FC = () => {
  const { configModal, handleVisible } = useModal();

  const [responseData, setResponseData] = useState<ResponseData<IClassroomResponse>>(
    {} as ResponseData<IClassroomResponse>,
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
        status: [
          StatusOfClassroom.Cancelada,
          StatusOfClassroom.Finalizada,
          StatusOfClassroom.Removido],
      },
    }).catch((err) => console.dir(err.response.data))
      .then((response: any) => {
        setResponseData(response ? response.data : initialValue);
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

  const actionButtons: ActionButtonProps[] = useMemo(() => [
    {
      name: 'Fechada',
      status: StatusOfClassroom.Fechada,
    },
    {
      name: 'Aberta',
      status: StatusOfClassroom.Aberta,
    },
    {
      name: 'Iniciar',
      status: StatusOfClassroom.Iniciada,
    },
  ], []);

  const listItems = useMemo(() => responseData.object_list
 && responseData.object_list.map(({
   id, code, course_name, shift,
   category, is_free, status,
 }) => ({
   code,
   course_name,
   shift,
   category,
   is_free: is_free ? 'Gratuito' : 'Pago',
   status,
   extra: <StatusButton
     classroomId={id}
     actionButtons={actionButtons}
     handleClick={handleChangeStatus}
     status={status}
   />,
   object_id: id,
 })), [actionButtons, handleChangeStatus, responseData.object_list]);

  const handleSubmitSearch = useCallback(() => {
    getClassroomList();
  }, [getClassroomList]);

  const handleClick = useCallback((item) => {
    navigate('detalhes', { state: { classroom: { ...item, extra: null } } });
  }, [navigate]);

  useEffect(() => {
    getClassroomList();
  }, [order, sortType, currentPage]);

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
        hasTrashButton={false}
      />
    </Container>
  );
};

export default OthersClassrooms;
