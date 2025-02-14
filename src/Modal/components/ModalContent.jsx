import React from 'react';

const ModalContent = ({ title, content, mode, onChange, formData }) => {
    if (mode === 'create' || mode === 'edit') {
        return (
            <div className='mb-4'>
                <input
                    type='text'
					className='input-field mb-4'
                    placeholder='제목 입력하시오'
                    value={formData.title}
                    onChange={(e) =>
                        onChange({ ...formData, title: e.target.value })
                    }
                />
                <textarea
					className='block textarea-field h-[10rem]'
                    placeholder='내용을 입력하시오'
                    value={formData.content}
                    onChange={(e) =>
                        onChange({ ...formData, content: e.target.value })
                    }
                ></textarea>
            </div>
        );
    }

    return (
        <div className='mb-4'>
            <p className='mb-4 text-2xl font-semibold'>{title}</p>
            <p>{content}</p>
        </div>
    );
};

export default ModalContent;
