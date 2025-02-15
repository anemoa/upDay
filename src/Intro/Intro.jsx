// import React, { useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Charac from './img/character-bulb.svg';
// import Arrow from './img/arrow-text.svg';
// import Bg from './img/bg-element.svg';
// import ChatL from './img/spechbubble.svg';
// import ChatR from './img/speechbubble-R.svg';
// import SearchBar from './components/SearchBar';
// import List from './img/CardList.svg';


// const Intro = () => {
//     const sectionsRef = useRef([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         entry.target.classList.add('fade-in-active');
//                     }
//                 });
//             },
//             { threshold: 0.3 }
//         );
    
//         const currentSections = sectionsRef.current; // 현재 ref 값을 복사
    
//         currentSections.forEach((el) => {
//             if (el) observer.observe(el);
//         });
    
//         return () => {
//             currentSections.forEach((el) => {
//                 if (el) observer.unobserve(el);
//             });
//         };
//     }, []);

//     const handleClick = () => {
//         navigate('/login');
//     };
    


//     return (
//         <div className='snap-y snap-mandatory h-screen w-screen overflow-y-auto' style={{ scrollPaddingTop: '150px' }}>

// <section className='h-screen snap-start flex-grow flex-col items-center justify-center'>

// <div className='flex w-[80%] max-w-[1344px] mx-auto justify-between items-center relative pt-[80px]'>
//     <div ref={(el) => sectionsRef.current.push(el)} className='fade-in flex flex-col items-start'>
//         <h1 className='text-5xl font-bold text-gray-800 leading-snug mb-4'>
//             좋은 습관, <br />
//             매일 매일 실천하고 싶으신가요?
//         </h1>
//         <p className='text-3xl text-gray-600 mt-4 mb-8'>
//             작심삼일은 이제 그만! <br />
//             <span className='text-4xl text-blue-600 font-bold'>
//                 Up Day
//             </span>
//             와 함께 도전하고 성장하세요.
//         </p>

//         {/* 반응형 버튼 크기 조정 */}
//         <button className='bg-blue-500 text-white font-bold w-full md:w-80 h-14 mt-10 rounded-lg shadow-lg hover:bg-blue-600 transition'
//                 onClick={handleClick}>
//             성장하기
//         </button>
//     </div>

//     {/* 반응형 이미지 숨기기 */}
//     <div className='w-40% flex justify-center hidden md:block'>
//         <img
//             src={Charac}
//             alt='Character'
//             className='w-auto h-[505px]'
//         />
//     </div>
// </div>

// <div className='animate-bounce flex items-center justify-center mt-20'>
//     <div className='row-span-2 flex flex-col items-center'>
//         <p className='text-gray-600 text-sm'>성장하러 가기</p>
//         <img src={Arrow} alt='Arrow' className='mt-4' />
//     </div>
// </div>

// </section>

// <section className='h-screen snap-start flex-grow flex-col items-center justify-center'>
//     <div 
//         ref={(el) => sectionsRef.current.push(el)} 
//         className="fade-in w-[80%] max-w-[1344px] mx-auto relative z-10 text-center pt-[180px]"
//     >
//         <div className="relative w-full h-full">
//             <img 
//                 src={Bg} 
//                 alt="Background" 
//                 className="absolute inset-0 w-full h-auto mx-auto object-contain max-h-[1000px] z-0 md:block hidden"
//             />
//         </div>

//         <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-[2] z-10 relative mt-10 md:mt-12 lg:mt-30">
//             Up Day는 같은 목표를 가진 사람들이
//         </h1>

//         <div className='h-5'></div>

//         <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-[2] z-10 relative">
//             함께 도전하고 성장하는 챌린지 커뮤니티입니다!
//         </h1>

//         <div className='h-10'></div>

//         <p className="text-lg md:text-xl lg:text-2xl mt-4 leading-[1.8] whitespace-pre-line text-wrap balance z-10 relative">
//             좋은 습관을 만들고 싶지만, 혼자서는 쉽게 포기하고 재미도 없었다면?
//         </p>

//         <p className="text-lg md:text-xl lg:text-2xl mt-4 leading-[1.8] whitespace-pre-line text-wrap balance z-10 relative">
//             이제는 함께 도전하며 목표를 이루는 즐거움을 경험해보세요!!
//         </p>
//     </div>
// </section>





//             <section className='h-screen snap-start flex-grow flex-col items-center justify-center'>
//                 <div className='flex flex-col items-center justify-center space-y-8 w-[80%] max-w-[1344px] mx-auto pt-40'>

//                     {/* 첫 번째 말풍선 */}
//                     <div ref={(el) => sectionsRef.current.push(el)} 
//                         className='fade-in flex self-center md:self-start w-[48%] lg:w-[48%] md:w-[100%] min-w-[30rem] h-auto rounded-3xl z-10 relative'>
//                         <div className='relative w-[30rem] h-auto flex items-start mx-auto'>
//                             <img src={ChatL} alt='말풍선' className='w-[30rem] h-auto' />
//                             <div className='absolute inset-0 flex items-center justify-center font-bold w-[30rem] h-[100%] px-6 text-lg text-neutral-800 text-center leading-snug transform -translate-y-[5px]'>
//                                 👥 같은 목표를 가진 사람들과 응원하며 성장
//                             </div>
//                         </div>
//                     </div>

