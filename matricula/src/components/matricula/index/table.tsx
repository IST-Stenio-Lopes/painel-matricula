import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Data from '../mock-data.json';


interface Column {
    //id: 'name' | 'code' | 'population' | 'size' | 'density' | 'id' | 'Curso';
    id?: number;
    //id?: 'id' | 'curso' | 'turno' | 'modalidade' | 'tipo' | 'vagasPreenchidas';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}
const columns: Column[] = [
    { label: 'Nome', minWidth: 70 },
    { label: 'CPF', minWidth: 100 },
    { label: 'Curso', minWidth: 130 },
    { label: 'Telefone', minWidth: 100 },
    { label: 'Email', minWidth: 130 },
    { label: '', minWidth: 10 }
];
interface Data {
    id: number;
    nome: string;
    cpf: string;
    curso: string;
    telefone:string;
    email: string;
}

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },

});


