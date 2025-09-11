import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer
} from "recharts";
import {
  Package, Users, Calendar, DollarSign, TrendingUp, Plus, Edit3, Trash2,
  Search, Filter, Eye, CheckCircle, XCircle, Bell, Settings, LogOut,
  Camera, Star, Download, Upload, RefreshCw, Clock, Menu, X
} from "lucide-react";

/* ------------------------------ Data & Helpers ------------------------------ */
const currency = (n) => `฿${(+n).toLocaleString()}`;
const thaiDate  = (d) => new Date(d).toLocaleDateString("th-TH");
const cx = (...c) => c.filter(Boolean).join(" ");
const useIsMobile = () => {
  const [m, setM] = useState(() => (typeof window !== "undefined" ? window.innerWidth < 768 : false));
  useEffect(() => { const on = () => setM(window.innerWidth < 768); window.addEventListener("resize", on); return () => window.removeEventListener("resize", on); }, []);
  return m;
};

const dashboardStats = { totalBookings: 156, monthlyRevenue: 485600, activePackages: 12, pendingBookings: 8 };
const monthlyRevenueData = [
  { month: "ม.ค.", revenue: 320000 },{ month: "ก.พ.", revenue: 285000 },
  { month: "มี.ค.", revenue: 410000 },{ month: "เม.ย.", revenue: 385000 },
  { month: "พ.ค.", revenue: 465000 },{ month: "มิ.ย.", revenue: 485600 },
];
const packagePopularityData = [
  { name: "งานแต่งงาน", value: 35, color: "#10B981" },
  { name: "รับปริญญา", value: 25, color: "#3B82F6" },
  { name: "ครอบครัว", value: 20, color: "#F59E0B" },
  { name: "บุคคล", value: 15, color: "#8B5CF6" },
  { name: "อื่นๆ", value: 5,  color: "#EF4444" },
];
const bookingsData = [
  { id: 1, customerName: "คุณสมชาย ใจดี", packageTitle: "แพ็คเกจพรีเวดดิ้งพรีเมียม", bookingDate: "2025-01-15", shootDate: "2025-01-25", status: "confirmed", price: 8900, phone: "089-123-4567", email: "somchai@email.com" },
  { id: 2, customerName: "คุณมาลี สวยงาม", packageTitle: "แพ็คเกจรับปริญญาพิเศษ",   bookingDate: "2025-01-14", shootDate: "2025-01-30", status: "pending",   price: 3500, phone: "081-987-6543", email: "malee@email.com" },
  { id: 3, customerName: "คุณวิชัย มั่งมี",  packageTitle: "แพ็คเกจครอบครัวใหญ่",       bookingDate: "2025-01-13", shootDate: "2025-01-20", status: "completed", price: 4800, phone: "092-555-1234", email: "wichai@email.com" },
  { id: 4, customerName: "คุณนิดา รักสวย",  packageTitle: "แพ็คเกจบุคคลพรีเมียม",       bookingDate: "2025-01-12", shootDate: "2025-01-18", status: "canceled",  price: 2800, phone: "084-777-8888", email: "nida@email.com" },
];
const packagesSeed = [
  { id: 1, title: "แพ็คเกจพรีเวดดิ้งพรีเมียม", category: "wedding",    price: 8900,  originalPrice: 12000, status: "active", bookingCount: 45, rating: 4.9, lastUpdated: "2025-01-10" },
  { id: 2, title: "แพ็คเกจงานแต่งงาน",        category: "wedding",    price: 15900, originalPrice: 20000, status: "active", bookingCount: 28, rating: 4.8, lastUpdated: "2025-01-08" },
  { id: 3, title: "แพ็คเกจรับปริญญาพิเศษ",     category: "graduation", price: 3500,  originalPrice: 4500,  status: "active", bookingCount: 67, rating: 4.7, lastUpdated: "2025-01-05" },
];

