





const growBlock = ()=>{



    return(
        <Block position={[ele.px, ele.py, ele.pz]} size={[ele.sx,1,ele.sz]} colorNum={63} key={`dropblock${ele.py}`} mymass={1} arrind={0}/>
    )




}

export default growBlock