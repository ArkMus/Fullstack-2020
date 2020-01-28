import React from 'react'

const Filter = ({ search, handleSearchChange }) => {
    return (
        <div>
            <form>
                <input value={search} onChange={handleSearchChange} />
            </form>
        </div>
    )
}

export default Filter