import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { DataEdit } from "../../dashboard/users/style";
import Trash from '../../../assets/trash.svg';



interface Column {
    //id: 'name' | 'code' | 'population' | 'size' | 'density' | 'id' | 'Curso';
    id?: number;
    //id?: 'id' | 'curso' | 'turno' | 'modalidade' | 'tipo' | 'vagasPreenchidas';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}
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
    { label: 'Sigla', minWidth: 10 },
    { label: 'Nome', minWidth: 20 },
    { label: 'Telefone', minWidth: 20 },
    { label: 'Email', minWidth: 40 },
    { label: '', minWidth: 5 }
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 620,
    },

});

interface Unidades {
    id: number;
    nome: string;
    sigla: string;
    email: string;
    telefone: string;
    cep: string;
    prazo_pre_matricula: number;
    endereco: string;
    bairro: string;
    numero: string;
    cidade: string;
    estado: string;
    horario_atendimento: string;
}

interface TableUnidadesI {
    onDelete: () => void;
    unidades: Unidades[];
}

const TableUnidades: React.FC<TableUnidadesI> = ({ onDelete, unidades }) => {


    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <Paper className={classes.root} >
            {/* <Modal onClose={() => { }} img={1} onConfirm={() => { }} msg='a' />*/}
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead className="title">
                        <TableRow className="title">
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {

                            unidades && unidades.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post) => {


                                return (

                                    <TableRow key={post.id} className="table-hover">

                                        <TableCell>
                                            <DataEdit>{post.sigla}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>{post.nome}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>{post.telefone}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>{post.email}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <img src={Trash} onClick={() => { onDelete() }} />
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[8, 20, 100]}
                component="div"
                count={unidades.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={""}

            />

        </Paper>
    );
}
export default TableUnidades;