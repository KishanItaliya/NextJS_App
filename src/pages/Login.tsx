import { useRef, useState } from "react";
import styles from "../../styles/Login.module.css";

export default function Login() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<any>(null);

    const handleLogin = async () => {
        const resp = await fetch('http://localhost:3000/api/login', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                email: emailRef.current?.value,
                password: passRef.current?.value
            })
        });
        const json = await resp.json();
        setMessage(json);
    }

    return <div className={styles.loginContainer}>
        <div className={styles.login}>
        <h1>Login</h1>
        <div className={styles.inputContainer}>
            <input type="text" placeholder="Enter Email..." ref={emailRef} />
        </div>
        <div className={styles.inputContainer}>
            <input type="password" placeholder="Enter Password..." ref={passRef} />
        </div>
        <div className={styles.btnContainer} onClick={() => handleLogin()}>
            Login
        </div>
        <p>{JSON.stringify(message)}</p>
        </div>
    </div>
}