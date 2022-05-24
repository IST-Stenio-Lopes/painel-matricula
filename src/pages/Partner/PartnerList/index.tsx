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
import { PartnerResponse } from '../../../interfaces/IPartner';
import api, { initialValue, ResponseData } from '../../../services/api';
import { cpnjMasked, telMasked } from '../../../utils/masks';
import wrapperNames from '../../../utils/wrapper.json';

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
    name: 'Telefone',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 10%)',
  },
  {
    id: '2',
    name: 'Cnpj',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 10%)',
  },
  {
    id: '3',
    name: 'Email',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 35%)',
  },

];

const PartnerList: React.FC = () => {
  const { configModal, handleVisible } = useModal();

  const [responseData, setResponseData] = useState<ResponseData<PartnerResponse>>(
     {} as ResponseData<PartnerResponse>,
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
    id, name, cellphone, cnpj, email,
  }) => ({
    name,
    cellphone: telMasked(cellphone),
    cnpj: cpnjMasked(cnpj),
    email,
    object_id: id,
  })), [responseData]);

  const keywords = useMemo(() => searchingValue.split(' ').filter((str) => !!str).map((value) => value.toLowerCase()), [searchingValue]);

  const getPartnerList = useCallback(async () => {
    const currentKeywords = keywords.concat(filters);

    await api.get('/partner/dashboard/list', {
      params: {
        itens_per_page: itemsPerPage,
        page: currentPage - 1,
        sort: sortType && wrapperNames[sortType],
        sort_type: order,
        keywords: currentKeywords.length > 0 ? currentKeywords : undefined,
        status: ['Ativado'],
      },
    }).then((response: any) => {
      setResponseData(response ? response.data : initialValue);
    });
  }, [currentPage, keywords, itemsPerPage, order, sortType, filters]);

  const deletePartner = useCallback(async (partnerId) => {
    await api.delete(`/partner/dashboard/${partnerId}`).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        configModal('O parceiro foi removido com sucesso', 'success');
        handleVisible();
        getPartnerList();
      }
    });
  }, [configModal, getPartnerList, handleVisible]);

  const handleRemove = useCallback((partnerId) => {
    configModal(
      'Deseja realmente remover o parceiro selecionado?',
      'message',
      true,
      true,
      () => deletePartner(partnerId),
    );
    handleVisible();
  }, [configModal, deletePartner, handleVisible]);

  const handleSubmitSearch = useCallback(() => {
    getPartnerList();
  }, [getPartnerList]);

  const handleClick = useCallback((item) => {
    navigate('detalhes', { state: { partner: item } });
  }, [navigate]);

  const setPageConfig = useCallback(() => {
    setItemsPerPage(10);
    setCurrentPage(1);
    setSortType(null);
    setOrder(null);
  }, []);

  useEffect(() => {
    getPartnerList();
    setPageConfig();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      >
        <Button
          maxWidth="200px"
          maxHeight="100%"
          leftIcon={<HiPlus size={18} />}
          onClick={() => navigate('detalhes')}
        >
          Novo Parceiro
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

export default PartnerList;
