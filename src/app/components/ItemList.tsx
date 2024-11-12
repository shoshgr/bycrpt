import React, { useState } from 'react';
import { addUserDataByType } from '@/app/services/userService'; // ודא שיש לך את הפונקציה הזו

interface ItemListProps {
  userId: string;
  dataType: 'books' | 'cars' | 'songs';
  isFormVisible: boolean;
  setIsFormVisible: (value: boolean) => void;
  items: any[];
  setItems: (items: any[]) => void;
}

const ItemList: React.FC<ItemListProps> = ({ userId, dataType, isFormVisible, setIsFormVisible, items, setItems }) => {
  const [newItem, setNewItem] = useState<any>({});

  const handleAdd = async () => {
    const result = await addUserDataByType(userId, dataType, newItem);
    if (result.success) {
      setItems([...items, newItem]);
      setNewItem({});
      setIsFormVisible(false);
    } else {
      alert(result.error || 'שגיאה בהוספת הנתונים');
    }
  };

  const handleNewItemChange = (key: string, value: any) => {
    setNewItem({ ...newItem, [key]: value });
  };

  const renderFormFields = () => {
    switch (dataType) {
      case 'books':
        return (
          <>
            <div className="mb-2">
              <label>Title:</label>
              <input
                type="text"
                value={newItem.title || ''}
                onChange={(e) => handleNewItemChange('title', e.target.value)}
                className="border p-2 rounded"
              />
            </div>
            <div className="mb-2">
              <label>Author:</label>
              <input
                type="text"
                value={newItem.author || ''}
                onChange={(e) => handleNewItemChange('author', e.target.value)}
                className="border p-2 rounded"
              />
            </div>
            <div className="mb-2">
              <label>Year:</label>
              <input
                type="number"
                value={newItem.year || ''}
                onChange={(e) => handleNewItemChange('year', e.target.value)}
                className="border p-2 rounded"
              />
            </div>
          </>
        );
      case 'cars':
        return (
          <>
            <div className="mb-2">
              <label>Make:</label>
              <input
                type="text"
                value={newItem.make || ''}
                onChange={(e) => handleNewItemChange('make', e.target.value)}
                className="border p-2 rounded"
              />
            </div>
            <div className="mb-2">
              <label>Model:</label>
              <input
                type="text"
                value={newItem.model || ''}
                onChange={(e) => handleNewItemChange('model', e.target.value)}
                className="border p-2 rounded"
              />
            </div>
            <div className="mb-2">
              <label>Year:</label>
              <input
                type="number"
                value={newItem.year || ''}
                onChange={(e) => handleNewItemChange('year', e.target.value)}
                className="border p-2 rounded"
              />
            </div>
          </>
        );
      case 'songs':
        return (
          <>
            <div className="mb-2">
              <label>Title:</label>
              <input
                type="text"
                value={newItem.title || ''}
                onChange={(e) => handleNewItemChange('title', e.target.value)}
                className="border p-2 rounded"
              />
            </div>
            <div className="mb-2">
              <label>Artist:</label>
              <input
                type="text"
                value={newItem.artist || ''}
                onChange={(e) => handleNewItemChange('artist', e.target.value)}
                className="border p-2 rounded"
              />
            </div>
            <div className="mb-2">
              <label>Type:</label>
              <input
                type="text"
                value={newItem.type || ''}
                onChange={(e) => handleNewItemChange('type', e.target.value)}
                className="border p-2 rounded"
              />
            </div>
            <div className="mb-2">
              <label>Year:</label>
              <input
                type="number"
                value={newItem.year || ''}
                onChange={(e) => handleNewItemChange('year', e.target.value)}
                className="border p-2 rounded"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {isFormVisible && (
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">הוסף {dataType === 'books' ? 'ספר' : dataType === 'cars' ? 'רכב' : 'שיר'}</h3>
          {renderFormFields()}
          <button
            onClick={handleAdd}
            className="mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-200"
          >
            הוסף
          </button>
          <button
            onClick={() => setIsFormVisible(false)}
            className="mt-2 px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-200"
          >
            סגור
          </button>
        </div>
      )}

      <div className="mt-4">
        {items.length === 0 && <p className="text-center text-gray-500">אין נתונים להצגה</p>}
        <ul>
          {items.map((item, index) => (
            <li key={index} className="mb-2">
              {item.title || item.make || item.artist}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ItemList;
