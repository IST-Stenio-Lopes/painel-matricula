import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import ListTable from '../../../components/ListTable';
import ListSearchArea from '../../../components/ListTable/components/ListSearchArea';
import PageContainer from '../../../components/PageContainer';
import { useModal } from '../../../hooks/modal';
import api, { ResponseData } from '../../../services/api';
import { cellPhoneMasked } from '../../../utils/masks';
import wrapperNames from '../../../utils/wrapper.json';

const listTitles = [
  {
    id: '4',
    name: 'Nome do Estudante',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 20%)',
  },
  {
    id: '1',
    name: 'Assunto',
    hasSorting: true,
    hasFilter: true,
    growFactor: 'minmax(150px, 10%)',
    filterOptions: [
      { value: 'Cursos', label: 'Cursos' },
      { value: 'Matrícula', label: 'Matrícula' },
      { value: 'Preços', label: 'Preços' },
      { value: 'Outro Assunto', label: 'Outro Assunto' },
    ],
  },
  {
    id: '3',
    name: 'Telefone',
    hasSorting: false,
    hasFilter: false,
    growFactor: 'minmax(150px, 10%)',
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
    name: 'Enviado em',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 10%)',
  },
  {
    id: '7',
    name: 'Status',
    hasSorting: true,
    hasFilter: true,
    growFactor: 'minmax(150px, 10%)',
    filterOptions: [
      { value: 'Lida', label: 'Lida' },
      { value: 'Não Lida', label: 'Não Lida' },
    ],
  },
];

interface MessageResponse {
  id: String,
  student_name: string,
  subject: string,
  cellphone: string,
  whatsapp: string,
  email: string,
  status: string,
  created_at: string,
}

const initialValue = {
  max_pages: 1,
  max_itens: 1,
  object_list: [],
};

const MessagesList: React.FC = () => {
  const { configModal, handleVisible } = useModal();

  const [responseData, setResponseData] = useState<ResponseData<MessageResponse>>(
    {} as ResponseData<MessageResponse>,
  );

  const [searchingValue, setSearchingValue] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState(undefined);
  const [order, setOrder] = useState(undefined);
  const [filters, setFilters] = useState<string[]>([]);
  const navigate = useNavigate();

  const listItems = useMemo(() => responseData.object_list
 && responseData.object_list.map(({
   id, student_name, subject, created_at, cellphone, whatsapp, email, status,
 }) => ({
   student_name,
   subject,
   cellphone: cellPhoneMasked(whatsapp || cellphone),
   email,
   created_at: new Date(created_at).toLocaleDateString('pt-BR'),
   status,
   object_id: id,
 })), [responseData]);

  const keywords = useMemo(() => searchingValue.split(' ').filter((str) => !!str).map((value) => value.toLowerCase()), [searchingValue]);

  const getMessageList = useCallback(async () => {
    const currentKeywords = keywords.concat(filters);

    await api.get('/message/dashboard/list', {
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

  const deleteMessage = useCallback(async (messageId) => {
    await api.delete(`/message/dashboard/${messageId}`).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        configModal('A mensagem foi removida com sucesso', 'success');
        handleVisible();
        getMessageList();
      }
    });
  }, [configModal, getMessageList, handleVisible]);

  const handleRemove = useCallback((messageId) => {
    configModal(
      'Deseja realmente remover a mensagem selecionada?',
      'message',
      true,
      true,
      () => deleteMessage(messageId),
    );
    handleVisible();
  }, [configModal, deleteMessage, handleVisible]);

  const handleSubmitSearch = useCallback(() => {
    getMessageList();
  }, [getMessageList]);

  const handleClick = useCallback((item) => {
    navigate('detalhes', { state: { message: item } });
  }, [navigate]);

  useEffect(() => {
    getMessageList();
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
      />
      <ListTable
        changeItemsCount={setItemsPerPage}
        onClickItem={handleClick}
        onRemoveItem={handleRemove}
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
    </PageContainer>
  );
};

export default MessagesList;
