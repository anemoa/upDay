import React from 'react';
import { BsPencilSquare, BsTrashFill } from 'react-icons/bs';

const ModalHeader = ({
    category,
    duration,
    isMyPost,
    mode,
    onChange,
    formData,
    onDelete,
    onUpdate,
}) => {
    if (mode === 'create' || mode === 'edit') {
        return (
            <div className='flex justify-between items-center w-[100%] mb-4'>
                <div className='flex items-center w-[60%]'>
                    <select
                        className='input-field mr-4 w-[50%] max-md:text-sm'
                        value={formData.category}
                        onChange={(e) =>
                            onChange({ ...formData, category: e.target.value })
                        }
                    >
                        <option value=''>분류</option>
                        <option value='식단'>식단</option>
                        <option value='학습'>학습</option>
                        <option value='운동'>운동</option>
                        <option value='습관'>습관</option>
                    </select>

                    <select
                        className='input-field w-[50%] max-md:text-sm'
                        value={formData.duration}
                        onChange={(e) =>
                            onChange({ ...formData, duration: e.target.value })
                        }
                    >
                        <option value=''>목표 기간</option>
                        <option value='1개월'>1개월</option>
                        <option value='2개월'>2개월</option>
                        <option value='3개월'>3개월</option>
                        <option value='6개월'>6개월</option>
                    </select>
                </div>
            </div>
        );
    }

    return (
        <div className='flex justify-between items-center mb-4'>
            <div className='flex items-center'>
                <span
                    style={{
                        backgroundColor:
                            category === '식단'
                                ? '#c5ebe6'
                                : category === '학습'
                                  ? '#fef2c8'
                                  : category === '운동'
                                    ? '#e3e3f4'
                                    : category === '습관'
                                      ? '#ffdee7'
                                      : '#F7F7F7',
                    }}
                    className='mr-4 px-6 py-[6px] max-md:px-4 max-md:py-1 max-md:text-sm rounded-xl'
                >
                    {category}
                </span>
                <span className='max-md:text-sm'>목표기간 {duration}</span>
            </div>

            {isMyPost && (
                <div className='flex'>
                    <button onClick={onUpdate} className='flex items-center mr-4 max-md:text-sm text-neutral-700'>
                        <BsPencilSquare className='mr-2 max-md:mr-1'/> 수정
                    </button>
                    <button onClick={onDelete} className='flex items-center max-md:text-sm text-red-400'>
						<BsTrashFill className='mr-2 max-md:mr-1'/> 삭제
					</button>
                </div>
            )}
        </div>
    );
};

export default ModalHeader;
