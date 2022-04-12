import { isDate } from 'moment';
import { validateCPF } from 'validations-br';
import * as Yup from 'yup';

export function studentValidationScheme(
  selectedConduct: string | undefined,
  selectedCulture: string | undefined,
  selectedDisability: string | undefined,
  selectedGender: string | undefined,
  selectedMaritalStatus: string | undefined,
  selectedOccupation: string | undefined,
  selectedRace: string | undefined,
  selectedSchoolType: string | undefined,
  selectedSchooling: string | undefined,
): Yup.AnySchema {
  const schema = Yup.object().shape({
    name: Yup.string()
      .required('Nome obrigatório'),
    legal_responsible: Yup.string()
      .required('Responsável obrigatório'),
    birth_date: Yup.mixed().test(
      'is-Date',
      'Digite uma data válida',
      (value) => isDate(new Date(value as string)),
    )
      .required('Data obrigatória'),
    gender: Yup.string()
      .test('has-gender', 'Sexo obrigatório', () => !!selectedGender),
    naturalness: Yup.string()
      .required('Naturalidade obrigatória'),
    disability: Yup.string()
      .test('has-gender', 'Deficiência obrigatória', () => !!selectedDisability),
    race: Yup.string()
      .test('has-gender', 'Raça obrigatória', () => !!selectedRace),
    marital_status: Yup.string()
      .test('has-gender', 'Gênero obrigatório', () => !!selectedMaritalStatus),
    conduct: Yup.string()
      .test('has-gender', 'Conduta obrigatória', () => !!selectedConduct),
    schooling: Yup.string()
      .test('has-gender', 'Escolaridade obrigatória', () => !!selectedSchooling),
    school_type: Yup.string()
      .test('has-gender', 'Escola obrigatória', () => !!selectedSchoolType),
    occupation: Yup.string()
      .test('has-gender', 'Gênero obrigatório', () => !!selectedOccupation),
    cpf: Yup.string()
      .test(
        'is-cpf',
        'CPF inválido',
        (value) => validateCPF(value as string),
      )
      .required('CPF obrigatório'),
    culture: Yup.string()
      .test('has-gender', 'Cultura obrigatória', () => !!selectedCulture),
    rg: Yup.string()
      .required('RG obrigatório'),
    issuing_document: Yup.string()
      .required('Órgão obrigatório'),
    cellphone: Yup.string()
      .required('Telefone obrigatório'),
    whatsapp: Yup.string()
      .required('Whatsapp obrigatório'),
    email: Yup.string().email()
      .required('Email obrigatório'),
    zipcode: Yup.string()
      .required('CEP obrigatório'),
    city: Yup.string()
      .required('Cidade obrigatória'),
    estate: Yup.string()
      .required('Estado obrigatório'),
    street: Yup.string()
      .required('Rua obrigatória'),
    number: Yup.number()
      .typeError('Número obrigatório')
      .test('has-cost', 'Número obrigatório', (value) => value as number >= 0),
    neighborhood: Yup.string()
      .required('Bairro obrigatório'),
  });

  return schema;
}
