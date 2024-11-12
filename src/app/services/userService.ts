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

export async function getUserDataByType(userId: string, type: 'cars' | 'songs' | 'books'): Promise<{ success: boolean, data?: any, error?: string }> {
  try {
    const response = await axios.get(`${SERVER_URL}/${type}/get/${userId}`);

    if (response.status === 200 && response.data) {
  

      return { success: true, data: response.data[type] };
    } else {
      return { success: false, error: 'נתונים לא נמצאו' };
    }
  } catch (error) {
    console.error(`Error fetching ${type} data:`, error);
    return { success: false, error: 'שגיאה בקבלת הנתונים מהשרת' };
  }
}

export async function updateUserDataByType(
  userId: string,
  type: 'cars' | 'songs' | 'books',
  index: number,
  updatedData: any
): Promise<{ success: boolean, error?: string }> {
  try {
    const response = await axios.put(`${SERVER_URL}/${type}/put/${userId}/${index}`, updatedData);

    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, error: 'עדכון הנתונים נכשל' };
    }
  } catch (error) {
    console.error(`Error updating ${type} data:`, error);
    return { success: false, error: 'שגיאה בעדכון הנתונים בשרת' };
  }
}

export async function deleteUserDataByType(
  userId: string,
  type: 'cars' | 'songs' | 'books',
  index: number,
): Promise<{ success: boolean, error?: string }> {
  try {
    const response = await axios.delete(`${SERVER_URL}/${type}/delete/${userId}/${index}`);

    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, error: 'מחיקת הנתונים נכשל' };
    }
  } catch (error) {
    console.error(`Error updating ${type} data:`, error);
    return { success: false, error: 'שגיאה במחיקת הנתונים בשרת' };
  }
}

export async function addUserDataByType(
  userId: string,
  type: 'cars' | 'songs' | 'books',
  newData: any
): Promise<{ success: boolean, error?: string }> {
  try {
    const response = await axios.post(`${SERVER_URL}/${type}/post/${userId}`, newData);

    if (response.status === 201) {
      return { success: true };
    } else {
      return { success: false, error: 'הוספת הנתונים נכשלה' };
    }
  } catch (error) {
    console.error(`Error adding ${type} data:`, error);
    return { success: false, error: 'שגיאה בהוספת הנתונים בשרת' };
  }
}