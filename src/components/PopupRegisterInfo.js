import iconFalse from '../images/icon-false.svg'
import iconTrue from '../images/icon-true.svg'

function PopupRegisterInfo(props) {
    const { isOpen, onClose } = props;
   
    const popupClass = isOpen ? ('popup popup_open') : ('popup');

// дописать логику тернарным оператором!!!

    return (
      <div className={popupClass}>
        <div className="popup__container">
        <div className="popup__icon" style={{ backgroundImage: `url(${iconFalse})` }}/>
          <p className="popup__content">Что-то пошло не так! Попробуйте ещё раз.</p>
          <button type="button" aria-label="Закрыть." className="popup__close-button" onClick={onClose} />
        </div>
      </div>
    )
  
  }
  
  export default PopupRegisterInfo;