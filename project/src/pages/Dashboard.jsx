import { useEffect, useState } from "react";
import api from "../Api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "active",
  });

  const [editId, setEditId] = useState(null);

  // FETCH ITEMS
  const fetchItems = async () => {
    try {
      const res = await api.get("/items");
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ADD / UPDATE ITEM
  const handleSubmit = async () => {
    try {
      if (!form.title) return alert("Title required");

      if (editId) {
        await api.put(`/items/${editId}`, form);
        setEditId(null);
      } else {
        await api.post("/items", form);
      }

      setForm({ title: "", description: "", status: "active" });
      fetchItems();
    } catch (err) {
      console.log(err);
      alert("Something went wrong ❌");
    }
  };

  // DELETE ITEM
  const deleteItem = async (id) => {
    if (confirm("Delete this item?")) {
      await api.delete(`/items/${id}`);
      fetchItems();
    }
  };

  // EDIT ITEM
  const editItem = (item) => {
    setForm({
      title: item.title,
      description: item.description,
      status: item.status,
    });
    setEditId(item.id);
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    await api.put(`/items/${id}`, { status });
    fetchItems();
  };

  // LOGOUT
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // STATS
  const total = items.length;
  const active = items.filter(i => i.status === "active").length;
  const pending = items.filter(i => i.status === "pending").length;
  const completed = items.filter(i => i.status === "completed").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">

      {/* NAVBAR */}
      <div className="flex justify-between items-center mb-6 bg-white/70 backdrop-blur p-4 rounded-2xl shadow">
        <h1 className="text-xl font-bold text-indigo-700">🚀Dashboard</h1>

        <div className="flex items-center gap-4">
          <span className="text-gray-600 font-medium">
            {user?.name || "User"}
          </span>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total" value={total} color="from-indigo-500 to-purple-600" />
        <StatCard title="Active" value={active} color="from-green-500 to-emerald-600" />
        <StatCard title="Pending" value={pending} color="from-yellow-500 to-orange-500" />
        <StatCard title="Completed" value={completed} color="from-pink-500 to-red-500" />
      </div>

      {/* FORM */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          {editId ? "✏️ Edit Item" : "➕ Add New Item"}
        </h2>

        <div className="grid md:grid-cols-4 gap-3">
          <input
            placeholder="Title"
            className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            placeholder="Description"
            className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <select
            className="p-3 border rounded-xl"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <button
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>
      </div>

      {/* ITEMS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-2xl shadow hover:shadow-xl transition duration-300"
          >
            <h3 className="font-bold text-lg text-indigo-700">
              {item.title}
            </h3>

            <p className="text-gray-600 text-sm mt-1">
              {item.description}
            </p>

            {/* STATUS */}
            <select
              className="mt-3 text-sm border rounded px-2 py-1"
              value={item.status}
              onChange={(e) => updateStatus(item.id, e.target.value)}
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            {/* ACTIONS */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => editItem(item)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => deleteItem(item.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

// STAT CARD
function StatCard({ title, value, color }) {
  return (
    <div className={`p-5 rounded-2xl text-white shadow bg-gradient-to-r ${color}`}>
      <h3 className="text-sm">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}