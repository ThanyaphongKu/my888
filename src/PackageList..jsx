import React, { useState } from "react";

const packages = [
  {
    id: 1,
    name: "แพ็กเกจพรีเวดดิ้ง",
    price: 8900,
    image: "https://source.unsplash.com/400x300/?wedding",
    description: "เหมาะสำหรับคู่รักที่ต้องการภาพถ่ายพรีเวดดิ้งในสไตล์โรแมนติก ทั้งในสตูดิโอและนอกสถานที่",
  },
  {
    id: 2,
    name: "แพ็กเกจโปรไฟล์",
    price: 2500,
    image: "https://source.unsplash.com/400x300/?portrait",
    description: "ถ่ายโปรไฟล์ส่วนตัวหรือภาพสำหรับใช้ในงานสมัครงาน, โซเชียล, หรือมืออาชีพ",
  },
  {
    id: 3,
    name: "แพ็กเกจครอบครัว",
    price: 3900,
    image: "https://source.unsplash.com/400x300/?family",
    description: "สำหรับภาพครอบครัวที่อบอุ่นและน่าประทับใจ เหมาะสำหรับทุกวัย",
  },
  {
    id: 4,
    name: "แพ็กเกจถ่ายสินค้า",
    price: 3200,
    image: "https://source.unsplash.com/400x300/?product,studio",
    description: "เหมาะสำหรับเจ้าของร้านหรือแบรนด์ที่ต้องการภาพสินค้ามืออาชีพสำหรับขายออนไลน์",
  },
];

const PackageList = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="bg-white px-8 py-5 flex justify-between items-center shadow-md border-b sticky top-0 z-50">
        <div className="text-2xl font-extrabold text-green-700 tracking-wide">SOF888</div>
        <nav className="flex gap-8 text-green-800 font-medium text-lg">
          <a href="#home" className="hover:text-green-600 transition">หน้าหลัก</a>
          <a href="#features" className="hover:text-green-600 transition">แพ็คเกจ</a>
          <a href="#testimonials" className="hover:text-green-600 transition">รีวิว</a>
          <a href="#login" className="hover:text-green-600 transition flex items-center gap-1">เข้าสู่ระบบ</a>
        </nav>
      </header>

      {/* Title */}
      <h1 className="text-4xl font-bold text-center my-12 text-green-800">รายการแพ็คเกจ</h1>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 pb-20">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 bg-white"
          >
            <img
              src={pkg.image}
              alt={pkg.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h2>
              <p className="text-gray-600 text-lg mb-5">
                ราคา <span className="font-semibold">{pkg.price.toLocaleString()}</span> บาท
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedPackage(pkg)}
                  className="w-full bg-gradient-to-r from-green-300 to-green-400 text-black font-semibold py-2 rounded-full shadow-md hover:from-green-400 hover:to-green-500 transition"
                >
                  รายละเอียดงาน
                </button>
                <button className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold py-2 rounded-full shadow-md hover:from-green-500 hover:to-green-600 transition">
                  จองแพ็คเกจงาน
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-yellow-200 bg-opacity-20 flex justify-center items-center z-50 px-4">
          <div className="bg-white max-w-lg w-full rounded-xl shadow-lg p-6 relative">
            <button
              onClick={() => setSelectedPackage(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
            <img
              src={selectedPackage.image}
              alt={selectedPackage.name}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedPackage.name}</h2>
            <p className="text-gray-600 mb-2">
              ราคา <span className="font-semibold">{selectedPackage.price.toLocaleString()}</span> บาท
            </p>
            <p className="text-gray-700">{selectedPackage.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageList;