//                     {/* 두 번째 말풍선 */}
//                     <div ref={(el) => sectionsRef.current.push(el)} 
//                         className='fade-in flex self-center md:self-end w-[48%] lg:w-[48%] md:w-[100%] min-w-[30rem] h-auto rounded-3xl z-10 relative'>
//                         <div className='relative w-[30rem] h-auto flex items-end mx-auto'>
//                             <img src={ChatR} alt='말풍선' className='w-[30rem] h-auto' />
//                             <div className='absolute inset-0 flex items-center justify-center w-[30rem] h-[100%] px-6 text-lg font-bold text-neutral-800 text-center leading-snug transform -translate-y-[5px]'>
//                                 🎯 매일 작은 실천으로 꾸준한 습관 형성
//                             </div>
//                         </div>
//                     </div>

//                     {/* 세 번째 말풍선 */}
//                     <div ref={(el) => sectionsRef.current.push(el)} 
//                         className='fade-in flex self-center md:self-start w-[48%] lg:w-[48%] md:w-[100%] min-w-[30rem] h-auto rounded-3xl z-10 relative'>
//                         <div className='relative w-[30rem] h-auto flex items-start mx-auto'>
//                             <img src={ChatL} alt='말풍선' className='w-[30rem] h-auto' />
//                             <div className='absolute inset-0 flex items-center justify-center font-bold w-[30rem] h-[100%] px-6 text-lg text-neutral-800 text-center leading-snug transform -translate-y-[5px]'>
//                                 🔥 혼자가 아닌 함께, 더 즐겁고 쉽게 목표 완수!
//                             </div>
//                         </div>
//                     </div>

//                     <div className='h-10'></div>

//                     {/* 텍스트 */}
//                     <p className='fade-in text-2xl text-center pt-35 leading-[2] font-bold'>
//                         좋은 습관으로 매일 더 나은 나를 만들어보세요! <br />
//                         오늘부터 Up Day와 함께 도전해볼까요? 💪😊
//                     </p>

//                 </div>
//             </section>



//             <section className='h-screen snap-start flex-grow flex-col items-center justify-center'>
//                 <div className='flex flex-col items-center justify-center space-y-8 w-[80%] max-w-[1344px] mx-auto pt-[80px]'>

//                         <h1 className='text-4xl font-bold text-center leading-relaxed'>
//                             지금 1,200 개의 챌린지들이 진행되고 있어요!
//                             </h1>
//                         <p className='text-2xl font-bold text-center mt-4 leading-relaxed'>원하는 챌린지를 검색하고
//                             <br/>
//                             오늘부터 좋은 습관을 만들어봐요.
//                         </p>
//                 </div>

            
//                 <div className='flex justify-center mt-8 w-[80%] max-w-[1344px] mx-auto'>
//                     <SearchBar />
//                 </div>
//                 <div className='h-16'></div>
//                 <div className="grid grid-cols-3 gap-6 w-[80%] max-w-[1344px] mx-auto mt-8">
//                 </div>
//                     <img src={List} alt='ChartList' className='w-[80%] max-w-[1344px] mx-auto'></img>
//             </section>
//         </div>
//     );
// };

// export default Intro;

// Intro.jsx

// import React, { useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Charac from './img/character-bulb.svg';
// import Arrow from './img/arrow-text.svg';
// import Bg from './img/bg-element.svg';
// import ChatL from './img/spechbubble.svg';
// import ChatR from './img/speechbubble-R.svg';
// import SearchBar from './components/SearchBar';
// import List from './img/CardList.svg';

// const Intro = () => {
//     const sectionsRef = useRef([]);
//     const navigate = useNavigate();
//     const sections = document.querySelectorAll('.snap-start');

//     window.addEventListener('scroll', () => {
//         let closestSection = null;
//         let minDistance = Infinity;

//         sections.forEach(section => {
//             const distance = Math.abs(section.getBoundingClientRect().top);
//             if (distance < minDistance) {
//                 minDistance = distance;
//                 closestSection = section;
//             }
//         });
        
//         if (closestSection) {
//             window.scrollTo({
//                 top: closestSection.offsetTop,
//                 // behavior: 'smooth'
//             })
//         }
//     })

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         entry.target.classList.add('fade-in-active');
//                     }
//                 });
//             },
//             { threshold: 0.3 }
//         );
    
//         const currentSections = sectionsRef.current; // 현재 ref 값을 복사
    
//         currentSections.forEach((el) => {
//             if (el) observer.observe(el);
//         });
    
//         return () => {
//             currentSections.forEach((el) => {
//                 if (el && observer) { // observer가 존재하는지 확인
//                     observer.unobserve(el);
//                 }
//             });
//         };
//     }, []);

//     const handleClick = () => {
//         navigate('/login');
//     };
    

//     return (
//         <div className='snap-y snap-mandatory h-screen w-screen overflow-y-auto'>
//             <div className='h-screen snap-start flex-grow flex-col items-center justify-center'>
//                 <div className='flex w-[80%] max-w-[1344px] mx-auto justify-between items-center relative pt-[80px]'>
//                     <div ref={(el) => sectionsRef.current.push(el)} className='fade-in flex flex-col items-start'>
//                         <h1 className='text-5xl font-bold text-gray-800 leading-snug mb-4'>
//                             좋은 습관, <br />
//                             매일 실천하고 싶으신가요?
//                         </h1>
//                         <p className='text-3xl text-gray-600 mt-4 mb-8'>
//                             작심삼일은 이제 그만! <br />
//                             <span className='text-4xl text-blue-600 font-bold'>
//                                 Up Day
//                             </span>
//                             와 함께 <br/> 도전하고 성장하세요.
//                         </p>

