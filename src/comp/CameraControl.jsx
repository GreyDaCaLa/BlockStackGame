import { useFrame } from "react-three-fiber"
import gs from "../gamestate"
import GetCamHelper from "./GetCamHelper"



const CameraControl = ({showcam})=>{


    useFrame(({camera,scene})=>{
        // console.log(gs.campos)
        if(gs.camupdate){
            camera.position.lerp(gs.campos,0.1)
            scene.orbitControls.target.lerp(gs.camtarget,0.1)
            scene.orbitControls.update()
            const diff = camera.position.clone().sub(gs.campos).length()
            if (diff<0.1) gs.camupdate=false
        }

        const dem = {
            left:camera.left,
            right:camera.right,
            top:camera.top,
            bottom:camera.bottom,
            near:camera.near,
            far:camera.far,
          }

        // console.log("cam control: ",dem)



    })

    return (
<>
    {showcam? <GetCamHelper />:null}
</>
    )
}
export default CameraControl