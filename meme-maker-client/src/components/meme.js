import React from 'react'

function Meme(props){
    const { id, text, favorite, image } = props.meme
    return(
        <div className="meme">
            <div className="img-wrapper">
                <img className="meme-img" src={image} alt="memesaurus" />
            </div>

            <p>{text}</p>
            {favorite ? <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5U0VamZ96OvEJ9RTPdt6gjILvuXSv714gCapv2mOZoFryntEdaw&s" alt="star" /> : null}
            <button onClick={() => props.deleteMeme(id)}>Delete</button>
            <button>Edit</button>
        </div>
    )
}

export default Meme;