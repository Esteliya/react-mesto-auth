import React from 'react';

function Authorization(props) {
    const { title, name, button, children, handleDataForm } = props;

    
    // переменные состояния email и password
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    // Обработчики изменения инпута
     function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }


    //обработчик формы
    function handleSubmit(e) {
        e.preventDefault();
        //запишем и передадим данные инпутов 
        const data = {};
        data.email = email;
        data.password = password;
        handleDataForm(data);
        }
    

    return (
        <div className='authorization'>
            <h2 className="authorization__title">{title}</h2>
            <form name={name} method="post" onSubmit={handleSubmit}>
                <input
                    className="authorization__input"
                    type="email"
                    id="email"
                    required
                    name="name"
                    placeholder="Email"
                    value={email || ''}
                    onChange={handleChangeEmail}/>
                <span 
                className="authorization__input-error"
                />
                <input
                    className="authorization__input"
                    type="password"
                    id="password"
                    required
                    minLength="5" maxLength="20"
                    name="name"
                    placeholder="Пароль"
                    value={password || ''}
                    onChange={handleChangePassword}
                />
                <span 
                className="authorization__input-error"
                />
                <button type="submit" className="authorization__button">{button}</button>
                {children}
            </form>
        </div>
    )
}
export default Authorization;