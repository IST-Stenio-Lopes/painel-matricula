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
import Data from '../turmas/mock-data.json';
import { DataEdit, /*LinearContainer,*/ Title, VagasPreenchidas } from './style';

//import { colorData } from '../../../utils/utilities';
import { LoadBar } from './load';

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
    { label: 'ID-Turma', minWidth: 40 },
    { label: 'Curso', minWidth: 130 },
    { label: 'Turno', minWidth: 70 },
    { label: 'Modalidade', minWidth: 130 },
    { label: 'Tipo', minWidth: 90 },
    { label: 'Vagas Preenchidas', minWidth: 100 }
];

interface Data {
    id: number;
    curso: string;
    turno: string;
    modalidade: string;
    tipo: string;
    vagasPreenchidas: number;
    vagasDisponibilizadas: number;
}

function createData(id: number, curso: string, turno: string, modalidade: string, tipo: string, vagasPreenchidas: number, vagasDisponibilizadas: number): Data {
    const density = vagasPreenchidas / vagasDisponibilizadas;
    return { id, curso, turno, modalidade, tipo, vagasPreenchidas, vagasDisponibilizadas };
}

const rows = [
]

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },

});

export default function StickyHeadTable() {
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

        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <Title>Turmas Abertas</Title>
                        <TableRow>
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
                                let percent = (post.vagasPreenchidas / post.vagasDisponibilizadas) * 100;

                                return (
                                    <TableRow key={post.id}>
                                        <TableCell>
                                            <DataEdit>{post.id}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>{post.curso}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>{post.turno}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>{post.modalidade}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>{post.tipo}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <VagasPreenchidas>
                                                <LoadBar value={percent} />
                                                <DataEdit>{post.vagasPreenchidas}/{post.vagasDisponibilizadas}</DataEdit>
                                            </VagasPreenchidas>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[6, 20, 100]}
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
