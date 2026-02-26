import React from 'react';
import MainDay from '../images/mainday.svg';

interface UserInfoProps{
	userName?: string;
	challengeDays?: number;
}

const UserInfo = ({ userName, challengeDays }: UserInfoProps) => {
    return (
        <div className='w-full h-auto md:h-[120px] mt-32 md:mt-16 card bg-neutral-100 md:bg-neutral-100/0 p-[24px] md:p-0 text-left flex flex-col justify-center gap-4'>
            <h1 className='text-base md:text-lg font-medium'>
                <span className='text-2xl md:text-3xl font-bold'>
                    {userName ? `${userName} 님 ` : '게스트 님 '}
                </span>
                안녕하세요!
            </h1>
            <div className='h-auto md:h-[70px] flex flex-1 items-end text-neutral-500 text-sm md:text-lg '>
                <img
                    src={MainDay}
                    alt='Main Day'
                    className='h-[70px] w-[100px] w-[35%] md:max-w-[150px] object-contain'
                />
                {userName ? (
                    <div className='w-full md:h-full flex gap-2 items-end text-base md:text-lg pb-4'>
                        <div>와</div>
                        <div className='w-full flex items-end text-base md:text-lg '>
                            <span className='text-xl md:text-2xl font-semibold text-blue-500'>
                                {challengeDays}
                            </span>
                            일째 도전 중입니다.
                        </div>
                    </div>
                ) : (
                    <div className='w-full md:h-full flex gap-2 items-end text-base md:text-lg pb-4 whitespace-nowrap'>
                        와 챌린지를 시작해 볼까요?
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserInfo;
