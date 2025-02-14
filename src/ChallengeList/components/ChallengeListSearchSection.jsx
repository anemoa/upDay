import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChallenges } from '../../utils/localStorage';
import { BsSearch } from 'react-icons/bs';

const btnList = [
    { title: '전체', color: '#121212' },
    { title: '식단', color: '#c5ebe6' },
    { title: '학습', color: '#fef2c8' },
    { title: '운동', color: '#e3e3f4' },
    { title: '습관', color: '#ffdee7' },
];

const ChallengeListSearchSection = ({
    setSelectedCategory,
    setSearchResults,
}) => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('전체');
    const [searchTerm, setSearchTerm] = useState('');

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        setSelectedCategory(category); // 부모 컴포넌트에 선택한 카테고리 전달
        setSearchResults(null); // 카테고리 변경시 검색 결과 초기화
        navigate(`/challengelist/category/${category}`);
    };

    // 검색 로직
    const handleSearch = () => {
        if (!searchTerm.trim()) {
            setSearchResults(null); // 검색어가 없으면 검색 결과 초기화
            return;
        }

        // 로컬 스토리지에 담긴 모든 챌린지 작성글
        const challenges = getChallenges();

        // 검색어 필터링 하는 로직
        const results = challenges.filter(
            (challenges) =>
                challenges.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                challenges.content
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );

        setSearchResults(results); // 검색 결과를 부모에게 전달
    };

    // Enter 키 눌러도 검색 가능
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <section className='flex max-md:flex-wrap justify-between mb-6'>
            <ul className='flex max-md:w-full max-md:justify-between max-md:mb-4'>
                {btnList.map((ele, idx) => (
                    <li className='pr-4 max-md:pr-0 max-md:w-[18%]' key={idx}>
                        <button
                            onClick={() => handleCategoryClick(ele.title)}
                            style={{
                                border: `2px solid ${ele.color}`,
                                backgroundColor:
                                    activeCategory === ele.title
                                        ? ele.color
                                        : 'white',
                                color:
                                    activeCategory === ele.title
                                        ? 'white'
                                        : 'black',
                            }}
                            className='max-md:w-full px-6 max-md:px-0 py-[10px] max-md:py-1 rounded-xl max-md:rounded-lg max-md:text-xs whitespace-nowrap'
                        >
                            {ele.title}
                        </button>
                    </li>
                ))}
            </ul>

            <div className='flex justify-between input-field w-[40%] max-md:w-full'>
                <input
                    type='text'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder='검색어를 입력하시오'
                    className='w-full'
                />
                <button onClick={handleSearch}>
                    <BsSearch />
                </button>
            </div>
        </section>
    );
};

export default ChallengeListSearchSection;
