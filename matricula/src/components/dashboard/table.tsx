import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { DashboardTableI, TurmasTableI } from '../../utils/utilities';
import { DataEdit } from './turmas/style';
import { VagasPreenchidas } from './turmas/load/style';
import { LoadBar } from './turmas/load';
import Data from '../turmas/turmas.json';

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
    { label: 'ID', minWidth: 60 },
    { label: 'Curso', minWidth: 150 },
    { label: 'Modalidade', minWidth: 80 },
    { label: 'Turno', minWidth: 80 },
    { label: 'Tipo', minWidth: 80 },
    { label: 'Vagas Prenchidas', minWidth: 100 },

];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 620,
    },
});


const DashboardTable: React.FC<DashboardTableI> = ({ turmas }) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(6);


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

                            turmas && turmas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post) => {
                                let percent = (post.vagas_preenchidas / post.vagas) * 100;
                                let select = false;

                                if (post.status === "Aberta") {
                                    return (

                                        <TableRow key={post.id} className="table-hover">

                                            <TableCell>
                                                <DataEdit>{post.id}</DataEdit>
                                            </TableCell>
                                            <TableCell>
                                                <DataEdit>{post.curso}</DataEdit>
                                            </TableCell>
                                            <TableCell>
                                                <DataEdit>{post.modalidade}</DataEdit>
                                            </TableCell>
                                            <TableCell>
                                                <DataEdit>{post.turno}</DataEdit>
                                            </TableCell>
                                            <TableCell>
                                                <DataEdit>{post.tipo}</DataEdit>
                                            </TableCell>
                                            <TableCell>
                                                <VagasPreenchidas>
                                                    <LoadBar value={percent} />
                                                    {/* console.log(post.status) */}
                                                    <DataEdit>{post.vagas_preenchidas}/{post.vagas}</DataEdit>
                                                </VagasPreenchidas>
                                            </TableCell>
                                        </TableRow>
                                    );
                                }
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[6, 20, 100]}
                component="div"
                count={turmas.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={""}

            />

        </Paper>
    );
}
export default DashboardTable;