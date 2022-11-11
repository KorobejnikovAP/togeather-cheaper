import { useDispatch } from "react-redux";
import { loginAsync } from "store/actions/auth";
import { AppDispatch } from "store/store";

export default function LoginPage() {
    const dispatch: AppDispatch = useDispatch();
    return (
        <div>Login page 
            <button onClick={() => dispatch(loginAsync({username: 'admin', password: 'admin123'}))}> Clock</button>
        </div>
    );
}
  