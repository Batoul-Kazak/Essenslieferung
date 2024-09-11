
export default function Login({ onSetOpenedSignUp, onSetOpenedLogin }) {
    function openSignUpForm(e) {
        e.preventDefault();
        onSetOpenedSignUp(true);
        onSetOpenedLogin(false);
    }

    function closeLogin() {
        onSetOpenedLogin(false);
    }

    return (
        <form action="" method="post" >
            {/* <header>
                <h2>Login</h2>
                <button onClick={() => closeLogin()}>✖</button>
            </header>
            <input type="email" placeholder="Your email" />
            <input type="password" placeholder="Password" />
            <button className="submit-button">Login</button>
            <div>
                <input type="checkbox" id="check" />
                <label htmlFor="check">By continuing, I agree to the terms of use privacy policy</label>
            </div>
            <section>Create a new account? <button onClick={(e) => openSignUpForm(e)}>Click here</button></section> */}
        </form>
    );
}