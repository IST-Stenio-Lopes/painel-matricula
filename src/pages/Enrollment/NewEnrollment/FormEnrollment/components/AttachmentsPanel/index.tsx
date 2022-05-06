import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import AttachmentModal from '../../../../../../components/AttachmentModal';
import ListTable from '../../../../../../components/ListTable';
import { useModal } from '../../../../../../hooks/modal';
import api from '../../../../../../services/api';

import { Container } from './styles';

const listTitles = [
  {
    id: '4',
    name: 'Nome',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 20%)',
  },
  {
    id: '1',
    name: 'Documento',
    hasSorting: true,
    hasFilter: true,
    growFactor: 'minmax(150px, 15%)',
  },
  {
    id: '3',
    name: 'Tipo',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 15%)',
  },
  {
    id: '2',
    name: 'Data de Inserção',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 15%)',
  },
];

export interface IAttachment{
  id: string;
  name: string,
  type: string,
  file_name: string,
  created_at: string,
}

interface AttachmentsPanel {
  student_id?: string;
  enrollment_id?: string;
  showAttachmentModal: boolean;
  handleCloseModal: Function;
}

const AttachmentsPanel: React.FC<AttachmentsPanel> = ({
  student_id,
  enrollment_id,
  showAttachmentModal,
  handleCloseModal,
}) => {
  const { configModal, handleVisible } = useModal();
  const [localStudentAttachments, setLocalStudentAttachments] = useState<IAttachment[]>();
  const [localEnrollmentAttachments, setLocalEnrollmentAttachments] = useState<IAttachment[]>();

  const listItems = useMemo(
    () => {
      const studentDocuments = localStudentAttachments
        ? localStudentAttachments.map(({
          id, name, type, created_at,
        }) => ({
          name,
          document: type,
          type: 'Pessoal',
          created_at: new Date(created_at).toLocaleDateString('pt-BR'),
          object_id: id,
        })) : [];

      const enrollmentDocuments = localEnrollmentAttachments
        ? localEnrollmentAttachments.map(({
          id, name, type, created_at,
        }) => ({
          name,
          document: type,
          type: 'Matrícula',
          created_at: new Date(created_at).toLocaleDateString('pt-BR'),
          object_id: id,
        })) : [];

      return [...studentDocuments, ...enrollmentDocuments];
    },
    [localEnrollmentAttachments, localStudentAttachments],
  );

  const getStudentAttachments = useCallback(async (id) => {
    await api.get(`/student/dashboard/documents/${id}`)
      .then((response) => {
        setLocalStudentAttachments(response.data);
      });
  }, []);

  const getEnrollmentAttachments = useCallback(async (id) => {
    await api.get(`/enrollment/dashboard/documents/${id}`)
      .then((response) => {
        setLocalEnrollmentAttachments(response.data);
      });
  }, []);

  const getAttachments = useCallback(() => {
    if (student_id) getStudentAttachments(student_id);
    if (enrollment_id) getEnrollmentAttachments(enrollment_id);
  }, [enrollment_id, getEnrollmentAttachments, getStudentAttachments, student_id]);

  const deleteStudentAttachment = useCallback(async (attachmentId) => {
    await api.delete(`/student/dashboard/documents/${student_id}/${attachmentId}`).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        configModal('O Documento foi removido com sucesso', 'success');
        handleVisible();
      }
    });
  }, [configModal, handleVisible, student_id]);

  const deleteEnrollmentAttachment = useCallback(async (attachmentId) => {
    await api.delete(`/enrollment/dashboard/documents/${enrollment_id}/${attachmentId}`).catch((err) => {
      configModal(err.response ? err.response.data.message : err.message, 'error');
      handleVisible();
    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        configModal('O Documento foi removido com sucesso', 'success');
        handleVisible();
      }
    });
  }, [configModal, enrollment_id, handleVisible]);

  const handleRemove = useCallback((attachmentId) => {
    const foundAttachment = listItems.find((att) => att.object_id === attachmentId);

    configModal(
      'Deseja realmente remover o documento selecionado?',
      'message',
      true,
      true,
      () => (foundAttachment?.type === 'Pessoal' ? deleteStudentAttachment(attachmentId)
        : deleteEnrollmentAttachment(attachmentId)),
    );
    handleVisible();
  }, [configModal, deleteEnrollmentAttachment, deleteStudentAttachment, handleVisible, listItems]);

  useEffect(() => {
    getAttachments();
  }, []);

  return (
    <Container>
      <ListTable
        title="Documentos"
        subtitle="Anexe diploma, comprovante de pagamento e outros documentos aqui"
        onRemoveItem={handleRemove}
        indexToBold={0}
        listTitles={listTitles}
        listItems={listItems}
        itemsPerPages={10}
        currentPage={1}
        totalOfItems={listItems.length}
        hasTrashButton
        gridColumn="2 / 5"
      />

      {showAttachmentModal && (
        <AttachmentModal
          handleClose={() => handleCloseModal()}
          studentId={student_id}
          enrollmentId={enrollment_id}
        />
      )}
    </Container>
  );
};

export default AttachmentsPanel;
