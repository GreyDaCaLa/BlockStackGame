import { useEffect, useRef, useState } from 'react';
import {useThree } from 'react-three-fiber'
import * as THREE from 'three'


const GetCamHelper = ()=>{
    const camref= useRef()
    const [added,setAdd] = useState(false)
    const { camera } = useThree();
   
    const vec3 = new THREE.Vector3(0,0,0)
    // other.position.set(100,1,1)

    const defaultdem = {
        bottom: -473.5,
      far: 1000,
      left: -677.5,
      near: 0.1,
      right: 677.5,
      top: 473.5,
    }
    const ddarray = [
      defaultdem.left,
      defaultdem.right,
      defaultdem.top,
      defaultdem.bottom,
      defaultdem.near,
      defaultdem.far,

    ]
    const [cc,setCC] = useState( ddarray)
    
    useEffect(()=>{

        if(!added){
            window.addEventListener("keydown", (e) => {
              // console.log(e)
              if(e.key==" "){
                // console.log("camref: ",camera)
                const otherddarray = [
                  camera.left*.5,
                  camera.right*.5,
                  camera.top*.5,
                  camera.bottom*.5,
                  camera.near,
                  camera.far*.5,
            
                ]
                // console.log(otherddarray)
                setCC(otherddarray)
                // console.log("done")
              }
            }) ;
      
            setAdd(true)
          }

    },[])



    return (
        <cameraHelper args={[new THREE.OrthographicCamera(...cc)]} />
    )

}




export default GetCamHelper;