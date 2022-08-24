import { useState } from 'react'
import styles from './styles.module.css'
import SearchIcon from './searchIcon.svg'

type Props = {
    mainColor: string;
    onSearch: (searchValue: string) => void;
}

export const SearchInput = ({mainColor,  onSearch}: Props) => {

    const [focused, setFocused] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === 'Enter') {
            onSearch(searchValue)
        }
    }

    return (
        <div 
            className={styles.container} 
            style={{ borderColor: focused ? mainColor : '#FFF'}}
        
        >
            
            <div 
                className={styles.button} 
                onClick={() => onSearch(searchValue)}
            >
                <SearchIcon color={mainColor} />
            </div>
            <input 
                type="text" 
                className={styles.input}  
                placeholder='Type what you are looking for'
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyUp={handleKeyUp}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
        </div>
    )

}

export default SearchInput;
