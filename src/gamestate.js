
import * as THREE from 'three'

const gs = {
    stack: [{
        px:0,
        pz:0,
        sx:10,
        sz:10,
        py:0,
        showgoodstack:false,
    }],
    drop: [],
    maxSize: 10,
    growthgain: 3,
    x: 0,
    z: 0,
    dir: false,
    ob:{
        px:0,
        pz:0,
        sx:10,
        sz:10,
        py:0,
        showgoodstack:false
    },

    campos: new THREE.Vector3(5,5,5),
    camtarget: new THREE.Vector3(0,0,0),
    camupdate: false,

    
    time: 0,
    goodcount: 0
}

export default gs;