//                         {/* 반응형 버튼 크기 조정 */}
//                         <button className='bg-blue-500 text-white font-bold w-full md:w-80 h-14 mt-10 rounded-lg shadow-lg hover:bg-blue-600 transition'
//                                 onClick={handleClick}>
//                             성장하기
//                         </button>
//                     </div>

//                     {/* 반응형 이미지 숨기기 */}
//                     <div className='w-40% flex justify-center hidden md:block'>
//                         <img
//                             src={Charac}
//                             alt='Character'
//                             className='w-auto h-[505px]'
//                         />
//                     </div>
//                 </div>

//                 <div className='animate-bounce flex items-center justify-center mt-20'>
//                     <div className='row-span-2 flex flex-col items-center'>
//                         <p className='text-gray-600 text-sm'>성장하러 가기</p>
//                         <img src={Arrow} alt='Arrow' className='mt-4' />
//                     </div>
//                 </div>
//             </div>

//             <div className='h-screen snap-start flex-grow flex-col items-center justify-center'>
//                 <div 
//                     ref={(el) => sectionsRef.current.push(el)} 
//                     className="fade-in w-[80%] max-w-[1344px] mx-auto relative z-10 text-center pt-[180px]"
//                 >
//                     <div className="relative w-full h-full">
//                         <img 
//                             src={Bg} 
//                             alt="Background" 
//                             className="absolute inset-0 w-full h-auto mx-auto object-contain max-h-[1000px] z-0 md:block hidden"
//                         />
//                     </div>

//                     <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-[2] z-10 relative mt-10 md:mt-12 lg:mt-30">
//                         Up Day는 같은 목표를 가진 사람들이
//                     </h1>

//                     <div className='h-5'></div>

//                     <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-[2] z-10 relative">
//                         함께 도전하고 성장하는 챌린지 커뮤니티입니다!
//                     </h1>

//                     <div className='h-10'></div>

//                     <p className="text-lg md:text-xl lg:text-2xl mt-4 leading-[1.8] whitespace-pre-line text-wrap balance z-10 relative">
//                         좋은 습관을 만들고 싶지만, 혼자서는 쉽게 포기하고 재미도 없었다면?
//                     </p>

//                     <p className="text-lg md:text-xl lg:text-2xl mt-4 leading-[1.8] whitespace-pre-line text-wrap balance z-10 relative">
//                         이제는 함께 도전하며 목표를 이루는 즐거움을 경험해보세요!!
//                     </p>
//                 </div>
//             </div>

//             <div className='h-screen snap-start flex-grow flex-col items-center justify-center'>
//                 <div className='flex flex-col items-center justify-center space-y-8 w-[80%] max-w-[1344px] mx-auto pt-40'>
//                     {/* 첫 번째 말풍선 */}
//                     <div ref={(el) => sectionsRef.current.push(el)} 
//                         className='fade-in flex self-center md:self-start w-[48%] lg:w-[48%] md:w-[100%] min-w-[30rem] h-auto rounded-3xl z-10 relative'>
//                         <div className='relative w-[30rem] h-auto flex items-start mx-auto'>
//                             <img src={ChatL} alt='말풍선' className='w-[30rem] h-auto' />
//                             <div className='absolute inset-0 flex items-center justify-center font-bold w-[30rem] h-[100%] px-6 text-lg text-neutral-800 text-center leading-snug transform -translate-y-[5px]'>
//                                 👥 같은 목표를 가진 사람들과 응원하며 성장
//                             </div>
//                         </div>
//                     </div>

//                     {/* 두 번째 말풍선 */}
//                     <div ref={(el) => sectionsRef.current.push(el)} 
//                         className='fade-in flex self-center md:self-end w-[48%] lg:w-[48%] md:w-[100%] min-w-[30rem] h-auto rounded-3xl z-10 relative'>
//                         <div className='relative w-[30rem] h-auto flex items-end mx-auto'>
//                             <img src={ChatR} alt='말풍선' className='w-[30rem] h-auto' />
//                             <div className='absolute inset-0 flex items-center justify-center w-[30rem] h-[100%] px-6 text-lg font-bold text-neutral-800 text-center leading-snug transform -translate-y-[5px]'>
//                                 🎯 매일 작은 실천으로 꾸준한 습관 형성
//                             </div>
//                         </div>
//                     </div>

//                     {/* 세 번째 말풍선 */}
//                     <div ref={(el) => sectionsRef.current.push(el)} 
//                         className='fade-in flex self-center md:self-start w-[48%] lg:w-[48%] md:w-[100%] min-w-[30rem] h-auto rounded-3xl z-10 relative'>
//                         <div className='relative w-[30rem] h-auto flex items-start mx-auto'>
//                             <img src={ChatL} alt='말풍선' className='w-[30rem] h-auto' />
//                             <div className='absolute inset-0 flex items-center justify-center font-bold w-[30rem] h-[100%] px-6 text-lg text-neutral-800 text-center leading-snug transform -translate-y-[5px]'>
//                                 🔥 혼자가 아닌 함께, 더 즐겁고 쉽게 목표 완수!
//                             </div>
//                         </div>
//                     </div>

//                     <div className='h-10'></div>

//                     {/* 텍스트 */}
//                     <p className='fade-in text-2xl text-center pt-35 leading-[2] font-bold'>
//                         좋은 습관으로 매일 더 나은 나를 만들어보세요! <br />
//                         오늘부터 Up Day와 함께 도전해볼까요? 💪😊
//                     </p>
//                 </div>
//             </div>

