export default function Login() {
    return (
        <form action="" method="post" >
            <header>
                <h2>Login</h2>
                <button>✖</button>
            </header>
            <input type="email" placeholder="Your email" />
            <input type="password" placeholder="Password" />
            <button className="register-btn">Login</button>
            <input type="checkbox" id="check" />
            <label htmlFor="check">By continuing, I agree to the terms of use privacy policy</label>
            <section>Create a new account? <button>Click here</button></section>
        </form>
    );
}