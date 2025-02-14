import React, { useState } from 'react';
import ChallengeListSection from './ChallengeListSection';
import ChallengeListSearchSection from './ChallengeListSearchSection';
import { useParams } from 'react-router-dom';

const ChallengeListLayout = () => {

	// useParams로 url의 카테고리 파라미터 읽기 위해 호출
	const {category} = useParams();

	// 읽어온 파라미터 상태 관리
	const [selectedCategory, setSelectedCategory] = useState(category || '전체');

	// 검색 결과 상태 추가
	const [searchResults, setSearchResults] = useState(null)
	
    return (
    <main className="w-[80%] max-w-[1344px] mx-auto max-md:mx-auto max-md:w-[90%] max-md:mx-4">
		{/* 상태 변경 함수가 필요하기에 setSelectedCategory 를 props로 전달 */}
        <ChallengeListSearchSection setSelectedCategory={setSelectedCategory} setSearchResults={setSearchResults} />
		{/* 현재 값만 필요하기에 selectedCategory 을 props로 전달 */}
        <ChallengeListSection selectedCategory={selectedCategory} searchResults={searchResults} />
    </main>
    );
};
export default ChallengeListLayout;