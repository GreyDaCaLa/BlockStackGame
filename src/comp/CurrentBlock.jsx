import { useEffect, useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import gs from "../gamestate";
import Block from "./Block";




const CurrentBlock = ({gca, setGCA,setCount, myaudio, setGameOver,gameover})=>{
    const [once,setOnce] = useState(false)
    const mb = useRef()



    function matchStack(){
      gs.goodcount+=1
      var gainx = 0
      var gainz = 0

      if(gs.goodcount>3){

        if( gs.ob.sx < gs.maxSize ){
          if(gs.ob.sx>gs.maxSize-gs.growthgain){
            gainx = gs.maxSize-gs.ob.sx
          }else{
            gainx=gs.growthgain
          }
        }

        if( gs.ob.sz < gs.maxSize ){
          if(gs.ob.sz>gs.maxSize-gs.growthgain){
            gainz = gs.maxSize-gs.ob.sz
          }else{
            gainz=gs.growthgain
          }
        }

      }


      gs.ob={
        px: gs.dir? gs.ob.px + gainx/2 :gs.ob.px,
        pz: gs.dir? gs.ob.pz : gs.ob.pz +gainz/2,
        sx: gs.dir? gs.ob.sx + gainx : gs.ob.sx,
        sz: gs.dir? gs.ob.sz : gainz + gs.ob.sz,
        py: gs.ob.py+1,
        showgoodstack: true
      }


      gs.stack.push(gs.ob)


    }

    function regStack(cendiff){


      //which side the chop block should be from origin
      var chopdir = cendiff/Math.abs(cendiff)

      
      //calculate new topstack block
      gs.ob={
        px: gs.dir? mb.current.position.x + cendiff/2 : mb.current.position.x,
        pz: gs.dir? mb.current.position.z : mb.current.position.z + cendiff/2,
        sx: gs.dir? gs.ob.sx-Math.abs(cendiff) : gs.ob.sx,
        sz: gs.dir? gs.ob.sz : gs.ob.sz-Math.abs(cendiff),
        py: gs.ob.py+1,
        showgoodstack: false
      }
      
      var val = gs.dir?gs.ob.px:gs.ob.pz
      
      var originside = val/Math.abs(val)
      //side of origin issue fix
      var originsidefix = -1*(originside*chopdir)
      
      
      //calculate chop chunk to add to drop array
      const other = {
        px: gs.dir? (originsidefix*Math.abs(gs.ob.px)+ gs.ob.sx/2 + Math.abs(cendiff/2))*(-1*chopdir) : mb.current.position.x,
        pz: gs.dir? mb.current.position.z :  (originsidefix*Math.abs(gs.ob.pz)+ gs.ob.sz/2 + Math.abs(cendiff/2))*(-1*chopdir),
        sx: gs.dir? Math.abs(cendiff) : gs.ob.sx,
        sz: gs.dir? gs.ob.sz : Math.abs(cendiff),
        py: gs.ob.py,
        showgoodstack: false
      }
      
      
      gs.goodcount=0
      gs.stack.push(gs.ob)

      gs.drop.push(other)
      

    }

    function gameOver(){
      window.removeEventListener("keydown",actionbuttonDown)
      window.removeEventListener("keyup",actionbuttonUp)
      window.removeEventListener("click",actionClickDown)
        gs.goodcount=0
  
        const other = {
          px: mb.current.position.x,
          pz: mb.current.position.z,
          sx: gs.ob.sx,
          sz: gs.ob.sz,
          py: gs.ob.py+1,
          showgoodstack: false
        }
      
        gs.drop.push(other)

        setCount(gs.stack.length+1)
        setGameOver(true)

    }

    function putDown(){
      // console.log("try:",gs.stack.length)
      //differnce in center position from previous
      var cendiff = gs.dir? gs.ob.px-mb.current.position.x : gs.ob.pz-mb.current.position.z

      var perfectstack = Math.abs(cendiff)<.1
      // console.log("Res: ",cendiff, perfectstack )

      var nomo = gs.dir? Math.abs(gs.ob.sx) < Math.abs(cendiff) : Math.abs(gs.ob.sz) < Math.abs(cendiff)
      // console.log("nomo: ", nomo)




      if(!nomo){
        if(perfectstack){
          matchStack(cendiff)
          // console.log("gs.goodcount", gs.goodcount)
          myaudio[ myaudio.length-1 - gs.goodcount].play()
        }else{
          regStack(cendiff)
        }

      }else{
        // console.log("calling game over")
        gameOver()
      }

      
      
      gs.campos.set(gs.campos.getComponent(0),gs.campos.y+.5,gs.campos.z)
      gs.camtarget.set(gs.camtarget.x,gs.camtarget.y+.5,gs.camtarget.z)
      gs.camupdate=true
      gs.time =0      

      gs.dir=!gs.dir
      //updates stack block props to cause re render
      setCount(gs.stack.length+1)
    
    }

    useFrame(()=>{
      if(!gameover){
        gs.time += .01
          if(gs.dir){
              mb.current.position.x = gs.ob.px - 1.3*(gs.ob.sx)*Math.sin(90+gs.time)
          }else{
              mb.current.position.z = gs.ob.pz - 1.3*(gs.ob.sz)*Math.sin(90+gs.time)
          }

      }


    })

    function actionbuttonDown(e){
      // console.log("down",e)
      if(e.key==" " && !once){
        setOnce(true)
        putDown()
      }
    }
    function actionbuttonUp(e){
      // console.log("up",e)
      setOnce(false)
    }
    function actionClickDown(e){
      // console.log("click")
      // if(e.key=="w" && !once){
        // setOnce(true)
        putDown()
      // }
    }

    useEffect(()=>{
        if(!gca){
          window.addEventListener("keydown", actionbuttonDown ) ;
          window.addEventListener("keyup", actionbuttonUp) ;
          window.addEventListener("click", actionClickDown ) ;
          setGCA(true)
        }
      })



    return(
        <>
        {gameover?null:
        <Block myref={mb} position={[gs.ob.px, gs.stack.length, gs.ob.pz]} size={[ gs.ob.sx, 1, gs.ob.sz ]} colorNum={gs.stack.length} arrind={0} />
        }
        </>
    )

}

export default CurrentBlock;