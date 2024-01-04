import { auth, provider } from "../config/firebase"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const navigate = useNavigate();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
        navigate("/")
    }
    return (
        <div>
            <p> Sign In With Google To Continue </p>
            <button onClick={signInWithGoogle}> Sign In With Google </button>
        </div>
    )
}