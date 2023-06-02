//import React from 'react';
import headerLogo from '../images/logo-mesto.svg';//лого Место

//прописать пропсы с заменой ссылки!!!

function Header() {
    return (
        <header className="header">
            <img
                src={headerLogo}
                alt="Логотип Место."
                className="logo" />
                <nav className='header__menu'>
                <a className="header__link" href="#">Войти</a>
                </nav>
        </header>
    )
}
export default Header;