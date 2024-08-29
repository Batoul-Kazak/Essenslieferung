export default function SignUp() {
    return (
        <form action="" method="post">
            <header>
                <h2>Sign Up</h2>
                <button>✖</button>
            </header>
            <input type="text" placeholder="Your name" />
            <input type="email" placeholder="Your email" />
            <input type="password" placeholder="Password" />
            <button className="register-btn">Create account</button>
            <input type="checkbox" id="check" />
            <label htmlFor="check">By continuing, I agree to the terms of use privacy policy</label>
            <section>Already have an account? <button>Login here</button></section>
        </form>
    )
}