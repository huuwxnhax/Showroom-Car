'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchManuFacturer from './SearchManuFacturer';
import Image from 'next/image';

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button type="submit" className={`-ml-11 z-10 ${otherClasses}`}>
        <Image src="/magnifying-glass.svg" alt="search" width={40} height={40} className="object-contain" />
    </button>
);

const SearchBar = () => {
    const router = useRouter();
    const [manufacturer, setManuFacturer] = useState('');
    const [model, setModel] = useState('');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (manufacturer === '' && model === '') return alert('Please fill in the search bar');
        updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
    };

    const updateSearchParams = (model: string, manufacturer: string) => {
        const searchParams = new URLSearchParams(window.location.search);
        if (model) {
            searchParams.set('model', model);
        } else {
            searchParams.delete('model');
        }

        if (manufacturer) {
            searchParams.set('manufacturer', manufacturer);
        } else {
            searchParams.delete('manufacturer');
        }

        const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

        router.push(newPathname);
    };

    return (
        <form className="searchbar" onSubmit={handleSearch}>
            <div className="searchbar__item">
                <SearchManuFacturer manufacturer={manufacturer} setManuFacturer={setManuFacturer} />
                <SearchButton otherClasses="sm:hidden" />
            </div>
            <div className="w-[2px] h-[46px] bg-gray-700 border hidden sm:block"></div>
            <div className="searchbar__item">
                <Image
                    src="/model-icon.png"
                    width={25}
                    height={25}
                    className="absolute w-[20px] h-[20px] ml-4"
                    alt="car model"
                />
                <input
                    type="text"
                    name="model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="Model"
                    className="searchbar__input"
                />
                <SearchButton otherClasses="sm:hidden" />
            </div>
            <SearchButton otherClasses="max-sm:hidden" />
        </form>
    );
};

export default SearchBar;
