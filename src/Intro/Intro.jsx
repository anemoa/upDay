import React, { useEffect, useRef } from 'react';
import Charac from './img/character-bulb.svg';
import Arrow from './img/arrow-text.svg';
import Bg from './img/bg-element.svg';
import ChatL from './img/spechbubble.svg';
import ChatR from './img/speechbubble-R.svg';
import SearchBar from './components/SearchBar';

const Intro = () => {
    const sectionsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-active');
                    }
                });
            },
            { threshold: 0.3 }
        );
    
        const currentSections = sectionsRef.current; // 현재 ref 값을 복사
    
        currentSections.forEach((el) => {
            if (el) observer.observe(el);
        });
    
        return () => {
            currentSections.forEach((el) => {
                if (el) observer.unobserve(el);
            });
        };
    }, []);
    


    return (
        <div className='snap-y snap-mandatory h-screen w-screen overflow-y-auto' style={{ scrollPaddingTop: '150px' }}>
            <section className='h-screen snap-start flex-grow flex-col items-center justify-center min-h-screen'>
                {/* <div className=''> */}
                    <div className='flex w-[80%] max-w-[1344px] mx-auto justify-between items-center relative'>
                        <div ref={(el) => sectionsRef.current.push(el)} className='fade-in flex flex-col items-start'>
                            <h1 className='text-5xl font-bold text-gray-800 leading-snug mb-4'>
                                좋은 습관, <br />
                                매일 매일 실천하고 싶으신가요?
                            </h1>
                            <p className='text-3xl text-gray-600 mt-4 mb-8'>
                                작심삼일은 이제 그만! <br />
                                <span className='text-4xl text-blue-600 font-bold'>
                                    Up Day
                                </span>
                                와 함께 도전하고 성장하세요.
                            </p>
                            <button className='bg-blue-500 text-white font-bold w-80 h-14 mt-10 rounded-lg shadow-lg hover:bg-blue-600 transition'>
                                성장하기
                            </button>
                        </div>

                        <div className='w-40% flex justify-center'>
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
                {/* </div> */}
            </section>

            <section className='h-screen snap-start'>
                <div ref={(el) => sectionsRef.current.push(el)} className='fade-in flex flex-grow relative w-[80%] max-w-[1344px] mx-auto h-screen items-center justify-center -translate-y-[200px]'>
                    <img src={Bg} alt='Background' className='absolute inset-0 w-full h-full object-contain' />
                    <div className='relative z-10 text-center'>
                        <h1 className='text-4xl font-bold text-center leading-[2]'>
                            Up Day는 같은 목표를 가진 사람들이 <br />
                            함께 도전하고 성장하는 챌린지 커뮤니티입니다!
                        </h1>
                        <br />
                        <p className='text-3xl text-center mt-4 leading-[2]'>
                            좋은 습관을 만들고 싶지만, 혼자서는 쉽게 포기하고 재미도
                            없었다면? <br /> 이제는 함께 도전하며 목표를 이루는
                            즐거움을 경험해보세요!!
                        </p>
                    </div>
                </div>
            </section>

            <section className='h-screen snap-start'>
                <div className='flex flex-col items-center justify-center space-y-8 w-[80%] max-w-[1344px] mx-auto'>
                    <div ref={(el) => sectionsRef.current.push(el)} className='fade-in flex self-start w-[48%] min-w-[30rem] h-auto rounded-3xl z-10 relative'>
                        <div className='relative w-[30rem] h-auto flex items-start'>
                            <img src={ChatL} alt='말풍선' className='w-[30rem] h-auto' />
                            <div className='absolute inset-0 flex items-center justify-center font-bold w-[30rem] h-[100%] px-6 text-lg font-bold text-neutral-800 text-center leading-snug transform -translate-y-[5px]'>
                                👥 같은 목표를 가진 사람들과 응원하며 성장
                            </div>
                        </div>
                    </div>

                    <div ref={(el) => sectionsRef.current.push(el)} className='fade-in flex self-end w-[48%] min-w-[30rem] h-auto rounded-3xl z-10 relative'>
                        <div className='relative w-[30rem] h-auto flex items-end'>
                            <img src={ChatR} alt='말풍선' className='w-[30rem] h-auto' />
                            <div className='absolute inset-0 flex items-center justify-center w-[30rem] h-[100%] px-6 text-lg font-bold text-neutral-800 text-center leading-snug transform -translate-y-[5px]'>
                                🎯 매일 작은 실천으로 꾸준한 습관 형성
                            </div>
                        </div>
                    </div>

                    <div ref={(el) => sectionsRef.current.push(el)} className='fade-in flex self-start w-[48%] min-w-[30rem] h-auto rounded-3xl z-10 relative'>
                        <div className='relative w-[30rem] h-auto flex items-start'>
                            <img src={ChatL} alt='말풍선' className='w-[30rem] h-auto' />
                            <div className='absolute inset-0 flex items-center justify-center font-bold w-[30rem] h-[100%] px-6 text-lg font-bold text-neutral-800 text-center leading-snug transform -translate-y-[5px]'>
                                🔥 혼자가 아닌 함께, 더 즐겁고 쉽게 목표 완수!  
                            </div>
                        </div>
                    </div>


                    <p ref={(el) => sectionsRef.current.push(el)} className='fade-in text-2xl text-center mt-4 leading-[2] font-bold'>
                        좋은 습관으로 매일 더 나은 나를 만들어보세요! <br />
                        오늘부터 Up Day와 함께 도전해볼까요? 💪😊
                    </p>
                </div>
            </section>

            <section className="h-screen snap-start ">
            <div className='flex flex-col items-center justify-center space-y-8 w-[80%] max-w-[1344px] mx-auto mt-16'>

                    <h1 className='text-4xl font-bold text-center leading-relaxed'>
                        지금 1,200 개의 챌린지들이 진행되고 있어요!
                        </h1>
                    <p className='text-2xl font-bold text-center mt-4 leading-relaxed'>원하는 챌린지를 검색하고
                        <br/>
                        오늘부터 좋은 습관을 만들어봐요.
                    </p>
            </div>

        
            <div className='flex justify-center mt-8'>
                <SearchBar />
            </div>

            <div className="grid grid-cols-3 gap-6 w-[80%] max-w-[1344px] mx-auto mt-8">

            </div>
            </section>
        </div>
    );
};

export default Intro;