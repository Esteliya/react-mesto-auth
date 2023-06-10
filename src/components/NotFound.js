import React from 'react';
import notFound from '../images/404-error.png'
import { Link } from "react-router-dom";

//import { useNavigate } from "react-router-dom";

function NotFound() {

    //const navigate = useNavigate();
/*     function goBack () {
        navigate("/");
    } */

    return (
        <div className='not-found'>
            <img className='not-found__image' src={notFound} alt="Ошибка 404" />
            <Link to="/" name="на главную страницу" className='not-found__link' >Вернуться на главную страницу</Link>
        </div>
    )
}
export default NotFound;