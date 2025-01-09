import { useState } from "react";
const Header = ({ handleAdd }) => {
    const [inputText , setInputText] = useState('')

    return (
        <div>
            <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
            <button onClick={() => {
                handleAdd(inputText)
                setInputText('')
            }}>Add</button> 
        </div>
    )
}
export default Header;