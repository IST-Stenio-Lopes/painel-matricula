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
import api, { ResponseData } from '../../../services/api';
import wrapperNames from '../../../utils/wrapper.json';

const listTitles = [
  {
    id: '4',
    name: 'Título',
    hasSorting: true,
    hasFilter: true,
    growFactor: '20%',
  },
  {
    id: '1',
    name: 'Nº de Visualizações',
    hasSorting: true,
    hasFilter: true,
    growFactor: '10%',
  },
  {
    id: '2',
    name: 'Tipo',
    hasSorting: true,
    hasFilter: true,
    growFactor: '10%',
  },
  {
    id: '3',
    name: 'Expira em',
    hasSorting: true,
    hasFilter: true,
    growFactor: '10%',
  },
  {
    id: '5',
    name: 'Texto',
    hasSorting: true,
    hasFilter: true,
    growFactor: '25%',
  },
];

interface AdvertisingResponse {
  id: String,
  title: string,
  type: string,
  number_visualizations: string,
  expiration_date: Date,
  description: string,
  status: string
}

interface OptionsResponse {
  id: string;
  name:string
}

const initialValue = {
  max_pages: 1,
  max_itens: 1,
  object_list: [],
};

const AdvertisingList: React.FC = () => {
  const [responseData, setResponseData] = useState<ResponseData<AdvertisingResponse>>(
    {} as ResponseData<AdvertisingResponse>,
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
   id, title, number_visualizations, type, expiration_date, description,
 }) => ({
   title,
   number_visualizations,
   type,
   expiration_date,
   description,
   object_id: id,
 })), [responseData]);

  const keywords = useMemo(() => {
    const searchWords = searchingValue.split(' ');

    return searchWords.concat(filters);
  }, [filters, searchingValue]);

  const getAdvertisingList = useCallback(async () => {
    await api.get('/advertising/dashboard/list', {
      params: {
        itens_per_page: itemsPerPage,
        page: currentPage - 1,
        sort: sortType && wrapperNames[sortType],
        sort_type: order,
        keywords,
        status: ['Ativado'],
      },
    }).catch((err) => console.dir(err.response.data))
      .then((response: any) => {
        setResponseData(response ? response.data : initialValue);
      });
  }, [currentPage, keywords, itemsPerPage, order, sortType]);

  const handleSubmitSearch = useCallback(() => {
    getAdvertisingList();
  }, [getAdvertisingList]);

  const handleClick = useCallback((item) => {
    navigate('detalhes', { state: { advertising: item } });
  }, [navigate]);

  useEffect(() => {
    getAdvertisingList();
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
          NOVO ANÚNCIO
        </Button>
      </ListSearchArea>
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

export default AdvertisingList;
