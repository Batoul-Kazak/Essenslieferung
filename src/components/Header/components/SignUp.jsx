export default function SignUp({ onSetOpenedLogin,
    onSetOpenedSignUp,
    showWarning,
    password, onSetPassword
}) {
    function openLoginForm(e) {
        e.preventDefault();
        onSetOpenedLogin(true);
        onSetOpenedSignUp(false);

        if (password.length < 4) showWarning = true;
    }

    return (
        <form action="" method="post" className="register-info">
            <header>
                <h2>Sign Up</h2>
                <button onClick={() => onSetOpenedSignUp(false)}>✖</button>
            </header>
            <input type="text" placeholder="Your name" />
            <input type="email" placeholder="Your email" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => onSetPassword(e.target.value)} />
            <button className="submit-button">Create account</button>
            <div>
                <input type="checkbox" id="check" />
                <label htmlFor="check">By continuing, I agree to the terms of use privacy policy</label>
            </div>
            <section>Already have an account? <button onClick={(e) => openLoginForm(e)}>Login here</button></section>
        </form>
    )
}