
import axios from 'axios';
import React, { useState } from "react"


export function AddCategoryModal({ isOpen, onClose, onAdd, token }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAdd = async (e) => {
    if (e) e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await axios.post('/api/categories', { name }, {
        headers: {
          'Content-Type': 'application/json',
          'token': token || '',
        },
      });
      setName("");
      setLoading(false);
      onAdd && onAdd();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 space-y-4">
        <h2 className="text-lg font-bold">Add Category</h2>
        <form onSubmit={handleAdd}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="w-full border p-2 rounded"
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="px-4 py-2 border rounded"
              type="button"
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
              type="submit"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
