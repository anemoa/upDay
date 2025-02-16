import { Helmet } from 'react-helmet';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Charac from './img/character-bulb.svg';
import Arrow from './img/arrow-text.svg';
import Bg from './img/bg-element.svg';
import List from './img/CardList.svg';
import ListMobile from './img/CardListMobile.svg'
import SearchBar from './components/SearchBar';
import FadeInSection from './components/FadeInSection';
import SpeechBubble from './components/SpeechBubble';

const Intro = () => {
    const sectionsRef = useRef([]);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    };

    const handleClick2 = () => {
        navigate('/challengelist')
    }
    

    return (
        <div className='snap-y snap-mandatory h-screen w-screen overflow-y-auto'>
            <Helmet>
                <title>소개 페이지 - UpDay</title>
            </Helmet>
            <div className='h-screen snap-start flex-grow flex-col items-center justify-center '>
                <div className='flex w-[80%] max-w-[1344px] mx-auto justify-between items-center relative pt-[80px]'>
                    <div className='fade-in flex flex-col items-start'>
                        <h1 className='text-5xl font-bold text-gray-800 leading-snug mb-4 animate-slide-up'>
                            좋은 습관, <br />
                            매일 실천하고 싶으신가요?
                        </h1>
                        <p className='text-3xl text-gray-600 mt-4 mb-8'>
                            작심삼일은 이제 그만! <br />
                            <span className='text-4xl text-blue-600 font-bold'>
                                Up Day
                            </span>
                            와 함께 <br className='md:hidden'/>
                            도전하고 성장하세요.
                        </p>

                        {/* 반응형 버튼 크기 조정 */}
                        <button className='btn btn-key w-full md:w-80 h-14 mt-10'
                                onClick={handleClick}>
                            성장하기
                        </button>
                    </div>

                    {/* 반응형 이미지 숨기기 */}
                    <div className='w-40% flex justify-center hidden md:block'>
                        <img
                            src={Charac}
                            alt='Character'
                            className='w-auto h-[505px]'
                        />
                    </div>
                </div>

                <div className='animate-bounce flex items-center justify-center mt-20'>
                    <div className='row-span-2 flex flex-col items-center'>
                        <p className='text-gray-600 text-sm'>성장하러 가기</p>
                        <img src={Arrow} alt='Arrow' className='mt-4' />
                    </div>
                </div>
            </div>

            <div className='h-screen snap-start flex-grow flex-col items-center justify-center'>
                <div 
                    className="fade-in w-[80%] max-w-[1344px] mx-auto relative z-10 text-center pt-[180px]"
                >
                    <div className="relative w-full h-full">
                        <img 
                            src={Bg} 
                            alt="Background" 
                            className="absolute inset-0 w-full h-auto mx-auto object-contain max-h-[1000px] z-0 md:block hidden"
                        />
                    </div>

                    <FadeInSection>
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-[2] z-10 relative mt-10 md:mt-12 lg:mt-30 animate-slide-up">
                    <span className='text-3xl text-blue-600 font-bold'>
                                Up Day
                            </span>는 같은 목표를 <br className='md:hidden'/> 가진 사람들이
                    </h1>

                    <div className='h-5'></div>

                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-[2] z-10 relative animate-slide-up">
                        함께 도전하고 성장하는 챌린지 <br className='md:hidden'/>커뮤니티입니다!
                    </h1>
                    </FadeInSection>

                    <div className='h-10'></div>

                    <FadeInSection delay={200}>
                    <p className="text-lg md:text-xl lg:text-2xl mt-4 leading-[1.8] whitespace-pre-line text-wrap balance z-10 relative animate-slide-up">
                        좋은 습관을 만들고 싶지만, <br className='md:hidden'/> 혼자서는 쉽게 포기하고 재미도 없었다면?
                    </p>

                    <p className="text-lg md:text-xl lg:text-2xl mt-4 leading-[1.8] whitespace-pre-line text-wrap balance z-10 relative animate-slide-up">
                        이제는 함께 도전하며 <br className='md:hidden'/>목표를 이루는 즐거움을 경험해보세요!!
                    </p>
                    </FadeInSection>
                </div>
            </div>

                    {/* 작동 되는 코드 웹, 모바일 둘다 잘됨 */}
                        <div className='h-screen snap-start flex-grow flex-col'>
                            <div className='flex flex-col space-y-8 w-[80%] max-w-[1344px] mx-auto pt-40'>
                                <FadeInSection delay={200}>
                                <SpeechBubble text="👥 같은 목표를 가진 사람들과 응원하며 성장" position="left" />
                                </FadeInSection>
                                <FadeInSection delay={400}>
                                <SpeechBubble text="🎯 매일 작은 실천으로 꾸준한 습관 형성" position="right" />
                                </FadeInSection>
                                <FadeInSection delay={600}>
                                <SpeechBubble text="🔥 혼자가 아닌 함께, 더 즐겁고 쉽게 목표 완수!" position="left" />
                                </FadeInSection>

                                <FadeInSection delay={800}>
                                <p className='text-2xl text-center pt-35 leading-[2] font-bold pt-20'>
                                    좋은 습관으로 매일 <br className='md:hidden'/>더 나은 나를 만들어보세요! <br />
                                    오늘부터 <span className='text-3xl text-blue-600 font-bold'>
                                            Up Day
                                        </span>와 <br className='md:hidden'/>함께 도전해볼까요? 💪😊
                                </p>
                                </FadeInSection>
                            </div>
                        </div>


            <div className='min-h-screen snap-start flex flex-col flex-col items-center justify-center'>
                <div className='flex flex-col items-center justify-center w-[80%] max-w-[1344px] mx-auto pt-[160px] pb-[80px] '>
                <FadeInSection>
                    <p className='text-2xl font-bold text-center leading-relaxed animate-slide-up'>
                        현재 진행중인 챌린지
                    </p>
                    <p className='text-5xl font-bold text-center leading-relaxed -mt-3 text-blue-600'>
                        1,200개</p>
                </FadeInSection>
                <FadeInSection>
                    <p className='text-2xl font-bold text-center mt-10 leading-relaxed animate-slide-up'>원하는 챌린지를 검색하고
                        <br/>
                        오늘부터 좋은 습관을 만들어봐요.
                    </p>
                </FadeInSection>
                    <div className='flex justify-center mt-8 w-[80%] max-w-[1344px] mx-auto pt-10 pb-10'>
                    <SearchBar />
                </div>
                <img src={List} alt='ChartList' className='w-[80%] pt-10 pb-10 hidden md:block' onClick={handleClick2}></img>
                <img src={ListMobile} alt="ListMobile" className='w-[80%] pt-10 pb-10 md:hidden' onClick={handleClick2}/>

                <button className='btn btn-key item-center justify-center w-[80%] h-14 mt-10 '
                        onClick={handleClick2}>
                        챌린지 시작하러가기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Intro;
