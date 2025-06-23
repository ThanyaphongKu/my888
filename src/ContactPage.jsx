import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ส่งข้อความแล้ว:", formData);
    // ที่นี่สามารถเชื่อมต่อ API หรือส่งอีเมลได้
    alert("ส่งข้อความเรียบร้อยแล้ว!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          ติดต่อทีมงานจองคิวถ่ายภาพ
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium">ชื่อ</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">อีเมล</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">ข้อความ</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            ส่งข้อความ
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
