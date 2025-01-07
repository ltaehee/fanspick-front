import styles from '../../css/productTable/productTable.module.css';

interface deleteProps {
    onClick: (id: string) => void;
    productId: string;
    className ?: string;
}

const DeleteButton = ({onClick, productId, className} : deleteProps) => {

    return(
        <div className={className}>
            <button onClick={() => onClick(productId)} className={styles.deletebutton}>X</button>
        </div>
    )
}

export default DeleteButton;