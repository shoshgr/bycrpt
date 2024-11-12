import React, { useState, useEffect } from 'react';
import { getUserDataByType } from '@/app/services/userService';
import ItemList from './ItemList';

interface UserPageProps {
  userId: string;
}

const UserPage: React.FC<UserPageProps> = ({ userId }) => {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dataType, setDataType] = useState<'books' | 'cars' | 'songs'>('books');
  const [isFormVisible, setIsFormVisible] = useState(false); 

  useEffect(() => {
    fetchItems();
  }, [dataType]);

  const fetchItems = async () => {
    setError(null);
    if (userId) {
      const response = await getUserDataByType(userId, dataType);
      if (response.success) {
        setItems(response.data);
      } else {
        setError(response.error || 'שגיאה בטעינת הנתונים');
        setItems([]);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-4 text-blue-600">ברוכים הבאים, {userId}</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg mx-2"
          onClick={() => setDataType('books')}
        >
          ספרים
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg mx-2"
          onClick={() => setDataType('cars')}
        >
          רכבים
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg mx-2"
          onClick={() => setDataType('songs')}
        >
          שירים
        </button>
      </div>

      {/* כפתור הוספה רק אחרי בחירת סוג */}
      {dataType && (
        <div className="mb-4">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
            onClick={() => setIsFormVisible(true)}
          >
            הוסף פריט
          </button>
        </div>
      )}

      <ItemList 
        userId={userId} 
        dataType={dataType} 
        isFormVisible={isFormVisible} 
        setIsFormVisible={setIsFormVisible} 
        items={items} 
        setItems={setItems} 
      />
    </div>
  );
};

export default UserPage;
