import React, { useEffect, useMemo, useState } from "react";
import {
  FiClock as Clock,
  FiCamera as Camera,
  FiMapPin as MapPin,
  FiUsers as Users,
  FiGift as Gift,
  FiCheck as Check,
  FiHeart as Heart,
  FiSearch as Search,
  FiArrowLeft as ArrowLeft,
  FiPhone as Phone,
  FiImage as ImageIcon,
  FiAward as Award,
  FiZap as Zap,
} from "react-icons/fi";
import { MdPalette as Palette } from "react-icons/md";

/* ---------- Utils ---------- */
const T = {
  wedding: "linear-gradient(135deg,#F472B6,#EC4899)",
  graduation: "linear-gradient(135deg,#3B82F6,#2563EB)",
  family: "linear-gradient(135deg,#F59E0B,#D97706)",
  portrait: "linear-gradient(135deg,#8B5CF6,#7C3AED)",
  photography: "linear-gradient(135deg,#10B981,#059669)",
};
const E = { wedding: "💑", graduation: "🎓", family: "👨‍👩‍👧‍👦", portrait: "🙂", photography: "📸" };
const svgPh = (w=600,h=400,theme="photography") => `data:image/svg+xml,${encodeURIComponent(`
  <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#10B981"/>
        <stop offset="100%" style="stop-color:#059669"/>
      </linearGradient>
      <style>.e{font-size:48px}.t{font-family:Arial,sans-serif;font-size:16px;fill:#fff;font-weight:bold}</style>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect width="100%" height="100%" fill="${T[theme]||T.photography}" opacity=".9"/>
    <text x="50%" y="45%" text-anchor="middle" class="e">${E[theme]||E.photography}</text>
    <text x="50%" y="65%" text-anchor="middle" class="t">Sample Photo</text>
  </svg>
`)}`;
const g = (theme) => Array.from({length:3},()=>svgPh(300,200,theme));

/* ---------- Data (สั้นด้วยคีย์ย่อ แล้ว map ขยาย) ---------- */
const D = [
  {id:1,c:"wedding",ti:"แพ็คเกจพรีเวดดิ้งพรีเมียม",su:"Pre-Wedding Premium Package",de:"ถ่ายภาพคู่รักในสถานที่สวยงาม พร้อมทีมงานมืออาชีพ",pr:8900,op:12000,du:"6-8 ชั่วโมง",ph:"100+ ภาพดิจิทัล",lo:"3 สถานที่",pe:"คู่รัก + ทีมงาน",ra:4.9,rv:156,po:true,fe:true,ft:["ถ่ายภาพ 6-8 ชั่วโมง","รูปดิจิทัล 300+ ภาพ","ช่างภาพมืออาชีพ 2 คน","แต่งหน้าเจ้าสาวฟรี","เปลี่ยนชุดได้ 3 ชุด","รีทัชภาพพิเศษ 50 ภาพ"],ad:[{name:"วิดีโอไฮไลท์",price:3500},{name:"ชุดเพิ่มเติม",price:1500},{name:"สถานที่เพิ่มเติม",price:2000}]},
  {id:2,c:"wedding",ti:"แพ็คเกจงานแต่งงาน",su:"Wedding Ceremony Package",de:"บันทึกช่วงเวลาสำคัญในวันแต่งงานของคุณ",pr:15900,op:20000,du:"ทั้งวัน",ph:"200+ ภาพดิจิทัล",lo:"สถานที่จัดงาน",pe:"งานแต่งงาน",ra:4.8,rv:89,po:false,fe:true,ft:["ถ่ายภาพตลอดงาน (8-12 ชั่วโมง)","ช่างภาพ 3 คน","รูปดิจิทัล 200+ ภาพ","วิดีโอไฮไลท์ 3-5 นาที","อัลบั้มแต่งงาน 30 หน้า","รูปขนาด 5x7 จำนวน 100 ภาพ","USB แฟลชไดรฟ์","บริการแต่งหน้าเจ้าสาว"],ad:[{name:"ถ่ายภาพเพิ่มเติม",price:2000},{name:"อัลบั้มเพิ่มเติม",price:2500},{name:"วิดีโอเต็ม",price:8000}]},
  {id:3,c:"graduation",ti:"แพ็คเกจรับปริญญาพิเศษ",su:"Special Graduation Package",de:"เก็บความทรงจำวันสำเร็จการศึกษาให้สวยงาม",pr:3500,op:4500,du:"3-4 ชั่วโมง",ph:"60+ ภาพดิจิทัล",lo:"2 สถานที่",pe:"บัณฑิต + ครอบครัว",ra:4.7,rv:234,po:true,fe:false,ft:["ถ่ายภาพ 3-4 ชั่วโมง","ชุดครุยให้ยืม","รูปดิจิทัล 60+ ภาพ","รูปขนาด 4x6 จำนวน 30 ภาพ","กรอบรูปพิเศษ 1 อัน","ถ่ายทั้งในและนอกอาคาร","ช่างภาพมืออาชีพ","แต่งหน้าเบา ๆ"],ad:[{name:"รูปเพิ่มเติม",price:500},{name:"กรอบรูปเพิ่ม",price:800},{name:"อัลบั้มเล็ก",price:1200}]},
  {id:4,c:"family",ti:"แพ็คเกจครอบครัวใหญ่",su:"Extended Family Package",de:"ถ่ายภาพครอบครัวใหญ่ในบรรยากาศอบอุ่น",pr:4800,op:6000,du:"4-5 ชั่วโมง",ph:"80+ ภาพดิจิทัล",lo:"สตูดิโอ/สวนสาธารณะ",pe:"ครอบครัว (8-12 คน)",ra:4.6,rv:67,po:false,fe:false,ft:["ถ่ายภาพ 4-5 ชั่วโมง","รูปดิจิทัล 80+ ภาพ","พร็อพและของเล่นสำหรับเด็ก","ชุดเปลี่ยนได้ 2 ชุด","รูปขนาด 5x7 จำนวน 40 ภาพ","อัลบั้มครอบครัว 15 หน้า","แต่งหน้าเบา ๆ","ช่างภาพ 2 คน"],ad:[{name:"สมาชิกเพิ่มเติม",price:300},{name:"รูปเพิ่มเติม",price:800},{name:"กรอบรูปใหญ่",price:1500}]},
  {id:5,c:"portrait",ti:"แพ็คเกจบุคคลพรีเมียม",su:"Premium Portrait Package",de:"ถ่ายภาพบุคคลสไตล์โปรเฟสชันแนล",pr:2800,op:3500,du:"2-3 ชั่วโมง",ph:"40+ ภาพดิจิทัล",lo:"สตูดิโอ",pe:"1 คน",ra:4.8,rv:123,po:false,fe:true,ft:["ถ่ายภาพ 2-3 ชั่วโมง","รูปดิจิทัล 40+ ภาพ","แต่งหน้า-ทำผมแบบโปร","ชุดเปลี่ยนได้ 3 ชุด","รูปขนาด 4x6 จำนวน 20 ภาพ","รีทัชรูปพิเศษ","ไฟส่องโปรเฟสชันแนล","พื้นหลังหลากหลาย"],ad:[{name:"รูปเพิ่มเติม",price:600},{name:"ชุดเพิ่มเติม",price:800},{name:"กรอบรูปพิเศษ",price:1200}]},
  {id:6,c:"family",ti:"แพ็คเกจเด็กน้อย",su:"Kids & Baby Package",de:"ถ่ายภาพเด็กและทารกในสไตล์น่ารัก",pr:2200,op:2800,du:"2 ชั่วโมง",ph:"50+ ภาพดิจิทัล",lo:"สตูดิโอ",pe:"เด็ก + ผู้ปกครอง",ra:4.9,rv:178,po:true,fe:false,ft:["ถ่ายภาพ 2 ชั่วโมง","รูปดิจิทัล 50+ ภาพ","ของเล่นและพร็อพเด็ก","ชุดน่ารักให้เลือก","รูปขนาด 4x6 จำนวน 25 ภาพ","อัลบั้มเด็ก 10 หน้า","ช่างภาพชำนาญเด็ก","บรรยากาศสนุกสนาน"],ad:[{name:"รูปเพิ่มเติม",price:400},{name:"พร็อพพิเศษ",price:600},{name:"กรอบรูปการ์ตูน",price:800}]},
  {id:7,c:"wedding",ti:"แพ็คเกจเอนเกจเม้นท์",su:"Engagement Package",de:"ถ่ายภาพหมั้นแบบเรียบง่ายแต่ความหมาย",pr:5900,op:7500,du:"4 ชั่วโมง",ph:"70+ ภาพดิจิทัล",lo:"2 สถานที่",pe:"คู่รัก",ra:4.7,rv:92,po:false,fe:false,ft:["ถ่ายภาพ 4 ชั่วโมง","รูปดิจิทัล 70+ ภาพ","ช่างภาพมืออาชีพ","แต่งหน้าเบา ๆ","เปลี่ยนชุดได้ 2 ชุด","รีทัชภาพพิเศษ 20 ภาพ","รูปขนาด 5x7 จำนวน 30 ภาพ"],ad:[{name:"วิดีโอสั้น",price:2500},{name:"อัลบั้มเล็ก",price:1800},{name:"กรอบรูปคู่",price:1200}]},
  {id:8,c:"graduation",ti:"แพ็คเกจรับปริญญาเบสิก",su:"Basic Graduation Package",de:"แพ็คเกจรับปริญญาราคาประหยัด คุณภาพดี",pr:2200,op:2800,du:"2 ชั่วโมง",ph:"40+ ภาพดิจิทัล",lo:"1 สถานที่",pe:"บัณฑิต + ครอบครัว",ra:4.5,rv:145,po:false,fe:false,ft:["ถ่ายภาพ 2 ชั่วโมง","รูปดิจิทัล 40+ ภาพ","ชุดครุยให้ยืม","รูปขนาด 4x6 จำนวน 20 ภาพ","ช่างภาพมืออาชีพ","แต่งหน้าเบา ๆ"],ad:[{name:"รูปเพิ่มเติม",price:300},{name:"กรอบรูป",price:500},{name:"สถานที่เพิ่ม",price:800}]},
  {id:9,c:"family",ti:"แพ็คเกจครอบครัวเล็ก",su:"Small Family Package",de:"แพ็คเกจสำหรับครอบครัวเล็ก 3-5 คน",pr:3200,op:4000,du:"3 ชั่วโมง",ph:"60+ ภาพดิจิทัล",lo:"สตูดิโอ",pe:"ครอบครัว (3-5 คน)",ra:4.6,rv:98,po:true,fe:false,ft:["ถ่ายภาพ 3 ชั่วโมง","รูปดิจิทัล 60+ ภาพ","พร็อพครอบครัว","ชุดเปลี่ยนได้ 1 ชุด","รูปขนาด 5x7 จำนวน 25 ภาพ","แต่งหน้าเบา ๆ","ช่างภาพมืออาชีพ"],ad:[{name:"รูปเพิ่มเติม",price:500},{name:"อัลบั้ม",price:1200},{name:"กรอบรูป",price:800}]},
  {id:10,c:"portrait",ti:"แพ็คเกจบุคคลเบสิก",su:"Basic Portrait Package",de:"ถ่ายภาพบุคคลเบื้องต้น เหมาะสำหรับมือใหม่",pr:1800,op:2200,du:"1.5 ชั่วโมง",ph:"25+ ภาพดิจิทัล",lo:"สตูดิโอ",pe:"1 คน",ra:4.4,rv:87,po:false,fe:false,ft:["ถ่ายภาพ 1.5 ชั่วโมง","รูปดิจิทัล 25+ ภาพ","แต่งหน้าเบสิก","ชุดเปลี่ยนได้ 2 ชุด","รูปขนาด 4x6 จำนวน 10 ภาพ","ไฟส่องเบสิก"],ad:[{name:"รูปเพิ่มเติม",price:400},{name:"แต่งหน้าโปร",price:800},{name:"กรอบรูป",price:600}]},
  {id:11,c:"graduation",ti:"แพ็คเกจรับปริญญาโปร",su:"Professional Graduation Package",de:"แพ็คเกจรับปริญญาระดับพรีเมียม ครบครัน",pr:4800,op:6200,du:"5-6 ชั่วโมง",ph:"100+ ภาพดิจิทัล",lo:"3 สถานที่",pe:"บัณฑิต + ครอบครัว",ra:4.8,rv:156,po:false,fe:true,ft:["ถ่ายภาพ 5-6 ชั่วโมง","รูปดิจิทัล 100+ ภาพ","ชุดครุยให้ยืม","รูปขนาด 5x7 จำนวน 50 ภาพ","อัลบั้มรับปริญญา 20 หน้า","กรอบรูปพิเศษ 3 อัน","ถ่ายทั้งในและนอกอาคาร","ช่างภาพ 2 คน","แต่งหน้าโปร"],ad:[{name:"วิดีโอไฮไลท์",price:2500},{name:"อัลบั้มเพิ่ม",price:1500},{name:"กรอบรูปใหญ่",price:1200}]},
  {id:12,c:"wedding",ti:"แพ็คเกจแต่งงานมินิ",su:"Mini Wedding Package",de:"แพ็คเกจงานแต่งงานเล็ก สำหรับงานเซเรโมนี",pr:8900,op:11500,du:"6 ชั่วโมง",ph:"120+ ภาพดิจิทัล",lo:"สถานที่จัดงาน",pe:"งานแต่งงานเล็ก",ra:4.7,rv:134,po:false,fe:false,ft:["ถ่ายภาพ 6 ชั่วโมง","ช่างภาพ 2 คน","รูปดิจิทัล 120+ ภาพ","วิดีโอไฮไลท์ 2-3 นาที","อัลบั้มแต่งงาน 20 หน้า","รูปขนาด 4x6 จำนวน 50 ภาพ","USB แฟลชไดรฟ์","บริการแต่งหน้าเจ้าสาวเบสิก"],ad:[{name:"ชั่วโมงเพิ่ม",price:1500},{name:"อัลบั้มเพิ่ม",price:2000},{name:"วิดีโอเต็ม",price:5000}]},
];
const expand = (p) => ({ id:p.id, category:p.c, theme:p.th||p.c, title:p.ti, subtitle:p.su, description:p.de, price:p.pr, originalPrice:p.op, duration:p.du, photos:p.ph, locations:p.lo, people:p.pe, rating:p.ra, reviews:p.rv, popular:p.po, featured:p.fe, features:p.ft, addons:p.ad });
const PACKAGES = D.map(p=>({ ...expand(p), image: svgPh(600,400,p.th||p.c), gallery: g(p.th||p.c) }));

const CATEGORY_LABELS = { wedding:"งานแต่งงาน", graduation:"รับปริญญา", family:"ครอบครัว", portrait:"บุคคล" };

/* ---------- Small components ---------- */
const InfoRow = ({ icon: label, value }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2"><Icon className="w-4 h-4 text-emerald-500"/><span className="text-sm text-gray-600">{label}</span></div>
    <span className="text-sm font-medium">{value}</span>
  </div>
);

const BookingModal = ({ pkg, onClose }) => {
  const [f,setF] = useState({ name:"", phone:"", email:"", date:"", message:"" });
  const fields = [
    {k:"name", l:"ชื่อ-นามสกุล *", t:"text"},
    {k:"phone",l:"เบอร์โทรศัพท์ *", t:"tel"},
    {k:"email",l:"อีเมล *", t:"email"},
    {k:"date", l:"วันที่ต้องการ *", t:"date"},
  ];
  const set = k => e => setF({...f, [k]: e.target.value});
  const submit = e => { e.preventDefault(); alert("ขอบคุณสำหรับการจอง! เราจะติดต่อกลับภายใน 24 ชั่วโมง"); onClose(); };
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6"><h3 className="text-2xl font-bold text-emerald-600">จองแพ็คเกจ</h3><button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">✕</button></div>
          <div className="mb-6 p-4 bg-emerald-50 rounded-2xl"><h4 className="font-semibold text-emerald-700">{pkg.title}</h4><p className="text-emerald-600">ราคา: ฿{pkg.price.toLocaleString()}</p></div>
          <form onSubmit={submit} className="space-y-4">
            {fields.map(x=> (
              <div key={x.k}><label className="block text-sm font-medium text-gray-700 mb-2">{x.l}</label>
                <input type={x.t} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500" value={f[x.k]} onChange={set(x.k)}/>
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ข้อความเพิ่มเติม</label>
              <textarea rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500" value={f.message} onChange={set("message")} placeholder="บอกเล่าความต้องการพิเศษของคุณ..."/>
            </div>
            <div className="flex gap-4 pt-4">
              <button type="button" onClick={onClose} className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50">ยกเลิก</button>
              <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:from-emerald-600 hover:to-green-600 transform hover:scale-105">ยืนยันการจอง</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

/* ---------- Main ---------- */
const PackagePage = () => {
  const [cat,setCat] = useState("all");
  const [item,setItem] = useState(null);
  const [q,setQ] = useState("");
  const [show,setShow] = useState(false);

  const categories = useMemo(()=>{
    const cnt = Object.fromEntries(Object.keys(CATEGORY_LABELS).map(k=>[k,0]));
    PACKAGES.forEach(p=>cnt[p.category]++);
    return [{id:"all",name:"ทั้งหมด",count:PACKAGES.length}, ...Object.entries(CATEGORY_LABELS).map(([id,name])=>({id,name,count:cnt[id]}))];
  },[]);

  const filtered = useMemo(()=>{
    const s = q.toLowerCase();
    return PACKAGES.filter(p => (cat==="all"||p.category===cat) && (p.title.toLowerCase().includes(s)||p.description.toLowerCase().includes(s)) );
  },[cat,q]);

  useEffect(()=>{
    const els = document.querySelectorAll(".fade-in");
    const ob = new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add("opacity-100","translate-y-0")),{threshold:.1});
    els.forEach(el=>{ el.classList.add("opacity-0","translate-y-8","transition-all","duration-1000","ease-out"); ob.observe(el); });
    return ()=>ob.disconnect();
  },[]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md px-6 lg:px-8 py-4 flex justify-between items-center shadow-lg border-b border-emerald-100 z-40">
        <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">SOF888</div>
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          {[{href:"#home",label:"หน้าหลัก"},{href:"#packages",label:"แพ็คเกจ",active:true},{href:"#testimonials",label:"รีวิว"},{href:"#contact",label:"ติดต่อ"}] .map(({href,label,active})=> (
            <a key={href} href={href} className={`transition-colors relative group py-2 ${active?"text-emerald-600 font-semibold":"hover:text-emerald-600"}`}>
              {label}
              {!active && <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"/>}
            </a>
          ))}
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="pt-24 pb-12 px-6"><div className="max-w-7xl mx-auto text-center"><div className="fade-in">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-6">แพ็คเกจถ่ายภาพ</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">เลือกแพ็คเกจที่เหมาะสมกับความต้องการของคุณ พร้อมบริการระดับมืออาชีพ</p>
      </div></div></section>

      {/* Filters & Search */}
      <section className="px-6 mb-12"><div className="max-w-7xl mx-auto"><div className="fade-in bg-white rounded-3xl shadow-lg p-6 border border-emerald-100">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
          <input type="text" placeholder="ค้นหาแพ็คเกจ..." value={q} onChange={e=>setQ(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"/>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map(c=> (
            <button key={c.id} onClick={()=>setCat(c.id)} className={`px-6 py-3 rounded-full font-medium transition-all ${cat===c.id?"bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md":"bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {c.name} ({c.count})
            </button>
          ))}
        </div>
      </div></div></section>

      {/* Packages */}
      <section id="packages" className="px-6 pb-20"><div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p)=> (
            <div key={p.id} className="fade-in group bg-white rounded-3xl shadow-lg border border-emerald-100 overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all">
              <div className="relative overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-64 object-cover group-hover:scale-110 transition-transform"/>
                <div className="absolute top-4 left-4 flex gap-2">
                  {p.popular && <span className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-3 py-1 rounded-full text-sm font-semibold">ยอดนิยม</span>}
                  {p.featured && <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-3 py-1 rounded-full text-sm font-semibold">แนะนำ</span>}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1"><Gift className="w-4 h-4 text-emerald-500"/><span className="text-sm font-semibold">พิเศษ</span></div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-emerald-600 mb-1">{p.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{p.subtitle}</p>
                  <p className="text-gray-600 text-sm">{p.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
                  {[[Clock,p.duration],[Camera,p.photos],[MapPin,p.locations],[Users,p.people]].map(([v],k)=>(
                    <div key={k} className="flex items-center gap-2"><I className="w-4 h-4 text-emerald-500"/>{v}</div>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-emerald-600">฿{p.price.toLocaleString()}</span>
                    {p.originalPrice>p.price && <span className="text-gray-400 line-through ml-2">฿{p.originalPrice.toLocaleString()}</span>}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={()=>setItem(p)} className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200">ดูรายละเอียด</button>
                  <button onClick={()=>setShow(p)} className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-3 rounded-xl hover:from-emerald-600 hover:to-green-600 transform hover:scale-105">จองเลย</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length===0 && (
          <div className="text-center py-20"><div className="text-6xl mb-4">📸</div><h3 className="text-2xl font-bold text-gray-600 mb-2">ไม่พบแพ็คเกจที่ค้นหา</h3><p className="text-gray-500">ลองเปลี่ยนคำค้นหาหรือหมวดหมู่ดู</p></div>
        )}
      </div></section>

      {/* Detail Modal */}
      {item && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-3xl">
              <div><h2 className="text-2xl font-bold text-emerald-600">{item.title}</h2><p className="text-gray-500">{item.subtitle}</p></div>
              <button onClick={()=>setItem(null)} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft className="w-6 h-6"/></button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="md:col-span-2"><img src={item.image} alt={item.title} className="w-full h-80 object-cover rounded-2xl"/></div>
                <div className="space-y-4">{item.gallery.map((img,idx)=>(<img key={idx} src={img} alt={`Gallery ${idx+1}`} className="w-full h-24 object-cover rounded-xl"/>))}</div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">รายละเอียดแพ็คเกจ</h3>
                    <p className="text-gray-600 mb-6">{item.description}</p>
                    <h4 className="font-semibold text-gray-800 mb-3">สิ่งที่คุณจะได้รับ:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {item.features.map((f,idx)=>(<div key={idx} className="flex items-center gap-3"><Check className="w-5 h-5 text-emerald-500"/><span className="text-gray-700">{f}</span></div>))}
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <div className="sticky top-24 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-emerald-600 mb-2">฿{item.price.toLocaleString()}</div>
                      {item.originalPrice>item.price && (<>
                        <div className="text-gray-500 line-through">฿{item.originalPrice.toLocaleString()}</div>
                        <div className="text-sm text-emerald-600 font-medium mt-1">ประหยัด ฿{(item.originalPrice-item.price).toLocaleString()}</div>
                      </>)}
                    </div>
                    <div className="space-y-3 mb-6">
                      <InfoRow icon={Clock} label="ระยะเวลา" value={item.duration}/>
                      <InfoRow icon={ImageIcon} label="จำนวนภาพ" value={item.photos}/>
                      <InfoRow icon={MapPin} label="สถานที่" value={item.locations}/>
                    </div>
                    <button onClick={()=>{setShow(item); setItem(null);}} className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-4 rounded-xl hover:from-emerald-600 hover:to-green-600 transform hover:scale-105 font-semibold shadow-lg">จองแพ็คเกจนี้</button>
                    <div className="mt-6 pt-6 border-t border-emerald-200 text-center text-sm text-gray-600">
                      <p className="mb-2">ต้องการปรึกษาเพิ่มเติม?</p>
                      <a href="tel:089-376-5232" className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700"><Phone className="w-4 h-4"/> ติดต่อ 089-376-5232</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {show && <BookingModal pkg={show} onClose={()=>setShow(false)}/>} 

      {/* Why Choose Us */}
      <section className="py-20 bg-white border-t border-emerald-200"><div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 fade-in"><h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">ทำไมต้องเลือกเรา</h2><p className="text-gray-600 text-lg">เหตุผลที่ลูกค้าไว้วางใจเรามากกว่า 1,000+ ครั้ง</p></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[{i:<Award className='w-8 h-8 text-emerald-500'/>,t:"มืออาชีพ",d:"ช่างภาพมากประสบการณ์ 5+ ปี"},{i:<Palette className='w-8 h-8 text-emerald-500'/>,t:"คุณภาพสูง",d:"อุปกรณ์ระดับโปรเฟสชันแนล"},{i:<Zap className='w-8 h-8 text-emerald-500'/>,t:"ส่งงานรวดเร็ว",d:"ได้รับภาพภายใน 7-14 วัน"},{i:<Heart className='w-8 h-8 text-emerald-500'/>,t:"บริการใส่ใจ",d:"ดูแลลูกค้าตั้งแต่เริ่มต้น"}].map((x,i)=>(
            <div key={i} className="fade-in text-center p-6 rounded-2xl hover:bg-emerald-50 transition-colors"><div className="flex justify-center mb-4">{x.i}</div><h3 className="text-lg font-semibold text-gray-800 mb-2">{x.t}</h3><p className="text-gray-600">{x.d}</p></div>
          ))}
        </div>
      </div></section>

      {/* Footer */}
      <footer className="py-8 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-center"><div className="max-w-4xl mx-auto px-6">
        <div className="text-2xl font-bold mb-4">SOF888</div>
        <p className="text-emerald-100 mb-4">ระบบจัดการแพ็คเกจถ่ายภาพที่ทันสมัยและใช้งานง่าย</p>
        <div className="border-t border-emerald-400 pt-4"><p className="text-emerald-100 text-sm">&copy; {new Date().getFullYear()} ระบบจัดการแพ็คเกจ. All rights reserved.</p></div>
      </div></footer>
    </div>
  );
};

export default PackagePage;