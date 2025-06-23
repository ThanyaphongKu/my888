import React, { useState } from "react";
import { Upload, CreditCard, Smartphone, CheckCircle } from "lucide-react";
import QRImage from "./assets/Img_14111.jpg";

const PaymentPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
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
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            QR CODE
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="">
              {/* QR Code Section */}
              <div className="flex flex-col items-center space-y-6">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                  <div className="relative bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <img
                      src={QRImage}
                      alt="QR Code for Payment"
                      className="w-64 h-64 object-contain rounded-xl"
                    />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center space-x-2 text-lg font-semibold text-gray-800">
                    <Smartphone className="w-5 h-5 text-blue-500" />
                    <span>ช่องทางการชำระเงิน</span>
                  </div>
                  <p className="text-gray-600">สแกน QR Code เพื่อชำระเงิน</p>
                </div>
              </div>
            <div className="text-center">
                    <div className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <Upload className="w-4 h-4 text-blue-500" />
                      <span>แนบสลิปการชำระเงิน</span>
                      <span className="text-red-500">*</span>
                    </div>
                    <div
                      className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 ${
                        dragOver
                          ? "border-blue-400 bg-blue-50"
                          : selectedFile
                          ? "border-green-400 bg-green-50"
                          : "border-gray-300 bg-gray-50 hover:bg-gray-100"
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
                          <div className="flex items-center justify-center space-x-2 text-green-600">
                            <CheckCircle className="w-6 h-6" />
                            <span className="font-medium">
                              {selectedFile.name}
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                            <div className="text-gray-600">
                              <span className="font-medium text-blue-600">
                                คลิกเพื่อเลือกไฟล์
                              </span>
                              <span> หรือลากไฟล์มาวาง</span>
                            </div>
                            <p className="text-xs text-gray-500">
                              รองรับไฟล์รูปภาพ (JPG, PNG)
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>;
                <div className="space-y-6">
                  {/* Submit Button */}
                  <button
                    type="button"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>ทำการจอง</span>
                  </button>
                </div>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-800 text-center">
                    🔒 ข้อมูลของคุณได้รับการปกป้องด้วยระบบความปลอดภัยระดับสูง
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default PaymentPage;
