import iconFalse from '../images/icon-false.svg'
import iconTrue from '../images/icon-true.svg'

function InfoTooltip(props) {
  const { isOpen, onClose, res } = props;

  const popupClass = isOpen ? ('popup popup_open') : ('popup');

  // содержимое попапа
  const trueResponse = {
    text: 'Вы успешно зарегистрировались!',
    image: iconTrue
  }

  const falseResponse = {
    text: 'Что-то пошло не так! Попробуйте ещё раз.',
    image: iconFalse
  }


  return (
    <div className={popupClass}>
      <div className="popup__container">
        <div className="popup__icon" style={{ backgroundImage: `url(${res ? trueResponse.image : falseResponse.image})` }} />
        <p className="popup__content">{res ? trueResponse.text : falseResponse.text}</p>
        <button type="button" aria-label="Закрыть." className="popup__close-button" onClick={onClose} />
      </div>
    </div>
  )

}

export default InfoTooltip;