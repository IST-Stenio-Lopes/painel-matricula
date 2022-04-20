import { FormHandles } from '@unform/core';
import React, {
  ChangeEvent,
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isTypeAliasDeclaration } from 'typescript';
import * as Yup from 'yup';
import { Button } from '../../../../components/Forms/Buttons/Button';
import CheckboxInput from '../../../../components/Forms/Checkbox';
import { DateInputLine } from '../../../../components/Forms/DateInputLine';
import { FormSection } from '../../../../components/Forms/FormSection';
import { InputLine } from '../../../../components/Forms/InputLine';
import { InputSection } from '../../../../components/Forms/InputSection';
import SelectLine from '../../../../components/Forms/SelectLine';
import TextAreaLine from '../../../../components/Forms/TextAreaLine';
import ContentPanel from '../../../../components/Panels/ContentPanel';
import { useModal } from '../../../../hooks/modal';
import { IAdvertising, typeOptions } from '../../../../interfaces/IAdvertising';
import api from '../../../../services/api';
import getValidationErros from '../../../../utils/getValidationErrors';
import { checkImgType } from '../../../../utils/utils';
import PreviewContent from './components/PreviewContent';

import {
  ButtonArea,
  Container, FormContent, LeftContent,
} from './styles';

interface OptionsResponse {
  id: string;
  name:string
}

const FormAdvertising: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const inputRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { configModal, handleVisible } = useModal();
  const [expirationDate, setExpirationDate] = useState<Date>();

  const [selectedType, setSelectedType] = useState();
  const [selectedCourse, setSelectedCourse] = useState();
  const [doesNotExpire, setDoesNotExpire] = useState(false);

  const [file, setFile] = useState<any>();
  const [responseOptions, setResponseOptions] = useState<OptionsResponse[]>([]);

  const coursesList = useMemo(() => {
    const temp = [{ value: 'Todos', label: 'Todos' },
      ...responseOptions.map(({ id, name }) => ({
        value: id,
        label: name,
      })),
    ];

    return temp;
  }, [responseOptions]);

  const loadFile = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }, []);

  const getCurrentCoursesList = useCallback(async () => {
    await api.get(`/course/dashboard/list/${false}`).catch((err) => {
      configModal(err.response.data.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        setResponseOptions(response.data);
      }
    });
  }, [configModal, handleVisible]);

  const createAdvertising = useCallback(async (data: IAdvertising) => {
    if (!file) {
      configModal('Por favor carregue uma imagem', 'error');
      handleVisible();

      return;
    }

    if (!checkImgType(file.name)) {
      configModal('Apenas imagens .PNG .JPG .JPEG são aceitas', 'error');
      handleVisible();

      return;
    }

    await api.post('/advertising/dashboard', {
      title: data.title,
      type: selectedType,
      course_id: selectedCourse === 'Todos' ? undefined : selectedCourse,
      all_courses: selectedCourse === 'Todos',
      does_not_expire: doesNotExpire || !!data.expiration_date,
      expiration_date: data.expiration_date,
      description: data.description,
    }).catch((err) => {
      configModal(err.response.data.message, 'error');
      handleVisible();
    }).then(async (response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        const advertising_id = response.data.id;

        const formData = new FormData();

        formData.append('image_file', file);

        await api.patch(`/advertising/dashboard/image/${advertising_id}`, formData).then(() => {
          configModal('Anúncio cadastrado com sucesso', 'error');
          handleVisible();
          navigate(-1);
        });
      } else {
        configModal('Não foi possível cadastrar o anúncio', 'error');
        handleVisible();
      }
    });
  }, [file, selectedType, selectedCourse, doesNotExpire, configModal, handleVisible, navigate]);

  const handleSubmit = useCallback(async (data) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        title: Yup.string()
          .required('Tópico obrigatório'),
        type: Yup.string()
          .test('has-type', 'Tipo obrigatório', () => !!selectedType),
        course_id: Yup.string()
          .test('has-course', 'Curso obrigatório', () => !!selectedCourse),

        description: Yup.string()
          .required('Texto obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await createAdvertising(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);

        formRef.current?.setErrors(erros);
      }
    } finally {
      setLoading(false);
    }
  }, [createAdvertising, selectedType, selectedCourse]);

  useEffect(() => {
    getCurrentCoursesList();
  }, [getCurrentCoursesList]);

  return (
    <Container>
      <LeftContent>
        <PreviewContent img={file} />
        <ButtonArea>
          <input style={{ display: 'none' }} ref={inputRef} type="file" id="avatar" accept=".png, .jpg, .jpeg" onChange={loadFile} />
          <Button styleType="outline" minHeight="40px" onClick={() => inputRef.current?.click()}>carregar imagem</Button>
        </ButtonArea>
      </LeftContent>
      <ContentPanel
        title="Informações do Anúncio"
        subTitle="Estas informações serão exibidas no aplicativo para o usuário"
        footerContent={(
          <Button
            onClick={() => formRef.current?.submitForm()}
            loading={loading}
            maxWidth="150px"
            minHeight="44px"
          >
            salvar
          </Button>
        )}
        gridColumn="2 / 5"
        width="50%"
      >
        <FormContent ref={formRef} onSubmit={handleSubmit}>
          <FormSection gridColumn="1 / 2">
            <InputLine
              name="title"
              label="Título"
            />

            <InputSection grid_template_column="1fr 1fr">
              <DateInputLine
                name="expiration_date"
                label="Expira em"
                gridRow="2 / 2"
                newValue={expirationDate}
              />

              <CheckboxInput
                name="does_not_expire"
                label="Não expirar"
                gridRow="2 / 2"
                onChange={() => setDoesNotExpire(!doesNotExpire)}
              />

              <SelectLine
                name="type"
                label="Tipo"
                options={typeOptions}
                value={typeOptions.filter(({ value }) => value === selectedType)}
                onChange={(event: any) => setSelectedType(event.value)}
              />

              {selectedType === 'Desconto' && (
                <InputLine
                  mask="numeric"
                  name="discount_percentage"
                  label="% do Desconto"
                />
              )}

            </InputSection>

            <SelectLine
              name="course_id"
              label="Curso que receberá desconto"
              isSearchable
              options={coursesList}
              value={coursesList.filter(({ value }) => value === selectedCourse)}
              onChange={(event: any) => setSelectedCourse(event.value)}
            />

            <TextAreaLine
              name="description"
              label="Texto"
              rows={6}
            />

          </FormSection>
        </FormContent>
      </ContentPanel>
    </Container>
  );
};

export default FormAdvertising;
