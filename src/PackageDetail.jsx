import React, { useState } from "react";
import { useParams } from "react-router-dom";

const mockPackages = [
  {
    id: "1",
    name: "แพ็คเกจถ่ายพรีเวดดิ้ง",
    description: "ถ่ายภาพพรีเวดดิ้งในสตูดิโอหรือสถานที่ธรรมชาติ พร้อมแต่งหน้า",
    price: 4500,
    image: "https://source.unsplash.com/featured/?wedding,prewedding",
  },
  {
    id: "2",
    name: "แพ็คเกจถ่ายรูปรับปริญญา",
    description: "ถ่ายภาพบัณฑิตทั้งในและนอกสถานที่",
    price: 2500,
    image: "https://source.unsplash.com/featured/?graduation",
  },
];

const PackageDetail = () => {
  const { id } = useParams();
  const pkg = mockPackages.find(p => p.id === id);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);


  if (!pkg) return <div className="p-10 text-center text-red-600">ไม่พบแพ็คเกจ</div>;

  return (
    <div className="min-h-screen bg-white py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <img src={pkg.image} alt={pkg.name} className="rounded-xl w-full h-72 object-cover shadow-md" />
        <h1 className="text-3xl font-bold text-green-700 mt-6">{pkg.name}</h1>
        <p className="text-gray-700 mt-2">{pkg.description}</p>
        <p className="text-green-600 font-bold text-xl mt-4">{pkg.price.toLocaleString()} บาท</p>

        <hr className="my-6 border-gray-200" />

        <h2 className="text-xl font-semibold text-green-700 mb-4">เลือกวันและเวลาที่ต้องการจอง</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="flex-1 border rounded-lg p-3 focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              className="flex-1 border rounded-lg p-3 focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <input
            type="text"
            placeholder="ชื่อของคุณ"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border rounded-lg p-3"
            required
          />
          <input
            type="tel"
            placeholder="เบอร์โทรศัพท์"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full border rounded-lg p-3"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            ยืนยันการจอง
          </button>

          {submitted && (
            <div className="mt-4 text-green-700 font-medium bg-green-100 rounded-lg p-4">
              🎉 การจองของคุณสำเร็จแล้ว! เราจะติดต่อกลับภายใน 24 ชั่วโมง
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PackageDetail;
