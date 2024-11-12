'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { loginUser } from '@/app/services/userService'; // ה-import ל-UserService

const Login: React.FC = () => {
    const [userId, setUserId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("password", password);
        const result = await loginUser(userId, password);


        if (result.success) {
            
            window.location.href = `/pages/home/${userId}`;
        } else {
         
            setError(result.error || 'שגיאה לא ידועה');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center mb-6">התחברות</h2>

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="userId">מזהה משתמש</label>
                        <input
                            id="userId"
                            type="text"
                            value={userId}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setUserId(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="password">סיסמה</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        התחבר
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
