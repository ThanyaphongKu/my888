import React, { useState, useEffect } from "react";
import { 
  Star, 
  Clock, 
  Camera, 
  MapPin, 
  Users, 
  Gift, 
  Check, 
  Heart,
  Filter,
  Search,
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  Image as ImageIcon,
  Award,
  Palette,
  Zap
} from "lucide-react";

const PackagePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);

  const categories = [
    { id: "all", name: "ทั้งหมด", count: 12 },
    { id: "wedding", name: "งานแต่งงาน", count: 4 },
    { id: "graduation", name: "รับปริญญา", count: 3 },
    { id: "family", name: "ครอบครัว", count: 3 },
    { id: "portrait", name: "บุคคล", count: 2 }
  ];

  // สร้าง placeholder images ที่สวยงาม
  const createImagePlaceholder = (width = 600, height = 400, theme = "photography") => {
    const themes = {
      photography: {
        bg: "linear-gradient(135deg, #10B981, #059669)",
        text: "📸"
      },
      wedding: {
        bg: "linear-gradient(135deg, #F472B6, #EC4899)",
        text: "💑"
      },
      graduation: {
        bg: "linear-gradient(135deg, #3B82F6, #2563EB)",
        text: "🎓"
      },
      family: {
        bg: "linear-gradient(135deg, #F59E0B, #D97706)",
        text: "👨‍👩‍👧‍👦"
      },
      portrait: {
        bg: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
        text: "🙂"
      }
    };
    
    const themeData = themes[theme] || themes.photography;
    
    return `data:image/svg+xml,${encodeURIComponent(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>
            .emoji { font-size: 48px; }
            .title { font-family: Arial, sans-serif; font-size: 16px; fill: white; font-weight: bold; }
          </style>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#10B981;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="${themeData.bg}" opacity="0.9"/>
        <text x="50%" y="45%" text-anchor="middle" class="emoji">${themeData.text}</text>
        <text x="50%" y="65%" text-anchor="middle" class="title">Sample Photo</text>
      </svg>
    `)}`;
  };

  const packages = [
    {
      id: 1,
      category: "wedding",
      title: "แพ็คเกจพรีเวดดิ้งพรีเมียม",
      subtitle: "Pre-Wedding Premium Package",
      description: "ถ่ายภาพคู่รักในสถานที่สวยงาม พร้อมทีมงานมืออาชีพ",
      price: 8900,
      originalPrice: 12000,
      duration: "6-8 ชั่วโมง",
      photos: "100+ ภาพดิจิทัล",
      locations: "3 สถานที่",
      people: "คู่รัก + ทีมงาน",
      rating: 4.9,
      reviews: 156,
      popular: true,
      featured: true,
      image: createImagePlaceholder(600, 400, "wedding"),
      gallery: [
        createImagePlaceholder(300, 200, "wedding"),
        createImagePlaceholder(300, 200, "wedding"),
        createImagePlaceholder(300, 200, "wedding")
      ],
      features: [
        "ถ่ายภาพ 6-8 ชั่วโมง",
        "รูปดิจิทัล 300+ ภาพ",
        "ช่างภาพมืออาชีพ 2 คน",
        "แต่งหน้าเจ้าสาวฟรี",
        "เปลี่ยนชุดได้ 3 ชุด",
        "รีทัชภาพพิเศษ 50 ภาพ"
      ],
      addons: [
        { name: "วิดีโอไฮไลท์", price: 3500 },
        { name: "ชุดเพิ่มเติม", price: 1500 },
        { name: "สถานที่เพิ่มเติม", price: 2000 }
      ]
    },
    {
      id: 2,
      category: "wedding",
      title: "แพ็คเกจงานแต่งงาน",
      subtitle: "Wedding Ceremony Package",
      description: "บันทึกช่วงเวลาสำคัญในวันแต่งงานของคุณ",
      price: 15900,
      originalPrice: 20000,
      duration: "ทั้งวัน",
      photos: "200+ ภาพดิจิทัล",
      locations: "สถานที่จัดงาน",
      people: "งานแต่งงาน",
      rating: 4.8,
      reviews: 89,
      popular: false,
      featured: true,
      image: createImagePlaceholder(600, 400, "wedding"),
      gallery: [
        createImagePlaceholder(300, 200, "wedding"),
        createImagePlaceholder(300, 200, "wedding"),
        createImagePlaceholder(300, 200, "wedding")
      ],
      features: [
        "ถ่ายภาพตลอดงาน (8-12 ชั่วโมง)",
        "ช่างภาพ 3 คน",
        "รูปดิจิทัล 200+ ภาพ",
        "วิดีโอไฮไลท์ 3-5 นาที",
        "อัลบั้มแต่งงาน 30 หน้า",
        "รูปขนาด 5x7 จำนวน 100 ภาพ",
        "USB แฟลชไดรฟ์",
        "บริการแต่งหน้าเจ้าสาว"
      ],
      addons: [
        { name: "ถ่ายภาพเพิ่มเติม", price: 2000 },
        { name: "อัลบั้มเพิ่มเติม", price: 2500 },
        { name: "วิดีโอเต็ม", price: 8000 }
      ]
    },
    {
      id: 3,
      category: "graduation",
      title: "แพ็คเกจรับปริญญาพิเศษ",
      subtitle: "Special Graduation Package",
      description: "เก็บความทรงจำวันสำเร็จการศึกษาให้สวยงาม",
      price: 3500,
      originalPrice: 4500,
      duration: "3-4 ชั่วโมง",
      photos: "60+ ภาพดิจิทัล",
      locations: "2 สถานที่",
      people: "บัณฑิต + ครอบครัว",
      rating: 4.7,
      reviews: 234,
      popular: true,
      featured: false,
      image: createImagePlaceholder(600, 400, "graduation"),
      gallery: [
        createImagePlaceholder(300, 200, "graduation"),
        createImagePlaceholder(300, 200, "graduation"),
        createImagePlaceholder(300, 200, "graduation")
      ],
      features: [
        "ถ่ายภาพ 3-4 ชั่วโมง",
        "ชุดครุยให้ยืม",
        "รูปดิจิทัล 60+ ภาพ",
        "รูปขนาด 4x6 จำนวน 30 ภาพ",
        "กรอบรูปพิเศษ 1 อัน",
        "ถ่ายทั้งในและนอกอาคาร",
        "ช่างภาพมืออาชีพ",
        "แต่งหน้าเบา ๆ"
      ],
      addons: [
        { name: "รูปเพิ่มเติม", price: 500 },
        { name: "กรอบรูปเพิ่ม", price: 800 },
        { name: "อัลบั้มเล็ก", price: 1200 }
      ]
    },
    {
      id: 4,
      category: "family",
      title: "แพ็คเกจครอบครัวใหญ่",
      subtitle: "Extended Family Package",
      description: "ถ่ายภาพครอบครัวใหญ่ในบรรยากาศอบอุ่น",
      price: 4800,
      originalPrice: 6000,
      duration: "4-5 ชั่วโมง",
      photos: "80+ ภาพดิจิทัล",
      locations: "สตูดิโอ/สวนสาธารณะ",
      people: "ครอบครัว (8-12 คน)",
      rating: 4.6,
      reviews: 67,
      popular: false,
      featured: false,
      image: createImagePlaceholder(600, 400, "family"),
      gallery: [
        createImagePlaceholder(300, 200, "family"),
        createImagePlaceholder(300, 200, "family"),
        createImagePlaceholder(300, 200, "family")
      ],
      features: [
        "ถ่ายภาพ 4-5 ชั่วโมง",
        "รูปดิจิทัล 80+ ภาพ",
        "พร็อพและของเล่นสำหรับเด็ก",
        "ชุดเปลี่ยนได้ 2 ชุด",
        "รูปขนาด 5x7 จำนวน 40 ภาพ",
        "อัลบั้มครอบครัว 15 หน้า",
        "แต่งหน้าเบา ๆ",
        "ช่างภาพ 2 คน"
      ],
      addons: [
        { name: "สมาชิกเพิ่มเติม", price: 300 },
        { name: "รูปเพิ่มเติม", price: 800 },
        { name: "กรอบรูปใหญ่", price: 1500 }
      ]
    },
    {
      id: 5,
      category: "portrait",
      title: "แพ็คเกจบุคคลพรีเมียม",
      subtitle: "Premium Portrait Package",
      description: "ถ่ายภาพบุคคลสไตล์โปรเฟสชันแนล",
      price: 2800,
      originalPrice: 3500,
      duration: "2-3 ชั่วโมง",
      photos: "40+ ภาพดิจิทัล",
      locations: "สตูดิโอ",
      people: "1 คน",
      rating: 4.8,
      reviews: 123,
      popular: false,
      featured: true,
      image: createImagePlaceholder(600, 400, "portrait"),
      gallery: [
        createImagePlaceholder(300, 200, "portrait"),
        createImagePlaceholder(300, 200, "portrait"),
        createImagePlaceholder(300, 200, "portrait")
      ],
      features: [
        "ถ่ายภาพ 2-3 ชั่วโมง",
        "รูปดิจิทัล 40+ ภาพ",
        "แต่งหน้า-ทำผมแบบโปร",
        "ชุดเปลี่ยนได้ 3 ชุด",
        "รูปขนาด 4x6 จำนวน 20 ภาพ",
        "รีทัชรูปพิเศษ",
        "ไฟส่องโปรเฟสชันแนล",
        "พื้นหลังหลากหลาย"
      ],
      addons: [
        { name: "รูปเพิ่มเติม", price: 600 },
        { name: "ชุดเพิ่มเติม", price: 800 },
        { name: "กรอบรูปพิเศษ", price: 1200 }
      ]
    },
    {
      id: 6,
      category: "family",
      title: "แพ็คเกจเด็กน้อย",
      subtitle: "Kids & Baby Package",
      description: "ถ่ายภาพเด็กและทารกในสไตล์น่ารัก",
      price: 2200,
      originalPrice: 2800,
      duration: "2 ชั่วโมง",
      photos: "50+ ภาพดิจิทัล",
      locations: "สตูดิโอ",
      people: "เด็ก + ผู้ปกครอง",
      rating: 4.9,
      reviews: 178,
      popular: true,
      featured: false,
      image: createImagePlaceholder(600, 400, "family"),
      gallery: [
        createImagePlaceholder(300, 200, "family"),
        createImagePlaceholder(300, 200, "family"),
        createImagePlaceholder(300, 200, "family")
      ],
      features: [
        "ถ่ายภาพ 2 ชั่วโมง",
        "รูปดิจิทัล 50+ ภาพ",
        "ของเล่นและพร็อพเด็ก",
        "ชุดน่ารักให้เลือก",
        "รูปขนาด 4x6 จำนวน 25 ภาพ",
        "อัลบั้มเด็ก 10 หน้า",
        "ช่างภาพชำนาญเด็ก",
        "บรรยากาศสนุกสนาน"
      ],
      addons: [
        { name: "รูปเพิ่มเติม", price: 400 },
        { name: "พร็อพพิเศษ", price: 600 },
        { name: "กรอบรูปการ์ตูน", price: 800 }
      ]
    },
    {
      id: 7,
      category: "wedding",
      title: "แพ็คเกจเอนเกจเม้นท์",
      subtitle: "Engagement Package",
      description: "ถ่ายภาพหมั้นแบบเรียบง่ายแต่ความหมาย",
      price: 5900,
      originalPrice: 7500,
      duration: "4 ชั่วโมง",
      photos: "70+ ภาพดิจิทัล",
      locations: "2 สถานที่",
      people: "คู่รัก",
      rating: 4.7,
      reviews: 92,
      popular: false,
      featured: false,
      image: createImagePlaceholder(600, 400, "wedding"),
      gallery: [
        createImagePlaceholder(300, 200, "wedding"),
        createImagePlaceholder(300, 200, "wedding"),
        createImagePlaceholder(300, 200, "wedding")
      ],
      features: [
        "ถ่ายภาพ 4 ชั่วโมง",
        "รูปดิจิทัล 70+ ภาพ",
        "ช่างภาพมืออาชีพ",
        "แต่งหน้าเบา ๆ",
        "เปลี่ยนชุดได้ 2 ชุด",
        "รีทัชภาพพิเศษ 20 ภาพ",
        "รูปขนาด 5x7 จำนวน 30 ภาพ"
      ],
      addons: [
        { name: "วิดีโอสั้น", price: 2500 },
        { name: "อัลบั้มเล็ก", price: 1800 },
        { name: "กรอบรูปคู่", price: 1200 }
      ]
    },
    {
      id: 8,
      category: "graduation",
      title: "แพ็คเกจรับปริญญาเบสิก",
      subtitle: "Basic Graduation Package",
      description: "แพ็คเกจรับปริญญาราคาประหยัด คุณภาพดี",
      price: 2200,
      originalPrice: 2800,
      duration: "2 ชั่วโมง",
      photos: "40+ ภาพดิจิทัล",
      locations: "1 สถานที่",
      people: "บัณฑิต + ครอบครัว",
      rating: 4.5,
      reviews: 145,
      popular: false,
      featured: false,
      image: createImagePlaceholder(600, 400, "graduation"),
      gallery: [
        createImagePlaceholder(300, 200, "graduation"),
        createImagePlaceholder(300, 200, "graduation"),
        createImagePlaceholder(300, 200, "graduation")
      ],
      features: [
        "ถ่ายภาพ 2 ชั่วโมง",
        "รูปดิจิทัล 40+ ภาพ",
        "ชุดครุยให้ยืม",
        "รูปขนาด 4x6 จำนวน 20 ภาพ",
        "ช่างภาพมืออาชีพ",
        "แต่งหน้าเบา ๆ"
      ],
      addons: [
        { name: "รูปเพิ่มเติม", price: 300 },
        { name: "กรอบรูป", price: 500 },
        { name: "สถานที่เพิ่ม", price: 800 }
      ]
    },
    {
      id: 9,
      category: "family",
      title: "แพ็คเกจครอบครัวเล็ก",
      subtitle: "Small Family Package",
      description: "แพ็คเกจสำหรับครอบครัวเล็ก 3-5 คน",
      price: 3200,
      originalPrice: 4000,
      duration: "3 ชั่วโมง",
      photos: "60+ ภาพดิจิทัล",
      locations: "สตูดิโอ",
      people: "ครอบครัว (3-5 คน)",
      rating: 4.6,
      reviews: 98,
      popular: true,
      featured: false,
      image: createImagePlaceholder(600, 400, "family"),
      gallery: [
        createImagePlaceholder(300, 200, "family"),
        createImagePlaceholder(300, 200, "family"),
        createImagePlaceholder(300, 200, "family")
      ],
      features: [
        "ถ่ายภาพ 3 ชั่วโมง",
        "รูปดิจิทัล 60+ ภาพ",
        "พร็อพครอบครัว",
        "ชุดเปลี่ยนได้ 1 ชุด",
        "รูปขนาด 5x7 จำนวน 25 ภาพ",
        "แต่งหน้าเบา ๆ",
        "ช่างภาพมืออาชีพ"
      ],
      addons: [
        { name: "รูปเพิ่มเติม", price: 500 },
        { name: "อัลบั้ม", price: 1200 },
        { name: "กรอบรูป", price: 800 }
      ]
    },
    {
      id: 10,
      category: "portrait",
      title: "แพ็คเกจบุคคลเบสิก",
      subtitle: "Basic Portrait Package",
      description: "ถ่ายภาพบุคคลเบื้องต้น เหมาะสำหรับมือใหม่",
      price: 1800,
      originalPrice: 2200,
      duration: "1.5 ชั่วโมง",
      photos: "25+ ภาพดิจิทัล",
      locations: "สตูดิโอ",
      people: "1 คน",
      rating: 4.4,
      reviews: 87,
      popular: false,
      featured: false,
      image: createImagePlaceholder(600, 400, "portrait"),
      gallery: [
        createImagePlaceholder(300, 200, "portrait"),
        createImagePlaceholder(300, 200, "portrait"),
        createImagePlaceholder(300, 200, "portrait")
      ],
      features: [
        "ถ่ายภาพ 1.5 ชั่วโมง",
        "รูปดิจิทัล 25+ ภาพ",
        "แต่งหน้าเบสิก",
        "ชุดเปลี่ยนได้ 2 ชุด",
        "รูปขนาด 4x6 จำนวน 10 ภาพ",
        "ไฟส่องเบสิก"
      ],
      addons: [
        { name: "รูปเพิ่มเติม", price: 400 },
        { name: "แต่งหน้าโปร", price: 800 },
        { name: "กรอบรูป", price: 600 }
      ]
    },
    {
      id: 11,
      category: "graduation",
      title: "แพ็คเกจรับปริญญาโปร",
      subtitle: "Professional Graduation Package",
      description: "แพ็คเกจรับปริญญาระดับพรีเมียม ครบครัน",
      price: 4800,
      originalPrice: 6200,
      duration: "5-6 ชั่วโมง",
      photos: "100+ ภาพดิจิทัล",
      locations: "3 สถานที่",
      people: "บัณฑิต + ครอบครัว",
      rating: 4.8,
      reviews: 156,
      popular: false,
      featured: true,
      image: createImagePlaceholder(600, 400, "graduation"),
      gallery: [
        createImagePlaceholder(300, 200, "graduation"),
        createImagePlaceholder(300, 200, "graduation"),
        createImagePlaceholder(300, 200, "graduation")
      ],
      features: [
        "ถ่ายภาพ 5-6 ชั่วโมง",
        "รูปดิจิทัล 100+ ภาพ",
        "ชุดครุยให้ยืม",
        "รูปขนาด 5x7 จำนวน 50 ภาพ",
        "อัลบั้มรับปริญญา 20 หน้า",
        "กรอบรูปพิเศษ 3 อัน",
        "ถ่ายทั้งในและนอกอาคาร",
        "ช่างภาพ 2 คน",
        "แต่งหน้าโปร"
      ],
      addons: [
        { name: "วิดีโอไฮไลท์", price: 2500 },
        { name: "อัลบั้มเพิ่ม", price: 1500 },
        { name: "กรอบรูปใหญ่", price: 1200 }
      ]
    },
    {
      id: 12,
      category: "wedding",
      title: "แพ็คเกจแต่งงานมินิ",
      subtitle: "Mini Wedding Package",
      description: "แพ็คเกจงานแต่งงานเล็ก สำหรับงานเซเรโมนี",
      price: 8900,
      originalPrice: 11500,
      duration: "6 ชั่วโมง",
      photos: "120+ ภาพดิจิทัล",
      locations: "สถานที่จัดงาน",
      people: "งานแต่งงานเล็ก",
      rating: 4.7,
      reviews: 134,
      popular: false,
      featured: false,
      image: createImagePlaceholder(600, 400, "wedding"),
      gallery: [
        createImagePlaceholder(300, 200, "wedding"),
        createImagePlaceholder(300, 200, "wedding"),
        createImagePlaceholder(300, 200, "wedding")
      ],
      features: [
        "ถ่ายภาพ 6 ชั่วโมง",
        "ช่างภาพ 2 คน",
        "รูปดิจิทัล 120+ ภาพ",
        "วิดีโอไฮไลท์ 2-3 นาที",
        "อัลบั้มแต่งงาน 20 หน้า",
        "รูปขนาด 4x6 จำนวน 50 ภาพ",
        "USB แฟลชไดรฟ์",
        "บริการแต่งหน้าเจ้าสาวเบสิก"
      ],
      addons: [
        { name: "ชั่วโมงเพิ่ม", price: 1500 },
        { name: "อัลบั้มเพิ่ม", price: 2000 },
        { name: "วิดีโอเต็ม", price: 5000 }
      ]
    }
  ];

  const filteredPackages = packages.filter(pkg => {
    const matchesCategory = selectedCategory === "all" || pkg.category === selectedCategory;
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  const BookingModal = ({ package: pkg, onClose }) => {
    const [formData, setFormData] = useState({
      name: "",
      phone: "",
      email: "",
      date: "",
      message: ""
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      alert("ขอบคุณสำหรับการจอง! เราจะติดต่อกลับภายใน 24 ชั่วโมง");
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-screen overflow-y-auto">
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-emerald-600">จองแพ็คเกจ</h3>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-6 p-4 bg-emerald-50 rounded-2xl">
              <h4 className="font-semibold text-emerald-700">{pkg.title}</h4>
              <p className="text-emerald-600">ราคา: ฿{pkg.price.toLocaleString()}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อ-นามสกุล *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">เบอร์โทรศัพท์ *</label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">อีเมล *</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">วันที่ต้องการ *</label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ข้อความเพิ่มเติม</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="บอกเล่าความต้องการพิเศษของคุณ..."
                />
              </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all transform hover:scale-105"
                >
                  ยืนยันการจอง
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Enhanced Navbar */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md px-6 lg:px-8 py-4 flex justify-between items-center shadow-lg border-b border-emerald-100 z-40">
        <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
          SOF888
        </div>
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <a href="#home" className="hover:text-emerald-600 transition-colors duration-300 relative group py-2">
            หน้าหลัก
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#packages" className="text-emerald-600 font-semibold py-2">
            แพ็คเกจ
          </a>
          <a href="#testimonials" className="hover:text-emerald-600 transition-colors duration-300 relative group py-2">
            รีวิว
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#contact" className="hover:text-emerald-600 transition-colors duration-300 relative group py-2">
            ติดต่อ
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="fade-in">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-6">
              แพ็คเกจถ่ายภาพ
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              เลือกแพ็คเกจที่เหมาะสมกับความต้องการของคุณ พร้อมบริการระดับมืออาชีพ
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="fade-in bg-white rounded-3xl shadow-lg p-6 border border-emerald-100">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="ค้นหาแพ็คเกจ..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg, index) => (
              <div
                key={pkg.id}
                className="fade-in group bg-white rounded-3xl shadow-lg border border-emerald-100 overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Package Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {pkg.popular && (
                      <span className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ยอดนิยม
                      </span>
                    )}
                    {pkg.featured && (
                      <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        แนะนำ
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Gift className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-semibold">พิเศษ</span>
                  </div>
                </div>

                {/* Package Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-emerald-600 mb-1">{pkg.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{pkg.subtitle}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{pkg.description}</p>
                  </div>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4 text-emerald-500" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Camera className="w-4 h-4 text-emerald-500" />
                      {pkg.photos}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      {pkg.locations}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4 text-emerald-500" />
                      {pkg.people}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-emerald-600">฿{pkg.price.toLocaleString()}</span>
                      {pkg.originalPrice > pkg.price && (
                        <span className="text-gray-400 line-through ml-2">฿{pkg.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedPackage(pkg)}
                      className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                    >
                      ดูรายละเอียด
                    </button>
                    <button
                      onClick={() => setShowBookingModal(pkg)}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-3 rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all transform hover:scale-105 font-medium"
                    >
                      จองเลย
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredPackages.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">ไม่พบแพ็คเกจที่ค้นหา</h3>
              <p className="text-gray-500">ลองเปลี่ยนคำค้นหาหรือหมวดหมู่ดู</p>
            </div>
          )}
        </div>
      </section>

      {/* Package Detail Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="relative">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-3xl">
                <div>
                  <h2 className="text-2xl font-bold text-emerald-600">{selectedPackage.title}</h2>
                  <p className="text-gray-500">{selectedPackage.subtitle}</p>
                </div>
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Image Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="md:col-span-2">
                    <img
                      src={selectedPackage.image}
                      alt={selectedPackage.title}
                      className="w-full h-80 object-cover rounded-2xl"
                    />
                  </div>
                  <div className="space-y-4">
                    {selectedPackage.gallery.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-24 object-cover rounded-xl"
                      />
                    ))}
                  </div>
                </div>

                {/* Package Info */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    {/* Description */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">รายละเอียดแพ็คเกจ</h3>
                      <p className="text-gray-600 leading-relaxed mb-6">{selectedPackage.description}</p>
                      
                      {/* Features */}
                      <h4 className="font-semibold text-gray-800 mb-3">สิ่งที่คุณจะได้รับ:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedPackage.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Add-ons - ลบส่วนนี้ออก */}
                  </div>

                  {/* Booking Card */}
                  <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
                      {/* Price */}
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-emerald-600 mb-2">
                          ฿{selectedPackage.price.toLocaleString()}
                        </div>
                        {selectedPackage.originalPrice > selectedPackage.price && (
                          <>
                            <div className="text-gray-500 line-through">
                              ฿{selectedPackage.originalPrice.toLocaleString()}
                            </div>
                            <div className="text-sm text-emerald-600 font-medium mt-1">
                              ประหยัด ฿{(selectedPackage.originalPrice - selectedPackage.price).toLocaleString()}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Quick Stats */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-gray-600">ระยะเวลา</span>
                          </div>
                          <span className="text-sm font-medium">{selectedPackage.duration}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-gray-600">จำนวนภาพ</span>
                          </div>
                          <span className="text-sm font-medium">{selectedPackage.photos}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-gray-600">สถานที่</span>
                          </div>
                          <span className="text-sm font-medium">{selectedPackage.locations}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <button
                          onClick={() => {
                            setShowBookingModal(selectedPackage);
                            setSelectedPackage(null);
                          }}
                          className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-4 rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all transform hover:scale-105 font-semibold shadow-lg"
                        >
                          จองแพ็คเกจนี้
                        </button>
                      </div>

                      {/* Contact Info */}
                      <div className="mt-6 pt-6 border-t border-emerald-200">
                        <div className="text-center text-sm text-gray-600">
                          <p className="mb-2">ต้องการปรึกษาเพิ่มเติม?</p>
                          <div className="flex items-center justify-center gap-4">
                            <a href="tel:091-234-5678" className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700">
                              <Phone className="w-4 h-4" />
                              ติดต่อ 089-376-5232
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal 
          package={showBookingModal} 
          onClose={() => setShowBookingModal(false)} 
        />
      )}

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white border-t border-emerald-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 fade-in">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">
              ทำไมต้องเลือกเรา
            </h2>
            <p className="text-gray-600 text-lg">เหตุผลที่ลูกค้าไว้วางใจเรามากกว่า 1,000+ ครั้ง</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="w-8 h-8 text-emerald-500" />,
                title: "มืออาชีพ",
                desc: "ช่างภาพมากประสบการณ์ 5+ ปี"
              },
              {
                icon: <Palette className="w-8 h-8 text-emerald-500" />,
                title: "คุณภาพสูง",
                desc: "อุปกรณ์ระดับโปรเฟสชันแนล"
              },
              {
                icon: <Zap className="w-8 h-8 text-emerald-500" />,
                title: "ส่งงานรวดเร็ว",
                desc: "ได้รับภาพภายใน 7-14 วัน"
              },
              {
                icon: <Heart className="w-8 h-8 text-emerald-500" />,
                title: "บริการใส่ใจ",
                desc: "ดูแลลูกค้าตั้งแต่เริ่มต้น"
              }
            ].map((item, idx) => (
              <div key={idx} className="fade-in text-center p-6 rounded-2xl hover:bg-emerald-50 transition-colors">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
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
}

export default PackagePage;