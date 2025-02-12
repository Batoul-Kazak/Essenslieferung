import { useContext, useState } from "react";
import { OpenedPageContext } from "../../../PagesComponents/App";

export default function Login() {
    const [revealText, setRevealText] = useState(false);
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const Context = useContext(OpenedPageContext);
    const setOpenedPopup = Context?.setOpenedPopup;
    const dispatch = Context?.dispatch;
    const currentUser = Context?.currentUser;

    const [loginError, setLoginError] = useState(null);

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch({ type: 'login', payload: loginData });
        setLoginData({ email: '', password: '' });
        if (!currentUser) {
            {
                setLoginError("Invalid email or password");
            }
        } else {
            setLoginError(null); // Clear any previous error
        }
    };

    // const handleLogout = () => {
    //     dispatch({ type: 'LOGOUT' });
    // };


    return (
        <form action="" method="post" className="register-info" onSubmit={handleLogin} >
            <header>
                <h2>Login</h2>
                <button className="close-button" onClick={() => setOpenedPopup(false)}>✖</button>
            </header>
            <input type="email" name="email" placeholder="Your email" value={loginData.email} onChange={handleLoginChange} />
            <div className="space-between">
                <input type={revealText ? "text" : "password"} name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} />
                <div className="reveal-text" type="button" onMouseEnter={() => setRevealText(true)} onMouseLeave={() => setRevealText(false)}></div>
            </div>
            {loginError && <div className="error-list">{loginError}</div>}
            <button type="submit" className="submit-button">Login</button>
            <section>Create a new account? <button onClick={() => setOpenedPopup("signup")}>Click here</button></section>
        </form>
    );
}