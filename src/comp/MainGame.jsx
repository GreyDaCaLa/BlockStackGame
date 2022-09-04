import { Physics } from "@react-three/cannon";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "react-three-fiber";
import gs from "../gamestate";
import BlockDrop from "./BlockDrop";
import BlockStack from "./BlockStack";
import CameraControl from "./CameraControl";
import CurrentBlock from "./CurrentBlock";
import Orbit from "./Orbit";
import * as THREE from 'three'
import { useHelper } from "@react-three/drei";
import GetCamHelper from "./GetCamHelper";
import { Redirect } from "react-router-dom";

function MainGame({screensize}) {
  const [gca, setGCA] = useState(false);
  const [count, setCount] = useState(1);
  const [gameover,setGameOver] = useState(false)
  const [myaudio,setMA] = useState([]);
  const [zoomnum,setZoomnum] = useState(30)
  const showcam = false


  const getSoundArray = ()=>{

    var names = [
      "A4.mp3",
      "Ab4.mp3",
      "B4.mp3",
      "Bb4.mp3",
      "C4.mp3",
      "C5.mp3",
      "D4.mp3",
      "D5.mp3",
      "Db4.mp3",
      "Db5.mp3",
      "E4.mp3",
      "E5.mp3",
      "Eb4.mp3",
      "Eb5.mp3",
      "F4.mp3",
      "G4.mp3",
      "Gb4.mp3"
    ]


    const audio = names.map((name)=>{
      // console.log("/assets/audio/pianoSounds/"+name)
      return new Audio("/assets/audio/pianoSounds/"+name)
    })

    setMA(audio)

  }

  useEffect(()=>{
    if(myaudio.length <= 1){
      getSoundArray()
    }
    if(window.innerWidth>750){
      setZoomnum(50)
    }
  })



  //default demensions
    //   bottom: -473.5
    // far: 1000
    // left: -677.5
    // near: 0.1
    // right: 677.5
    // top: 473.5

  const orthoPROPS = {
    // left:10,
    // right:-10,
    // top:30,
    // bottom:-30,
    near:-10,
    // far:20,
  }

  return (
    <>
        <div className="InGamePopUpcontainer">
          <div className="row justify-content-center">
    {!gameover?
    
    <div className="RunningGameScorePopUpmessage card  text-center">
      {gs.stack.length}
    </div>
    
    :

            <>
          <div className="GameOverPopUpmessage card  text-center">
            GameOver
          </div>
          <div className="TotalScoremessage card text-center justify-self-start col-5">
            Total Score: {gs.stack.length}
          </div>
          <div className="GoHomeButton card text-center justify-self-end col-5">
            <a href="home" className="GoHomeButton">
            Go Home
            </a>
          </div>
          </>
        }
        </div>
        </div>
        {/* <Canvas camera={{ position: [5, 5, 5] }} > */}
        <Canvas orthographic camera={{zoom:zoomnum,position:[3,3,3], ...orthoPROPS }} >



          <ambientLight intensity={0.2} />

          <group scale={[1,1,1]}>
          <mesh position={[6, 2.5+gs.stack.length/2, 0]}>
            <pointLight />
            {/* <sphereBufferGeometry args={[0.2, 20]} />
            <meshPhongMaterial emissive="yellow" /> */}
          </mesh>


          <group position={[0,0,0]} scale={[.5,.5,.5]}>
            <Physics>
              <CurrentBlock gca={gca} setGCA={setGCA} setCount={setCount} myaudio={myaudio} setGameOver={setGameOver} gameover={gameover} />
              <BlockStack stackCount={count} />
              <BlockDrop /> 
            </Physics>
          </group >



          {/* <axesHelper args={[5]} /> */}
          </group>
 

          <CameraControl showcam={showcam} />
          <Orbit />
        </Canvas>


    </>
  );
}

export default MainGame;
