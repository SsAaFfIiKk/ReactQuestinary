import React from 'react';
import './css/modal.css';


const Modal = ({ active, setActive, children, notClosable }) => {
    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => notClosable ? setActive(true) : setActive(false)}>
            <div className={active?'modal__content active':'modal__content'} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;