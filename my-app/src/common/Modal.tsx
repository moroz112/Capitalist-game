import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
    text: string;
    closeModal: any
}

export const Modal = (props: ModalProps) => {
    const {
        text,
        closeModal,
    } = props;
    const modalRoot = document.getElementById('modal-root');
    const el = document.createElement('div');

    useEffect(() => {
        modalRoot?.appendChild(el);

        setTimeout(() => {
            closeModal();
        }, 3000);

        return () => {
            modalRoot?.removeChild(el)
        }
    });

    return (
        ReactDOM.createPortal(
            <div id="modal-root__content">{text}</div>,
            el,
        )
    )
}