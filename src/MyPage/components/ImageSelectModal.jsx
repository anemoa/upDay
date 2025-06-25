import React from 'react';

const ImageSelectModal = ({
    isOpen,
    onClose,
    onImageSelect,
    defaultImages,
}) => {
    if (!isOpen) return null;

    // 📍 기본 이미지 클릭했을 때 실행되는 함수
    const handleImageClick = (img) => {
        onImageSelect(img); // 부모 컴포넌트에 선택된 이미지 전달
        onClose(); // 모달 닫기
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {/* 📍 실제 모달 내용 (흰색 박스) */}
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">
                    프로필 이미지 선택
                </h3>

                <div className="grid grid-cols-2 gap-2 mb-4">
                    {defaultImages.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`기본 이미지 ${index + 1}`}
                            onClick={() => handleImageClick(img)}
                            className="w-full h-20 object-cover rounded cursor-pointer hover:ring-2 hover:ring-blue-500"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageSelectModal;
