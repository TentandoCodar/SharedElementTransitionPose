import React, {useState,useEffect, Fragment} from 'react';

import './App.css';
import posed from 'react-pose';

const CardAnimator = posed.div({
  up: {y: -70, transition:{duration: 400}}
})

function App() {

  const [animations,setAnimations] = useState([])
  const [isAnimate, setIsAnimate] = useState();
  

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

  useEffect(() => {
    const placeholderAnimations = [];
    data.forEach(element => {
      placeholderAnimations.push("");
    })

    setAnimations(placeholderAnimations);
  },[])

  function animationOrder(index) {
      
      if(index === isAnimate) {
        return "up";
      }
    
  }

  //bgcolor: 282c34, color:09d3ac

  return (
    <div  className="App">
      <Fragment>
        <h2 className="Title">Objetivos</h2>
        {
          data.map((value,index) => (
            <CardAnimator onClick={() => {setIsAnimate(index)}} pose={animationOrder(index)} key={index} className="Card">
              <div className="ImageDiv">
                <img className="CardImage" src={value.objectiveImage}></img>
              </div>
              <div className="CardTexts">
                <h3 className="Objective">{value.objective}</h3>
                <h5 className="Description">{value.description}</h5>
              </div>
            </CardAnimator>
          ))
        }
      </Fragment>
    </div>
  );
}

export default App;
