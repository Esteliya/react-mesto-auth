import React from 'react';
import Authorization from './Authorization'

function Login(props) {
    //бросаем данные для обработки выше
    const { handleDataForm } = props;

    return (
        <Authorization
            title="Вход"
            name="login"
            button="Войти"
            handleDataForm={handleDataForm}>
        </Authorization>
    )
}
export default Login;