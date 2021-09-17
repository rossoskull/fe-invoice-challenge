import './Modal.scss'

const Modal = ({ closeForm, header, content, footer }) => {
  return (
    <>
      <div className="modal">
        <div className="modal__header">
          {header}
          <button onClick={closeForm} className="modal__header__close">
            <img
              className="modal__header__close__img"
              src="/assets/close-btn@2x.png"
              alt="close"
            />
          </button>
        </div>

        <div className="modal__content">
          {content}
        </div>

        <div className="modal__footer">
          {footer}
        </div>

      </div>
      <span className="modal__backdrop" />
    </>
  )
}

export default Modal