import React from 'react';
import { HiFire, HiDocumentCheck, HiMiniTrophy } from 'react-icons/hi2';
import { FaStar, FaChevronDown } from 'react-icons/fa6';
import { BsSearch, BsDot } from 'react-icons/bs';

export default function MyPageNonLogin() {
    return (
        <main className='w-full mx-auto flex flex-col md:flex-row gap-4 justify-between'>
            <section className='flex flex-col w-full md:w-[48%] gap-4 md:gap-6'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-xl md:text-2xl font-semibold'>
                        내 프로필
                    </h1>
                    <div className='card flex flex-col gap-3 md:gap-6 p-[24px] md:p-[36px]'>
                        <div className='flex flex-row items-center'>
                            <div className='inline-block w-[42%] max-w-[180px] md:w-[50%] md:max-w-[200px] aspect-square mr-[10%]'>
                                <img
                                    alt='profile-photo'
                                    src='/static/media/3.75e52db1a6055881b5b2fc985970b0ef.svg'
                                    className='w-full h-full object-cover rounded-full ring-2 ring-neutral-300 overflow-hidden'
                                />
                            </div>
                            <div className='flex flex-col h-[200px] justify-evenly'>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-xl md:text-2xl font-semibold'>
                                        업데이
                                    </p>
                                    <p className='text-xs md:text-sm font-normal text-neutral-500'>
                                        upday@upday.com
                                    </p>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-xs md:text-sm font-semibold'>
                                        <span className='text-blue-500'>
                                            100
                                        </span>
                                        일 째 업데이 중
                                    </p>
                                    <p className='text-xs md:text-sm font-normal text-neutral-500'>
                                        2025-01-01
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className='text-xs md:text-sm h-[62px] md:h-[100px] overflow-hidden text-ellipsis whitespace-wrap'>
                            아직 소개글을 작성하지 않았습니다. 프로필을
                            업데이트해보세요!
                        </p>
                    </div>
                </div>

                <div className='flex flex-col gap-2 w-full'>
                    <h1 className='text-xl md:text-2xl font-semibold'>
                        업데이 리포트
                    </h1>
                    <div className='card flex flex-row gap-2 p-6 w-full h-[172px] md:h-[296px] justify-evenly items-center'>
                        <div className='flex flex-col justilfy-center items-center gap-6 w-[30%]'>
                            <p className='text-sm md:text-base font-semibold'>
                                진행 중
                            </p>
                            <HiFire className='text-4xl md:text-6xl text-orange-400' />
                            <p className='text-sm md:text-base font-bold'>7</p>
                        </div>
                        <div className='flex flex-col justilfy-center items-center gap-6 w-[30%]'>
                            <p className='text-sm md:text-base font-semibold'>
                                완료
                            </p>
                            <HiDocumentCheck className='text-4xl md:text-6xl text-green-400' />
                            <p className='text-sm md:text-base font-bold'>25</p>
                        </div>
                        <div className='flex flex-col justilfy-center items-center gap-6 w-[30%]'>
                            <p className='text-sm md:text-base font-semibold whitespace-nowrap'>
                                목표 달성율
                            </p>
                            <div className='relative flex justify-center'>
                                <HiMiniTrophy className='text-4xl md:text-6xl text-yellow-400' />
                                <FaStar className='absolute text-neutral-100 text-xs top-1 md:text-lg md:top-2' />
                            </div>
                            <p className='text-sm md:text-base font-bold'>
                                93%
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className='w-full md:w-[48%]'>
                <div className='flex gap-2'>
                    <button className='tap-onclick'>
                        <h2>개인정보 관리</h2>
                    </button>
                    <button className='tap-default'>
                        <h2>챌린지 관리</h2>
                    </button>
                </div>
                <div className='w-full h-[756px] rounded-r-3xl rounded-bl-3xl bg-neutral-100 p-[36px]'>
                    <div className='flex flex-row gap-x-3'>
                        <div className='w-[60px] md:w-[72px] grid shrink-0 grid-cols-1 focus-within:relative'>
                            <select
                                id='category'
                                name='category'
                                aria-label='Category'
                                className='btn btn-black w-full col-start-1 row-start-1 appearance-none pl-3 text-neutral-100'
                            >
                                <option>전체</option>
                            </select>
                            <FaChevronDown
                                aria-hidden='true'
                                className='pointer-events-none col-start-1 row-start-1 mr-3 self-center justify-self-end text-neutral-100 size-2 md:size-3'
                            />
                        </div>
                        <div className='relative flex  flex-1 items-center'>
                            <input
                                id='search'
                                name='search'
                                type='text'
                                autoComplete='search-input'
                                className='input-field text-xs/6 md:text-sm/7'
                            />
                            <button className='absolute right-0.5 md:right-1 w-8 h-8 '>
                                <BsSearch className='text-blue-900 size-4 md:size-5' />
                            </button>
                        </div>
                    </div>
                    <div className='flex gap-2 justify-end mt-2.5 pb-2.5 border-b border-neutral-300 '>
                        <div className='flex items-center'>
                            <BsDot className='text-blue-500 text-sm' />
                            <p className='text-[10px] md:text-xs'>내가 만든</p>
                        </div>
                        <div className='flex gap-0.5 items-center'>
                            <HiFire className='text-orange-400 text-sm' />
                            <p className='text-[10px] md:text-xs'>진행 중</p>
                        </div>
                        <div className='flex gap-0.5 items-center'>
                            <HiDocumentCheck className='text-green-400 text-sm' />
                            <p className='text-[10px] md:text-xs'>완료</p>
                        </div>
                    </div>

                    <p className='text-center text-gray-500'>
                        로그인한 유저 정보를 찾을 수 없습니다.
                    </p>
                </div>
            </section>
        </main>
    );
}
