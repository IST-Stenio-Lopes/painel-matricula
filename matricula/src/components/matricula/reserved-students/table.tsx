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
import { ReservedStudentTableI } from '../../../utils/utilities';
import { DataEdit, DivHoverOnTable } from '../../dashboard/users/style';
import Trash from '../../../assets/trash.svg';
import './style.css';

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
    { label: 'Nome', minWidth: 130 },
    { label: 'Curso', minWidth: 130 },
    { label: 'Whatsapp', minWidth: 80 },
    { label: 'Email', minWidth: 80 },
    { label: 'Dias Restantes', minWidth: 80 },
    { label: '', minWidth: 10 }
];
interface Data {
    id: number;
    nome: string;
    curso: string;
    whatsapp: string;
    email: string;
    dias_restantes: number;
}

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 620,
    },

});

const ReservedStudentTable: React.FC<ReservedStudentTableI> = ({ onDelete, estudantes }) => {

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

                                    <TableRow key={post.id} className="table-hover" onClick={() => console.log(post.id)}>

                                        <TableCell>
                                            <DataEdit>{post.nome}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>{post.curso}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>{post.whatsapp}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>{post.email}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>{post.dias_restantes} dias</DataEdit>
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
                rowsPerPageOptions={[10, 20, 100]}
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
export default ReservedStudentTable;