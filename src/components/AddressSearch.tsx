import React from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';
import Modal from 'react-modal';
import { Button } from 'ys-project-ui';
import styles from '../css/mypage/addressSearch.module.css';
import { useUserContext } from '../context/UserContext';

interface AddressSearchProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: (data: Address) => void;
}

const AddressSearch: React.FC<AddressSearchProps> = ({ isOpen, onClose, onComplete }) => {
    const { user } = useUserContext(); 

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className={styles.modal}>
            <DaumPostcode className={styles.daumpostcode} onComplete={onComplete} />
            <Button onClick={onClose} className={styles.modal_button} label="닫기" style={{backgroundColor: user?.role === "manager" ? "#ffacac" : "#ffd700"}}/>
        </Modal>
    );
};

export default AddressSearch;