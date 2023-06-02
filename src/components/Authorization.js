function Authorization(props) {
    const { title, name, button, children } = props;

    return (
        <div className='authorization'>
            <h2 className="authorization__title">{title}</h2>
            <form name={name} method="post">
                <input
                    className="authorization__input"
                    type="email"
                    id="email"
                    required
                    name="name"
                    placeholder="Email" />
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