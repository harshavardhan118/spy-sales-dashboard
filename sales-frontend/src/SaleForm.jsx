import { useState } from "react";

function SaleForm() {
  const [form, setForm] = useState({
    name: "",
    course: "",
    price: "",
    saleDate: "",
  });

  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
      }),
    });

    if (response.ok) {
      setShowToast(true);
      setForm({ name: "", course: "", price: "", saleDate: "" });

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } else {
      alert("Failed to save sale");
    }
  };

  return (
    <div className="relative">

      {/* Toast */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
            ✅ Sale saved successfully!
          </div>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-xl space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Sales Entry
        </h2>

        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <Select
          label="Course"
          name="course"
          value={form.course}
          onChange={handleChange}
          options={["Java", "React", "Spring"]}
        />

        <Input
          label="Price"
          name="price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={handleChange}
        />

        <Input
          label="Date"
          name="saleDate"
          type="date"
          value={form.saleDate}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Save Sale
        </button>
      </form>
    </div>
  );
}

/* Reusable components */

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">
      {label}
    </label>
    <input
      {...props}
      required
      className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">
      {label}
    </label>
    <select
      {...props}
      required
      className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
    >
      <option value="">Select Course</option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="text-black">
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default SaleForm;
