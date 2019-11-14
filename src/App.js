import React, {useState,useEffect, Fragment} from 'react';

import './App.css';
import posed from 'react-pose';
import Sound from 'react-sound';

import soundFile from './assets/meditacao.mp3';

import Lottie from 'lottie-react-web';

import playPause from './assets/playyy.json';

const CardAnimator = posed.div({
    up: {y: ({data}) => data, flexDirection: 'column', transition:({ i }) => ({ duration: (i + 1) * 350 })},
    down: {height: 480, backgroundColor:'#fff',transition:{ duration: 500}},
    props: {i: 0}
    
})
const ImageAnimator = posed.div({
    props: {i: 0}
    
})

const TextAnimator = posed.div({
    up: {opacity: 0, transition: ({ i }) => ({ duration: (i + 1) * 350 })},
    down: {opacity: 0,transition:{ duration: 500}},
    props: {i: 0}
})

const DetailsAnimator = posed.div({
    down: {display: 'flex',height: '100%',transition: {duration: 800}}
})

function App() {

  const [animations,setAnimations] = useState([])
  const [isAnimate, setIsAnimate] = useState();
  const [animationName, setAnimationName] = useState("");
  const [textsRendering, setTextRendering] = useState(false);
  const [audioIsPlay,setAudioIsPlay] = useState(false);

  

  const [data, setData]  = useState([
    {
      objective: "Ficar Sussa",
      description: "Relaxar, reduzir ansiedade e stress",
      objectiveImage: "https://cwsmgmt.corsair.com/newscripts/landing-pages/wallpaper/v4/Wallpaper-v4-2560x1440.jpg",
    },
    {
      objective:"Olha a foca",
      description: "Aumentar o foco",
      objectiveImage: "https://images3.alphacoders.com/975/thumb-1920-975999.png"
    },
    {
      objective:"Dormir de Boas",
      description: "Dormir melhor",
      objectiveImage: "https://wallpaperaccess.com/full/24848.jpg"
    }
  ])

  const [audio, setAudio] = useState(new Audio(soundFile));

  useEffect(() => {
    const placeholderAnimations = [];

    

    data.forEach(element => {
      placeholderAnimations.push("");
    })

    setAnimations(placeholderAnimations);
  },[])

  useEffect(() => {
    
    if(audioIsPlay) {
      

      audio.play();
    }
    else {
      audio.pause();
    }
  },[audioIsPlay])

  function animationOrder(index) {
      
      if(index === isAnimate) {
        if(animationName == "") {

          return "up";
        }
        if(animationName == "up") {
          
          return "down";
        }

        
      }
    
  }

  

  function DetailsRender(index) {
    if(animationOrder(index) == "down" || animationOrder(index) == "undefined") {
      return true;
    }
  }

  function renderTexts(index,Objective, Description) {
    if(!textsRendering) {
      return (
        <TextAnimator i={index} className="CardTexts" pose={animationOrder(index)}>
          <h3 className="Objective">{Objective}</h3>
          <h5 className="Description">{Description}</h5>
        </TextAnimator>
      )
    }
    else {
      return (
        <div onClick={() => setAudioIsPlay(!audioIsPlay)}>
          <Lottie
            
            width={100}
            height={100}
            options={{
              animationData: playPause,
              loop:true,

            }}
            isPaused={!audioIsPlay}
          />
        </div>
      )
    }
  }

  //bgcolor: 282c34, color:09d3ac

  return (
    <div  className="App">
      <Fragment>
        <h2 className="Title">Objetivos</h2>
        {
          data.map((value,index) => (
            <CardAnimator i={index} onPoseComplete={(e) => {if(animationName === "up") {setTextRendering(true)};setAnimationName(e)}} data={-72 + (-290 * index)} onClick={() => {window.scrollTo(0,0);document.body.style.overflow = "hidden";setIsAnimate(index)}} pose={animationOrder(index)} key={index} className="Card">
              <ImageAnimator i={index} pose={animationOrder(index)} className="ImageDiv">
                <img className="CardImage" src={value.objectiveImage}></img>
              </ImageAnimator>
              
              {
                renderTexts(index, value.objective, value.description)
              }
            </CardAnimator>
          ))
        }
      </Fragment>
    </div>
  );
}

export default App;
