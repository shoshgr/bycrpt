import React, { useState, ChangeEvent, FormEvent } from 'react';
import { addUser } from '@/app/services/userService';
import { User } from '@/app/models/user';

const Register: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
const newUser=new User( userId, firstName, lastName, email, phone, address, password );
    const result = await addUser(newUser);

    if (result.success) {
      setSuccessMessage('המשתמש נרשם בהצלחה');
      setTimeout(() => {
        window.location.href = '/home'; 
      }, 2000); 
    } else {
      setError(result.error || 'שגיאה לא ידועה');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">הרשמה</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">מזהה משתמש</label>
          <input
            type="text"
            value={userId}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUserId(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">שם פרטי</label>
          <input
            type="text"
            value={firstName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">שם משפחה</label>
          <input
            type="text"
            value={lastName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">דוא"ל</label>
          <input
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">טלפון</label>
          <input
            type="text"
            value={phone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">כתובת</label>
          <input
            type="text"
            value={address}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">סיסמה</label>
          <input
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md">
          הרשמה
        </button>
      </form>

      {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default Register;
