import React, { useEffect, useState } from "react";
import { MousePointerClick, Smartphone, ShieldCheck, ArrowRight, Camera, Star, CheckCircle, Clock, Facebook, Mail, PhoneCall, Send } from "lucide-react";
import { Link } from "react-router-dom";
import lineqr from "../assets/SLine.jpg";
import nn1 from "../assets/nn1.jpg";
import nn2 from "../assets/nn2.jpg";
import nn3 from "../assets/nn3.jpg";

const HomePage = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "", subject: "", message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-8");
        }
      }),
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-in").forEach((el) => {
      el.classList.add("opacity-0", "translate-y-8", "transition-all", "duration-1000", "ease-out");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    alert("ขอบคุณสำหรับข้อความของคุณ! เราจะติดต่อกลับเร็วๆนี้");
    setFormData({ name: "", email: "", phone: "", address: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const Card = ({ children, className = "" }) => (
    <div className={`fade-in group p-8 rounded-3xl shadow-xl border border-gray-100 bg-white hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 ${className}`}>
      {children}
    </div>
  );

  const cleanMoney = (s) => parseInt(String(s).replace(/[^\d]/g, ""), 10) || 0;
  const savings = (orig, now) => (cleanMoney(orig) - cleanMoney(now)).toLocaleString();

  const whyUsData = [
    { icon: <MousePointerClick size={56} />, title: "ใช้งานง่าย", desc: "ออกแบบให้เหมาะกับผู้ใช้งานทุกระดับ ไม่ซับซ้อน ใช้งานได้ทันที", color: "from-blue-500 to-cyan-500" },
    { icon: <Smartphone size={56} />, title: "รองรับทุกอุปกรณ์", desc: "เข้าถึงได้ทั้งจากมือถือ แท็บเล็ต และคอมพิวเตอร์ ทุกที่ทุกเวลา", color: "from-purple-500 to-pink-500" },
    { icon: <ShieldCheck size={56} />, title: "ระบบทันสมัย", desc: "พัฒนาโดยใช้เทคโนโลยีใหม่ล่าสุด พร้อมความปลอดภัยระดับสูง", color: "from-emerald-500 to-green-500" }
  ];

  const packagesData = [
    {
      img: nn1, title: "แพ็คเกจพรีเวดดิ้ง", price: "฿3,500", originalPrice: "฿5,500", gradient: "from-pink-500 to-rose-500",
      desc: "ถ่ายภาพในสตูดิโอหรือสถานที่ธรรมชาติ พร้อมแต่งหน้าและเครื่องแต่งกาย",
      features: ["ครึ่งวัน/เต็มวัน", "รูปดิจิทัลไม่จำกัดภาพ", "ถ่ายภาพกลางแจ้ง", "รูปสำหรับพิมพ์ขนาดใหญ่"]
    },
    {
      img: nn2, title: "แพ็คเกจรับปริญญา", price: "฿3,500", originalPrice: "฿5,000", gradient: "from-blue-500 to-indigo-500",
      desc: "ถ่ายภาพบัณฑิต ทั้งในและนอกสถานที่ วันรับจริงหรือวันซ้อมใหญ่",
      features: ["ครึ่งวัน/เต็มวัน", "จัดท่าทางให้", "รูปดิจิทัลไม่จำกัดภาพ", "ถ่ายภาพหมู่"]
    },
    {
      img: nn3, title: "แพ็คเกจครอบครัว", price: "฿3,000", originalPrice: "฿4,000", gradient: "from-emerald-500 to-green-500",
      desc: "ถ่ายภาพครอบครัวหรือเด็กในสตูดิโอ พร้อมพร็อพและของเล่น",
      features: ["ถ่ายภาพ 2-3 ชั่วโมง", "พร็อพและของเล่น", "รูปดิจิทัลไม่จำกัดภาพ", "ถ่ายภาพเด็ก"]
    }
  ];

  const testimonialData = [
    { text: "จองคิวง่ายมาก ประทับใจสุด ๆ! ระบบทำงานลื่นไหลมากครับ รูปภาพสวยมาก คุณภาพเยี่ยม", name: "อั๋น อรัญ ภูธาตุแร่", role: "เจ้าบ่าว", avatar: "https://img5.pic.in.th/file/secure-sv1/Ved43158ab95d60a1.jpg" },
    { text: "ระบบลื่นไหล UI สวยมากๆ ใช้งานง่าย ได้รูปสวยด้วย ช่างภาพมืออาชีพจริง ๆ", name: "สมชาย", role: "บัณฑิต", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" },
    { text: "ทีมงานพัฒนาดีจริง ๆ มีประสิทธิภาพ บริการดีเยี่ยม ราคาเหมาะสม คุ้มค่ามาก", name: "จันทร์จ้า", role: "แม่ลูก", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" }
  ];

  const navItems = [
    { name: "หน้าหลัก", id: "home" },
    { name: "แพ็คเกจ", id: "features" },
    { name: "รีวิว", id: "testimonials" },
    { name: "ติดต่อ", id: "contact" }
  ];

  const contactMethods = [
    { icon: <PhoneCall className="w-6 h-6 text-blue-600" />, label: "โทรศัพท์", value: "089-376-5232 (ซอฟ)", href: "tel:+66893765232", bg: "bg-blue-50 hover:bg-blue-100" },
    { icon: <Mail className="w-6 h-6 text-pink-600" />, label: "WhatsApp", value: "+66 89-376-5232", href: "https://wa.me/66893765232", bg: "bg-pink-50 hover:bg-pink-100" },
    { icon: <Facebook className="w-6 h-6 text-blue-600" />, label: "Facebook", value: "Thanyaphong Kunchat", href: "https://www.facebook.com/S.OFPPT/", bg: "bg-green-50 hover:bg-green-100" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-x-hidden">
      <style jsx>{`
        @keyframes blob { 0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); } 25% { transform: translate(30px, -50px) scale(1.1) rotate(90deg); } 50% { transform: translate(-20px, 20px) scale(0.9) rotate(180deg); } 75% { transform: translate(40px, 30px) scale(1.05) rotate(270deg); } }
        .animate-blob { animation: blob 15s infinite ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-6000 { animation-delay: 6s; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        .animate-float { animation: float 3s ease-in-out infinite; }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); } 50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.6); } }
        .pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
      `}</style>

      {/* Background blobs */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-green-50/20" />
        {[
          "top-20 left-10 w-96 h-96 from-emerald-200/40 to-green-200/30",
          "top-40 right-20 w-80 h-80 from-green-200/30 to-emerald-300/40 animation-delay-2000",
          "bottom-20 left-1/2 w-72 h-72 from-emerald-100/40 to-green-100/30 animation-delay-4000",
          "top-1/2 right-1/4 w-64 h-64 from-teal-200/20 to-cyan-100/30 animation-delay-6000"
        ].map((style, i) => (
          <div key={i} className={`absolute ${style} bg-gradient-to-r rounded-full mix-blend-multiply filter blur-3xl animate-blob opacity-40`} />
        ))}
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl px-6 lg:px-8 py-4 flex justify-between items-center shadow-xl border-b border-emerald-100/50 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center animate-float">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">SOF888</div>
        </div>

        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          {navItems.map(({ name, id }) => (
            <button key={id} onClick={() => scrollToSection(id)} className="hover:text-emerald-600 transition-all duration-300 relative group py-2 px-1">
              {name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-300 group-hover:w-full rounded-full" />
            </button>
          ))}
          <Link to="/login" className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-2 rounded-full hover:from-emerald-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg ml-4 pulse-glow">
            เข้าสู่ระบบ
          </Link>
        </nav>

        <button className="md:hidden p-3 rounded-xl bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Hero Section */}
      <main id="home" className="flex flex-col items-center justify-center px-4 py-8 min-h-screen pt-24">
        <div className="relative w-full max-w-[1600px] h-96 lg:h-[85vh] rounded-3xl overflow-hidden shadow-2xl border border-white/20 fade-in group">
          <img src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Creative Photography" className="absolute w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
            <span className="inline-block bg-white/10 backdrop-blur-sm text-emerald-300 px-4 py-2 rounded-full text-sm font-medium border border-white/20 mb-4">
              ✨ Professional Photography Services
            </span>

            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight fade-in">
              <span className="block text-emerald-300 text-lg md:text-2xl lg:text-3xl font-light mb-3 tracking-wider">LET US CAPTURE</span>
              <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">EVERY MEANINGFUL</span>
              <span className="block text-emerald-300 mt-2">MEMORY</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-4xl leading-relaxed font-light opacity-90">
              ทุกความทรงจำของคุณให้เราได้เก็บภาพที่มีความหมายในช่วงชีวิตของคุณ
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollToSection("features")} className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white text-lg font-semibold px-10 py-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 group">
                <span>รายการแพ็คเกจทั้งหมด</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white text-lg font-semibold px-10 py-4 rounded-full border border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105">
                ดูผลงาน
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Why Us Section */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-16 fade-in">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-4">ทำไมต้องเลือกเรา</h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">เรามีจุดเด่นที่จะทำให้ประสบการณ์ของคุณดีที่สุด</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyUsData.map(({ icon, title, desc, color }, i) => (
              <Card key={i} className="text-center overflow-hidden">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${color} text-white mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  {icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-emerald-600 transition-colors duration-300">{title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-16 fade-in">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-4">แพ็คเกจแนะนำ</h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">เลือกแพ็คเกจที่เหมาะสมกับความต้องการของคุณ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packagesData.map(({ img, title, desc, price, originalPrice, features, gradient }, i) => (
              <Card key={i} className="text-left overflow-hidden">
                <div className="relative overflow-hidden rounded-2xl mb-6 shadow-lg">
                  <img src={img} alt={title} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className={`absolute top-4 left-4 p-2 rounded-xl bg-gradient-to-r ${gradient} text-white shadow-lg`}>
                    <Camera className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors duration-300">{title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">{desc}</p>

                <div className="mb-6 space-y-2">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">{price}</span>
                  <span className="text-gray-400 line-through text-xl">{originalPrice}</span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">ประหยัด {savings(originalPrice, price)}฿</span>
                </div>

                <Link to="/login" className="block text-center w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-4 rounded-2xl hover:from-emerald-600 hover:to-green-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-lg">
                  ดูรายละเอียด
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-b from-slate-50 to-emerald-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-16 fade-in">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-4">เสียงจากผู้ใช้งาน</h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">ความประทับใจจากลูกค้าที่ใช้บริการ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialData.map(({ text, name, role, avatar }, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-500" />

                <div className="flex justify-center mb-6">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-gray-700 italic mb-8 text-lg leading-relaxed relative">
                  <span className="text-6xl text-emerald-200 absolute -top-4 -left-2">"</span>
                  <span className="relative z-10">{text}</span>
                </blockquote>

                <div className="flex items-center justify-center gap-4">
                  <img src={avatar} alt={name} className="w-16 h-16 rounded-full object-cover border-4 border-emerald-100 group-hover:border-emerald-300 transition-colors duration-300" />
                  <div className="text-left">
                    <div className="font-bold text-gray-800 text-lg">{name}</div>
                    <div className="text-emerald-600 font-medium">{role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-green-800">
          <div className="absolute inset-0 bg-green-200 bg-opacity-20" />
          <div className="relative z-10 container mx-auto px-6 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-pulse">ติดต่อเรา</h1>
            <p className="text-xl md:text-2xl font-light opacity-90">พร้อมที่จะสร้างช่วงเวลาสวยงามร่วมกัน</p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-green-800 rounded-full" />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <div className="inline-block bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact</h2>
                <p className="text-lg text-gray-600">Photography</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {contactMethods.slice(0, 2).map(({ icon, label, value, href, bg }, i) => (
                  <div key={i} className={`flex items-center justify-center gap-3 p-4 ${bg} rounded-xl transition-colors`}>
                    {icon}
                    <div>
                      <p className="font-semibold text-gray-800">{label}</p>
                      <a href={href} className="text-blue-600 hover:text-blue-800 font-medium">{value}</a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors mb-4">
                  <Facebook className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Facebook</p>
                    <a href="https://www.facebook.com/S.OFPPT/" className="text-blue-600 hover:text-blue-800 underline text-sm" target="_blank" rel="noreferrer">
                      Thanyaphong Kunchat
                    </a>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 font-medium mb-3">Line : แสกน QR code ด้านล่าง</p>
                <div className="flex justify-center">
                  <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-2xl shadow-lg">
                    <img src={lineqr} alt="LINE QR" className="w-60 h-60 rounded-xl shadow-md" />
                  </div>
                </div>
              </div>

              <p className="text-gray-600 italic text-lg">หวังว่าจะได้ร่วมงานกันเร็วๆนี้ 💖</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
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
                      <a href="mailto:thanyaphong63@gmail.com" className="text-blue-600 hover:text-blue-800">thanyaphong63@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                    <PhoneCall className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-800">โทรศัพท์</p>
                      <a href="tel:+66893765232" className="text-green-600 hover:text-green-800">089-376-5232</a>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-gray-200">
                  <a href="https://www.facebook.com/S.OFPPT/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transform hover:scale-110 transition-all duration-300 shadow-lg">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="mailto:thanyaphong63@gmail.com" className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transform hover:scale-110 transition-all duration-300 shadow-lg">
                    <Mail className="w-6 h-6" />
                  </a>
                  <a href="tel:+66893765232" className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transform hover:scale-110 transition-all duration-300 shadow-lg">
                    <PhoneCall className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Send className="w-7 h-7 text-purple-600" />
                ส่งข้อความถึงเรา
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">ชื่อ *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="กรุณาใส่ชื่อของคุณ" required className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">อีเมล *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="example@gmail.com" required className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 outline-none" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">เบอร์โทรศัพท์</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="081-xxx-xxxx" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">ที่อยู่</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="จังหวัด/เขต" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">หัวข้อ</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="เช่น จองถ่ายภาพแต่งงาน, สอบถามราคา" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ข้อความ</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} rows={5} placeholder="กรุณาใส่รายละเอียดเพิ่มเติม เช่น วันที่ต้องการถ่าย, สถานที่, จำนวนคน" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none resize-none" />
                </div>

                <button type="submit" disabled={isSubmitting} className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-xl"}`}>
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      กำลังส่ง...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      ส่งข้อความ
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold">SOF888</div>
          </div>

          <p className="text-emerald-100 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            ระบบจัดการแพ็คเกจถ่ายภาพที่ทันสมัยและใช้งานง่าย<br />เก็บความทรงจำสวยงามของคุณไว้ตลอดกาล
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <h4 className="text-xl font-semibold mb-4 text-emerald-200">บริการ</h4>
              <ul className="space-y-2 text-emerald-100">
                {["ถ่ายภาพพรีเวดดิ้ง", "ถ่ายภาพรับปริญญา", "ถ่ายภาพครอบครัว", "ถ่ายภาพสินค้า"].map((service, i) => (
                  <li key={i}>{service}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-4 text-emerald-200">เวลาทำการ</h4>
              <div className="text-emerald-100 space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Clock size={16} />
                  <span>จันทร์ - ศุกร์: 07:00 - 18:00</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock size={16} />
                  <span>เสาร์ - อาทิตย์: 07:00 - 12:00</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-4 text-emerald-200">ความปลอดภัย</h4>
              <ul className="space-y-2 text-emerald-100">
                {["ระบบรักษาความปลอดภัย", "ปกป้องความเป็นส่วนตัว", "การชำระเงินปลอดภัย"].map((security, i) => (
                  <li key={i}>{security}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-emerald-400/30 pt-8">
            <p className="text-emerald-100 text-lg">&copy; {new Date().getFullYear()} SOF888 Photography System. All rights reserved.</p>
            <p className="text-emerald-200 text-sm mt-2">ออกแบบและพัฒนาด้วยความใส่ใจ ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;