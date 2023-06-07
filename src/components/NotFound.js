import React from 'react';
import notFound from '../images/404-error.png'

function NotFound() {

    return (
        <div className='not-found'>
            <img className='not-found__image' src={notFound} alt="Ошибка 404" />
            <a href="/" name="на главную страницу" className='not-found__link' >Вернуться на главную страницу</a>
        </div>
    )
}
export default NotFound;