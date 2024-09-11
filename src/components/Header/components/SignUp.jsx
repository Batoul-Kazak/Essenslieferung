export default function SignUp({ onSetOpenedLogin, onSetOpenedSignUp }) {
    function openLoginForm(e) {
        e.preventDefault();
        onSetOpenedLogin(true);
        onSetOpenedSignUp(false);
    }

    function closeSignUp(e) {
        e.preventDefault();
        onSetOpenedSignUp(false);
    }

    return (
        <form action="" method="post">
            {/* <header>
                <h2>Sign Up</h2>
                <button onClick={(e) => closeSignUp(e)}>✖</button>
            </header>
            <input type="text" placeholder="Your name" />
            <input type="email" placeholder="Your email" />
            <input type="password" placeholder="Password" />
            <button className="submit-button">Create account</button>
            <div>
                <input type="checkbox" id="check" />
                <label htmlFor="check">By continuing, I agree to the terms of use privacy policy</label>
            </div>
            <section>Already have an account? <button onClick={(e) => openLoginForm(e)}>Login here</button></section> */}
        </form>
    )
}