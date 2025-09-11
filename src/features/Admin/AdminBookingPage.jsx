import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, Filter, Download, User, Phone, Calendar, MapPin, DollarSign, MessageSquare, FileImage, Clock, X, Package, Camera, Users, Star } from 'lucide-react';

const AdminBookingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [bookings, setBookings] = useState([
    { 
      id: 1,
      code: 'FSS00001',
      customerName: 'สมชาย ใจดี',
      phone: '081-234-5678',
      bookingDate: '2024-06-15',
      location: 'สวนลุมพินี',
      appointmentDate: '2024-07-01',
      message: 'ต้องการถ่ายรูปครอบครัว',
      price: '฿5,000',
      status: 'รออนุมัติ',
      paymentProof: 'มี'
    },
    { 
      id: 2,
      code: 'FSS00002',
      customerName: 'สมหญิง รักสวย',
      phone: '082-345-6789',
      bookingDate: '2024-06-16',
      location: 'ชายหาดหัวหิน',
      appointmentDate: '2024-07-05',
      message: 'ถ่ายรูปแต่งงาน',
      price: '฿8,000',
      status: 'ยืนยัน',
      paymentProof: 'มี'
    },
    { 
      id: 3,
      code: 'FSS00003',
      customerName: 'วีระ กล้าหาญ',
      phone: '083-456-7890',
      bookingDate: '2024-06-17',
      location: 'วัดพระแก้ว',
      appointmentDate: '2024-07-10',
      message: 'ถ่ายรูปบุญ',
      price: '฿3,500',
      status: 'รออนุมัติ',
      paymentProof: 'มี'
    },
    { 
      id: 4,
      code: 'FSS00004',
      customerName: 'นารี สวยงาม',
      phone: '084-567-8901',
      bookingDate: '2024-06-18',
      location: 'สตูดิโอ',
      appointmentDate: '2024-07-12',
      message: 'ถ่ายรูปโปรไฟล์',
      price: '฿2,000',
      status: 'ยกเลิก',
      paymentProof: 'ไม่มี',
      cancelReason: 'ลูกค้าไม่สะดวก'
    },
    { 
      id: 5,
      code: 'FSS00005',
      customerName: 'ชาญ เก่งการ',
      phone: '085-678-9012',
      bookingDate: '2024-06-19',
      location: 'อยุธยา',
      appointmentDate: '2024-07-15',
      message: 'ถ่ายรูปท่องเที่ยว',
      price: '฿4,500',
      status: 'ยืนยัน',
      paymentProof: 'มี'
    },
  ]);

  // Package Modal State
  const [newPackage, setNewPackage] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    photos: '',
    location: ''
  });

  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: newStatus }
          : booking
      )
    );
  };

  const handleAddPackage = () => {
    // Handle package addition logic here
    console.log('New Package:', newPackage);
    
    // Reset form
    setNewPackage({
      name: '',
      description: '',
      price: '',
      duration: '',
      photos: '',
      location: ''
    });
    
    // Close modal
    setShowPackageModal(false);
    
    // Show success message (you can implement toast notification here)
    alert('เพิ่มแพ็คเกจสำเร็จ!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'รออนุมัติ': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ยืนยัน': return 'bg-green-100 text-green-800 border-green-200';
      case 'ยกเลิก': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'รออนุมัติ': return <Clock className="w-3 h-3" />;
      case 'ยืนยัน': return <div className="w-3 h-3 bg-green-500 rounded-full"></div>;
      case 'ยกเลิก': return <div className="w-3 h-3 bg-red-500 rounded-full"></div>;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Modern Navbar */}
      <nav className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg font-bold text-xl">
                S
              </div>
              <span className="text-slate-600 font-medium">SOF888</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">หน้าแรก</a>
              <a href="#" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">แพ็คเกจ</a>
              <a href="#" className="text-emerald-600 font-semibold border-b-2 border-emerald-600 pb-1">รายการจอง</a>
              <a href="#" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">โปรไฟล์ผู้ใช้</a>
            </div>
            
            <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors">
              ออกจากระบบ
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">ข้อมูลการจอง</h1>
          <p className="text-slate-600">จัดการและติดตามสถานะการจองทั้งหมด</p>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="ค้นหารหัสจอง หรือ ชื่อลูกค้า..."
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <select
                  className="pl-10 pr-8 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white appearance-none min-w-[150px]"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">สถานะทั้งหมด</option>
                  <option value="รออนุมัติ">รออนุมัติ</option>
                  <option value="ยืนยัน">ยืนยัน</option>
                  <option value="ยกเลิก">ยกเลิก</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                ส่งออก
              </button>
              <button 
                onClick={() => setShowPackageModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                เพิ่มแพ็คเกจ
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">การจองทั้งหมด</p>
                <p className="text-2xl font-bold text-slate-800">{bookings.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">รออนุมัติ</p>
                <p className="text-2xl font-bold text-yellow-600">{bookings.filter(b => b.status === 'รออนุมัติ').length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">ยืนยันแล้ว</p>
                <p className="text-2xl font-bold text-green-600">{bookings.filter(b => b.status === 'ยืนยัน').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-green-600 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">ยกเลิก</p>
                <p className="text-2xl font-bold text-red-600">{bookings.filter(b => b.status === 'ยกเลิก').length}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-red-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">รหัสแพ็คเกจ</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">ข้อมูลลูกค้า</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">การจอง</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">รายละเอียด</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">ราคา</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">สถานะ</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-mono text-sm font-semibold text-slate-800 bg-slate-100 px-2 py-1 rounded">
                        {booking.code}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-400" />
                          <span className="font-medium text-slate-800">{booking.customerName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-600">{booking.phone}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-600">จอง: {booking.bookingDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm font-medium text-slate-800">นัด: {booking.appointmentDate}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-600">{booking.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-600 truncate max-w-32">{booking.message}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileImage className="w-4 h-4 text-slate-400" />
                          <span className={`text-xs px-2 py-1 rounded-full ${booking.paymentProof === 'มี' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {booking.paymentProof === 'มี' ? 'มีหลักฐาน' : 'ไม่มีหลักฐาน'}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-emerald-500" />
                        <span className="font-semibold text-emerald-600">{booking.price}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          {booking.status}
                        </div>
                        {booking.cancelReason && (
                          <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                            {booking.cancelReason}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <select 
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          className="text-sm border border-slate-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                        >
                          <option value="รออนุมัติ">รออนุมัติ</option>
                          <option value="ยืนยัน">ยืนยัน</option>
                          <option value="ยกเลิก">ยกเลิก</option>
                        </select>
                        <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-800 mb-2">ไม่พบข้อมูลการจอง</h3>
              <p className="text-slate-600">ลองปรับเปลี่ยนคำค้นหาหรือตัวกรอง</p>
            </div>
          )}
        </div>

        {/* Pagination (if needed) */}
        {filteredBookings.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-slate-600">
              แสดง {filteredBookings.length} รายการจากทั้งหมด {bookings.length} รายการ
            </p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                ก่อนหน้า
              </button>
              <button className="px-3 py-2 text-sm bg-emerald-500 text-white rounded-lg">
                1
              </button>
              <button className="px-3 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                ถัดไป
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Package Modal */}
      {showPackageModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">เพิ่มแพ็คเกจใหม่</h2>
                    <p className="text-sm text-slate-600">สร้างแพ็คเกจถ่ายภาพใหม่</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPackageModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-6 space-y-6">
              {/* Package Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <Package className="w-4 h-4 inline mr-2" />
                  ชื่อแพ็คเกจ
                </label>
                <input
                  type="text"
                  value={newPackage.name}
                  onChange={(e) => setNewPackage({...newPackage, name: e.target.value})}
                  placeholder="เช่น แพ็คเกจถ่ายรูปครอบครัว"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  รายละเอียด
                </label>
                <textarea
                  value={newPackage.description}
                  onChange={(e) => setNewPackage({...newPackage, description: e.target.value})}
                  placeholder="อธิบายรายละเอียดของแพ็คเกจ..."
                  rows="4"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                />
              </div>

              {/* Price and Duration Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-2" />
                    ราคา (บาท)
                  </label>
                  <input
                    type="number"
                    value={newPackage.price}
                    onChange={(e) => setNewPackage({...newPackage, price: e.target.value})}
                    placeholder="5000"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    ระยะเวลา (ชั่วโมง)
                  </label>
                  <input
                    type="number"
                    value={newPackage.duration}
                    onChange={(e) => setNewPackage({...newPackage, duration: e.target.value})}
                    placeholder="2"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              {/* Photos and Location Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Camera className="w-4 h-4 inline mr-2" />
                    จำนวนภาพ
                  </label>
                  <input
                    type="number"
                    value={newPackage.photos}
                    onChange={(e) => setNewPackage({...newPackage, photos: e.target.value})}
                    placeholder="50"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    สถานที่
                  </label>
                  <select
                    value={newPackage.location}
                    onChange={(e) => setNewPackage({...newPackage, location: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white transition-colors"
                  >
                    <option value="">เลือกสถานที่</option>
                    <option value="สตูดิโอ">สตูดิโอ</option>
                    <option value="สวนลุมพินี">สวนลุมพินี</option>
                    <option value="ชายหาดหัวหิน">ชายหาดหัวหิน</option>
                    <option value="วัดพระแก้ว">วัดพระแก้ว</option>
                    <option value="อยุธยา">อยุธยา</option>
                    <option value="อื่นๆ">อื่นๆ</option>
                  </select>
                </div>
              </div>

              {/* Package Features */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  <Star className="w-4 h-4 inline mr-2" />
                  จุดเด่นของแพ็คเกจ
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 p-3 border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                    <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
                    <span className="text-sm text-slate-700">แต่งหน้าให้ฟรี</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                    <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
                    <span className="text-sm text-slate-700">รีทัชภาพฟรี</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                    <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
                    <span className="text-sm text-slate-700">ชุดสำรองให้เช่า</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                    <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
                    <span className="text-sm text-slate-700">พร็อพถ่ายรูป</span>
                  </label>
                </div>
              </div>

              {/* Preview Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-800">ตัวอย่างแพ็คเกจ</h3>
                </div>
                <div className="bg-white rounded-lg p-4 space-y-3">
                  <h4 className="font-bold text-lg text-slate-800">
                    {newPackage.name || 'ชื่อแพ็คเกจ'}
                  </h4>
                  <p className="text-slate-600 text-sm">
                    {newPackage.description || 'รายละเอียดแพ็คเกจ'}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span>⏱️ {newPackage.duration || '0'} ชม.</span>
                      <span>📸 {newPackage.photos || '0'} ภาพ</span>
                      <span>📍 {newPackage.location || 'ไม่ระบุ'}</span>
                    </div>
                    <div className="text-xl font-bold text-emerald-600">
                      ฿{newPackage.price || '0'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 rounded-b-2xl">
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowPackageModal(false)}
                  className="px-6 py-2.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleAddPackage}
                  disabled={!newPackage.name || !newPackage.price}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-slate-300 disabled:to-slate-400 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg disabled:cursor-not-allowed"
                >
                  สร้างแพ็คเกจ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookingPage;