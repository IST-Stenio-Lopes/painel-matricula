import { String } from 'lodash';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { HiPlus } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Forms/Buttons/Button';
import ListTable from '../../../components/ListTable';
import ListSearchArea from '../../../components/ListTable/components/ListSearchArea';
import PageContainer from '../../../components/PageContainer';
import { useModal } from '../../../hooks/modal';
import api, { initialValue, ResponseData } from '../../../services/api';
import wrapperNames from '../../../utils/wrapper.json';

const listTitles = [
  {
    id: '4',
    name: 'Tópico',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 20%)',
  },
  {
    id: '1',
    name: 'Categoria',
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
    id: '2',
    name: 'Data de Inclusão',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 10%)',
  },
  {
    id: '3',
    name: 'Texto',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 35%)',
  },

];

interface FaqResponse {
  id: String,
  title: string,
  category: string,
  content: string,
  created_at: string,
  status: string,
}

const FaqList: React.FC = () => {
  const { configModal, handleVisible } = useModal();

  const [responseData, setResponseData] = useState<ResponseData<FaqResponse>>(
     {} as ResponseData<FaqResponse>,
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
    id, title, category, created_at, content,
  }) => ({
    title,
    category,
    created_at: new Date(created_at).toLocaleDateString('pt-BR'),
    content,
    object_id: id,
  })), [responseData]);

  const keywords = useMemo(() => {
    const searchWords = searchingValue.split(' ').filter((str) => !!str).map((value) => value.toLowerCase());

    return searchWords.concat(filters);
  }, [filters, searchingValue]);

  const getFaqList = useCallback(async () => {
    await api.get('/faq/dashboard/list', {
      params: {
        itens_per_page: itemsPerPage,
        page: currentPage - 1,
        sort: sortType && wrapperNames[sortType],
        sort_type: order,
        keywords,
        status: ['Ativado'],
      },
    }).then((response: any) => {
      setResponseData(response ? response.data : initialValue);
    });
  }, [currentPage, keywords, itemsPerPage, order, sortType]);

  const deleteFaq = useCallback(async (faqId) => {
    await api.delete(`/faq/dashboard/${faqId}`).catch((err) => {
      configModal(err.response.data.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        configModal('O tópico foi removido com sucesso', 'success');
        handleVisible();
        getFaqList();
      }
    });
  }, [configModal, getFaqList, handleVisible]);

  const handleRemove = useCallback((faqId) => {
    configModal(
      'Deseja realmente remover o tópico selecionado?',
      'message',
      true,
      true,
      () => deleteFaq(faqId),
    );
    handleVisible();
  }, [configModal, deleteFaq, handleVisible]);

  const handleSubmitSearch = useCallback(() => {
    getFaqList();
  }, [getFaqList]);

  const handleClick = useCallback((item) => {
    navigate('topico', { state: { faq: item } });
  }, [navigate]);

  const setPageConfig = useCallback(() => {
    setItemsPerPage(10);
    setCurrentPage(1);
    setSortType(null);
    setOrder(null);
  }, []);

  useEffect(() => {
    getFaqList();
    setPageConfig();
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
          maxWidth="160px"
          maxHeight="100%"
          leftIcon={<HiPlus size={18} />}
          onClick={() => navigate('topico')}
        >
          NOVO TÓPICO
        </Button>
      </ListSearchArea>
      <ListTable
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

export default FaqList;
