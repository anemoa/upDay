import React, { useState, useEffect } from 'react';
import ChallengeCard from './ChallengeCard';
import { useSelector } from 'react-redux';

const ChallengeListSection = ({ selectedCategory, searchResults }) => {
    const [filteredChallenges, setFilteredChallenges] = useState([]);

	// redux 상태에서 챌린지 목록과 로딩 상태 가져오기
	const challenges = useSelector((state) => {
		return state.challenge.list
	});
	const loading = useSelector((state) => state.challenge.loading);
	const error = useSelector((state) => state.challenge.error);

    useEffect(() => {
        // 날짜 정렬 함수
        const sortByDate = (challenges) => {
            return [...challenges].sort((a, b) => {
                // 1. 날짜 유무 체크
                if (!a.post_date) return 1; // 날짜 없는 항목은 뒤로
                if (!b.post_date) return -1; // 날짜 없는 항목은 뒤로

                // 2. 날짜 객체 생성
                const dateA = new Date(a.post_date);
                const dateB = new Date(b.post_date);

                // 3. 날짜 유효성 체크
                if (isNaN(dateA.getTime())) return 1; // a가 유효하지 않은 날짜면 뒤로
                if (isNaN(dateB.getTime())) return -1; // b가 유효하지 않은 날짜면 뒤로

                // 4. 최신순 정렬 (큰 날짜가 앞으로)
                return dateB - dateA;
            });
        };


        // 검색 결과가 있으면 검색 결과만 정렬
        if (searchResults) {
            setFilteredChallenges(sortByDate(searchResults));
            return;
        }

        // 아니면 카테고리 필터링 후 정렬
        const filtered =
            selectedCategory === '전체'
                ? challenges
                : challenges.filter(
                      (ch) => ch.category === selectedCategory
                  );

        setFilteredChallenges(sortByDate(filtered));
    }, [selectedCategory, challenges, searchResults]);

	if(loading) return <div className="col-span-3 text-center py-10">데이터 가져오는 중</div>
	if(error) return <div className="col-span-3 text-center py-10 text-red-500">에러 발생: {error}</div>

    return (
        <section className='grid grid-cols-3 max-md:grid-cols-2 gap-6 max-md:gap-4'>
            {filteredChallenges.length > 0 ? (
                filteredChallenges.map((challenge) => {
					return (
						<ChallengeCard key={challenge.id} challenge={challenge} />
					)
				})
            ) : (
                <p>등록된 챌린지가 없습니다.</p>
            )}
        </section>
    );
};
export default ChallengeListSection;