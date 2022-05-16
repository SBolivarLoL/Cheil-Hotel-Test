import React, { useEffect, useState } from 'react';

const App = () => {
  const [hotelesList, setHotelesList] = useState([{}]);

  useEffect(() => {
    fetch("/api/hoteles").then(
      res => res.json()
    ).then(
      data => {
        setHotelesList(data)
      }
    )
  }, [])

  return (
    <div>
      
      {(typeof hotelesList === 'undefined') ? (
        <p>Loading...</p>
      ): (
        hotelesList.map((hotel, i) => (
          <p key={i}>{hotel}</p>
        ))
      )}

    </div>
  )
}

export default App;
