import React from 'react'

const Filter = ({ search, handleSearchChange }) => {
    return (
        <div>
            <form>
                filter shown with <input value={search} onChange={handleSearchChange} />
            </form>
        </div>
    )
}

export default Filter