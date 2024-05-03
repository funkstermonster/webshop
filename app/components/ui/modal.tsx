import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import React from 'react';

interface ModalTextProps {
    isOpen: boolean;
    onClose: () => void;
    modalHeaderTitle: string;
    modalBodyText1: string;
    modalBodyText2: string;
    modalFooterButtonClose: string;
    modalFooterButtonOk: string;
    onAction: () => void;
}

const SharedModal: React.FC<ModalTextProps> = ({ 
    isOpen, 
    onClose, 
    modalHeaderTitle, 
    modalBodyText1, 
    modalBodyText2, 
    modalFooterButtonClose, 
    modalFooterButtonOk,
    onAction
}) => {
    const handleDelete = async () => {
        onAction();
        onClose();
    };

    return (
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} className='dark'>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    {modalHeaderTitle}
                </ModalHeader>
                <ModalBody>
                    <p>{modalBodyText1}</p>
                    <p>{modalBodyText2}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color='danger' variant='light' onPress={onClose}>
                        {modalFooterButtonClose}
                    </Button>
                    <Button color='primary' onPress={handleDelete}>
                        {modalFooterButtonOk}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default SharedModal;
