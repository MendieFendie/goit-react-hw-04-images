import { React, useEffect } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal(props) {
  useEffect(() => {
    if (props.showModal) {
      window.addEventListener('keydown', props.closeModal);
    }

    return () => window.removeEventListener('keydown', props.closeModal);
  }, [props.closeModal, props.showModal]);

  return createPortal(
    <div onClick={props.closeModal} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={props.imgUrl} alt="" />
      </div>
    </div>,
    modalRoot
  );
}
