import React, { useEffect, useMemo, useState } from "react";
import { Plus, Save, Upload, Download, Edit3, Trash2, Copy, Search, Image as ImageIcon, ArrowUp, ArrowDown, X, Star, Heart, Check, Eye } from "lucide-react";

/* --------------------------------- Utils --------------------------------- */
const storageKey = "pb_packages_v1"; // key สำหรับใช้งานร่วมกับหน้าแสดงผล
const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const categories = [
  { id: "wedding", name: "งานแต่งงาน" },
  { id: "graduation", name: "รับปริญญา" },
  { id: "family", name: "ครอบครัว" },
  { id: "portrait", name: "บุคคล" },
];

// Placeholder ภาพแบบ dataURL
const THEMES = {
  photography: { bg1: "#10B981", bg2: "#059669", emoji: "📸" },
  wedding: { bg1: "#F472B6", bg2: "#EC4899", emoji: "💑" },
  graduation: { bg1: "#3B82F6", bg2: "#2563EB", emoji: "🎓" },
  family: { bg1: "#F59E0B", bg2: "#D97706", emoji: "👨‍👩‍👧‍👦" },
  portrait: { bg1: "#8B5CF6", bg2: "#7C3AED", emoji: "🙂" },
};
const createImagePlaceholder = (w = 600, h = 400, theme = "photography") => {
  const { bg1, bg2, emoji } = THEMES[theme] || THEMES.photography;
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='${bg1}'/><stop offset='100%' stop-color='${bg2}'/></linearGradient></defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <text x='50%' y='45%' text-anchor='middle' font-size='48'>${emoji}</text>
      <text x='50%' y='65%' text-anchor='middle' font-family='Arial' font-size='16' font-weight='bold' fill='white'>Sample Photo</text>
    </svg>`
  )}`;
};
const fileToDataUrl = (file) => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(file); });

/* ------------------------------ Types (JSDoc) ----------------------------- */
/** @typedef {{name: string, price: number}} Addon */
/** @typedef {{ id:string, category:string, title:string, subtitle:string, description:string, price:number, originalPrice:number, duration:string, photos:string, locations:string, people:string, rating:number, reviews:number, popular:boolean, featured:boolean, image:string, gallery:string[], features:string[], addons:Addon[] }} PackageItem */

/* ------------------------------- Defaults -------------------------------- */
const samplePackage = /** @type {PackageItem} */ ({
  id: uid(), category: "wedding", title: "แพ็คเกจตัวอย่าง", subtitle: "Sample Package",
  description: "ตัวอย่างสำหรับเริ่มต้น สามารถแก้ไขได้ทั้งหมด", price: 3000, originalPrice: 4500,
  duration: "2 ชั่วโมง", photos: "40+ ภาพดิจิทัล", locations: "สตูดิโอ", people: "1-2 คน",
  rating: 4.8, reviews: 12, popular: true, featured: false,
  image: createImagePlaceholder(600, 400, "photography"),
  gallery: [createImagePlaceholder(300, 200, "photography"), createImagePlaceholder(300, 200, "photography")],
  features: ["ถ่ายภาพ 2 ชั่วโมง", "รูปดิจิทัล 40+ ภาพ", "แต่งหน้าเบา ๆ"],
  addons: [{ name: "รูปเพิ่มเติม", price: 400 }, { name: "กรอบรูป", price: 800 }],
});

