import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginAsync, getUserAsync} from '../../store/auth';

export function LoginPage() {
    const dispatch = useDispatch();
    return (
        <div>
            Login page
            <button onClick={()=>dispatch(loginAsync())}>Logion</button>
            <button onClick={()=>dispatch(getUserAsync())}>get self</button>
        </div>
    )
}