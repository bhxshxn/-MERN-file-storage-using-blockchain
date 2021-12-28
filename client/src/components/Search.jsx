import React, { useState } from 'react'
import Fileshow from './Fileshow';

function Search() {
    const [name, setName] = useState('');
    const [form, setForm] = useState("form")
    const submit = (e) => {
        setForm('file')
    }
    if (form == "form") {
        return (
            <>
                <div className="flex-column">
                    <form className="search" onSubmit={(e) => submit(e)}>
                        <input style={{ display: "block" }} type="text" placeholder="Name to Search..." onChange={(e) => setName(e.target.value)} value={name} />
                        <button type="submit">Search</button>
                    </form>
                </div>
            </>
        )
    } else {
        return <Fileshow data={name} />
    }

}

export default Search