const NAV = [
  { id: "dashboard",  label: "แดชบอร์ด",      icon: BarChart },
  { id: "bookings",   label: "การจองคิว",     icon: Calendar },
  { id: "packages",   label: "จัดการแพ็คเกจ", icon: Package },
  { id: "customers",  label: "ลูกค้า",         icon: Users },
  { id: "reports",    label: "รายงาน",        icon: TrendingUp },
];
const STATUS_MAP = {
  confirmed: { text: "ยืนยันแล้ว",  cls: "bg-green-100 text-green-800" },
  pending:   { text: "รอการยืนยัน", cls: "bg-yellow-100 text-yellow-800" },
  completed: { text: "เสร็จสิ้น",    cls: "bg-blue-100 text-blue-800" },
  canceled:  { text: "ยกเลิก",       cls: "bg-red-100 text-red-800" },
};
const CATEGORY_TH = { wedding: "งานแต่งงาน", graduation: "รับปริญญา", family: "ครอบครัว", portrait: "บุคคล" };
const PKG_STATUS = {
  active:   { text: "เปิดใช้งาน", cls: "bg-green-100 text-green-700" },
  inactive: { text: "ปิดใช้งาน",  cls: "bg-red-100 text-red-700" },
  draft:    { text: "ร่าง",       cls: "bg-yellow-100 text-yellow-700" },
};
const STAT_BG = { emerald: "bg-emerald-100", blue: "bg-blue-100", purple: "bg-purple-100", orange: "bg-orange-100" };

/* -------------------------------- UI atoms -------------------------------- */
const Card = ({ children, className = "" }) => <div className={cx("bg-white rounded-2xl shadow-lg border border-gray-100", className)}>{children}</div>;
const Section = ({ title, right, children }) => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{title}</h1>
      <div className="flex gap-2 sm:gap-3">{right}</div>
    </div>
    {children}
  </div>
);
const StatCard = ({ icon, title, value, change, color = "emerald" }) => (
  <Card className="p-5 sm:p-6 hover:shadow-xl transition-shadow">
    <div className="flex items-center justify-between">
      <div className={cx("p-3 rounded-xl", STAT_BG[color])}>{icon}</div>
      {typeof change === "number" && (
        <div className={cx("flex items-center gap-1 text-xs sm:text-sm", change>0?"text-green-600":change<0?"text-red-600":"text-gray-500")}>
          <TrendingUp className="w-4 h-4" />{change>0?"+":""}{change}%
        </div>
      )}
    </div>
    <div className="mt-4"><h3 className="text-xl sm:text-2xl font-bold text-gray-800">{value.toLocaleString()}</h3><p className="text-gray-600 text-sm mt-1">{title}</p></div>
  </Card>
);
const ChartCard = ({ title, children }) => <Card className="p-5 sm:p-6"><h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">{title}</h3>{children}</Card>;
const StatusPill = ({ status }) => { const m = STATUS_MAP[status] ?? { text: status, cls: "bg-gray-100 text-gray-800" }; return <span className={cx("inline-block px-3 py-1 rounded-full text-xs font-medium", m.cls)}>{m.text}</span>; };
const IconBtn = ({ children, onClick, className="" }) => <button onClick={onClick} className={cx("p-2 rounded-full hover:bg-gray-100", className)}>{children}</button>;

/* ------------------------------ Package Modal ------------------------------ */
const PackageModal = ({ pkg, onClose, onSave }) => {
  const [f, setF] = useState({ title: pkg?.title||"", category: pkg?.category||"wedding", price: pkg?.price||0, originalPrice: pkg?.originalPrice||0, status: pkg?.status||"active" });
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: k.includes("price") ? parseInt(e.target.value||0, 10) : e.target.value }));
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-emerald-600">{pkg ? "แก้ไขแพ็คเกจ" : "เพิ่มแพ็คเกจใหม่"}</h3>
            <IconBtn onClick={onClose}><X className="w-5 h-5" /></IconBtn>
          </div>
          <form
            onSubmit={(e)=>{e.preventDefault(); onSave(f); onClose();}}
            className="space-y-4 sm:space-y-6"
          >
            <div><label className="block text-sm font-medium text-gray-700 mb-2">ชื่อแพ็คเกจ</label>
              <input className="w-full px-4 py-3 border rounded-xl focus:ring-emerald-500 focus:border-emerald-500" value={f.title} onChange={set("title")} required />
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-2">หมวดหมู่</label>
              <select className="w-full px-4 py-3 border rounded-xl focus:ring-emerald-500 focus:border-emerald-500" value={f.category} onChange={set("category")}>
                {Object.entries(CATEGORY_TH).map(([v,t]) => <option key={v} value={v}>{t}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["price","originalPrice"].map((k)=>(
                <div key={k}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{k==="price"?"ราคาปัจจุบัน":"ราคาเดิม"}</label>
                  <input type="number" className="w-full px-4 py-3 border rounded-xl focus:ring-emerald-500 focus:border-emerald-500" value={f[k]} onChange={set(k)} required={k==="price"} />
                </div>
              ))}
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-2">สถานะ</label>
              <select className="w-full px-4 py-3 border rounded-xl focus:ring-emerald-500 focus:border-emerald-500" value={f.status} onChange={set("status")}>
                {Object.entries(PKG_STATUS).map(([v,o]) => <option key={v} value={v}>{o.text}</option>)}
              </select>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <button type="button" onClick={onClose} className="flex-1 px-6 py-3 border rounded-xl hover:bg-gray-50">ยกเลิก</button>
              <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:from-emerald-600 hover:to-green-600">บันทึก</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

/* --------------------------------- Pages --------------------------------- */
const DashboardTab = ({ chartH, isMobile }) => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">แดชบอร์ด</h1>
      <div className="flex gap-2 sm:gap-3">
        <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border rounded-xl hover:bg-gray-50"><Download className="w-4 h-4" />ส่งออกรายงาน</button>
        <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600"><RefreshCw className="w-4 h-4" />รีเฟรช</button>
      </div>
    </div>

    {/* Stat cards (map config เพื่อลดโค้ด) */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {[
        { icon:<Calendar className="w-6 h-6 text-emerald-600"/>, title:"การจองทั้งหมด", value:dashboardStats.totalBookings, change:12, color:"emerald" },
        { icon:<DollarSign className="w-6 h-6 text-blue-600"/>,  title:"รายได้เดือนนี้",  value:dashboardStats.monthlyRevenue, change:8,  color:"blue" },
        { icon:<Package className="w-6 h-6 text-purple-600"/>,   title:"แพ็คเกจที่เปิดใช้", value:dashboardStats.activePackages, change:0, color:"purple" },
        { icon:<Clock className="w-6 h-6 text-orange-600"/>,     title:"รอการยืนยัน",     value:dashboardStats.pendingBookings, change:-5,color:"orange" },
      ].map((p, i)=><StatCard key={i} {...p} />)}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <ChartCard title="รายได้รายเดือน">
        <ResponsiveContainer width="100%" height={chartH}>
          <LineChart data={monthlyRevenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#666" /><YAxis stroke="#666" />
            <Tooltip formatter={(v)=>[currency(v),"รายได้"]} labelFormatter={(l)=>`เดือน ${l}`} />
            <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} dot={{ fill:"#10B981", strokeWidth:2, r:isMobile?4:6 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="ความนิยมแพ็คเกจ">
        <ResponsiveContainer width="100%" height={chartH}>
          <PieChart>
            <Pie data={packagePopularityData} cx="50%" cy="50%" outerRadius={isMobile?80:100} dataKey="value">
              {packagePopularityData.map((e,i)=><Cell key={i} fill={e.color} />)}
            </Pie>
            <Tooltip formatter={(v)=>[`${v}%`,"สัดส่วน"]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-3 sm:gap-4 mt-3 sm:mt-4">
          {packagePopularityData.map((it)=>(
            <div key={it.name} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: it.color }} />
              <span className="text-sm text-gray-600">{it.name}</span>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>

    <Card className="p-5 sm:p-6">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">กิจกรรมล่าสุด</h3>
      <div className="space-y-3 sm:space-y-4">
        {bookingsData.slice(0,5).map((b)=>(
          <div key={b.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center"><Camera className="w-5 h-5 text-white" /></div>
              <div><p className="font-medium text-gray-800">{b.customerName}</p><p className="text-sm text-gray-600">{b.packageTitle}</p></div>
            </div>
            <div className="text-right"><p className="font-semibold text-emerald-600">{currency(b.price)}</p><StatusPill status={b.status} /></div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const BookingsTab = ({ filteredBookings, searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => (
  <Section
    title="การจองคิว"
    right={<button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border rounded-xl hover:bg-gray-50"><Download className="w-4 h-4" />ส่งออก</button>}
  >
    <Card className="p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                 placeholder="ค้นหาลูกค้าหรือแพ็คเกจ..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
        </div>
        <select className="px-4 py-3 border rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)}>
          <option value="all">สถานะทั้งหมด</option>
          {Object.entries(STATUS_MAP).map(([k,v]) => <option key={k} value={k}>{v.text}</option>)}
        </select>
        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600">
          <Filter className="w-4 h-4" />กรอง
        </button>
      </div>
    </Card>

    {/* desktop table */}
    <Card className="hidden md:block">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            {["ลูกค้า","แพ็คเกจ","วันที่จอง","วันถ่าย","ราคา","สถานะ","จัดการ"].map((h)=>(
              <th key={h} className="text-left px-6 py-4 font-semibold text-gray-800">{h}</th>
            ))}
          </thead>
          <tbody>
            {filteredBookings.map((b)=>(
              <tr key={b.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4"><p className="font-medium text-gray-800">{b.customerName}</p><p className="text-sm text-gray-600">{b.phone}</p></td>
                <td className="px-6 py-4 text-sm text-gray-800">{b.packageTitle}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{thaiDate(b.bookingDate)}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{thaiDate(b.shootDate)}</td>
                <td className="px-6 py-4"><span className="font-semibold text-emerald-600">{currency(b.price)}</span></td>
                <td className="px-6 py-4"><StatusPill status={b.status} /></td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <IconBtn className="text-blue-600 hover:bg-blue-100"><Eye className="w-4 h-4" /></IconBtn>
                    <IconBtn className="text-green-600 hover:bg-green-100"><CheckCircle className="w-4 h-4" /></IconBtn>
                    <IconBtn className="text-red-600 hover:bg-red-100"><XCircle className="w-4 h-4" /></IconBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!filteredBookings.length && (
        <div className="text-center py-12"><Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">ไม่พบการจอง</h3><p className="text-gray-500">ลองเปลี่ยนเงื่อนไขการค้นหาหรือกรอง</p>
        </div>
      )}
    </Card>

    {/* mobile cards */}
    <div className="md:hidden space-y-3">
      {filteredBookings.map((b)=>(
        <Card key={b.id} className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-semibold text-gray-800">{b.customerName}</div>
              <div className="text-sm text-gray-600">{b.packageTitle}</div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div>จอง: {thaiDate(b.bookingDate)}</div><div>ถ่าย: {thaiDate(b.shootDate)}</div>
              </div>
            </div>
            <div className="text-right"><div className="font-semibold text-emerald-600">{currency(b.price)}</div><div className="mt-1"><StatusPill status={b.status} /></div></div>
          </div>
          <div className="mt-3 flex gap-2">
            <button className="flex-1 py-2 text-blue-600 border rounded-lg"><Eye className="inline w-4 h-4 mr-1" />ดู</button>
            <button className="flex-1 py-2 text-green-600 border rounded-lg"><CheckCircle className="inline w-4 h-4 mr-1" />ยืนยัน</button>
            <button className="flex-1 py-2 text-red-600 border rounded-lg"><XCircle className="inline w-4 h-4 mr-1" />ยกเลิก</button>
          </div>
        </Card>
      ))}
    </div>
  </Section>
);

const PackageCard = ({ pkg, onEdit }) => (
  <Card className="p-5 sm:p-6 hover:shadow-xl transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className="flex-1">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">{pkg.title}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">{CATEGORY_TH[pkg.category] || "อื่นๆ"}</span>
          <span className={cx("text-xs px-2 py-1 rounded-full", PKG_STATUS[pkg.status].cls)}>{PKG_STATUS[pkg.status].text}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <IconBtn className="text-blue-600 hover:bg-blue-100" onClick={onEdit}><Edit3 className="w-4 h-4" /></IconBtn>
        <IconBtn className="text-red-600 hover:bg-red-100"><Trash2 className="w-4 h-4" /></IconBtn>
      </div>
    </div>
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-xl sm:text-2xl font-bold text-emerald-600">{currency(pkg.price)}</span>
        {pkg.originalPrice > pkg.price && <span className="text-sm text-gray-500 line-through">{currency(pkg.originalPrice)}</span>}
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div><p className="text-gray-600">การจอง</p><p className="font-semibold text-gray-800">{pkg.bookingCount} ครั้ง</p></div>
        <div><p className="text-gray-600">คะแนน</p><div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-current" /><span className="font-semibold text-gray-800">{pkg.rating}</span></div></div>
      </div>
      <div className="pt-3 border-t border-gray-100"><p className="text-xs text-gray-500">อัปเดตล่าสุด: {thaiDate(pkg.lastUpdated)}</p></div>
    </div>
  </Card>
);

const PackagesTab = ({ packages, openModal }) => (
  <Section
    title="จัดการแพ็คเกจ"
    right={<button onClick={openModal} className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:from-emerald-600 hover:to-green-600 shadow-lg"><Plus className="w-5 h-5" />เพิ่มแพ็คเกจใหม่</button>}
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {packages.map((p)=> <PackageCard key={p.id} pkg={p} onEdit={()=>openModal(p)} />)}
    </div>
  </Section>
);

const CustomersTab = () => (
  <Section
    title="จัดการลูกค้า"
    right={<><button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border rounded-xl hover:bg-gray-50"><Upload className="w-4 h-4" />นำเข้า</button><button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl hover:bg-gray-50"><Download className="w-4 h-4" />ส่งออก</button></>}
  >
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
      {[
        { t:"ลูกค้าทั้งหมด", v:"1,247", icon:<Users className="w-8 h-8 text-emerald-500" /> },
        { t:"ลูกค้าใหม่เดือนนี้", v:"89", icon:<Plus className="w-8 h-8 text-blue-500" /> },
        { t:"ลูกค้าที่ใช้บริการซ้ำ", v:"234", icon:<RefreshCw className="w-8 h-8 text-purple-500" /> },
        { t:"คะแนนความพึงพอใจ", v:"4.8", icon:<Star className="w-8 h-8 text-yellow-500" /> },
      ].map((k)=>(
        <Card key={k.t} className="p-5 sm:p-6"><div className="flex items-center justify-between"><div><p className="text-gray-600 text-sm">{k.t}</p><p className="text-2xl font-bold text-gray-800">{k.v}</p></div>{k.icon}</div></Card>
      ))}
    </div>

    <Card className="hidden md:block">
      <div className="p-6 border-b border-gray-200">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-emerald-500 focus:border-emerald-500" placeholder="ค้นหาลูกค้า..." />
          </div>
          <button className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600">ค้นหา</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            {["ลูกค้า","การจองล่าสุด","ยอดรวม","สถานะ","จัดการ"].map((h)=>(
              <th key={h} className="text-left px-6 py-4 font-semibold text-gray-800">{h}</th>
            ))}
          </thead>
          <tbody>
            {bookingsData.map((b)=>(
              <tr key={b.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center text-white font-semibold">{b.customerName.charAt(2)}</div>
                    <div><p className="font-medium text-gray-800">{b.customerName}</p><p className="text-sm text-gray-600">{b.email}</p></div>
                  </div>
                </td>
                <td className="px-6 py-4"><p className="text-sm text-gray-800">{b.packageTitle}</p><p className="text-xs text-gray-500">{thaiDate(b.bookingDate)}</p></td>
                <td className="px-6 py-4"><span className="font-semibold text-emerald-600">{currency(b.price * (Math.floor(Math.random()*3)+1))}</span></td>
                <td className="px-6 py-4"><span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">ลูกค้าประจำ</span></td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <IconBtn className="text-blue-600 hover:bg-blue-100"><Eye className="w-4 h-4" /></IconBtn>
                    <IconBtn className="text-gray-600 hover:bg-gray-100"><Edit3 className="w-4 h-4" /></IconBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>

    {/* mobile cards */}
    <div className="md:hidden space-y-3">
      {bookingsData.map((b)=>(
        <Card key={b.id} className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center text-white font-semibold">{b.customerName.charAt(2)}</div>
            <div className="flex-1">
              <div className="font-medium text-gray-800">{b.customerName}</div>
              <div className="text-sm text-gray-600">{b.email}</div>
              <div className="mt-2 text-sm text-gray-800">{b.packageTitle}</div>
              <div className="mt-1 text-xs text-gray-500">ล่าสุด: {thaiDate(b.bookingDate)}</div>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-semibold text-emerald-600">{currency(b.price * (Math.floor(Math.random()*3)+1))}</span>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">ลูกค้าประจำ</span>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 py-2 border rounded-lg text-blue-600"><Eye className="inline w-4 h-4 mr-1" />ดู</button>
                <button className="flex-1 py-2 border rounded-lg text-gray-700"><Edit3 className="inline w-4 h-4 mr-1" />แก้ไข</button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </Section>
);

const ReportsTab = ({ chartHBig, packages }) => (
  <Section
    title="รายงานและสถิติ"
    right={<><select className="px-4 py-2 border rounded-xl focus:ring-emerald-500 focus:border-emerald-500">{["30 วันล่าสุด","3 เดือนล่าสุด","6 เดือนล่าสุด","1 ปีล่าสุด"].map((t)=><option key={t}>{t}</option>)}</select>
           <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600"><Download className="w-4 h-4" />ดาวน์โหลดรายงาน</button></>}
  >
    <ChartCard title="วิเคราะห์รายได้">
      <ResponsiveContainer width="100%" height={chartHBig}>
        <BarChart data={monthlyRevenueData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" stroke="#666" /><YAxis stroke="#666" />
          <Tooltip formatter={(v)=>[currency(v),"รายได้"]} labelFormatter={(l)=>`เดือน ${l}`} />
          <Bar dataKey="revenue" fill="#10B981" radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {[
        { v:"85%", t:"อัตราการยืนยันการจอง",   cls:"text-emerald-600" },
        { v:"4.8", t:"คะแนนความพึงพอใจเฉลี่ย", cls:"text-blue-600" },
        { v:"23%", t:"อัตราลูกค้าใช้บริการซ้ำ", cls:"text-purple-600" },
        { v:"7.2", t:"วันเฉลี่ยในการตัดสินใจ",  cls:"text-orange-600" },
      ].map(({v,t,cls})=>(
        <Card key={t} className="p-5 sm:p-6 text-center"><div className={cx("text-2xl sm:text-3xl font-bold mb-2", cls)}>{v}</div><div className="text-gray-600 text-sm sm:text-base">{t}</div></Card>
      ))}
    </div>

    <Card className="p-5 sm:p-6">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">แพ็คเกจยอดนิยม</h3>
      <div className="space-y-3 sm:space-y-4">
        {[...packages].sort((a,b)=>b.bookingCount-a.bookingCount).map((p,i)=>(
          <div key={p.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">{i+1}</div>
              <div><p className="font-medium text-gray-800">{p.title}</p><p className="text-sm text-gray-600">{currency(p.price)}</p></div>
            </div>
            <div className="text-right"><p className="font-semibold text-emerald-600">{p.bookingCount} การจอง</p><div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-current" /><span className="text-sm text-gray-600">{p.rating}</span></div></div>
          </div>
        ))}
      </div>
    </Card>
  </Section>
);

/* --------------------------------- Shell --------------------------------- */
const AdminDashboard = () => {
  const isMobile = useIsMobile();
  const chartH = isMobile ? 220 : 300, chartHBig = isMobile ? 260 : 400;

  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState(""), [statusFilter, setStatusFilter] = useState("all");
  const [showPackageModal, setShowPackageModal] = useState(false), [selectedPackage, setSelectedPackage] = useState(null);
  const [packages, setPackages] = useState(packagesSeed), [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => { document.body.style.overflow = isSidebarOpen ? "hidden" : ""; return () => (document.body.style.overflow = ""); }, [isSidebarOpen]);

  const filteredBookings = useMemo(() => bookingsData.filter((b)=>{
    const q = searchTerm.toLowerCase();
    return (b.customerName.toLowerCase().includes(q) || b.packageTitle.toLowerCase().includes(q)) && (statusFilter==="all" || b.status===statusFilter);
  }), [searchTerm, statusFilter]);

  const HeaderActions = () => (
    <>
      <IconBtn className="relative"><Bell className="w-5 h-5 text-gray-600" /><span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" /></IconBtn>
      <IconBtn><Settings className="w-5 h-5 text-gray-600" /></IconBtn>
      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center"><span className="text-white text-sm font-semibold">A</span></div>
      <IconBtn><LogOut className="w-5 h-5 text-gray-600" /></IconBtn>
    </>
  );

  const openModal = (p=null) => { setSelectedPackage(p); setShowPackageModal(true); };

  const Tabs = {
    dashboard: <DashboardTab chartH={chartH} isMobile={isMobile} />,
    bookings:  <BookingsTab filteredBookings={filteredBookings} searchTerm={searchTerm} setSearchTerm={setSearchTerm} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />,
    packages:  <PackagesTab packages={packages} openModal={openModal} />,
    customers: <CustomersTab />,
    reports:   <ReportsTab chartHBig={chartHBig} packages={packages} />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-28 md:pb-6">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 rounded-lg border hover:bg-gray-50" onClick={()=>setIsSidebarOpen(true)}><Menu className="w-5 h-5" /></button>
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">SOF888 Admin</div>
            <div className="hidden md:flex items-center gap-2 bg-emerald-100 px-3 py-1 rounded-full"><span className="w-2 h-2 bg-emerald-500 rounded-full" /><span className="text-sm text-emerald-700">ออนไลน์</span></div>
          </div>
          <div className="hidden md:flex items-center gap-3"><HeaderActions /></div>
          <div className="md:hidden flex items-center gap-2"><IconBtn><Bell className="w-5 h-5 text-gray-600" /></IconBtn></div>
        </div>
      </header>

      {/* Sidebar overlay */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={()=>setIsSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={cx(
        "fixed inset-y-0 left-0 z-40 w-72 bg-white shadow-lg transform transition-transform md:static md:translate-x-0 md:w-64",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-4 border-b flex items-center justify-between md:hidden">
          <div className="font-semibold text-gray-800">เมนู</div>
          <IconBtn onClick={()=>setIsSidebarOpen(false)}><X className="w-5 h-5" /></IconBtn>
        </div>
        <nav className="p-4 sm:p-6 space-y-2 md:sticky md:top-16">
          {NAV.map(({id,label,icon:Icon})=>(
            <button key={id} onClick={()=>{ setActiveTab(id); setIsSidebarOpen(false); }}
              className={cx("w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                activeTab===id ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md" : "text-gray-600 hover:bg-gray-100")}>
              <Icon className="w-5 h-5" />{label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="transition-[margin] md:ml-64 p-4 sm:p-6">{Tabs[activeTab]}</main>

      {/* Bottom Tabs */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md md:hidden z-40 pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-5">
          {NAV.map(({id,label,icon:Icon})=>{
            const active = activeTab===id;
            return (
              <button key={id} onClick={()=>setActiveTab(id)} className={cx("flex flex-col items-center justify-center py-2", active?"text-emerald-600":"text-gray-500")}>
                <Icon className="w-6 h-6" /><span className="text-[11px] mt-1">{label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {showPackageModal && (
        <PackageModal
          pkg={selectedPackage}
          onClose={()=>{ setShowPackageModal(false); setSelectedPackage(null); }}
          onSave={(data)=>{
            setPackages((prev)=>
              selectedPackage
                ? prev.map((p)=>(p.id===selectedPackage.id?{...p, ...data, lastUpdated:new Date().toISOString() }:p))
                : [{ id:Date.now(), bookingCount:0, rating:5, lastUpdated:new Date().toISOString(), ...data }, ...prev]
            );
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
