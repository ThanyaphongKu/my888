// src/components/Navbar.jsx
import React, { useState } from "react";
import { Camera, Menu, X } from "lucide-react";

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const items = [
  { name: "หน้าหลัก", id: "home" },
  { name: "แพ็คเกจ", id: "features" },
  { name: "รีวิว", id: "testimonials" },
  { name: "ติดต่อ", id: "contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl px-6 lg:px-8 py-4 flex justify-between items-center shadow-xl border-b border-emerald-100/50 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center animate-float">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
            SOF888
          </div>
        </div>

        {/* เดสก์ท็อป */}
        <nav className="max-md:!hidden md:!flex gap-8 text-gray-700 font-medium">
          {[
            { name: "หน้าหลัก", id: "home" },
            { name: "แพ็คเกจ", id: "features" },
            { name: "รีวิว", id: "testimonials" },
            { name: "ติดต่อ", id: "contact" },
          ].map(({ name, id }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="hover:text-emerald-600 transition-all duration-300 relative group py-2 px-1"
            >
              {name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </button>
          ))}
          <button className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-2 rounded-full hover:from-emerald-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ml-4">
            เข้าสู่ระบบ
          </button>
        </nav>

        {/* ปุ่มเปิดเมนูมือถือ */}
        <button
          className="md:hidden p-3 rounded-xl bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-600 hover:from-emerald-200 hover:to-green-200 transition-all duration-300"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* เมนูมือถือ */}
      <div
        className={`md:hidden fixed left-4 right-4 top-20 bg-white/95 backdrop-blur-xl border border-emerald-100 rounded-2xl shadow-xl z-40 transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-4">
          {items.map(({ name, id }) => (
            <button
              key={id}
              onClick={() => {
                setOpen(false);
                scrollToSection(id);
              }}
              className="text-left py-3 px-3 rounded-lg hover:bg-emerald-50"
            >
              {name}
            </button>
          ))}
          <button className="mt-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-3 rounded-xl hover:from-emerald-600 hover:to-green-600 transition">
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
