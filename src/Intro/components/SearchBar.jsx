import React, { useState } from 'react';
import { Search } from 'lucide-react';
import ModalForLogin from '../../common/ModalForLogin';
import useLoginModal from '../../common/hooks/useLoginModal';

const SearchBar = () => {
    const { openLoginModal, renderLoginModal } = useLoginModal();
    return (
        <>
            <div
                className="flex items-center w-full max-w-[900px] bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 h-14"
                onClick={openLoginModal}
            >
                <input
                    type="type"
                    placeholder="원하는 챌린지를 검색해보세요!"
                    className="w-full bg-transparent outline-none text-base sm:text-xl text-gray-700 placeholder-gray-400 cursor-pointer "
                    readOnly
                />
                <Search
                    className="text-gray-400 cursor-pointer hover:text-gray-600 "
                    size={20}
                />
            </div>
            {renderLoginModal()}
        </>
    );
};

export default SearchBar;
