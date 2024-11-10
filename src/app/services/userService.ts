'use client'
import axios from 'axios';
import {User} from '@/app/models/user'
const SERVER_URL = 'http://localhost:3000/api';

interface LoginResponse {
  success: boolean;
  user?: any;
  error?: string;
}

export async function loginUser(userId: string, password: string): Promise<LoginResponse> {
  try {
    const response = await axios.get(`${SERVER_URL}/register/get/${userId}`);

    if (!response.data) {
      throw new Error('User not found');
    }

    if (response.data.user.password == password) {
      return { success: true, user: response.data };
    } else {
      return { success: false, error: 'סיסמה לא נכונה' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'משתמש לא נמצא או שגיאה בשרת' };
  }
}



export async function addUser(user: User): Promise<{ success: boolean, error?: string }> {
  try {
    const response = await axios.post(`${SERVER_URL}/users/post`, user);

    if (response.status === 201) {
      return { success: true };
    } else {
      return { success: false, error: 'לא ניתן להוסיף את המשתמש' };
    }
  } catch (error) {
    console.error('Add user error:', error);
    return { success: false, error: 'שגיאה בהוספת המשתמש' };
  }
}
