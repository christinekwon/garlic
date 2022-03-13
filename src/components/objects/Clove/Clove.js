import { Group, Scene } from "three";
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import CLOVE from './clove.obj';

class Clove extends Group {
  constructor(parent, metalMap, x, y, z, yRot, grow) {
    // Call parent Group() constructor
	super();

    // Init state
    this.state = {
		// gui: parent.state.gui,
		bob: false,
		spin: this.spin.bind(this),
		// twirl: 0,
		count: 0,
		// count: radius * 100,
		grow: grow,
		startGrowing: 0,
		rise: false,
		riseCount: 0
	};

	this.initTimestamp = 0;
	this.translationFactor = 2.0 / 300;
  
	let initY = 0;
	this.name = "CLOVE"; 
	this.xPos = x;
	this.yPos = y;
	this.zPos = z;


	// color= 0xbcb6ff;

	// eth
	let color = 0xffb3c1;
	// color = 0xffffff;

	

	const loader = new OBJLoader();

	var material = new THREE.MeshStandardMaterial( {
		color: color,
		// emissive: 0x000000,
		emissive: 0x444444,
		metalness: 1.5,   // between 0 and 1
		roughness: 0, // between 0 and 1
		envMap: metalMap,
		envMapIntensity: 1.5
	} );

	// material = new THREE.MeshPhongMaterial( {
	// 	color: 0xffffff,
	// })



	let mesh;

	loader.load(CLOVE, obj => {
		mesh = obj.children[0];
		obj.position.set(x, y, z);
		obj.rotation.set(0,yRot,0);
		// obj.scale.multiplyScalar();
		obj.children[0].material = material;
		obj.matrixAutoUpdate = false;
		obj.updateMatrix();
		this.add(obj);
		this.sphere = mesh;

	});

    parent.addToUpdateList(this);

	// setTimeout(() => {
	// 	this.state.startGrowing = 1;
	// }, 3000);
  }

  spin() {

	// 1.002 0.998 200
	}

	update(timeStamp) {
		if (this.state.startGrowing) {
			if (this.state.grow) {
				this.state.count++;
				this.sphere.scale.addScalar(0.01);
				if (this.state.count == 50) {
					this.state.grow = 0;
				}
			}
			else {
				this.state.count--;
				this.sphere.scale.addScalar(-0.01);
				if (this.state.count == 0) {
					this.state.grow = 1;
				}
			}
		}
	}
}

export default Clove;
