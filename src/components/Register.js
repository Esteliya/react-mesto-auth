import React from 'react';
import Authorization from './Authorization'

function Register(props) {
    const { } = props;

    return (
        <Authorization
            title="Регистрация"
            name="register"
            button="Зарегистрироваться">
            <p className="authorization__question">Уже зарегистрированы?
                <a href="/sign-in" name="Войти" className="authorization__question_link"> Войти</a>
            </p>
        </Authorization>
    )
}
export default Register;