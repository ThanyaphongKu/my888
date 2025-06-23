import React, { useEffect } from "react";
import { MousePointerClick, Smartphone, ShieldCheck, Star, ArrowRight, Phone, Mail } from "lucide-react";

const HomePage = () => {
  useEffect(() => {
    const sections = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach(section => {
      section.classList.add(
        "opacity-0",
        "translate-y-8",
        "transition-all",
        "duration-1000",
        "ease-out"
      );
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-white to-green-50 scroll-smooth relative overflow-x-hidden">
      {/* Enhanced Gradient Blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-emerald-200 to-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob -z-10" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-green-200 to-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 -z-10" />
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000 -z-10" />

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      {/* Enhanced Locked Navbar */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md px-6 lg:px-8 py-4 flex justify-between items-center shadow-lg border-b border-emerald-100 z-50 transition-all duration-300">
        <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
          SOF888
        </div>
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <a href="#home" className="hover:text-emerald-600 transition-colors duration-300 relative group py-2">
            หน้าหลัก
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#features" className="hover:text-emerald-600 transition-colors duration-300 relative group py-2">
            แพ็คเกจ
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#testimonials" className="hover:text-emerald-600 transition-colors duration-300 relative group py-2">
            รีวิว
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#contact" className="hover:text-emerald-600 transition-colors duration-300 relative group py-2">
            ติดต่อ
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#login" className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-2 rounded-full hover:from-emerald-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-md ml-4">
            เข้าสู่ระบบ
          </a>
        </nav>
        
        {/* Mobile menu button */}
        <button className="md:hidden p-2 rounded-lg bg-emerald-100 text-emerald-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Enhanced Hero Section */}
      <main id="home" className="flex flex-col items-center justify-center px-4 py-8 min-h-screen pt-24">
        <div className="relative w-full max-w-10xl h-96 lg:h-screen max-h-screen rounded-3xl overflow-hidden shadow-2xl border border-emerald-200 fade-in">
          <img 
            src="/api/placeholder/1200/800" 
            alt="Creative Photography" 
            className="absolute w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 z-0" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="block text-emerald-300 text-lg md:text-xl lg:text-2xl font-normal mb-2">
                LET US CAPTURE
              </span>
              EVERY MEANINGFUL
              <span className="block text-emerald-300">MEMORY</span>
            </h1>
            <p className="text-base md:text-xl lg:text-2xl mb-8 max-w-4xl leading-relaxed font-light">
              ทุกความทรงจำของคุณให้เราได้เก็บภาพที่มีความหมายในช่วงชีวิตของคุณ
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="fade-in bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white text-lg font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-3">
                <span>รายการแพ็คเกจทั้งหมด</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="fade-in bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white text-lg font-semibold px-8 py-4 rounded-full border border-white/30 hover:border-white/50 transition-all duration-300 ease-in-out transform hover:scale-105">
                ดูผลงาน
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Why Us Section */}
      <section id="whyus" className="py-20 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4 fade-in">
            ทำไมต้องเลือกเรา
          </h2>
          <p className="text-gray-600 text-lg mb-12 fade-in">เรามีจุดเด่นที่จะทำให้ประสบการณ์ของคุณดีที่สุด</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              icon: <MousePointerClick className="mx-auto text-emerald-500 mb-4" size={48} />,
              title: "ใช้งานง่าย",
              desc: "ออกแบบให้เหมาะกับผู้ใช้งานทุกระดับ ไม่ซับซ้อน ใช้งานได้ทันที"
            }, {
              icon: <Smartphone className="mx-auto text-emerald-500 mb-4" size={48} />,
              title: "รองรับทุกอุปกรณ์",
              desc: "เข้าถึงได้ทั้งจากมือถือ แท็บเล็ต และคอมพิวเตอร์ ทุกที่ทุกเวลา"
            }, {
              icon: <ShieldCheck className="mx-auto text-emerald-500 mb-4" size={48} />,
              title: "ระบบทันสมัย",
              desc: "พัฒนาโดยใช้เทคโนโลยีใหม่ล่าสุด พร้อมความปลอดภัยระดับสูง"
            }].map(({ icon, title, desc }, i) => (
              <div key={i} className="fade-in group p-8 rounded-3xl shadow-lg border border-emerald-100 bg-white text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 hover:bg-gradient-to-b hover:from-white hover:to-emerald-50">
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  {icon}
                </div>
                <h3 className="text-xl font-bold text-emerald-600 mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Packages Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4 fade-in">
            แพ็คเกจแนะนำ
          </h2>
          <p className="text-gray-600 text-lg mb-12 fade-in">เลือกแพ็คเกจที่เหมาะสมกับความต้องการของคุณ</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              img: "/api/placeholder/400/300",
              title: "แพ็คเกจพรีเวดดิ้ง",
              desc: "ถ่ายภาพในสตูดิโอหรือสถานที่ธรรมชาติ พร้อมแต่งหน้าและเครื่องแต่งกาย",
              price: "฿3,500",
              originalPrice: "฿5,500",
              features: ["ครึ่งวัน/เต็มวัน", "แต่งหน้า-ทำผม", "รูปดิจิทัลไม่จำกัดภาพ"],
              popular: true,
              link: "/packages/1"
            }, {
              img: "/api/placeholder/400/300",
              title: "แพ็คเกจรับปริญญา",
              desc: "ถ่ายภาพบัณฑิต ทั้งในและนอกสถานที่ ",
              price: "฿2,300",
              originalPrice: "฿3,000",
              features: ["ครึ่งวัน/เต็มวัน", "จัดท่าทางให้", "รูปดิจิทัลไม่จำกัดภาพ"],
              popular: false,
              link: "/packages/2"
            }, {
              img: "/api/placeholder/400/300",
              title: "แพ็คเกจครอบครัว",
              desc: "ถ่ายภาพครอบครัวหรือเด็กในสตูดิโอ พร้อมพร็อพและของเล่น",
              price: "฿3,000",
              originalPrice: "฿4,000",
              features: ["ถ่ายภาพ 2-3 ชั่วโมง", "พร็อพและของเล่น", "รูปดิจิทัลไม่จำกัดภาพ"],
              popular: false,
              link: "/packages/3"
            }].map(({ img, title, desc, price, originalPrice, features, popular, link }, i) => (
              <div key={i} className="fade-in group relative p-6 rounded-3xl shadow-lg border border-gray-200 bg-white text-left hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                {popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-400 to-red-400 text-white px-4 py-2 rounded-bl-2xl font-semibold text-sm">
                    ยอดนิยม
                  </div>
                )}
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <img src={img} alt={title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-emerald-600 mb-2">{title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{desc}</p>
                
                <div className="mb-4">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-emerald-600">{price}</span>
                  <span className="text-gray-400 line-through">{originalPrice}</span>
                </div>
                
                <a href={link} className="inline-block w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-full hover:from-emerald-600 hover:to-green-600 transition-all duration-300 text-center font-semibold shadow-md hover:shadow-lg transform hover:scale-105">
                  ดูรายละเอียด
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-b from-emerald-50 to-green-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4 fade-in">
            เสียงจากผู้ใช้งาน
          </h2>
          <p className="text-gray-600 text-lg mb-12 fade-in">ความประทับใจจากลูกค้าที่ใช้บริการ</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "จองคิวง่ายมาก ประทับใจสุด ๆ! ระบบทำงานลื่นไหลมากครับ", name: "สมศรี", role: "เจ้าสาว" },
              { text: "ระบบลื่นไหล UI สวยมากๆ ใช้งานง่าย ได้รูปสวยด้วย", name: "สมชาย", role: "บัณฑิต" },
              { text: "ทีมงานพัฒนาดีจริง ๆ มีประสิทธิภาพ บริการดีเยี่ยม", name: "จันทร์จ้า", role: "แม่ลูก" }
            ].map(({ text, name, role }, i) => (
              <div key={i} className="fade-in group p-8 bg-white rounded-3xl shadow-lg border border-emerald-100 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 text-lg leading-relaxed">"{text}"</p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full flex items-center justify-center text-white font-semibold">
                    {name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-emerald-600">คุณ{name}</div>
                    <div className="text-gray-500 text-sm">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-20 bg-white border-t border-emerald-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4 fade-in">
            ติดต่อเรา
          </h2>
          <p className="text-gray-600 text-lg mb-12 fade-in">มีคำถามหรือข้อเสนอแนะ เรายินดีให้บริการ</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="fade-in p-8 bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl border border-emerald-100 hover:shadow-lg transition-all duration-300">
              <Phone className="mx-auto text-emerald-500 mb-4" size={40} />
              <h3 className="text-xl font-semibold text-emerald-600 mb-2">โทรศัพท์</h3>
              <p className="text-gray-700 text-lg">089-376-5232</p>
            </div>
            <div className="fade-in p-8 bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl border border-emerald-100 hover:shadow-lg transition-all duration-300">
              <Mail className="mx-auto text-emerald-500 mb-4" size={40} />
              <h3 className="text-xl font-semibold text-emerald-600 mb-2">อีเมล</h3>
              <p className="text-gray-700 text-lg">thanyaphong63@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-8 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-2xl font-bold mb-4">SOF888</div>
          <p className="text-emerald-100 mb-4">ระบบจัดการแพ็คเกจถ่ายภาพที่ทันสมัยและใช้งานง่าย</p>
          <div className="border-t border-emerald-400 pt-4">
            <p className="text-emerald-100 text-sm">
              &copy; {new Date().getFullYear()} ระบบจัดการแพ็คเกจ. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;