//             <div className='min-h-screen snap-start flex-grow flex-col items-center justify-center'>
//                 <div className='flex flex-col items-center justify-center space-y-8 w-[80%] max-w-[1344px] mx-auto pt-[160px]'>
//                     <h1 className='text-4xl font-bold text-center leading-relaxed'>
//                         지금 1,200 개의 챌린지들이 진행되고 있어요!
//                     </h1>
//                     <p className='text-2xl font-bold text-center mt-4 leading-relaxed'>원하는 챌린지를 검색하고
//                         <br/>
//                         오늘부터 좋은 습관을 만들어봐요.
//                     </p>
//                 </div>

//                 <div className='flex justify-center w-[80%] max-w-[1344px] mx-auto pt-20'>
//                     <SearchBar />
//                 </div>
//                 <div className='h-16'></div>
//                 <div className="grid grid-cols-3 gap-6 w-[80%] max-w-[1344px] mx-auto pt-10">
//                 </div>
//                 <img src={List} alt='ChartList' className='w-[80%] max-w-[1344px] mx-auto'></img>
//                 <button className='item-center justify-center bg-blue-500 text-white font-bold w-[80%] h-14 mt-10 rounded-lg shadow-lg hover:bg-blue-600 transition'
//                                 onClick={handleClick}>
//                             성장하기
//                         </button>
//             </div>
//         </div>
//     );
// };

// export default Intro;

// import React, { useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Charac from './img/character-bulb.svg';
// import Arrow from './img/arrow-text.svg';
// import Bg from './img/bg-element.svg';
// import ChatL from './img/spechbubble.svg';
// import ChatR from './img/speechbubble-R.svg';
// import SearchBar from './components/SearchBar';
// import List from './img/CardList.svg';

// const Intro = () => {
//     const sectionsRef = useRef([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         entry.target.classList.add('fade-in-active');
//                     }
//                 });
//             },
//             { threshold: 0.3 }
//         );
    
//         const currentSections = sectionsRef.current; // 현재 ref 값을 복사
    
//         currentSections.forEach((el) => {
//             if (el) observer.observe(el);
//         });
    
//         return () => {
//             currentSections.forEach((el) => {
//                 if (el && observer) { // observer가 존재하는지 확인
//                     observer.unobserve(el);
//                 }
//             });
//         };

//         const handleScroll = () => {
//             const snapPoints = document.querySelectorAll('.snap-start');
//             let closestSnapPoint = null;
//             let minDistance = Infinity;
    
//             snapPoints.forEach(snapPoint => {
//                 const distance = Math.abs(snapPoint.getBoundingClientRect().top);
//                 if (distance < minDistance) {
//                     minDistance = distance;
//                     closestSnapPoint = snapPoint;
//                 }
//             });
    
