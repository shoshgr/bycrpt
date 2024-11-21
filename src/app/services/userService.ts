'use client'
import axios from 'axios';
import {User} from '@/app/models/user'

const SERVER_URL = 'http://localhost:3000/api';


export async function loginUser(userId: string, password: string) {
  try {
    const response = await axios.post(`${SERVER_URL}/register/post`, { userId, password });

    if (response.status===200) {
      console.log('Login successful:', response.data.user);
      return { success: true, user: response.data.user };
    } else {
      return { success: false, error: response.data.error || 'Login failed' };
    }

  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, error: 'An error occurred during login' };
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




