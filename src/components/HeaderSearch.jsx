import { useEffect, useState } from "react";
import { useCrypto } from "../context/crypto-context";
import { useNavigate } from "react-router-dom";
import { useNavigation } from "../shared/hooks/useNavigation";
import { useDebouncedCallback } from "use-debounce";

export function HeaderSearch () {
    const [searchValue, setSearchValue] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);
    const { crypto } = useCrypto();
    const [results, setResults] = useState([]);
    const navigate = useNavigation();
    

    const handleSearch = useDebouncedCallback((value) => {
        if (searchFocused && value.length > 0) {  
            const filteredCrypto = crypto.filter(coin => coin.name.toLowerCase().includes(value.toLowerCase()));
            if (filteredCrypto.length > 0) {
                setResults(filteredCrypto);
            }else{
                setResults([]);
            }
        }
    }, 300);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        handleSearch(e.target.value);
    }

    const handleClick = (coinId) => {       
        setSearchValue('');
        setSearchFocused(false);
        setResults([]);
        navigate.to(`/currency/${coinId}`);
    }
    
    return (
        <div className="header-search relative self-center">
            <div className="header-search__form">
                <input type="text" placeholder="Search..." value={searchValue} onFocus={() => setSearchFocused(true)} onBlur={() => setTimeout(() => setSearchFocused(false), 100)} onChange={e => handleChange(e)} className="header-search__input h-8 rounded-md bg-white text-black px-4"/>
            </div>
            {searchFocused && searchValue.length > 0 ? results.length > 0 ? (
                <div className="header-search__results absolute top-full left-0 w-full bg-white shadow-lg overflow-auto rounded-lg z-10">
                    {results.map(coin => {
                        const name = coin.name;
                        const search = searchValue.toLowerCase();
                        const matchIndex = name.toLowerCase().indexOf(search);

                        let highlightedName;

                        if (matchIndex !== -1) {
                            const beforeMatch = name.slice(0, matchIndex);
                            const matchText = name.slice(matchIndex, matchIndex + search.length);
                            const afterMatch = name.slice(matchIndex + search.length);

                            highlightedName = (
                                <span className="text-lg">
                                    {beforeMatch}
                                        <span className="font-bold">{matchText}</span>
                                    {afterMatch}
                                </span>
                            );
                        } else {
                            highlightedName = <span className="text-lg">{name}</span>;
                        }

                        return (
                            <div key={coin.id} onClick={() => handleClick(coin.id)} className="header-search__result flex items-center gap-2 hover:bg-gray-200 py-2 px-3 cursor-pointer text-left">
                                <img src={coin.icon} alt={coin.name} className="header-search__icon w-7 h-7 rounded-[50%]" />
                                {highlightedName}
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="header-search__no-results absolute top-full left-0 w-full bg-white shadow-lg rounded-lg z-10 flex items-center justify-center">
                    <span className="text-sm font-bold text-center pt-5 px-3">No results found</span>
                </div>
            ) : null}
        </div>
    )
} 