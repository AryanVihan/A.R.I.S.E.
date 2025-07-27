import React from 'react'

function Provider({children}) {
    const [selectedChapterIndex,setSelectedChapterIndex]=useState(0);
  return (
    <div>
        <SelectedChapterIndexContext.Provider value={{selectedChapterIndex,setSelectedChapterIndex}}>
            <div>{children}</div>
        </SelectedChapterIndexContext.Provider>
    </div>
  )
}

export default Provider