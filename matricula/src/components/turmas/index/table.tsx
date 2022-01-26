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
import { TurmasTableI } from '../../../utils/utilities';
import { DataEdit } from '../../dashboard/turmas/style';
import { VagasPreenchidas } from '../../dashboard/turmas/load/style';
import { LoadBar } from '../../dashboard/turmas/load';
import Trash from '../../../assets/trash.svg';
import Aberta from '../../../assets/lock-on.svg';
import Fechada from '../../../assets/lock-off.svg';
import Finalizada from '../../../assets/lock-block.svg';
import { DisplayFlexLockTrashTurmas, StatusTurmasLock, TrashImg } from './style';
import SelectStatusMatricula from '../select-box-status';
import Lock from './lock';
import Modal from '../../modal';

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
    { label: 'Vagas', minWidth: 100 },
    { label: '', minWidth: 100 }
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 620,
    },

});

const TurmasTable: React.FC<TurmasTableI> = ({ onDelete, turmas }) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const [selected, setSelected] = useState(-1);


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
                                                {console.log(post.status)}
                                                <DataEdit>{post.vagas_preenchidas}/{post.vagas}</DataEdit>
                                            </VagasPreenchidas>
                                        </TableCell>
                                        <TableCell>
                                            {/* select ? <SelectStatusMatricula name={post.status} id={post.id}/> : <></> */}
                                            {/* <StatusTurmasLock src={post.status === "Aberta" ? Aberta : post.status === "Fechada" ? Fechada : Finalizada} onClick={() => setSelected(post.id)} /> */}
                                            <DisplayFlexLockTrashTurmas>
                                                <div onClick={() => { post.id === selected ? setSelected(-1) : setSelected(post.id) }}><Lock id={post.id} selected={selected} lock={post.status} /></div>
                                                <TrashImg src={Trash} onClick={() => { onDelete() }} />
                                            </DisplayFlexLockTrashTurmas>

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
export default TurmasTable;

