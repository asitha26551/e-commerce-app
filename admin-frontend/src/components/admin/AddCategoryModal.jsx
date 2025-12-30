
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-surface border border-border shadow-neon-purple rounded-xl w-full max-w-md p-6 space-y-5">
        <h2 className="text-xl font-display font-bold text-primary mb-2">Add Category</h2>
        <form onSubmit={handleAdd}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="w-full bg-background border border-border text-text placeholder:text-text-secondary p-3 rounded focus:outline-none focus:ring-2 focus:ring-accent transition"
          />
          {error && <div className="text-error text-sm font-medium mt-2">{error}</div>}
          <div className="flex justify-end gap-3 pt-2 mt-4">
            <button
              className="px-4 py-2 rounded border border-border text-text bg-transparent hover:bg-white/5 transition"
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
              className="px-4 py-2 rounded bg-accent text-white font-semibold shadow-neon-accent hover:brightness-110 transition"
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
