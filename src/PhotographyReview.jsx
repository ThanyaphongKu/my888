import React from "react";
import { useState } from "react";

const PhotographyReview = () => {
  const [reviews, setReviews] = useState([
    {
      name: "_dxmxnzhsknfagt",
      rating: 5,
      comment: "บริการดีมาก ตรงเวลา ภาพสวยประทับใจ",
      date: "2025-05-20",
    },
    {
      name: "g_____xif",
      rating: 5,
      comment: "ถ่ายโอเค ภาพสวย โทนสีสวยมาก",
      date: "2025-05-18",
    },
  ]);

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    if (isSubmitting || !newReview.name.trim() || !newReview.comment.trim()) return;
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const today = new Date().toISOString().split("T")[0];
    const updatedReview = { ...newReview, date: today };
    setReviews([updatedReview, ...reviews]);
    setNewReview({ name: "", rating: 5, comment: "" });
    setIsSubmitting(false);
  };

  const getStarDisplay = (rating, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-2xl transition-all duration-200 ${
          i < rating 
            ? "text-yellow-400 drop-shadow-sm" 
            : interactive 
              ? "text-gray-300 hover:text-yellow-300" 
              : "text-gray-200"
        }`}
      >
        {i < rating ? "★" : "☆"}
      </span>
    ));
  };

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md px-6 lg:px-8 py-4 flex justify-between items-center shadow-lg border-b border-emerald-100 z-40">
        <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
          SOF888
        </div>
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <a href="#home" className="hover:text-emerald-600 transition-colors duration-300 relative group py-2">
            หน้าหลัก
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#packages" className="hover:text-emerald-600 transition-colors duration-300 relative group py-2">
            แพ็คเกจ
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#testimonials" className="text-emerald-600 font-semibold py-2">
            รีวิว
          </a>
          <a href="#contact" className="hover:text-emerald-600 transition-colors duration-300 relative group py-2">
            ติดต่อ
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>
      </header>

        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-xl text-gray-600 mb-6">แบ่งปันประสบการณ์การใช้บริการของคุณ</p>
          {/* Stats */}
          <div className="flex justify-center items-center space-x-8 bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">{reviews.length}</div>
              <div className="text-sm text-gray-600">รีวิวทั้งหมด</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <span className="text-3xl font-bold text-gray-800">{avgRating}</span>
                <span className="text-yellow-400 text-2xl">★</span>
              </div>
              <div className="text-sm text-gray-600">คะแนนเฉลี่ย</div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 mb-12 border border-white/50 hover:shadow-3xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">เขียนรีวิวของคุณ</h2>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold">ชื่อของคุณ</label>
                <input
                  type="text"
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="กรอกชื่อของคุณ..."
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold">ให้คะแนน</label>
                <div className="relative">
                  <select
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                    value={newReview.rating}
                    onChange={(e) =>
                      setNewReview({
                        ...newReview,
                        rating: parseInt(e.target.value),
                      })
                    }
                  >
                    {[5, 4, 3, 2, 1].map((num) => (
                      <option key={num} value={num}>
                        {num} ดาว - {"★".repeat(num)}{"☆".repeat(5-num)}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">ความคิดเห็น</label>
              <textarea
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                rows="4"
                placeholder="แบ่งปันประสบการณ์การใช้บริการของคุณ..."
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                required
              ></textarea>
            </div>

            <div
              onClick={handleSubmit}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform cursor-pointer text-center ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              } text-white`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>กำลังส่งรีวิว...</span>
                </div>
              ) : (
                "ส่งรีวิว"
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">รีวิวจากลูกค้า</h2>
          </div>

          {reviews.map((review, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-8 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 border border-white/50 hover:bg-white/90"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {review.name}
                    </h3>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex space-x-1 mb-1">
                    {getStarDisplay(review.rating)}
                  </div>
                  <div className="text-sm text-gray-500">{review.rating}/5 ดาว</div>
                </div>
              </div>
              
              <div className="bg-gray-50/50 rounded-2xl p-6 border-l-4 border-blue-400">
                <p className="text-gray-700 leading-relaxed text-lg">{review.comment}</p>
              </div>
            </div>
          ))}

          {reviews.length === 0 && (
            <div className="text-center py-16 bg-white/50 rounded-3xl border-2 border-dashed border-gray-300">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">ยังไม่มีรีวิว เป็นคนแรกที่แบ่งปันประสบการณ์!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotographyReview;