import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const INITIAL = [
  { id: "US00001", username: "admin01", email: "admin01@example.com", phone: "081-111-2222", address: "สกลนคร" },
  { id: "US00002", username: "user02", email: "user02@example.com", phone: "082-333-4444", address: "กทม." },
];

export default function UsersPage() {
  const [rows, setRows] = useState(INITIAL);
  const remove = (id) => setRows((xs) => xs.filter((x) => x.id !== id));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-5">บัญชีผู้ใช้</h1>

      <div className="bg-white rounded-2xl shadow">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-green-100 text-slate-700">
              <tr>
                <th className="p-3 text-left">รหัสผู้ใช้</th>
                <th className="p-3 text-left">ชื่อบัญชีผู้ใช้</th>
                <th className="p-3 text-left">อีเมล</th>
                <th className="p-3 text-left">เบอร์โทร</th>
                <th className="p-3 text-left">ที่อยู่</th>
                <th className="p-3 text-center">จัดการบัญชีผู้ใช้</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t hover:bg-slate-50">
                  <td className="p-3">{r.id}</td>
                  <td className="p-3">{r.username}</td>
                  <td className="p-3">{r.email}</td>
                  <td className="p-3">{r.phone}</td>
                  <td className="p-3">{r.address || "-"}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2 justify-center">
                      <button
                        className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 inline-flex items-center gap-1"
                        onClick={() => alert(`แก้ไขผู้ใช้: ${r.id}`)}
                      >
                        <Pencil size={16} /> แก้ไข
                      </button>
                      <button
                        className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 inline-flex items-center gap-1"
                        onClick={() => remove(r.id)}
                      >
                        <Trash2 size={16} /> ลบ
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {rows.length === 0 && (
                <tr>
                  <td className="p-6 text-center text-slate-500" colSpan={6}>
                    ไม่มีผู้ใช้
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
