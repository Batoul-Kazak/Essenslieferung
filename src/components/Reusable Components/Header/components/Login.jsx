import { useState } from "react";

export default function Login({
    setOpenedPopup,
}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [email_msg, setEmail_msg] = useState([]);
    const [password_msg, setPassword_msg] = useState([]);
    const [loginTrial, setLoginTrial] = useState(0);

    function handleResult(e) {
        e.preventDefault();

        let users = localStorage.getItem("users");
        // alert("users type: " + typeof users);

        let isCorrect = users.find(user => user.email == email && user.password == password);
        //only one user will be active: true
        if (isCorrect)
            alert("Login Successfully");

        else {
            if (loginTrial == 3) {
                //note: later i'll store the value in local storage so when user refresh the page 
                //he can't login until his setTimeout function finish
                setOpenedPopup(false);
                alert("All your attempts failed, try again later!");
                return;
            }
            alert("Email doesn't exist or password is not correct, try again...");
            setLoginTrial(loginTrial => loginTrial + 1);
        }
    }

    return (
        <form action="" method="post" className="register-info" onSubmit={(e) => handleResult(e)} >
            <header>
                <h2>Login</h2>
                <button className="close-button" onClick={() => setOpenedPopup(false)}>✖</button>
            </header>
            <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {email_msg && <div className="error-list">
                {email_msg.map(msg => <p className="error-msg">☹ {msg}</p>)}
            </div>}
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {password_msg && <div className="error-list">
                {password_msg.map(msg => <p className="error-msg">☹ {msg}</p>)}
            </div>}
            <button className="submit-button">Login</button>
            <section>Create a new account? <button onClick={() => setOpenedPopup("signup")}>Click here</button></section>
        </form>
    );
}