// importação da lib de validação de erros
import { ValidationError } from 'yup';

// define o tipo dos Erros
export interface Errors {
  [key: string]: string;
}

// cria e export a afuhnção t de vlaidação de erros
export default function getValidationErros(err: ValidationError): Errors {
  // inicia o objeto de erros
  const validationErros: Errors = {};

  // percorre os erros recebidos e atirbui ao objeto de erros
  err.inner.forEach((error) => {
    validationErros[error.path ?? ''] = error.message;
  });

  // retorna o objeto de erros
  return validationErros;
}
