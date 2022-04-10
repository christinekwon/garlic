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
            count: 0,
            stopColor: false,
            colorCount: 0.01,
            decay: false,
            decayCount: 0,
            rotate: false,
            rotateCount: 0,
            pulse: false,
            pulseCount: 0,

        };

        this.maxRot = Math.PI / 2;
        // this.maxRot = Math.PI;
        this.rotInterval = 300.0;
        this.maxPulse = 0.2;
        this.pulseInterval = 60.0;

        this.initTimestamp = 0;
        this.translationFactor = 2.0 / 300;

        let initY = 0;
        this.name = "CLOVE";
        this.xPos = x;
        this.yPos = y;
        this.zPos = z;
        this.yRot = yRot;


        // color= 0xbcb6ff;

        // eth
        this.color = 0xffb3c1;

        // color = 0xffcccc;
        // color = 0xffbdc9;

        // let color = 0xffffff;

        const colors = [
            [255, 179, 193],
            // 0x2c4037
            [44, 64, 55]
        ];

        colors.forEach(color => {
            color[0] = color[0] / 255.0;
            color[1] = color[1] / 255.0;
            color[2] = color[2] / 255.0;
        })
        this.interval = 10;

        this.colors = colors;

        const loader = new OBJLoader();

        // 1.5 1.5 444444
        // 1.2 1. 000000
        // 333333 metal 1.0
        var material = new THREE.MeshStandardMaterial({
            color: this.color,
            // emissive: 0x111111,
            // emissive: 0x444444,
            emissive: 0x333333,
            metalness: 1.5, // between 0 and 1
            roughness: 0, // between 0 and 1
            envMap: metalMap,
            envMapIntensity: 1.6
        });

        // material = new THREE.MeshPhongMaterial( {
        // 	color: 0xffffff,
        // })

        const overrideMaterial = new THREE.MeshBasicMaterial({ color: "green" });


        let mesh;

        loader.load(CLOVE, obj => {
            mesh = obj.children[0];
            obj.position.set(x, -0.5, z);
            // cool spiral
            obj.rotation.set(0, yRot, 0);
            // obj.rotation.set(0, yRot, 0);
            // obj.rotation.setFromRotationMatrix(obj.matrix);
            // obj.rotateZ(Math.PI/6);
            // obj.scale.multiplyScalar();
            obj.children[0].material = material;
            obj.matrixAutoUpdate = false;
            obj.updateMatrix();
            this.add(obj);
            this.obj = obj;
            this.sphere = mesh;

        });

        parent.addToUpdateList(this);

        // setTimeout(() => {
        // 	this.state.startGrowing = 1;
        // }, 3000);
        this.decay.bind(this);
        this.rotate.bind(this);
        this.reset.bind(this);
    }

    rotate() {

        this.state.rotate = true;
        this.obj.children[0].scale.multiplyScalar(0.995);
    }

    decay() {
        console.log('decay');
        this.state.decay = true;
        this.state.decayCount = 0;
    }

    rotate() {
        console.log('rotate');
        this.state.rotate = true;
        this.state.rotateCount = 0;
    }

    reset() {

        this.state.decay = false;
        this.state.decayCount = 0;
        this.state.rotate = false;
        this.state.rotateCount = 0;
        this.state.pulse = false;
        this.state.pulseCount = 0;

        console.log(this.obj.children[0]);
        this.obj.children[0].material.color = new THREE.Color(this.color);
        this.obj.children[0].material.metalness = 1.5;
        this.obj.children[0].material.roughness = 0;

        this.obj.children[0].scale.set(1, 1, 1);
        console.log(this.yRot);
        // this.obj.children[0].rotation.z = 0;
        this.obj.children[0].rotation.set(0, 0, 0);
        // this.obj.children[0].position.set(this.xPos, -0.5, this.zPos);

    }

    pulse() {
        console.log('pulse');
        this.state.pulse = true;
        this.state.pulseCount = 0;
    }


    spin() {

        // 1.002 0.998 200
    }

    update(timeStamp) {

        if (this.state.decay) {
            this.state.decayCount++;
            const metalness = this.obj.children[0].material.metalness;
            const roughness = this.obj.children[0].material.roughness;

            if (this.state.decayCount % 5 == 0 && metalness > 0) {
                this.obj.children[0].scale.multiplyScalar(0.995);
                this.obj.children[0].material.metalness = metalness - 0.01;
                this.obj.children[0].material.roughness = roughness + 0.01;

                if (this.state.colorCount < 1.3) {

                    let color = new THREE.Color(
                        this.colors[0][0] + ((this.colors[1][0] - this.colors[0][0]) * this.state.colorCount),
                        this.colors[0][1] + ((this.colors[1][1] - this.colors[0][1]) * this.state.colorCount),
                        this.colors[0][2] + ((this.colors[1][2] - this.colors[0][2]) * this.state.colorCount)
                    );
                    this.obj.children[0].material.color = color;
                    this.state.colorCount += 0.03;
                }
            }

            if (this.state.decayCount == 500) {
                console.log("the end");
                this.state.decay = false;
            }
        }

        if (this.state.rotate) {
            // rotating 
            this.obj.children[0].rotateZ(this.maxRot / this.rotInterval);
            if (this.state.rotateCount >= this.rotInterval - 1) {
                this.state.rotate = false;
                this.state.rotateCount = 0;
            }
            this.state.rotateCount++;

        }

        if (this.state.pulse) {
            // rotating 
            if (this.state.pulseCount < this.pulseInterval / 2) {
                this.obj.children[0].scale.addScalar(this.maxPulse / this.pulseInterval);
            } else if (this.state.pulseCount >= this.pulseInterval / 2) {
                this.obj.children[0].scale.addScalar(-1 * this.maxPulse / this.pulseInterval);
            }
            if (this.state.pulseCount >= this.pulseInterval) {
                this.state.pulse = false;
                this.state.pulseCount = 0;
            }
            this.state.pulseCount++;

        }


    }
}

export default Clove;