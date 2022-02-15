import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React from "react";

import Trash from '../../../assets/trash.svg';
import { FaqActions, useFaq } from '../../contexts/faq';
import { DataEdit } from "../../dashboard/users/style";

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
    { label: 'Tópico', minWidth: 150 },
    { label: 'Categoria', minWidth: 70 },
    { label: 'Data de Inclusão', minWidth: 70 },
    { label: 'Texto', minWidth: 150 },
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

interface Faq {
    id: number;
    topico: string;
    categoria: string;
    texto: string;
}
interface FaqTableI {
    onDelete: () => void;
    faqs: Faq[];
}

const FaqTable: React.FC<FaqTableI> = ({ onDelete, faqs }) => {

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const { stateFaq, dispatch } = useFaq();

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //Aqui vem o uso do hook de form
    const handleFaqChange = (id: string, title: string, category: string, content: string) => {
        dispatch({
            type: FaqActions.setId,
            payload: id
        });
        dispatch({
            type: FaqActions.setTitle,
            payload: title
        });
        dispatch({
            type: FaqActions.setCategory,
            payload: category
        });
        dispatch({
            type: FaqActions.setContent,
            payload: content
        });
    }


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

                            faqs && faqs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post) => {


                                return (

                                    <TableRow key={post.id} className="table-hover" onClick={() => handleFaqChange(post.id.toString(), post.topico, post.categoria, post.texto)}>

                                        <TableCell>
                                            <DataEdit>{post.topico}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>{post.categoria}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>25/05/77</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>{post.texto.length < 50 ? post.texto : post.texto.substring(0, 70) + "..."}</DataEdit>
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
                count={faqs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={""}

            />

        </Paper>
    );
}
export default FaqTable;