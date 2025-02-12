import { useContext, useState } from "react";
import { OpenedPageContext } from "../../../PagesComponents/App";
export default function SignUp() {
    const Context = useContext(OpenedPageContext);
    const dispatch = Context?.dispatch;
    const setOpenedPopup = Context?.setOpenedPopup;

    const [registrationData, setRegistrationData] = useState({
        name: '',
        password: '',
        email: '',
        confirmPassword: ''
    });
    const [registrationError, setRegistrationError] = useState({});
    const [revealText, setRevealText] = useState(false);

    //in the future i may add 3 error-msg arrays for each error name, email, password and
    //display each of them under its input
    const handleRegistrationChange = (e) => {
        setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
        checkRegistrationCredentials();
    };

    function checkRegistrationCredentials() {
        setRegistrationError({});
        if (!registrationData.name || !registrationData.email) return;

        if (!registrationData.name)
            if (registrationData.name.length < 3) {
                registrationError.name = "Name must be at least 3 characters";
            }

        if (registrationData.email.length !== 0) {
            // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            // if (!emailRegex.test(registrationData.email)) {
            //     registrationError.email = "Invalid email format";
            // }
            if (!(registrationData.email.includes("@")))
                setRegistrationError("email must contain a @");

            if (registrationData.email.startsWith("@"))
                setRegistrationError("email can't start with @");

            if (!(registrationData.email.endsWith("@gmail.com")))
                setRegistrationError("not acceptable email");
        }

        if (registrationData.password.length < 6) {
            registrationError.password = "Password must be at least 6 characters";
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
        if (!passwordRegex.test(registrationData.password)) {
            registrationError.passwordComplexity = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
        }

        if (registrationData.confirmPassword !== registrationData.password) {
            registrationError.passwordConfirm = "Passwords do not match";
        }

        setRegistrationError(registrationError);

        return Object.keys(registrationError).length === 0
    }

    const handleRegistration = (e) => {
        e.preventDefault();

        const isCorrect = checkRegistrationCredentials();

        if (registrationData.email.length === 0)
            setRegistrationError("you can't leave email");

        if (registrationData.password.length === 0)
            setRegistrationError("password is required")

        if (registrationData.name.length === 0)
            setRegistrationData("name is required")

        if (isCorrect) {
            dispatch({ type: 'register', payload: registrationData });
            console.log(registrationData)
            setRegistrationData({ name: '', password: '', email: '', registrationData: '' });
            setRegistrationError({});
        } else console.log(registrationError);
    }
    // useEffect(() => {
    //// Update localStorage if the users array changes (useful if you modify the array in other ways)
    //     localStorage.setItem('users', JSON.stringify(users));
    // }, [users]);

    return (
        <form action="" method="post" className="register-info" onSubmit={handleRegistration}>
            <header>
                <h2>SignUp</h2>
                <button className="close-button" onClick={() => setOpenedPopup(false)}>✖</button>
            </header>
            <input type="text" placeholder="Your name" value={registrationData.name}
                name="name" onChange={(e) => handleRegistrationChange(e)} />
            {registrationError.name && <div className="error-list">{registrationError.name}</div>}
            <input type="email" placeholder="Your email" value={registrationData.email}
                name="email" onChange={(e) => handleRegistrationChange(e)} />
            {registrationError.email && <div className="error-list">{registrationError.email}</div>}
            <div className="space-between">
                <input type={revealText ? "text" : "password"} placeholder="Password" value={registrationData.password}
                    name="password" onChange={(e) => handleRegistrationChange(e)} />
                <div className="reveal-text" type="button" onMouseEnter={() => setRevealText(true)} onMouseLeave={() => setRevealText(false)}></div>
            </div>
            <input type={revealText ? "text" : "password"} placeholder="Confirm Password" value={registrationData.confirmPassword}
                name="confirmPassword" onChange={(e) => handleRegistrationChange(e)} />
            {registrationError.password && <div className="error-list">{registrationError.password}</div>}
            <button type="submit" className="submit-button">Create Account</button>
            <div>
                <input type="checkbox" id="check" required />
                <label htmlFor="check">By continuing, I agree to the terms of use privacy policy</label>
            </div>
            <section>Already have an account? <button onClick={() => setOpenedPopup("login")}>Login here</button></section>
        </form>
    );
}