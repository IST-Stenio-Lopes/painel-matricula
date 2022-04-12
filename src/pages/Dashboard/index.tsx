import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import ListTable from '../../components/ListTable';
import PageContainer from '../../components/PageContainer';
import { MessagePanel } from '../../components/Panels/MessagePanel';
import ProgressBar from '../../components/ProgressBar';
import { theme } from '../../global/styles/styles';
import api, { ResponseData } from '../../services/api';
import DashboardCard from './components/DashboardCard';
import wrapperNames from '../../utils/wrapper.json';
import { getTimeDiff } from './utils/utilities';

const listTitles = [
  {
    id: '4',
    name: 'ID - Turma',
    hasSorting: true,
    hasFilter: true,
    growFactor: '10%',
  },
  {
    id: '1',
    name: 'Curso',
    hasSorting: true,
    hasFilter: true,
    growFactor: '20%',
  },
  {
    id: '2',
    name: 'Turno',
    hasSorting: true,
    hasFilter: true,
    growFactor: '10%',
  },
  {
    id: '3',
    name: 'Modalidade',
    hasSorting: true,
    hasFilter: true,
    growFactor: '15%',
  },
  {
    id: '5',
    name: 'Tipo',
    hasSorting: true,
    hasFilter: true,
    growFactor: '10%',
  },
  {
    id: '6',
    name: 'Vagas Preenchidas',
    hasSorting: true,
    hasFilter: true,
    growFactor: '1fr',
  },
];

interface Data {
  value: number;
  percentage: number;
}

interface DataResponse {
  enrollment_thorough_school: Data,
  enrollment_thorough_app: Data,
  enrollment_payed_goal: Data,
  enrollment_free_goal: Data,
}

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

interface MessageResponse {
  id: String,
  student_name: string,
  subject: string,
  cellphone: string,
  whatsapp: string,
  email: string,
  created_at: string,
}

const initialValue = {
  max_pages: 1,
  max_itens: 1,
  object_list: [],
};

const initialDataValue = {
  enrollment_thorough_school: { value: 0, percentage: 0 },
  enrollment_thorough_app: { value: 0, percentage: 0 },
  enrollment_payed_goal: { value: 0, percentage: 0 },
  enrollment_free_goal: { value: 0, percentage: 0 },
};

const Dashboard: React.FC = () => {
  const [responseData, setResponseData] = useState<DataResponse>(
    initialDataValue,
  );

  const [responseMessageData, setResponseMessageData] = useState<ResponseData<MessageResponse>>(
    initialValue,
  );

  const [
    responseClassroomData,
    setResponseClassroomData,
  ] = useState<ResponseData<ClassroomResponse>>(
    initialValue,
  );

  const [searchingValue, setSearchingValue] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState(null);
  const [order, setOrder] = useState(null);
  const [filters, setFilters] = useState<string[]>([]);
  const navigate = useNavigate();

  const listItems = useMemo(() => responseClassroomData.object_list
 && responseClassroomData.object_list.map(({
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
   object_id: id,
 })), [responseClassroomData]);

  const messagesList = useMemo(() => responseMessageData.object_list
 && responseMessageData.object_list.map(({
   id, student_name, subject, created_at, cellphone, whatsapp, email,
 }) => ({
   id,
   name: student_name,
   msg: subject,
   cellphone,
   whatsapp,
   email,
   time: getTimeDiff(created_at),
   object_id: id,
 })), [responseMessageData]);

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
        setResponseClassroomData(response ? response.data : initialValue);
        console.dir(response.data);
      });
  }, [currentPage, keywords, itemsPerPage, order, sortType]);

  const getMessageList = useCallback(async () => {
    await api.get('/message/dashboard/list', {
      params: {
        itens_per_page: itemsPerPage,
        page: currentPage - 1,
        sort: sortType && wrapperNames[sortType],
        sort_type: order,
        keywords,
        status: ['Ativo', 'Não Lida'],
      },
    }).catch((err) => console.dir(err.response.data))
      .then((response: any) => {
        setResponseMessageData(response ? response.data : initialValue);
        console.dir(response.data);
      });
  }, [currentPage, keywords, itemsPerPage, order, sortType]);

  const geDataInfo = useCallback(async () => {
    await api.get('/enrollment/dashboard/data')
      .catch((err) => console.dir(err.response.data))
      .then((response: any) => {
        setResponseData(response ? response.data : initialDataValue);
        console.dir(response.data);
      });
  }, []);

  const handleClickClassroom = useCallback((item) => {
    navigate('/turmas/detalhes', { state: { classroom: { ...item, extra: null } } });
  }, [navigate]);

  const handleClickMessage = useCallback((item) => {
    navigate('detalhes', { state: { message: item } });
  }, [navigate]);

  useEffect(() => {
    getClassroomList();
    getMessageList();
    geDataInfo();

    return () => {
      setResponseData(initialDataValue);
      setResponseMessageData(initialValue);
      setResponseClassroomData(initialValue);
    };
  }, []);

  return (
    <PageContainer
      gridTemplateColumns="repeat(4, minmax(300px, 1fr))"
      gridTemplateRows="152px minmax(500px, 660px)"
      paddingTop="116px"
    >
      <DashboardCard
        title="MATRICULADOS PELO APP"
        value={responseData.enrollment_thorough_app}
        type="mobile"
      />
      <DashboardCard
        title="MATRICULADOS NA UNIDADE"
        value={responseData.enrollment_thorough_school}
        type="web"
      />
      <DashboardCard
        title="META DE VAGAS GRATUITAS"
        value={responseData.enrollment_free_goal}
        type="percent"
        color={theme.colors.yellow}
      />
      <DashboardCard
        title="META DE VAGAS PAGAS"
        value={responseData.enrollment_payed_goal}
        type="percent"
        color={theme.colors.primary50}
      />

      <ListTable
        title="Turmas Abertas"
        onClickItem={handleClickClassroom}
        indexToBold={1}
        listTitles={listTitles}
        listItems={listItems}
        itemsPerPages={itemsPerPage}
        currentPage={currentPage}
        totalOfItems={responseClassroomData.max_itens}
        hasTrashButton={false}
        gridColumn="1 / 4"
      />

      <MessagePanel gridRow="2 / 3" gridColumn="4 / 4" data={messagesList || []} />
    </PageContainer>
  );
};

export default Dashboard;
