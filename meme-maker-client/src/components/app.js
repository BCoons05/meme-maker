import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Meme from "./meme"

function App() {
  const [memes, setMemes] = useState([])

  useEffect(() => {
    axios.get("https://rec-meme-api.herokuapp.com/memes")
      .then(res => setMemes(res.data))
  }, [])

  const deleteMeme = id => {
    axios
    .delete(`https://rec-meme-api.herokuapp.com/delete-meme/${id}`)
    .then(setMemes(memes.filter(meme => meme.id !== id)))
    .catch(err => console.log('delete error', err))
  }

  const renderMemes = () => {
    return memes.map(meme => {
      return <Meme
        key={meme.id}
        meme={meme}
        deleteMeme={deleteMeme}
      />
    })
  }  
  
  return (
    <div className="app">
      {renderMemes()}
    </div>
  );
}

export default App;