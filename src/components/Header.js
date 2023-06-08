import React from 'react';
import headerLogo from '../images/logo-mesto.svg';//лого Место

function Header(props) {
    const { email, loggedIn, currentRoute, handleExitProfile } = props;

    const [headerData, setHeaderData] = React.useState({});

/* const headerData = {
    name: 'тест',
    link: '/qwer',
} */
    /* const handleClickExit = () => {
        if (currentRoute === "/") {
            //выходим из профиля - сверху бросаем обработчик удаления токена +
            //onOutProfile();
            console.log('удаляем токен из LocalStorage')
        } */

    React.useEffect(() => {
        //console.log('useEffect срабатывает');
        //console.log(currentRoute);
        switch (currentRoute) {
            case "/":
                console.log('мы на главной странице');
                setHeaderData ({
                    name: 'Выход',
                    link: '/'
                })
                break
            case "/sign-up":
                console.log('мы на странице регистрации');
                setHeaderData ({
                    name: 'Вход',
                    link: '/sign-in'
                })
                break
            case "/sign-in":
                console.log('мы на странице авторизации');
                setHeaderData ({
                    name: 'Регистрация',
                    link: '/sign-up'
                })
                break
            default:
                console.log('мы на странице 404');
                setHeaderData ({
                    name: 'На главную',
                    link: '/'
                })
                break
        }
    }, [currentRoute])


    return (
        <header className="header">
            <img
                src={headerLogo}
                alt="Логотип Место."
                className="logo" />
            <nav className='header__menu'>
                {loggedIn ? <p className="header__email">{email}</p> : ''}
                <a 
                className="header__link" 
                href={headerData.link}
                onClick={headerData.name === "Выход" ? handleExitProfile : null}
                >{headerData.name}</a>
            </nav>
        </header>
    )
}
export default Header;