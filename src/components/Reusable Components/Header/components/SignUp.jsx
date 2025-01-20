import { useState } from "react";

export default function SignUp({
    users,
    setUsers,
    setOpenedPopup
}) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [name_msg, setName_msg] = useState([]);
    const [email_msg, setEmail_msg] = useState([]);
    const [password_msg, setPassword_msg] = useState([]);

    function hasUpperCase(str) {
        return str !== str.toLowerCase();
    }

    function hasNumber(myString) {
        return /\d/.test(myString);
    }

    function handleResult(e) {
        e.preventDefault();

        if (name.length < 2)
            setName_msg(msg => [...msg, "name can't be less than 2 characters"]);

        if (hasNumber(name))
            setName_msg(msg => [...msg, "name can't contain a number"])

        if (password.length < 5)
            setPassword_msg(msg => [...msg, "you assigned weak password"]);

        if (!hasUpperCase(password))
            setPassword_msg(msg => [...msg, "password must contain at least one uppercase letter"])

        // if (password.length >= 5 && hasUpperCase(password))
        // setPassword_msg([]);

        if (!(email.includes("@")))
            setEmail_msg(msg => [...msg, "email must contain a @"]);

        if (email.startsWith("@"))
            setEmail_msg(msg => [...msg, "email can't start with @"]);

        if (!(email.endsWith("@gmail.com")))
            setEmail_msg(msg => [...msg, "not acceptable email"]);

        // if (email.endsWith("@gmail.com") && !(email.startsWith('@')))
        // setEmail_msg([]);

        alert("password: " + typeof password_msg + "  email: " + typeof email_msg);
        if (!password_msg.length && !email_msg.length) {
            const newUser = {
                id: users.length + 1, name: name, email: email,
                password: password, isActive: true, currentRequestedRecipesIds: [],
                recipesRating: [{ recipeId: -1, recipeRated: 0 }], previousRequestedRecipesIds: []
            };

            let isEmailExist = users.find(user => user.email === email);

            if (isEmailExist) {
                setEmail_msg("this email already exists");
                return;
            }

            localStorage.setItem("users", JSON.stringify([...users, newUser]));
            setUsers(users => [...users, newUser]);
            setOpenedPopup(false);

            alert("Added Successfully");

            setEmail_msg([]);
            setPassword_msg([]);
        }
    }

    return (
        <form action="" method="post" className="register-info" onSubmit={(e) => handleResult(e)} >
            <header>
                <h2>SignUp</h2>
                <button className="close-button" onClick={() => setOpenedPopup(false)}>✖</button>
            </header>
            <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            {name_msg && <div className="error-list">
                {name_msg.map(msg => <p className="error-msg">☹ {msg}</p>)}
            </div>}
            <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {email_msg && <div className="error-list">
                {email_msg.map(msg => <p className="error-msg">☹ {msg}</p>)}
            </div>}
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {password_msg && <div className="error-list">
                {password_msg.map(msg => <p className="error-msg">☹ {msg}</p>)}
            </div>}
            <button className="submit-button">Create Account</button>
            <div>
                <input type="checkbox" id="check" required />
                <label htmlFor="check">By continuing, I agree to the terms of use privacy policy</label>
            </div>
            <section>Already have an account? <button onClick={() => setOpenedPopup("login")}>Login here</button></section>
        </form>
    );
}