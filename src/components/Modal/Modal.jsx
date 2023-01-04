import { React, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal(props) {
  useEffect(() => {
    window.addEventListener('keydown', props.closeModal);

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

Modal.propTypes = {
  props: PropTypes.arrayOf(
    PropTypes.shape({
      closeModal: PropTypes.func.isRequired,
      imgUrl: PropTypes.string.isRequired,
      showModal: PropTypes.bool.isRequired,
    })
  ),
};
