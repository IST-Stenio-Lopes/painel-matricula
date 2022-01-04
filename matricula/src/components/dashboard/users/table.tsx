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
import Data from './mock-data.json';
import { DataEdit } from './style';
import Trash from '../../../assets/trash.svg';
import './style-table.css';

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
    { label: 'Nome', minWidth: 40 },
    { label: 'Nivel de Acesso', minWidth: 130 },
    { label: 'Matricula', minWidth: 70 },
    { label: 'Email', minWidth: 130 },
    { label: '', minWidth: 10 }
];
interface Data {
    id: number;
    name: string;
    access: string;
    matricula: string;
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

export default function UsersTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


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
                            Data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post) => {


                                return (
                                    <TableRow key={post.id} >

                                        <TableCell>
                                            <DataEdit>{post.name}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>{post.access}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>{post.matricula}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>{post.email}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <img src={Trash} />
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
                count={Data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={""}
            />

        </Paper>
    );
}

