import { useRef } from 'react'
import { useFrame } from "react-three-fiber";
import * as THREE from 'three'
import gs from '../gamestate';



const GoodStack = ({size,position, arrind})=>{
  const ref = useRef()

    function rads(n1,n2,n3){
        const r = Math.PI/180
        return [n1*r,n3*r,n2*r]
      }

      function rectShape(lg=10,wd=10,t=5){
        const shape = new THREE.Shape();
    
        var l = lg/2   
        var w = wd/2
    
    
        //outer box
        shape.moveTo(w,l)
        shape.lineTo(w,-l)
        shape.lineTo(-w,-l)
        shape.lineTo(-w,l)
        shape.lineTo(w,l)
    
        l=l+t
        w=w+t
        
        //innner box
        shape.lineTo(w,l)
        shape.lineTo(-w,l)
        shape.lineTo(-w,-l)
        shape.lineTo(w,-l)
        shape.lineTo(w,l)
        
        return shape;
    
      }

      useFrame(()=>{
        if(ref.current.material.opacity>0){
          // console.log(ref.current.material.opacity)
          ref.current.material.opacity-=.01;
        }
        if(ref.current.material.opacity<0 && gs.stack[arrind].showgoodstack){
          gs.stack[arrind].showgoodstack = false;
        }

    })

    return(
        <>
            <group rotation={rads(90,0,0)} position={[position[0], position[1]-.5, position[2]]}>
              <mesh ref={ref}>
                <shapeGeometry attach="geometry" args={[rectShape(size[2],size[0],1)]} />
                <meshBasicMaterial attach="material"  side={THREE.DoubleSide} color={"white"} transparent />
              </mesh>
            </group>
        </>
    )


}
export default GoodStack
















