




function Basicdir () {





    return (
        <>
        <group position={[0,0,0]} scale={[10,10,10]}>



          {/* positive X Y Z */}
          <mesh position={[10, 0, 0]}>
            <boxBufferGeometry attach="geometry" args={[1,1,1]} />
            <meshStandardMaterial attach="material" color={"red"} />
          </mesh>

          <mesh position={[0,10,0]}>
              <boxBufferGeometry attach='geometry' args={[1,1,1]}/>
              <meshStandardMaterial attach='material' color={'blue'}/>
            </mesh>

          <mesh position={[0, 0, 10]}>
            <boxBufferGeometry attach="geometry" args={[1,1,1]} />
            <meshStandardMaterial attach="material" color={"white"} />
          </mesh>

          {/* negative X Y Z */}
          <mesh position={[-10, 0, 0]}>
            <boxBufferGeometry attach="geometry" args={[1,1,1]} />
            <meshStandardMaterial attach="material" color={"orange"} />
          </mesh>

          <mesh position={[0,-10,0]}>
              <boxBufferGeometry attach='geometry' args={[1,1,1]}/>
              <meshStandardMaterial attach='material' color={'green'}/>
            </mesh>

          <mesh position={[0, 0, -10]}>
            <boxBufferGeometry attach="geometry" args={[1,1,1]} />
            <meshStandardMaterial attach="material" color={"yellow"} />
          </mesh>

          {/* black origin */}
          <mesh position={[0, 0, 0]}>
            <sphereBufferGeometry attach="geometry" args={[.1, 20,20]} />
            <meshStandardMaterial attach="material" color={"black"} />
          </mesh>

        </group>
        </>
    );







}



export default Basicdir;