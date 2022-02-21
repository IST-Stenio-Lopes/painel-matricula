import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Trash from '../../../assets/trash.svg';
import { CourseActions, useCourse } from '../../../contexts/curso';
import { DataEdit } from '../../dashboard/users/style';

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
    { label: 'Curso', minWidth: 70 },
    { label: 'Área', minWidth: 100 },
    { label: 'Valor', minWidth: 130 },
    { label: 'Modalidade', minWidth: 100 },
    { label: 'Duração', minWidth: 130 },
    { label: '', minWidth: 10 }
];


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 620,
    },

});
interface CourseContent {
    title: string;
    credits: number;
}
interface Cursos {
    id: string;
    name: string;
    field: string;
    cost: number;
    modality: string;
    tags: string[];
    duration: string;
    payment_installment: number;
    enrolment_fee: number;
    description: string;
    prerequisites: string;
    grade: CourseContent[];
}
interface CursosTableI {
    onDelete: () => void;
    cursos: Cursos[];
}
const CursosTable: React.FC<CursosTableI> = ({ onDelete, cursos }) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { stateCourse, dispatch } = useCourse();
    let navigate = useNavigate();

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleCourseChange = (id: string, name: string, field: string, cost: number, modality: string, 
        duration: string, tags: string[], payment_installment: number, enrolment_fee: number,
        description: string, prerequisites: string, grade: CourseContent[]) => {

        dispatch({
            type: CourseActions.setId,
            payload: id
        });
        dispatch({
            type: CourseActions.setName,
            payload: name
        });
        dispatch({
            type: CourseActions.setField,
            payload: field
        });
        dispatch({
            type: CourseActions.setCost,
            payload: cost
        });
        dispatch({
            type: CourseActions.setModality,
            payload: modality
        });

        dispatch({
            type: CourseActions.setDuration,
            payload: duration
        });
        dispatch({
            type: CourseActions.setTags,
            payload: tags
        });
        dispatch({
            type: CourseActions.setPayment_installment,
            payload: payment_installment
        });
        dispatch({
            type: CourseActions.setEnrolment_fee,
            payload: enrolment_fee
        });
        dispatch({
            type: CourseActions.setDescription,
            payload: description
        });
        dispatch({
            type: CourseActions.setPrerequisites,
            payload: prerequisites
        });
        dispatch({
            type: CourseActions.setGrade,
            payload: grade
        });

    }


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
                            cursos && cursos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post) => {
                                return (

                                    <TableRow key={post.id} className="table-hover" onClick={() => {
                                        handleCourseChange(post.id, post.name, post.field, post.cost, post.modality,
                                            post.duration, post.tags, post.payment_installment, post.enrolment_fee, post.description, post.prerequisites, post.grade); navigate('edit')
                                    }}>

                                        <TableCell>
                                            <DataEdit>{post.name}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>{post.field}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>R$ {post.cost},00</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>{post.modality}</DataEdit>
                                        </TableCell>
                                        <TableCell>
                                            <DataEdit>{post.duration}</DataEdit> 
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
                count={cursos.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={""}

            />

        </Paper>
    );



}
export default CursosTable;