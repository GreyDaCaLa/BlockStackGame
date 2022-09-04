import { useEffect, useState } from "react"
import { useFrame } from "react-three-fiber"
import gs from "../gamestate"
import Block from "./Block"




function BlockStack({stackCount}){

    return(
        <>
                  {/* THE STACK!!!! */}
            {gs.stack.map((ele,ind)=>{
              return(
              <Block 
                position={[ele.px, ind, ele.pz]} 
                size={[ele.sx,1,ele.sz]} 
                colorNum={ind} key={`block${ind}`} 
                mymass={0} 
                myargs={[ele.sx,1,ele.sz]}
                arrind={ind}
              />
              )})
            }
        </>
    )
}

export default BlockStack;