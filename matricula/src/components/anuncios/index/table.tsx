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
    { label: 'Titulo', minWidth: 80 },
    { label: 'Tipo', minWidth: 65 },
    { label: 'Expira em', minWidth: 50 },
    { label: 'Texto', minWidth: 120 },
    { label: '', minWidth: 50 }
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 620,
    },

});

interface Anuncios {
    id: number;
    titulo: string;
    data_expiracao: string;
    tipo: string;
    porcentagem_desconto: number;
    curso_desconto: string;
    texto: string;
}
interface AnunciosTableI {
    onDelete: () => void;
    anuncios: Anuncios[];

}

const AnunciosTable: React.FC<AnunciosTableI> = ({ onDelete, anuncios }) => {

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

                            anuncios && anuncios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post) => {


                                return (

                                    <TableRow key={post.id} className="table-hover">

                                        <TableCell>
                                            <DataEdit>{post.titulo}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>{post.tipo}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>{post.data_expiracao}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>{post.texto.length <50? post.texto : post.texto.substring(0,50)+"..."}</DataEdit>
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
                count={anuncios.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={""}

            />

        </Paper>
    );
}
export default AnunciosTable;