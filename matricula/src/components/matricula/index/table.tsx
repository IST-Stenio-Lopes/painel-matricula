import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { StudentTable } from '../../../utils/utilities';
import { DataEdit } from '../../dashboard/users/style';
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
const columns: Column[] = [
    { label: 'Nome', minWidth: 70 },
    { label: 'CPF', minWidth: 100 },
    { label: 'Curso', minWidth: 130 },
    { label: 'Telefone', minWidth: 100 },
    { label: 'Email', minWidth: 130 },
    { label: '', minWidth: 10 }
];
/*interface Data {
    id: number;
    nome: string;
    cpf: string;
    curso: string;
    telefone: string;
    email: string;
}*/

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 620,
    },

});


const StudentsTable: React.FC<StudentTable> = ({ onDelete, estudantes }) => {

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>

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
                            estudantes && estudantes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post) => {


                                return (

                                    <TableRow key={post.id} className="table-hover">

                                        <TableCell>
                                            <DataEdit>{post.nome}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>{post.cpf}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>{post.curso}</DataEdit>
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
                rowsPerPageOptions={[5, 20, 100]}
                component="div"
                count={estudantes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={""}

            />

        </Paper>
    );
}
export default StudentsTable;