//             if (closestSnapPoint) {
//                 closestSnapPoint.scrollIntoView({
//                     behavior: 'smooth',
//                     block: 'start',
//                 });
//             }
//         };
    
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     const handleClick = () => {
//         navigate('/login');
//     };
    

//     return (
//         <div className='snap-y snap-mandatory h-screen w-screen overflow-y-auto'>
//             <div className='h-screen snap-start flex-grow flex-col items-center justify-center'>
//                 <div className='flex w-[80%] max-w-[1344px] mx-auto justify-between items-center relative pt-[80px]'>
//                     <div ref={(el) => sectionsRef.current.push(el)} className='fade-in flex flex-col items-start'>
//                         <h1 className='text-5xl font-bold text-gray-800 leading-snug mb-4'>
//                             좋은 습관, <br />
//                             매일 실천하고 싶으신가요?
//                         </h1>
//                         <p className='text-3xl text-gray-600 mt-4 mb-8'>
//                             작심삼일은 이제 그만! <br />
//                             <span className='text-4xl text-blue-600 font-bold'>
//                                 Up Day
//                             </span>
//                             와 함께 <br className='md:hidden'/>
//                             도전하고 성장하세요.
//                         </p>

//                         {/* 반응형 버튼 크기 조정 */}
//                         <button className='bg-blue-500 text-white font-bold w-full md:w-80 h-14 mt-10 rounded-lg shadow-lg hover:bg-blue-600 transition'
//                                 onClick={handleClick}>
//                             성장하기
//                         </button>
//                     </div>

//                     {/* 반응형 이미지 숨기기 */}
//                     <div className='w-40% flex justify-center hidden md:block'>
//                         <img
//                             src={Charac}
//                             alt='Character'
//                             className='w-auto h-[505px]'
//                         />
//                     </div>
//                 </div>

//                 <div className='animate-bounce flex items-center justify-center mt-20'>
//                     <div className='row-span-2 flex flex-col items-center'>
//                         <p className='text-gray-600 text-sm'>성장하러 가기</p>
//                         <img src={Arrow} alt='Arrow' className='mt-4' />
//                     </div>
//                 </div>
//             </div>

//             <div className='h-screen snap-start flex-grow flex-col items-center justify-center'>
//                 <div 
//                     ref={(el) => sectionsRef.current.push(el)} 
//                     className="fade-in w-[80%] max-w-[1344px] mx-auto relative z-10 text-center pt-[180px]"
//                 >
//                     <div className="relative w-full h-full">
//                         <img 
//                             src={Bg} 
//                             alt="Background" 
//                             className="absolute inset-0 w-full h-auto mx-auto object-contain max-h-[1000px] z-0 md:block hidden"
//                         />
//                     </div>

//                     <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-[2] z-10 relative mt-10 md:mt-12 lg:mt-30">
//                         Up Day는 같은 목표를 가진 사람들이
//                     </h1>

//                     <div className='h-5'></div>

//                     <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-[2] z-10 relative">
//                         함께 도전하고 성장하는 챌린지 <br className='md:hidden'/>커뮤니티입니다!
//                     </h1>

//                     <div className='h-10'></div>

//                     <p className="text-lg md:text-xl lg:text-2xl mt-4 leading-[1.8] whitespace-pre-line text-wrap balance z-10 relative">
//                         좋은 습관을 만들고 싶지만, <br className='md:hidden'/> 혼자서는 쉽게 포기하고 재미도 없었다면?
//                     </p>

//                     <p className="text-lg md:text-xl lg:text-2xl mt-4 leading-[1.8] whitespace-pre-line text-wrap balance z-10 relative">
//                         이제는 함께 도전하며 <br className='md:hidden'/>목표를 이루는 즐거움을 경험해보세요!!
//                     </p>
//                 </div>
//             </div>

//             <div className='h-screen snap-start flex-grow flex-col items-center justify-center'>
//                 <div className='flex flex-col items-center justify-center space-y-8 w-[80%] max-w-[1344px] mx-auto pt-40'>
//                     {/* 첫 번째 말풍선 */}
//                     <div ref={(el) => sectionsRef.current.push(el)} 
//                         className='fade-in flex self-center md:self-start w-[48%] lg:w-[48%] md:w-[100%] min-w-[30rem] h-auto rounded-3xl z-10 relative'>
//                         <div className='relative w-[30rem] h-auto flex items-start mx-auto'>
//                             <img src={ChatL} alt='말풍선' className='w-[30rem] h-auto' />
//                             <div className='absolute inset-0 flex items-center justify-center font-bold w-[30rem] h-[100%] px-6 text-lg text-neutral-800 text-center leading-snug transform -translate-y-[5px]'>
//                                 👥 같은 목표를 가진 사람들과 응원하며 성장
//                             </div>
//                         </div>
//                     </div>

//                     {/* 두 번째 말풍선 */}
//                     <div ref={(el) => sectionsRef.current.push(el)} 
//                         className='fade-in flex self-center md:self-end w-[48%] lg:w-[48%] md:w-[100%] min-w-[30rem] h-auto rounded-3xl z-10 relative'>
//                         <div className='relative w-[30rem] h-auto flex items-end mx-auto'>
//                             <img src={ChatR} alt='말풍선' className='w-[30rem] h-auto' />
//                             <div className='absolute inset-0 flex items-center justify-center w-[30rem] h-[100%] px-6 text-lg font-bold text-neutral-800 text-center leading-snug transform -translate-y-[5px]'>
//                                 🎯 매일 작은 실천으로 꾸준한 습관 형성
//                             </div>
//                         </div>
//                     </div>

//                     {/* 세 번째 말풍선 */}
//                     <div ref={(el) => sectionsRef.current.push(el)} 
//                         className='fade-in flex self-center md:self-start w-[48%] lg:w-[48%] md:w-[100%] min-w-[30rem] h-auto rounded-3xl z-10 relative'>
//                         <div className='relative w-[30rem] h-auto flex items-start mx-auto'>
//                             <img src={ChatL} alt='말풍선' className='w-[30rem] h-auto' />
//                             <div className='absolute inset-0 flex items-center justify-center font-bold w-[30rem] h-[100%] px-6 text-lg text-neutral-800 text-center leading-snug transform -translate-y-[5px]'>
//                                 🔥 혼자가 아닌 함께, 더 즐겁고 쉽게 목표 완수!
//                             </div>
//                         </div>
//                     </div>

//                     <div className='h-10'></div>

//                     {/* 텍스트 */}
//                     <p className='fade-in text-2xl text-center pt-35 leading-[2] font-bold pt-3'>
//                         좋은 습관으로 매일 <br className='md:hidden'/>더 나은 나를 만들어보세요! <br />
//                         오늘부터 <span className='text-3xl text-blue-600 font-bold'>
//                                 Up Day
//                             </span>와 <br className='md:hidden'/>함께 도전해볼까요? 💪😊
//                     </p>
//                 </div>
//             </div>

//             <div className='min-h-screen snap-start flex flex-col flex-col items-center justify-center'>
//                 <div className='flex flex-col items-center justify-center space-y-8 w-[80%] max-w-[1344px] mx-auto pt-[160px] pb-[80px]'>
//                     <h1 className='text-4xl font-bold text-center leading-relaxed'>
//                         지금 1,200 개의 <br/>챌린지들이 진행되고 있어요!
//                     </h1>
//                     <p className='text-2xl font-bold text-center mt-4 leading-relaxed'>원하는 챌린지를 검색하고
//                         <br/>
//                         오늘부터 좋은 습관을 만들어봐요.
//                     </p>
//                     <div className='flex justify-center mt-8 w-[80%] max-w-[1344px] mx-auto pt-10'>
//                     <SearchBar />
//                 </div>
//                 <img src={List} alt='ChartList' className='w-full pt-10'></img>
//                 <button className='item-center justify-center bg-blue-500 text-white font-bold w-[80%] h-14 mt-10 rounded-lg shadow-lg hover:bg-blue-600 transition '
//                                 onClick={handleClick}>
//                             성장하기
//                         </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Intro;

// import React, { useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Charac from './img/character-bulb.svg';
// import Arrow from './img/arrow-text.svg';
// import Bg from './img/bg-element.svg';
// import ChatL from './img/spechbubble.svg';
// import ChatR from './img/speechbubble-R.svg';
// import SearchBar from './components/SearchBar';
// import List from './img/CardList.svg';

// const Intro = () => {
//     const sectionsRef = useRef([]);
//     const navigate = useNavigate();

//     const handleScroll = () => {
//         const snapPoints = document.querySelectorAll('.snap-start');
//         let closestSnapPoint = null;
//         let minDistance = Infinity;
    
//         snapPoints.forEach(snapPoint => {
//             const distance = Math.abs(snapPoint.getBoundingClientRect().top);
//             if (distance < minDistance) {
//                 minDistance = distance;
//                 closestSnapPoint = snapPoint;
//             }
//         });
    
//         if (closestSnapPoint) {
//             closestSnapPoint.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'start',
//             });
//         }
//     };

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         entry.target.classList.add('fade-in-active');
//                     }
//                 });
//             },
//             { threshold: 0.3 }
//         );
    
//         const currentSections = sectionsRef.current; // 현재 ref 값을 복사
    
//         currentSections.forEach((el) => {
//             if (el) observer.observe(el);
//         });
    
//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             currentSections.forEach((el) => {
//                 if (el && observer) { // observer가 존재하는지 확인
//                     observer.unobserve(el);
//                 }
//             });
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     const handleClick = () => {
//         navigate('/login');
//     };
    

//     return (
//         <div className='snap-y snap-mandatory h-screen w-screen overflow-y-auto'>
//             <div className='h-screen snap-start flex-grow flex-col items-center justify-center'>
//                 <div className='flex w-[80%] max-w-[1344px] mx-auto justify-between items-center relative pt-[80px]'>
//                     <div ref={(el) => sectionsRef.current.push(el)} className='fade-in flex flex-col items-start'>
//                         <h1 className='text-5xl font-bold text-gray-800 leading-snug mb-4'>
//                             좋은 습관, <br />
//                             매일 실천하고 싶으신가요?
//                         </h1>
//                         <p className='text-3xl text-gray-600 mt-4 mb-8'>
//                             작심삼일은 이제 그만! <br />
//                             <span className='text-4xl text-blue-600 font-bold'>
//                                 Up Day
//                             </span>
//                             와 함께 <br className='md:hidden'/>
//                             도전하고 성장하세요.
//                         </p>

//                         {/* 반응형 버튼 크기 조정 */}
//                         <button className='bg-blue-500 text-white font-bold w-full md:w-80 h-14 mt-10 rounded-lg shadow-lg hover:bg-blue-600 transition'
//                                 onClick={handleClick}>
//                             성장하기
//                         </button>
//                     </div>

//                     {/* 반응형 이미지 숨기기 */}
//                     <div className='w-40% flex justify-center hidden md:block'>
//                         <img
//                             src={Charac}
//                             alt='Character'
//                             className='w-auto h-[505px]'
//                         />
//                     </div>
//                 </div>

//                 <div className='animate-bounce flex items-center justify-center mt-20'>
//                     <div className='row-span-2 flex flex-col items-center'>
//                         <p className='text-gray-600 text-sm'>성장하러 가기</p>
//                         <img src={Arrow} alt='Arrow' className='mt-4' />
//                     </div>
//                 </div>
//             </div>

//             <div className='h-screen snap-start flex-grow flex-col items-center justify-center'>
//                 <div 
//                     ref={(el) => sectionsRef.current.push(el)} 
//                     className="fade-in w-[80%] max-w-[1344px] mx-auto relative z-10 text-center pt-[180px]"
//                 >
//                     <div className="relative w-full h-full">
//                         <img 
//                             src={Bg} 
//                             alt="Background" 
//                             className="absolute inset-0 w-full h-auto mx-auto object-contain max-h-[1000px] z-0 md:block hidden"
//                         />
//                     </div>

//                     <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-[2] z-10 relative mt-10 md:mt-12 lg:mt-30 animate-slide-up">
//                         Up Day는 같은 목표를 가진 사람들이
//                     </h1>

//                     <div className='h-5'></div>

//                     <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-[2] z-10 relative">
//                         함께 도전하고 성장하는 챌린지 <br className='md:hidden'/>커뮤니티입니다!
//                     </h1>

//                     <div className='h-10'></div>

//                     <p className="text-lg md:text-xl lg:text-2xl mt-4 leading-[1.8] whitespace-pre-line text-wrap balance z-10 relative">
//                         좋은 습관을 만들고 싶지만, <br className='md:hidden'/> 혼자서는 쉽게 포기하고 재미도 없었다면?
//                     </p>

//                     <p className="text-lg md:text-xl lg:text-2xl mt-4 leading-[1.8] whitespace-pre-line text-wrap balance z-10 relative">
//                         이제는 함께 도전하며 <br className='md:hidden'/>목표를 이루는 즐거움을 경험해보세요!!
//                     </p>
//                 </div>
//             </div>

//             <div className='h-screen snap-start flex-grow flex-col items-center justify-center'>
//                 <div className='flex flex-col items-center justify-center space-y-8 w-[80%] max-w-[1344px] mx-auto pt-40'>
//                     {/* 첫 번째 말풍선 */}
//                     <div ref={(el) => sectionsRef.current.push(el)} 
//                         className='fade-in flex self-center md:self-start w-[48%] lg:w-[48%] md:w-[100%] min-w-[30rem] h-auto rounded-3xl z-10 relative'>
//                         <div className='relative w-[30rem] h-auto flex items-start mx-auto'>
//                             <img src={ChatL} alt='말풍선' className='w-[30rem] h-auto' />
//                             <div className='absolute inset-0 flex items-center justify-center font-bold w-[30rem] h-[100%] px-6 text-lg text-neutral-800 text-center leading-snug transform -translate-y-[5px]'>
//                                 👥 같은 목표를 가진 사람들과 응원하며 성장
//                             </div>
//                         </div>
//                     </div>

//                     {/* 두 번째 말풍선 */}
//                     <div ref={(el) => sectionsRef.current.push(el)} 
//                         className='fade-in flex self-center md:self-end w-[48%] lg:w-[48%] md:w-[100%] min-w-[30rem] h-auto rounded-3xl z-10 relative'>
//                         <div className='relative w-[30rem] h-auto flex items-end mx-auto'>
//                             <img src={ChatR} alt='말풍선' className='w-[30rem] h-auto' />
//                             <div className='absolute inset-0 flex items-center justify-center w-[30rem] h-[100%] px-6 text-lg font-bold text-neutral-800 text-center leading-snug transform -translate-y-[5px]'>
//                                 🎯 매일 작은 실천으로 꾸준한 습관 형성
//                             </div>
//                         </div>
//                     </div>

//                     {/* 세 번째 말풍선 */}
//                     <div ref={(el) => sectionsRef.current.push(el)} 
//                         className='fade-in flex self-center md:self-start w-[48%] lg:w-[48%] md:w-[100%] min-w-[30rem] h-auto rounded-3xl z-10 relative'>
//                         <div className='relative w-[30rem] h-auto flex items-start mx-auto'>
//                             <img src={ChatL} alt='말풍선' className='w-[30rem] h-auto' />
//                             <div className='absolute inset-0 flex items-center justify-center font-bold w-[30rem] h-[100%] px-6 text-lg text-neutral-800 text-center leading-snug transform -translate-y-[5px]'>
//                                 🔥 혼자가 아닌 함께, 더 즐겁고 쉽게 목표 완수!
//                             </div>
//                         </div>
//                     </div>

//                     <div className='h-10'></div>
//                     {/* 텍스트 */}
//                     <p className='fade-in text-2xl text-center pt-35 leading-[2] font-bold pt-3'>
//                         좋은 습관으로 매일 <br className='md:hidden'/>더 나은 나를 만들어보세요! <br />
//                         오늘부터 <span className='text-3xl text-blue-600 font-bold'>
//                                 Up Day
//                             </span>와 <br className='md:hidden'/>함께 도전해볼까요? 💪😊
//                     </p>
//                 </div>
//             </div>

//             <div className='min-h-screen snap-start flex flex-col flex-col items-center justify-center'>
//                 <div className='flex flex-col items-center justify-center space-y-8 w-[80%] max-w-[1344px] mx-auto pt-[160px] pb-[80px]'>
//                     <h1 className='text-4xl font-bold text-center leading-relaxed'>
//                         지금 1,200 개의 <br/>챌린지들이 진행되고 있어요!
//                     </h1>
//                     <p className='text-2xl font-bold text-center mt-4 leading-relaxed'>원하는 챌린지를 검색하고
//                         <br/>
//                         오늘부터 좋은 습관을 만들어봐요.
//                     </p>
//                     <div className='flex justify-center mt-8 w-[80%] max-w-[1344px] mx-auto pt-10'>
//                         <SearchBar />
//                     </div>
//                     <img src={List} alt='ChartList' className='w-full pt-10'></img>
//                     <button className='item-center justify-center bg-blue-500 text-white font-bold w-[80%] h-14 mt-10 rounded-lg shadow-lg hover:bg-blue-600 transition '
//                                 onClick={handleClick}>
//                         성장하기
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Intro;

import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Charac from './img/character-bulb.svg';
import Arrow from './img/arrow-text.svg';
import Bg from './img/bg-element.svg';
import ChatL from './img/spechbubble.svg';
import ChatR from './img/speechbubble-R.svg';
import SearchBar from './components/SearchBar';
import List from './img/CardList.svg';

const Intro = () => {
    const sectionsRef = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // entry.target이 유효한지 확인
                        if (entry.target) {
                            entry.target.classList.add('animate-slide-up'); // Tailwind CSS 클래스 이름 사용
                        }
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
                if (el && observer) { // observer가 존재하는지 확인
                    observer.unobserve(el);
                }
            });
        };
    }, []);

    const handleClick = () => {
        navigate('/login');
    };
    

    return (
        <div className='snap-y snap-mandatory h-screen w-screen overflow-y-auto'>
            <div className='h-screen snap-start flex-grow flex-col items-center justify-center'>
                <div className='flex w-[80%] max-w-[1344px] mx-auto justify-between items-center relative pt-[80px]'>
                    <div ref={(el) => sectionsRef.current.push(el)} className='fade-in flex flex-col items-start'>
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
                        <button className='bg-blue-500 text-white font-bold w-full md:w-80 h-14 mt-10 rounded-lg shadow-lg hover:bg-blue-600 transition'
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
                    ref={(el) => sectionsRef.current.push(el)} 
                    className="fade-in w-[80%] max-w-[1344px] mx-auto relative z-10 text-center pt-[180px]"
                >
                    <div className="relative w-full h-full">
                        <img 
                            src={Bg} 
                            alt="Background" 
                            className="absolute inset-0 w-full h-auto mx-auto object-contain max-h-[1000px] z-0 md:block hidden"
                        />
                    </div>

                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-[2] z-10 relative mt-10 md:mt-12 lg:mt-30 animate-slide-up">
                        Up Day는 같은 목표를 가진 사람들이
                    </h1>

                    <div className='h-5'></div>

                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-[2] z-10 relative animate-slide-up">
                        함께 도전하고 성장하는 챌린지 <br className='md:hidden'/>커뮤니티입니다!
                    </h1>

                    <div className='h-10'></div>

                    <p className="text-lg md:text-xl lg:text-2xl mt-4 leading-[1.8] whitespace-pre-line text-wrap balance z-10 relative animate-slide-up">
                        좋은 습관을 만들고 싶지만, <br className='md:hidden'/> 혼자서는 쉽게 포기하고 재미도 없었다면?
                    </p>

                    <p className="text-lg md:text-xl lg:text-2xl mt-4 leading-[1.8] whitespace-pre-line text-wrap balance z-10 relative animate-slide-up">
                        이제는 함께 도전하며 <br className='md:hidden'/>목표를 이루는 즐거움을 경험해보세요!!
                    </p>
                </div>
            </div>

            <div className='h-screen snap-start flex-grow flex-col items-center justify-center'>
                <div className='flex flex-col items-center justify-center space-y-8 w-[80%] max-w-[1344px] mx-auto pt-40'>
                    {/* 첫 번째 말풍선 */}
                    <div ref={(el) => sectionsRef.current.push(el)} 
                        className='fade-in flex self-center md:self-start w-[48%] lg:w-[48%] md:w-[100%] min-w-[30rem] h-auto rounded-3xl z-10 relative'>
                        <div className='relative w-[30rem] h-auto flex items-start mx-auto'>
                            <img src={ChatL} alt='말풍선' className='w-[30rem] h-auto' />
                            <div className='absolute inset-0 flex items-center justify-center font-bold w-[30rem] h-[100%] px-6 text-lg text-neutral-800 text-center leading-snug transform -translate-y-[5px] animate-slide-up'>
                                👥 같은 목표를 가진 사람들과 응원하며 성장
                            </div>
                        </div>
                    </div>

                    {/* 두 번째 말풍선 */}
                    <div ref={(el) => sectionsRef.current.push(el)} 
                        className='fade-in flex self-center md:self-end w-[48%] lg:w-[48%] md:w-[100%] min-w-[30rem] h-auto rounded-3xl z-10 relative'>
                        <div className='relative w-[30rem] h-auto flex items-end mx-auto'>
                            <img src={ChatR} alt='말풍선' className='w-[30rem] h-auto' />
                            <div className='absolute inset-0 flex items-center justify-center w-[30rem] h-[100%] px-6 text-lg font-bold text-neutral-800 text-center leading-snug transform -translate-y-[5px]'>
                                🎯 매일 작은 실천으로 꾸준한 습관 형성
                            </div>
                        </div>
                    </div>

                    {/* 세 번째 말풍선 */}
                    <div ref={(el) => sectionsRef.current.push(el)} 
                        className='fade-in flex self-center md:self-start w-[48%] lg:w-[48%] md:w-[100%] min-w-[30rem] h-auto rounded-3xl z-10 relative'>
                        <div className='relative w-[30rem] h-auto flex items-start mx-auto'>
                            <img src={ChatL} alt='말풍선' className='w-[30rem] h-auto' />
                            <div className='absolute inset-0 flex items-center justify-center font-bold w-[30rem] h-[100%] px-6 text-lg text-neutral-800 text-center leading-snug transform -translate-y-[5px]'>
                                🔥 혼자가 아닌 함께, 더 즐겁고 쉽게 목표 완수!
                            </div>
                        </div>
                    </div>

                    <div className='h-10'></div>
                    {/* 텍스트 */}
                    <p className='fade-in text-2xl text-center pt-35 leading-[2] font-bold pt-3 animate-slide-up'>
                        좋은 습관으로 매일 <br className='md:hidden'/>더 나은 나를 만들어보세요! <br />
                        오늘부터 <span className='text-3xl text-blue-600 font-bold'>
                                Up Day
                            </span>와 <br className='md:hidden'/>함께 도전해볼까요? 💪😊
                    </p>
                </div>
            </div>

            <div className='min-h-screen snap-start flex flex-col flex-col items-center justify-center'>
                <div className='flex flex-col items-center justify-center space-y-8 w-[80%] max-w-[1344px] mx-auto pt-[160px] pb-[80px]'>
                    <h1 className='text-4xl font-bold text-center leading-relaxed animate-slide-up'>
                        지금 1,200 개의 <br/>챌린지들이 진행되고 있어요!
                    </h1>
                    <p className='text-2xl font-bold text-center mt-4 leading-relaxed animate-slide-up'>원하는 챌린지를 검색하고
                        <br/>
                        오늘부터 좋은 습관을 만들어봐요.
                    </p>
                    <div className='flex justify-center mt-8 w-[80%] max-w-[1344px] mx-auto pt-10'>
                    <SearchBar />
                </div>
                <img src={List} alt='ChartList' className='w-full pt-10 animate-slide-up pb-10'></img>
                <button className='item-center justify-center bg-blue-500 text-white font-bold w-[80%] h-14 mt-10 rounded-lg shadow-lg hover:bg-blue-600 transition animate-slide-up'
                                onClick={handleClick}>
                        챌린지 시작하러가기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Intro;
