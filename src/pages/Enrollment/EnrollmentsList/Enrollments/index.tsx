import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { HiPlus } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/Forms/Buttons/Button';
import DownloadButton from '../../../../components/Forms/Buttons/DownloadButton';
import ListTable from '../../../../components/ListTable';
import ListSearchArea from '../../../../components/ListTable/components/ListSearchArea';
import { useModal } from '../../../../hooks/modal';
import { useStudent } from '../../../../hooks/student';
import { StatusOfEnrollment } from '../../../../interfaces/IEnrollment';
import api, { initialValue, ResponseData } from '../../../../services/api';
import { cpfMasked, telMasked } from '../../../../utils/masks';
import wrapperNames from '../../../../utils/wrapper.json';
import StatusButton, { ActionButtonProps } from '../../../Classroom/components/StatusButton';

import { Container } from './styles';

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
    name: 'CPF',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 10%)',
  },
  {
    id: '2',
    name: 'Curso',
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
    id: '3',
    name: 'Telefone',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 15%)',
  },
  {
    id: '5',
    name: 'Email',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 15%)',
  },
  {
    id: '6',
    name: 'Estado',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 15%)',
  },
];

export interface EnrollmentResponse {
  id: string,
  student_name: string,
  student_cpf: string,
  course_name: string,
  student_cellphone: string,
  student_whatsapp: string,
  student_email: string,
  student_expiration: string,
  status: string,
  secondary_status: string,
}

const Enrollments: React.FC = () => {
  const navigate = useNavigate();

  const { setCurrentStudent } = useStudent();

  const [responseData, setResponseData] = useState<ResponseData<EnrollmentResponse>>(
    {} as ResponseData<EnrollmentResponse>,
  );

  const [searchingValue, setSearchingValue] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState(null);
  const [order, setOrder] = useState(null);
  const [filters, setFilters] = useState<string[]>([]);

  const keywords = useMemo(() => {
    const searchWords = searchingValue.split(' ').filter((str) => !!str).map((value) => value.toLowerCase());

    return searchWords.concat(filters);
  }, [filters, searchingValue]);

  const getEnrollmentList = useCallback(async () => {
    await api.get('/enrollment/dashboard/list', {
      params: {
        itens_per_page: itemsPerPage,
        page: currentPage - 1,
        sort: sortType && wrapperNames[sortType],
        sort_type: order,
        keywords,
        status: [StatusOfEnrollment.Matriculado],
      },
    }).then((response: any) => {
      setResponseData(response ? response.data : initialValue);
    });
  }, [currentPage, keywords, itemsPerPage, order, sortType]);

  const listItems = useMemo(() => responseData.object_list
  && responseData.object_list.map(({
    id, student_name, student_cpf, course_name,
    student_whatsapp, student_email, secondary_status,
  }) => ({
    student_name,
    student_cpf: cpfMasked(student_cpf),
    course_name,
    student_whatsapp: telMasked(student_whatsapp),
    student_email,
    secondary_status,
    object_id: id,
  })), [responseData.object_list]);
  // extra: <DownloadButton />,

  const handleSubmitSearch = useCallback(() => {
    getEnrollmentList();
  }, [getEnrollmentList]);

  const handleClick = useCallback((item) => {
    navigate('detalhes', { state: { enrollment: { ...item, extra: null } } });
  }, [navigate]);

  useEffect(() => {
    getEnrollmentList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          onClick={() => { setCurrentStudent(undefined); navigate('detalhes'); }}
          maxWidth="200px"
          maxHeight="100%"
          leftIcon={<HiPlus size={18} />}
        >
          NOVA MATRICULA
        </Button>
      </ListSearchArea>
      <ListTable
        changeItemsCount={setItemsPerPage}
        onClickItem={handleClick}
        changePage={setCurrentPage}
        onSortChange={handleChangeSort}
        indexToBold={0}
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

export default Enrollments;
