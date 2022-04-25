import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import ListTable from '../../../../components/ListTable';
import { EnrollmentResponse, StatusOfEnrollment } from '../../../../interfaces/IEnrollment';
import api, { initialValue, ResponseData } from '../../../../services/api';
import ClassroomInfo from '../../components/ClassroomInfo';
import wrapperNames from '../../../../utils/wrapper.json';

import { Container } from './styles';
import { useClassroom } from '../../../../hooks/classroom';
import { IClassroomDetails } from '../../../../interfaces/IClassroom';

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
    id: '2',
    name: 'Status',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 20%)',
  },
];

const ClassroomWaitList: React.FC = () => {
  const { currentClassroom } = useClassroom();
  const [responseData, setResponseData] = useState<ResponseData<EnrollmentResponse>>(
    {} as ResponseData<EnrollmentResponse>,
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
    id, student_name, student_cpf, student_whatsapp, student_email, status,
  }) => ({
    student_name,
    student_cpf,
    student_whatsapp,
    student_email,
    status,
    object_id: id,
  })), [responseData]);
  // extra: <DownloadButton />,

  const keywords = useMemo(() => {
    // const searchWords = [`:${currentClassroom?.classroom.id}`];
    const searchWords = searchingValue.split(' ')
      .filter((str) => !!str).map((value) => value.toLowerCase());

    return searchWords.concat(filters);
  }, [filters, searchingValue]);

  const getEnrollmentList = useCallback(async () => {
    await api.get(`/enrollment/dashboard/list/${currentClassroom?.classroom.id}`, {
      params: {
        itens_per_page: itemsPerPage,
        page: currentPage - 1,
        sort: sortType && wrapperNames[sortType],
        sort_type: order,
        keywords,
        status: [StatusOfEnrollment.Espera],
      },
    }).catch((err) => console.dir(err.response.data))
      .then((response: any) => {
        console.log(response.data);
        setResponseData(response ? response.data : initialValue);
      });
  }, [currentPage, keywords, itemsPerPage, order, sortType, currentClassroom]);

  useEffect(() => {
    getEnrollmentList();
  }, [order, sortType, currentPage]);

  const handleChangeSort = useCallback((newSortType, newSort) => {
    setSortType(newSortType);
    setOrder(newSort);
  }, []);

  return (
    <Container>
      <ClassroomInfo classroomDetails={currentClassroom as IClassroomDetails} />
      <ListTable
        title="Lista de Espera"
        subtitle="Informações dos alunos que estão na lista de espera"
        changePage={setCurrentPage}
        onSortChange={handleChangeSort}
        indexToBold={0}
        listTitles={listTitles}
        listItems={listItems}
        itemsPerPages={itemsPerPage}
        currentPage={currentPage}
        totalOfItems={responseData.max_itens}
        gridColumn="2 / 5"
        hasTrashButton
      />
    </Container>
  );
};

export default ClassroomWaitList;
