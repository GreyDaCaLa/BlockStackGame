import { useBox } from "@react-three/cannon";
import { useState } from "react";
import * as THREE from 'three'
import gs from "../gamestate";
import GoodStack from "./GoodStack";

const Block = ({position,size,colorNum,myref, mymass=0, myargs=[1,1,1],arrind })=>{
    const [ref,api] = useBox (()=>({ args:myargs, mass: mymass, position:position }))
    const [good,setGood] = useState(false)
    
    

    

    return(
        <>
            <mesh ref={myref?myref:ref} position={position}>
                <boxBufferGeometry attach="geometry" args={size} />
                <meshStandardMaterial attach="material" color={`hsl(${40+(colorNum+1)*5},100%,50%)`} />
            </mesh>
            {gs.stack[arrind].showgoodstack? <GoodStack size={size} position={position} arrind={arrind} />:<></>}
        </>
    )
}

export default Block;