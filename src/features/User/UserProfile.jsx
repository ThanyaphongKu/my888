import React, { useState } from "react";

const UserProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "SOF_888",
    fullName: "เทส 01",
    email: "xxxxxx@gmail.com",
    phone: "02-1234-5678",
    address: "ไม่บอกเดี๋ยวรู้",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // คุณสามารถเชื่อมต่อ API หรือบันทึกข้อมูลตรงนี้
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Enhanced Navbar */}
      <header className="bg-white shadow-lg border-b-4 border-green-400">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-3xl font-bold text-green-600 tracking-wide">
              SOF888
            </div>
            <nav className="hidden md:flex space-x-8 text-lg">
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors duration-200 hover:underline">
                หน้าหลัก
              </a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors duration-200 hover:underline">
                แพ็กเกจ
              </a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors duration-200 hover:underline">
                รายการจอง
              </a>
              <a href="#" className="text-green-600 font-semibold underline decoration-2 underline-offset-4">
                โปรไฟล์ผู้ใช้
              </a>
            </nav>
            <button className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors duration-200 shadow-md hover:shadow-lg">
              ออกจากระบบ
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced Profile Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-green-400 to-blue-500 px-10 py-8">
            <div className="flex flex-col items-center text-white">
              <div className="relative mb-6">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg ring-4 ring-white ring-opacity-50">
                  <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                {/* Online indicator */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-400 rounded-full border-3 border-white"></div>
              </div>
              <h2 className="text-3xl font-bold mb-2">โปรไฟล์ของฉัน</h2>
              <p className="text-green-100 text-lg">@{formData.username}</p>
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-10">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">ชื่อบัญชีผู้ใช้</p>
                    <p className="text-lg font-semibold text-gray-800">{formData.username}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">ชื่อ-สกุล</p>
                    <p className="text-lg font-semibold text-gray-800">{formData.fullName}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">อีเมล</p>
                    <p className="text-lg font-semibold text-gray-800">{formData.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">เบอร์โทร</p>
                    <p className="text-lg font-semibold text-gray-800">{formData.phone}</p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 font-medium">ที่อยู่</p>
                    <p className="text-lg font-semibold text-gray-800 leading-relaxed">{formData.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>แก้ไขโปรไฟล์</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl transform transition-all duration-300 scale-100">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">แก้ไขโปรไฟล์</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อ-สกุล</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:outline-none transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">อีเมล</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:outline-none transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">เบอร์โทร</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:outline-none transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ที่อยู่</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:outline-none transition-colors duration-200 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors duration-200"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  บันทึกการเปลี่ยนแปลง
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;