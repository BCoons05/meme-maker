import React, { useEffect, useState, useRef } from 'react'
import DropzoneComponent from 'react-dropzone-component'
import request from 'superagent'
import axios from 'axios'
import {navigate} from 'hookrouter'

import "../../node_modules/react-dropzone-component/styles/filepicker.css"
import "../../node_modules/dropzone/dist/min/dropzone.min.css"

function MemeForm (props) {
    const [ text, setText ] = useState("")
    const [ favorite, setFavorite ] = useState(false)
    const [ image, setImage ] = useState("")
    const imageRef = useRef(null)

    const componentConfig = () => {
        return{
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        }
    }

    const djsConfig = () => {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    const handleDrop = () => {
        return {
            addedfile: file => {
                let upload = request
                    .post("https://api.cloudinary.com/v1_1/du9lzh9ed/image/upload")
                    .field("upload_preset", "meme-images")
                    .field("file", file)

                upload.end((err, res) => {
                    if(err){
                        console.log("cloudinary error: ", err)
                    }
                    if(res.body.secure_url !== ""){
                        setImage(res.body.secure_url)
                    }
                })
            }
        }
    }

    const handleSubmit = e => {
        e.preventDefault()

        if(props.editMode){
            console.log("Edit mode enabled")
        } else {
            axios
                .post("https://rec-meme-api.herokuapp.com/add-meme", {
                    text,
                    image,
                    favorite
                })
                .then(() => {
                    setText("")
                    setImage("")
                    setFavorite(false)
                    imageRef.current.dropzone.removeAllFiles()
                })
                .then(() => {
                    console.log("Added")
                })
                .catch(err => {
                    console.log("New meme submit error: ", err)
                })
        }
    }

    return(
        <div>
            {props.editMode ? 
            <h1>Edit Meme</h1>
            :
            <h1>Add a meme</h1>
            }
            <form onSubmit={handleSubmit}>
                <DropzoneComponent ref={imageRef} config={componentConfig()} djsConfig={djsConfig()} eventHandlers={handleDrop()}>
                    Drop Da Meme image
                </DropzoneComponent>
                <input type="text" placeholder="enter a caption" value={text} onChange={e => setText(e.target.value)} />
                <div>
                    <input type="checkbox" checked={favorite} onChange={() => setFavorite(!favorite)} />
                    <span>Favorite?</span>
                </div>
                <button type="submit">Submit Da Memer</button>
            </form>
        </div>
    )
}

export default MemeForm