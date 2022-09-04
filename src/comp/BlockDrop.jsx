import gs from "../gamestate";
import Block from "./Block";



const BlockDrop = ({stackCount})=>{



return(
    <>
        {gs.drop.map((ele,ind)=>{
          return(
          <Block position={[ele.px, ele.py, ele.pz]} size={[ele.sx,1,ele.sz]} myargs={[ele.sx,1,ele.sz]} colorNum={63} key={`dropblock${ele.py}`} mymass={1} arrind={0}/>
          )})
        }
    </>
)
}
export default BlockDrop;