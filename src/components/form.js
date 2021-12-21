
import { useEffect, useState } from "react";

import '../css/form.css';

//import data from '../data/data.js';


export default function Form() {

  

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: 'logo192.png'
    });

    const [allMemeImages, setAllMemeImages] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemeImages(data.data.memes))
    },[])


    function getMemeImage() {
        const itemsArr = allMemeImages
        const randomItem = Math.floor(Math.random() * itemsArr.length);
        const url = itemsArr[randomItem].url;
        setMeme(prevMeme => ({ ...prevMeme, randomImage: url }));
    }
    function getText(e) {
        const {name,value} = e.target
        setMeme(prevMeme => ({ ...prevMeme, [name]: value }));   
    }
    
    function trigger() {
        getMemeImage();
    }

    return (
        <main>
            <form className="input-container" action="#">
                <div >
                    <input name="topText" value={meme.topText} onChange={getText} className="input" type="text" placeholder="Top text" />
                    <input name="bottomText" value={meme.bottomText} onChange={getText} className="input" type="text" placeholder="Bottom text" />
                </div>
                <input className="btn" type="button" value="Get a New Meme Image" onClick={trigger} />
                <div className="meme">
                    <img src={meme.randomImage} alt="Image" />
                    <h2 className="meme--text top">{meme.topText}</h2>
                    <h2 className="meme--text bottom">{meme.bottomText}</h2>
                </div>
                
            </form>
        </main>    
    )
}
