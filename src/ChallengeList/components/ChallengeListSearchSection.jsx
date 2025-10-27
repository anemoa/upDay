import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getChallenges } from '../../utils/localStorage';
import { BsSearch } from 'react-icons/bs';
import { supabaseApi } from '../../utils/supabaseApi';

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
    const { category } = useParams();

    // 초기 상태를 url 파라미터 값으로 설정
    const [activeCategory, setActiveCategory] = useState(category || '전체');
    const [searchTerm, setSearchTerm] = useState('');

    // url에서 카테고리가 변경될 때마다 상태 업데이트
    useEffect(() => {
        if (category) {
            setActiveCategory(category);
            setSelectedCategory(category);
        }
    }, [category, setSelectedCategory]);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        setSelectedCategory(category); // 부모 컴포넌트에 선택한 카테고리 전달
        setSearchResults(null); // 카테고리 변경시 검색 결과 초기화
        navigate(`/challengelist/category/${category}`);
    };

    // 검색 로직
    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setSearchResults(null); // 검색어가 없으면 검색 결과 초기화
            return;
        }

        try {
            const challenges = await supabaseApi.get('challenges');

            // 프론트엔드에서 필터링
            const results = challenges.filter(
                (challenge) =>
                    challenge.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    challenge.content
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );

            setSearchResults(results);
        } catch (error) {
            console.error('검색 실패:', error);
            alert('검색 중 오류가 발생했습니다.');
        }
    };

    // Enter 키 눌러도 검색 가능
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <section className="flex max-md:flex-wrap justify-between mb-6">
            <ul className="flex max-md:w-full max-md:justify-between max-md:mb-4">
                {btnList.map((ele, idx) => (
                    <li className="pr-4 max-md:pr-0 max-md:w-[18%]" key={idx}>
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
                            className="btn max-md:w-full px-6 max-md:px-0 py-[10px] max-md:py-1 whitespace-nowrap"
                        >
                            {ele.title}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="relative flex flex-1 items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="검색어를 입력하시오"
                    className="input-field text-xs/6 md:text-sm/7"
                />
                <button
                    className="absolute right-0.5 md:right-1 w-8 h-8"
                    onClick={handleSearch}
                >
                    <BsSearch className="text-blue-900 size-4 md:size-5" />
                </button>
            </div>
        </section>
    );
};

export default ChallengeListSearchSection;
