import React, { useState } from "react";
import { useAdminAuth } from '../../context/AdminAuthContext';
import axios from 'axios';

export function AddSubcategoryModal({ isOpen, onClose, onAdd, categoryName, categoryId }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { state: { token } } = useAdminAuth();

  const handleAdd = async () => {
    if (!name.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await axios.post('/api/subcategory', { name, categoryId }, {
        headers: {
          'Content-Type': 'application/json',
          'token': token || '',
        },
      });
      setName("");
      onAdd && onAdd();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 space-y-4">
        <h2 className="text-lg font-bold">Add Subcategory to {categoryName}</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter subcategory name"
          className="w-full border p-2 rounded"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 border rounded"
            onClick={() => {
              onClose();
              setName("");
              setError(null);
            }}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-accent text-white rounded"
            onClick={handleAdd}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
