import React, { useState } from 'react';
import { Facebook, Mail, PhoneCall, Link, MapPin, Send } from 'lucide-react';
import lineqr from '../assets/SLine.jpg'; 

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',  
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('ขอบคุณสำหรับข้อความของคุณ! เราจะติดต่อกลับเร็วๆนี้');
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-pulse">
            ติดต่อเรา
          </h1>
          <p className="text-xl md:text-2xl font-light opacity-90">
            พร้อมที่จะสร้างช่วงเวลาสวยงามร่วมกัน
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Main Contact Info */}
        <div className="text-center mb-16">
          <div className="inline-block bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact</h2>
              <p className="text-lg text-gray-600"> Photography </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center justify-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                <PhoneCall className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-800">โทรศัพท์</p>
                  <a href="tel:+66893765232" className="text-blue-600 hover:text-blue-800 font-medium">
                    089-376-5232 (ซอฟ)
                  </a>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3 p-4 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors">
                <Mail className="w-6 h-6 text-pink-600" />
                <div>
                  <p className="font-semibold text-gray-800">WhatsApp</p>
                  <a href="https://wa.me/66893765232" className="text-pink-600 hover:text-pink-800 font-medium">
                    +66 89-376-5232
                  </a>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors mb-4">
                <Facebook className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-800">Facebook</p>
                  <a
                    href="https://www.facebook.com/S.OFPPT/"
                    className="text-blue-600 hover:text-blue-800 underline text-sm"
                    target="_blank"
                    rel="Thanyaphong Kunchat"
                  >
                    Thanyaphong Kunchat
                  </a>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 font-medium mb-3">Line : แสกน QR code ด้านล่าง</p>
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-2xl shadow-lg">
                  <img 
                  src={lineqr} 
                  alt="LINE QR" 
                  className="w-60 h-60 rounded-xl shadow-md" />
                </div>
              </div>
            </div>

            <p className="text-gray-600 italic text-lg">
              หวังว่าจะได้ร่วมงานกันเร็วๆนี้ 💖
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Enhanced Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Mail className="w-7 h-7 text-blue-600" />
                ข้อมูลติดต่อ
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-lg">T</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Thanyaphong</p>
                    <p className="text-sm text-gray-600">Professional Photographer</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                  <Mail className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <a href="mailto:thanyaphong63@gmail.com" className="text-blue-600 hover:text-blue-800">
                      thanyaphong63@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                  <PhoneCall className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-800">โทรศัพท์</p>
                    <a href="tel:+66893765232" className="text-green-600 hover:text-green-800">
                      089-376-5232
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-gray-200">
                <a 
                  href="https://www.facebook.com/S.OFPPT/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transform hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a 
                  href="mailto:thanyaphong63@gmail.com"
                  className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transform hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  <Mail className="w-6 h-6" />
                </a>
                <a 
                  href="tel:+66893765232"
                  className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transform hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  <PhoneCall className="w-6 h-6" />
                </a>
              </div>
            </div>


          </div>

          {/* Enhanced Contact Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Send className="w-7 h-7 text-purple-600" />
              ส่งข้อความถึงเรา
            </h3>
            
            <div onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ชื่อ *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="กรุณาใส่ชื่อของคุณ"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    อีเมล *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@gmail.com"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none"
                    required
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="081-xxx-xxxx"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ที่อยู่
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="จังหวัด/เขต"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  หัวข้อ
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="เช่น จองถ่ายภาพแต่งงาน, สอบถามราคา"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ข้อความ
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="กรุณาใส่รายละเอียดเพิ่มเติม เช่น วันที่ต้องการถ่าย, สถานที่, จำนวนคน"
                  rows={5}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none resize-none"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    กำลังส่ง...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    ส่งข้อความ
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;