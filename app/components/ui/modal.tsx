import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';

interface ModalTextProps {
    isOpen: boolean;
    onClose: () => void;
    modalHeaderTitle: string;
    modalBodyText1: string;
    modalBodyText2: string;
    modalFooterButtonClose: string;
    modalFooterButtonOk: string;
    onDelete: () => void; // Add this prop
}

const SharedModal: React.FC<ModalTextProps> = ({ 
    isOpen, 
    onClose, 
    modalHeaderTitle, 
    modalBodyText1, 
    modalBodyText2, 
    modalFooterButtonClose, 
    modalFooterButtonOk,
    onDelete // Destructure the onDelete prop
}) => {
    const handleDelete = async () => {
        onDelete(); // Call the onDelete function passed from the parent component
        onClose(); // Close the modal
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
