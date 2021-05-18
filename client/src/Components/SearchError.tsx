import React from 'react'

function SearchError() {
    return(
        <div style={{display:'flex', flexDirection:'column', textAlign:'center'}}>
            <h3 style={{paddingBottom: '2rem'}}>Ingen sökträff</h3>
            <p>Tryck ENTER för att rensa sökningen</p>
        </div>
    )
}

export default SearchError