/* ------------------------------- Small UI -------------------------------- */
const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-emerald-100 rounded-2xl ${className}`}>{children}</div>
);
const Btn = ({ className = "", children, ...rest }) => (
  <button className={`px-3 py-2 rounded-xl ${className}`} {...rest}>{children}</button>
);
const IconBtn = ({ title, onClick, children, className = "" }) => (
  <button title={title} onClick={onClick} className={`p-2 rounded-lg hover:bg-gray-100 ${className}`}>{children}</button>
);

/* ------------------------------ Main Component --------------------------- */
export default function AdminPackagesPage() {
  const [packages, setPackages] = useState(/** @type {PackageItem[]} */([]));
  const [query, setQuery] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [editing, setEditing] = useState(/** @type {PackageItem|null} */(null)); // ใช้เป็นตัวบอก modal ด้วย
  const [error, setError] = useState("");

  /* ------------------------------ Load/Save ------------------------------ */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      setPackages(raw ? JSON.parse(raw) : [samplePackage]);
    } catch { setPackages([samplePackage]); }
  }, []);
  useEffect(() => { try { localStorage.setItem(storageKey, JSON.stringify(packages)); } catch {} }, [packages]);

  /* ------------------------------ Derived data --------------------------- */
  const filtered = useMemo(() => packages
    .filter(p => (catFilter === "all" ? true : p.category === catFilter))
    .filter(p => `${p.title} ${p.subtitle} ${p.description}`.toLowerCase().includes(query.trim().toLowerCase()))
  , [packages, query, catFilter]);

  const countsByCat = useMemo(() => packages.reduce((m, p) => (m[p.category] = (m[p.category] || 0) + 1, m), Object.fromEntries(categories.map(c => [c.id, 0]))), [packages]);

  /* ------------------------------ CRUD helpers --------------------------- */
  const upsert = (item) => setPackages(prev => prev.some(p => p.id === item.id) ? prev.map(p => p.id === item.id ? item : p) : [item, ...prev]);
  const addNew = () => setEditing({ ...samplePackage, id: uid(), title: "แพ็คเกจใหม่", popular: false, featured: false });
  const duplicateItem = (item) => setPackages(prev => [{ ...item, id: uid(), title: item.title + " (คัดลอก)", popular: false, featured: false }, ...prev]);
  const deleteItem = (id) => setPackages(prev => prev.filter(p => p.id !== id));
  const moveItem = (id, dir) => setPackages(prev => { const i = prev.findIndex(p => p.id === id); if (i < 0) return prev; const j = dir === "up" ? i - 1 : i + 1; if (j < 0 || j >= prev.length) return prev; const next = [...prev]; [next[i], next[j]] = [next[j], next[i]]; return next; });
  const exportJson = () => { const blob = new Blob([JSON.stringify(packages, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `packages_${new Date().toISOString().slice(0,10)}.json`; a.click(); URL.revokeObjectURL(url); };
  const importJson = async (file) => { try { const data = JSON.parse(await file.text()); if (!Array.isArray(data)) throw new Error("ไฟล์ไม่ถูกต้อง"); setPackages(data); } catch (e) { setError("นำเข้าไม่สำเร็จ: " + e.message); setTimeout(() => setError(""), 3000); } };
  const resetAll = () => confirm("รีเซ็ตเป็นค่าเริ่มต้นและลบข้อมูลทั้งหมด?") && setPackages([samplePackage]);

  /* -------------------------------- Render -------------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Admin · รายการแพ็คเกจ</div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{packages.length} รายการ</span>
          </div>
          <div className="flex items-center gap-2">
            <Btn onClick={addNew} className="bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-2"><Plus size={16}/>เพิ่มแพ็คเกจ</Btn>
            <Btn onClick={exportJson} className="bg-gray-900 text-white hover:bg-black flex items-center gap-2"><Download size={16}/>ส่งออก JSON</Btn>
            <label className="px-3 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-2 cursor-pointer">
              <Upload size={16}/> นำเข้า JSON
              <input type="file" accept="application/json" className="hidden" onChange={(e)=>e.target.files?.[0] && importJson(e.target.files[0])}/>
            </label>
            <Btn onClick={resetAll} className="bg-red-50 text-red-600 hover:bg-red-100">รีเซ็ต</Btn>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* Filters */}
        <Card className="p-4 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input className="pl-9 pr-3 py-2 rounded-xl border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 w-64" placeholder="ค้นหา…" value={query} onChange={(e)=>setQuery(e.target.value)} />
              </div>
              <select className="px-3 py-2 rounded-xl border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" value={catFilter} onChange={(e)=>setCatFilter(e.target.value)}>
                <option value="all">ทุกหมวดหมู่</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name} ({countsByCat[c.id]||0})</option>)}
              </select>
            </div>
            <div className="text-sm text-gray-500">บันทึกอัตโนมัติลง Local Storage → <span className="font-mono">{storageKey}</span></div>
          </div>
        </Card>

        {/* Grid */}
        {filtered.length === 0 ? (
          <Card className="py-24 rounded-3xl text-center">
            <div className="text-6xl mb-3">📸</div>
            <div className="text-xl font-semibold text-gray-700">ยังไม่มีรายการ</div>
            <div className="text-gray-500">คลิก “เพิ่มแพ็คเกจ” เพื่อเริ่มต้น</div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(p => (
              <Card key={p.id} className="group overflow-hidden shadow hover:shadow-lg transition-all">
                <div className="relative">
                  <img src={p.image} alt={p.title} className="w-full h-48 object-cover"/>
                  <div className="absolute top-3 left-3 flex gap-2">
                    {p.popular && <span className="text-xs px-2 py-1 rounded-full bg-orange-500 text-white flex items-center gap-1"><Heart size={12}/>ยอดนิยม</span>}
                    {p.featured && <span className="text-xs px-2 py-1 rounded-full bg-purple-600 text-white flex items-center gap-1"><Star size={12}/>แนะนำ</span>}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="font-semibold text-emerald-700">{p.title}</div>
                      <div className="text-xs text-gray-500">{p.subtitle}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600">฿{p.price.toLocaleString()}</div>
                      {p.originalPrice > p.price && <div className="text-xs text-gray-400 line-through">฿{p.originalPrice.toLocaleString()}</div>}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 line-clamp-2 mb-3">{p.description}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">{p.duration} • {p.photos}</div>
                    <div className="flex items-center gap-1">
                      <IconBtn title="ดูตัวอย่าง" onClick={()=>setEditing({ ...p })}><Eye size={16}/></IconBtn>
                      <IconBtn title="ย้ายขึ้น" onClick={()=>moveItem(p.id, "up")}><ArrowUp size={16}/></IconBtn>
                      <IconBtn title="ย้ายลง" onClick={()=>moveItem(p.id, "down")}><ArrowDown size={16}/></IconBtn>
                      <IconBtn title="คัดลอก" onClick={()=>duplicateItem(p)}><Copy size={16}/></IconBtn>
                      <IconBtn title="แก้ไข" onClick={()=>setEditing(p)} className="text-emerald-700"><Edit3 size={16}/></IconBtn>
                      <IconBtn title="ลบ" onClick={()=>deleteItem(p.id)} className="hover:bg-red-50 text-red-600"><Trash2 size={16}/></IconBtn>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Floating error */}
      {error && <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-xl shadow">{error}</div>}

      {/* Modal */}
      {editing && (
        <PackageForm
          value={editing}
          onClose={() => setEditing(null)}
          onSave={(item) => { upsert(item); setEditing(null); }}
          onUploadImage={fileToDataUrl}
        />
      )}
    </div>
  );
}

/* ------------------------------ Form Component --------------------------- */
function PackageForm({ value, onClose, onSave, onUploadImage }) {
  const [item, setItem] = useState(value || samplePackage);
  const [tab, setTab] = useState("general");
  const [err, setErr] = useState("");
  const set = (patch) => setItem((prev) => ({ ...prev, ...patch }));

  // Generic list ops
  const listOps = (key) => ({
    add: (row) => set({ [key]: [...item[key], row] }),
    rm: (i) => set({ [key]: item[key].filter((_, idx) => idx !== i) }),
    setAt: (i, v) => set({ [key]: item[key].map((x, idx) => (idx === i ? v : x)) }),
    patchAt: (i, p) => set({ [key]: item[key].map((x, idx) => (idx === i ? { ...x, ...p } : x)) }),
  });
  const feat = listOps("features");
  const gal = listOps("gallery");
  const addOn = listOps("addons");

  const validate = () => {
    if (!item.title.trim()) return "กรุณากรอกชื่อแพ็คเกจ";
    if (!item.category) return "เลือกหมวดหมู่";
    if (Number.isNaN(+item.price) || +item.price <= 0) return "ราคาไม่ถูกต้อง";
    if (item.originalPrice && +item.originalPrice < +item.price) return "ราคาเดิมต้องมากกว่าหรือเท่าราคา";
    return "";
  };
  const handleSave = () => { const e = validate(); if (e) return setErr(e); onSave({ ...item, price: +item.price, originalPrice: +item.originalPrice }); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <div className="font-semibold text-emerald-700">{value?.id ? "แก้ไขแพ็คเกจ" : "เพิ่มแพ็คเกจ"}</div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100"><X size={18}/></button>
        </div>

        <div className="px-5 pt-4">
          <div className="flex gap-2 mb-4">
            {[{id:"general",label:"ข้อมูลหลัก"},{id:"details",label:"รายละเอียด"},{id:"gallery",label:"แกลเลอรี"},{id:"addons",label:"ตัวเลือกเสริม"}].map(t => (
              <button key={t.id} onClick={()=>setTab(t.id)} className={`px-3 py-2 rounded-xl text-sm ${tab===t.id?"bg-emerald-600 text-white":"bg-gray-100 text-gray-700"}`}>{t.label}</button>
            ))}
          </div>
        </div>

        <div className="px-5 pb-5 max-h-[70vh] overflow-y-auto">
          {tab === "general" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Preview */}
              <div className="lg:col-span-1">
                <Card className="border rounded-2xl overflow-hidden">
                  <img src={item.image} alt="preview" className="w-full h-56 object-cover"/>
                  <div className="p-4">
                    <div className="font-semibold text-emerald-700">{item.title || "(ยังไม่ตั้งชื่อ)"}</div>
                    <div className="text-xs text-gray-500">{item.subtitle}</div>
                    <div className="mt-2 text-sm text-gray-600 line-clamp-3">{item.description}</div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-lg font-bold text-emerald-600">฿{Number(item.price||0).toLocaleString()}</div>
                      <div className="flex items-center gap-2 text-xs">
                        <label className="flex items-center gap-1"><input type="checkbox" className="accent-emerald-600" checked={item.popular} onChange={(e)=>set({popular:e.target.checked})}/> ยอดนิยม</label>
                        <label className="flex items-center gap-1"><input type="checkbox" className="accent-emerald-600" checked={item.featured} onChange={(e)=>set({featured:e.target.checked})}/> แนะนำ</label>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Form */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { k: "title", label: "ชื่อแพ็คเกจ *" },
                  { k: "subtitle", label: "ชื่อรอง" },
                ].map(f => (
                  <div key={f.k}>
                    <label className="block text-sm text-gray-600 mb-1">{f.label}</label>
                    <input className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" value={item[f.k]} onChange={(e)=>set({[f.k]: e.target.value})}/>
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">คำอธิบาย</label>
                  <textarea rows={3} className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" value={item.description} onChange={(e)=>set({description:e.target.value})}/>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">หมวดหมู่ *</label>
                  <select className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" value={item.category} onChange={(e)=>set({category:e.target.value})}>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">ราคา (฿) *</label>
                  <input type="number" min={0} className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" value={item.price} onChange={(e)=>set({price:e.target.value})}/>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">ราคาเดิม (฿)</label>
                  <input type="number" min={0} className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" value={item.originalPrice} onChange={(e)=>set({originalPrice:e.target.value})}/>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">ระยะเวลา</label>
                  <input className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" value={item.duration} onChange={(e)=>set({duration:e.target.value})}/>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">จำนวนภาพ</label>
                  <input className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" value={item.photos} onChange={(e)=>set({photos:e.target.value})}/>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">สถานที่</label>
                  <input className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" value={item.locations} onChange={(e)=>set({locations:e.target.value})}/>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">ผู้เข้าร่วม</label>
                  <input className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" value={item.people} onChange={(e)=>set({people:e.target.value})}/>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">รูปหลัก</label>
                  <div className="flex gap-3 items-center">
                    <img src={item.image} alt="thumb" className="w-28 h-20 object-cover rounded-xl border"/>
                    <Btn onClick={()=>set({ image: createImagePlaceholder(600, 400, item.category) })} className="bg-gray-100 hover:bg-gray-200 flex items-center gap-2"><ImageIcon size={16}/>Placeholder</Btn>
                    <label className="px-3 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer flex items-center gap-2">
                      <Upload size={16}/> อัปโหลด
                      <input type="file" accept="image/*" className="hidden" onChange={async (e)=>{ const f=e.target.files?.[0]; if(!f) return; set({ image: await onUploadImage(f) }); }}/>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "details" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Features */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-gray-700">สิ่งที่ได้รับ (Features)</div>
                  <Btn onClick={()=>feat.add("")} className="bg-gray-100 hover:bg-gray-200 flex items-center gap-2"><Plus size={14}/>เพิ่ม</Btn>
                </div>
                <div className="space-y-2">
                  {item.features.map((f, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <span className="text-emerald-600"><Check size={16}/></span>
                      <input value={f} onChange={(e)=>feat.setAt(i, e.target.value)} className="flex-1 px-3 py-2 rounded-xl border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"/>
                      <IconBtn onClick={()=>feat.rm(i)} className="hover:bg-red-50 text-red-600"><Trash2 size={16}/></IconBtn>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ratings */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">เรตติ้ง (0-5)</label>
                  <input type="number" min={0} max={5} step="0.1" value={item.rating} onChange={(e)=>set({rating:+e.target.value})} className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"/>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">จำนวนรีวิว</label>
                  <input type="number" min={0} value={item.reviews} onChange={(e)=>set({reviews:+e.target.value})} className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"/>
                </div>
              </div>
            </div>
          )}

          {tab === "gallery" && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-gray-700">แกลเลอรี</div>
                <Btn onClick={()=>gal.add(createImagePlaceholder(300,200,item.category))} className="bg-gray-100 hover:bg-gray-200 flex items-center gap-2"><Plus size={14}/>เพิ่ม</Btn>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {item.gallery.map((g, i) => (
                  <div key={i} className="border rounded-xl p-2">
                    <img src={g} alt={`g-${i}`} className="w-full h-24 object-cover rounded-lg"/>
                    <input value={g} onChange={(e)=>gal.setAt(i, e.target.value)} className="mt-2 w-full px-2 py-1 rounded-lg border border-gray-300 text-xs"/>
                    <div className="flex items-center justify-between mt-2">
                      <Btn onClick={()=>gal.setAt(i, createImagePlaceholder(300,200,item.category))} className="text-xs bg-gray-100 hover:bg-gray-200">Placeholder</Btn>
                      <label className="text-xs px-2 py-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer">
                        อัปโหลด<input type="file" accept="image/*" className="hidden" onChange={async (e)=>{ const f=e.target.files?.[0]; if(!f) return; gal.setAt(i, await fileToDataUrl(f)); }}/>
                      </label>
                      <Btn onClick={()=>gal.rm(i)} className="text-xs bg-red-50 text-red-600 hover:bg-red-100">ลบ</Btn>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "addons" && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-gray-700">ตัวเลือกเสริม (Add-ons)</div>
                <Btn onClick={()=>addOn.add({ name: "", price: 0 })} className="bg-gray-100 hover:bg-gray-200 flex items-center gap-2"><Plus size={14}/>เพิ่ม</Btn>
              </div>
              <div className="space-y-2">
                {item.addons.map((a, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2 items-center">
                    <input value={a.name} onChange={(e)=>addOn.patchAt(i,{name:e.target.value})} placeholder="ชื่อ" className="col-span-7 px-3 py-2 rounded-xl border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"/>
                    <input type="number" min={0} value={a.price} onChange={(e)=>addOn.patchAt(i,{price:+e.target.value})} placeholder="ราคา" className="col-span-3 px-3 py-2 rounded-xl border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"/>
                    <IconBtn onClick={()=>addOn.rm(i)} className="col-span-2 justify-self-end hover:bg-red-50 text-red-600"><Trash2 size={16}/></IconBtn>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-5 py-3 flex items-center justify-between">
          <div className="text-sm text-red-600 h-5">{err}</div>
          <div className="flex items-center gap-2">
            <Btn onClick={onClose} className="border border-gray-300 hover:bg-gray-50">ยกเลิก</Btn>
            <Btn onClick={handleSave} className="bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-2"><Save size={16}/>บันทึก</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}