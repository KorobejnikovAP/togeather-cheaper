import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { AppState } from '../../store/interfaces';

export default function HomePage() {
    const navigate = useNavigate();
    const user = useSelector((state: AppState) => state.auth.user);
    useEffect(() => {
        if(!user) navigate('/login');
    }, [user, navigate])
    return (
        <div className='tc-page'>
            Home page
        </div>
    )
}