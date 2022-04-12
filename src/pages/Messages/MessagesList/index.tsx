import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import ListTable from '../../../components/ListTable';
import ListSearchArea from '../../../components/ListTable/components/ListSearchArea';
import PageContainer from '../../../components/PageContainer';
import api, { ResponseData } from '../../../services/api';
import wrapperNames from '../../../utils/wrapper.json';

const listTitles = [
  {
    id: '4',
    name: 'Nome',
    hasSorting: true,
    hasFilter: false,
    growFactor: '20%',
  },
  {
    id: '1',
    name: 'Assunto',
    hasSorting: true,
    hasFilter: true,
    growFactor: '10%',
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
    name: 'Whatsapp',
    hasSorting: true,
    hasFilter: false,
    growFactor: '10%',
  },
  {
    id: '3',
    name: 'Telefone',
    hasSorting: true,
    hasFilter: false,
    growFactor: '10%',
  },
  {
    id: '5',
    name: 'Email',
    hasSorting: true,
    hasFilter: false,
    growFactor: '15%',
  },
  {
    id: '6',
    name: 'Data',
    hasSorting: true,
    hasFilter: false,
    growFactor: '10%',
  },
];

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

const MessagesList: React.FC = () => {
  const [responseData, setResponseData] = useState<ResponseData<MessageResponse>>(
    {} as ResponseData<MessageResponse>,
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
   id, student_name, subject, created_at, cellphone, whatsapp, email,
 }) => ({
   student_name,
   subject,
   cellphone,
   whatsapp,
   email,
   created_at,
   object_id: id,
 })), [responseData]);

  const keywords = useMemo(() => {
    const searchWords = searchingValue.split(' ');

    return searchWords.concat(filters);
  }, [filters, searchingValue]);

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
        setResponseData(response ? response.data : initialValue);
        console.dir(response.data);
      });
  }, [currentPage, keywords, itemsPerPage, order, sortType]);

  const handleSubmitSearch = useCallback(() => {
    getMessageList();
  }, [getMessageList]);

  const handleClick = useCallback((item) => {
    navigate('detalhes', { state: { message: item } });
  }, [navigate]);

  useEffect(() => {
    getMessageList();
  }, []);

  return (
    <PageContainer gridTemplateRows="36px minmax(500px, 660px)" paddingTop="32px">
      <ListSearchArea
        listFilters={listTitles}
        setKeywords={setFilters}
        searchValue={searchingValue}
        handleChange={setSearchingValue}
        onSubmit={handleSubmitSearch}
      />
      <ListTable
        onClickItem={handleClick}
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

export default MessagesList;
