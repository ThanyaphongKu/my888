import React, { useEffect, useState } from "react";
import {
  Upload,
  Smartphone,
  CheckCircle,
  Copy,
  Banknote,
  Sparkles,
  Shield,
  Star,
} from "lucide-react";
import QRImage from "../assets/Img_14111.jpg";

const ACCOUNT_NAME = "นาย ธัญพงศ์ กุลชาติ";

const PAYMENT_METHODS = [
  {
    id: "gsb",
    label: "ออมสิน (GSB)",
    number: "020376810832",
    color: "from-pink-500 to-rose-500",
    icon: "🏦",
  },
  {
    id: "kplus",
    label: "K PLUS (กสิกรไทย)",
    number: "1861966613",
    color: "from-green-500 to-emerald-500",
    icon: "💳",
  },
  {
    id: "promptpay",
    label: "พร้อมเพย์",
    number: "0893765232",
    color: "from-blue-500 to-cyan-500",
    icon: "📱",
  },
];

const formatDisplay = (id, raw) => {
  const s = (raw || "").replace(/\D/g, "");
  if (id === "promptpay" && /^\d{10}$/.test(s)) {
    return `${s.slice(0, 3)}-${s.slice(3, 6)}-${s.slice(6)}`;
  }
  return raw;
};

const PaymentPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [copiedId, setCopiedId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  const validateFile = (file) => {
    const MAX_MB = 5;
    const okType = /^image\/(png|jpe?g|webp)$/i.test(file.type);
    const okSize = file.size <= MAX_MB * 1024 * 1024;
    if (!okType) return "รองรับเฉพาะไฟล์รูปภาพ (JPG, JPEG, PNG, WEBP)";
    if (!okSize) return `ขนาดไฟล์ต้องไม่เกิน ${MAX_MB} MB`;
    return "";
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const msg = validateFile(file);
    setError(msg);
    if (!msg) setSelectedFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const msg = validateFile(file);
    setError(msg);
    if (!msg) setSelectedFile(file);
  };

  const handleCopy = async (id, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      setTimeout(() => setCopiedId(""), 1500);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  const canSubmit = !!selectedFile && !error;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);

    const form = new FormData();
    form.append("accountName", ACCOUNT_NAME);
    form.append("paymentMethods", JSON.stringify(PAYMENT_METHODS));
    form.append("slip", selectedFile);

    console.log("FORM DATA:", {
      accountName: ACCOUNT_NAME,
      paymentMethods: PAYMENT_METHODS,
      slip: selectedFile?.name,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-400/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 drop-shadow-sm">
              QR CODE
            </h1>

            <div className="flex items-center justify-center gap-2">
              <div className="w-32 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
              <Star className="w-4 h-4 text-yellow-500" />
              <div className="w-32 h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full"></div>
            </div>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              สแกนเพื่อชำระเงินหรืออัปโหลดสลิปเพื่อยืนยันการชำระเงินของคุณ
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

            <div className="p-8 md:p-16">
              <div className="grid lg:grid-cols-2 gap-16">
                {/* LEFT: QR + ข้อมูลบัญชี */}
                <div className="space-y-8">
                  {/* Enhanced QR Section */}
                  <div className="text-center">
                    <div className="relative inline-block group">
                      <div className="absolute -inset-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-all duration-500 animate-pulse"></div>

                      <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-white/50 transform group-hover:scale-105 transition-all duration-300">
                        <div className="w-72 h-72 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center border-4 border-dashed border-gray-300">
                          <div className="w-72 h-72 mx-auto rounded-2xl border-4 border-dashed border-gray-300 overflow-hidden bg-white">
                            <img
                              src={QRImage}
                              alt="QR Code"
                              className="w-full h-full object-contain p-2"
                              width={272}
                              height={272}
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Payment Methods */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg">
                        <Smartphone className="w-5 h-5" />
                        <span className="font-semibold">
                          ช่องทางการชำระเงิน
                        </span>
                      </div>
                    </div>

                    {/* Account Info Card */}
                    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-xl"></div>

                      <div className="relative">
                        <div className="flex items-center gap-3 text-gray-800 font-bold mb-4 text-lg">
                          <div className="p-2 bg-gradient-to-br from-green-400 to-green-600 rounded-xl">
                            <Banknote className="w-5 h-5 text-white" />
                          </div>
                          ข้อมูลบัญชีผู้รับเงิน
                        </div>

                        <div className="mb-6">
                          <div className="text-sm text-gray-500 mb-1">
                            ชื่อบัญชี
                          </div>
                          <div className="text-xl font-bold text-gray-800 p-3 bg-gray-50 rounded-xl border border-gray-200">
                            {ACCOUNT_NAME}
                          </div>
                        </div>

                        <div className="space-y-4">
                          {PAYMENT_METHODS.map((method, index) => (
                            <div
                              key={method.id}
                              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                              style={{
                                animationDelay: `${index * 100}ms`,
                              }}
                            >
                              <div
                                className={`absolute inset-0 bg-gradient-to-r ${method.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                              ></div>

                              <div className="relative flex items-center justify-between p-4">
                                <div className="flex items-center gap-4 min-w-0 flex-1">
                                  <div className="text-2xl">{method.icon}</div>
                                  <div className="min-w-0 flex-1">
                                    <div className="text-sm font-medium text-gray-600 mb-1">
                                      {method.label}
                                    </div>
                                    <div className="text-lg font-mono font-bold text-gray-900 break-all">
                                      {formatDisplay(method.id, method.number)}
                                    </div>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleCopy(method.id, method.number)
                                  }
                                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                                    copiedId === method.id
                                      ? "bg-green-100 text-green-700 border border-green-300"
                                      : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
                                  }`}
                                >
                                  {copiedId === method.id ? (
                                    <>
                                      <CheckCircle className="w-4 h-4" />
                                      <span>คัดลอกแล้ว!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-4 h-4" />
                                      <span>คัดลอก</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Enhanced Upload Section */}
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full shadow-lg mb-6">
                      <Upload className="w-5 h-5" />
                      <span className="font-semibold">แนบสลิปการชำระเงิน</span>
                      <span className="text-red-300">*</span>
                    </div>

                    <div
                      className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 transform ${
                        dragOver
                          ? "border-purple-400 bg-purple-50 scale-105 shadow-xl"
                          : selectedFile
                          ? "border-green-400 bg-green-50 shadow-lg"
                          : "border-gray-300 bg-gray-50 hover:bg-white hover:shadow-lg hover:border-gray-400"
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />

                      <div className="text-center">
                        {selectedFile ? (
                          <div className="space-y-6">
                            <div className="flex items-center justify-center gap-3 text-green-700">
                              <CheckCircle className="w-6 h-6" />
                              <span className="font-bold text-lg">
                                {selectedFile.name}
                              </span>
                            </div>
                            {previewUrl && (
                              <div className="relative">
                                <img
                                  src={previewUrl}
                                  alt="ตัวอย่างสลิป"
                                  className="mx-auto rounded-xl border-4 border-white shadow-2xl max-h-80 object-contain"
                                />
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                                  <CheckCircle className="w-5 h-5" />
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="relative">
                              <Upload className="w-16 h-16 text-gray-400 mx-auto" />
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center">
                                <Sparkles className="w-3 h-3" />
                              </div>
                            </div>
                            <div className="text-gray-600 space-y-2">
                              <div className="text-xl font-bold">
                                <span className="text-purple-600 hover:text-purple-700 cursor-pointer">
                                  คลิกเพื่อเลือกไฟล์
                                </span>
                              </div>
                              <div className="text-lg">
                                หรือลากไฟล์มาวางที่นี่
                              </div>
                              <p className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full inline-block">
                                📸 รองรับไฟล์รูปภาพ (JPG, PNG, WEBP) ขนาดไม่เกิน
                                5MB
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {error && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-600 font-medium">{error}</p>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Submit Button */}
                  <div className="space-y-6">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!canSubmit || isLoading}
                      className={`w-full font-bold py-6 rounded-2xl shadow-xl transform transition-all duration-300 flex items-center justify-center gap-3 text-xl relative overflow-hidden ${
                        !canSubmit || isLoading
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : showSuccess
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white scale-105"
                          : "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white hover:shadow-2xl hover:scale-105 active:scale-95"
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>กำลังประมวลผล...</span>
                        </>
                      ) : showSuccess ? (
                        <>
                          <CheckCircle className="w-6 h-6" />
                          <span>จองสำเร็จแล้ว!</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-6 h-6" />
                          <span>ทำการจอง</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 text-gray-500">
            <p className="text-sm">
              © 2024 ระบบการชำระเงิน | ปลอดภัย • รวดเร็ว • เชื่อถือได้
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
