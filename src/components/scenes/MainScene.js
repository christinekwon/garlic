import * as Dat from 'dat.gui';
import { Scene, Color, CubeTextureLoader, TextureLoader } from 'three';
import { Moon, Clove, Mesh } from 'objects';
import { BasicLights } from 'lights';
import * as THREE from "three";

import POSX from "./textures/Skybox/posx.jpg";
import NEGX from "./textures/Skybox/negx.jpg";
import POSY from "./textures/Skybox/posy.jpg";
import NEGY from "./textures/Skybox/negy.jpg";
import POSZ from "./textures/Skybox/posz.jpg";
import NEGZ from "./textures/Skybox/negz.jpg";
import CLOUDS from "./textures/Clouds/clouds.jpg";
import GALAXY from "./textures/Galaxy/galaxy.png";
import GALAXY1 from "./textures/Galaxy/galaxy1.png";
import CLOUD from "./textures/Cloud/cloud.png";
import RAINBOW from "./textures/Rainbow/rainbow.png";
import RAINBOW_SQ from "./textures/Rainbow/rainbow_sq.png";


class MainScene extends Scene {

    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            // gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
            color: 0,
            count: 1,
        };

        // lite pink 0xffd9f0
        // darker pink 0xffa6db
        // lav e3c4ff
        // purp c280ff
        // mint bffff9
        // dark mint 70fff2

        this.interval = 200;

        const colors = [
            // [255, 255, 255],
            // [0, 0, 0],
            // [0, 0, 0]
            [255, 217, 240],
            [255, 194, 231],
            [234, 212, 255],
            [220, 181, 255],
            [255, 222, 222],
            [255, 204, 204],
            [217, 255, 251],
            [289, 255, 249],

            // 0xffd9f0,
            // 0xffa6db,
            // 0xead4ff,
            // 0xc280ff,
            // 0xbffff9,
            // 0x70fff2,
            // ffdede ffcccc
        ]


        colors.forEach(color => {
            color[0] = color[0] / 255.0;
            color[1] = color[1] / 255.0;
            color[2] = color[2] / 255.0;
        })

        this.colors = colors;


        // light blue
        this.background = new Color(0xe3f4ff);

        // // midnight
        // this.background = new Color(0x040017);


        // black
        // this.background = new Color(0x89ADFF);
        this.background = new Color(0x000000);

        var metalMap = new CubeTextureLoader()
            .load([
                POSX, NEGX,
                POSY, NEGY,
                POSZ, NEGZ
            ]);
        // console.log(GALAXY);
        // var metalMap = new TextureLoader().load(RAINBOW);
        // metalMap.mapping = THREE.EquirectangularReflectionMapping;
        // var metalMap = new CubeTextureLoader()
        // .load( [
        //     RAINBOW_SQ, RAINBOW_SQ,
        //     RAINBOW_SQ, RAINBOW_SQ,
        //     RAINBOW_SQ, RAINBOW_SQ
        // ] );

        this.moon = new Moon(this, metalMap);
        // const mesh = new Mesh(this, metalMap);
        // this.add(mesh);

        // let bubPos = 4;
        // let interBub0 = bubPos*Math.sin(Math.PI / 8);
        // let interBub1 = bubPos*Math.sin(Math.PI / 4);
        // let interBub2 = bubPos*Math.sin(Math.PI / 8 * 3);

        // let bubPos = 1.75;
        let offset = 0.000;
        let bubPos = 0;
        let interBub0 = bubPos * Math.sin(Math.PI / 6);
        let interBub1 = bubPos * Math.sin(Math.PI / 3);

        this.Cloves = [
            //front right back left

            // new Clove(this, metalMap, offset, offset, -bubPos, 0, 1),
            // new Clove(this, metalMap, interBub0 + offset, offset, -interBub1 - offset, -Math.PI / 6, 1),
            // new Clove(this, metalMap, interBub1 + offset, offset, -interBub0 + offset, -Math.PI / 3, 1),
            // new Clove(this, metalMap, bubPos, offset, offset, -Math.PI/2, 1),
            // new Clove(this, metalMap, interBub1 + offset, offset, interBub0 + offset, Math.PI / 3 * 4, 1),
            // new Clove(this, metalMap, interBub0 + offset, offset, interBub1 + offset, -Math.PI / 6 * 5, 1),
            // new Clove(this, metalMap, offset, offset, bubPos, Math.PI, 1),
            // new Clove(this, metalMap, -interBub0 - offset, offset, interBub1 + offset, Math.PI / 6 * 5 , 1),
            // new Clove(this, metalMap, -interBub1 - offset, offset, interBub0 + offset, -Math.PI /3 * 4, 1),
            // new Clove(this, metalMap, -bubPos, offset, offset, Math.PI/2, 1),
            // new Clove(this, metalMap, -interBub1 - offset, offset, -interBub0 - offset, Math.PI/3, 1),
            // new Clove(this, metalMap, -interBub0 - offset, offset, -interBub1 - offset, Math.PI/6, 1),

            new Clove(this, metalMap, offset, offset, -bubPos, 0, 1),
            new Clove(this, metalMap, interBub0, offset, -interBub1, -Math.PI / 6, 1),
            new Clove(this, metalMap, interBub1, offset, -interBub0, -Math.PI / 3, 1),
            new Clove(this, metalMap, bubPos, offset, offset, -Math.PI / 2, 1),
            new Clove(this, metalMap, interBub1, offset, interBub0, Math.PI / 3 * 4, 1),
            new Clove(this, metalMap, interBub0, offset, interBub1, -Math.PI / 6 * 5, 1),
            new Clove(this, metalMap, offset, offset, bubPos, Math.PI, 1),
            new Clove(this, metalMap, -interBub0, offset, interBub1, Math.PI / 6 * 5, 1),
            new Clove(this, metalMap, -interBub1, offset, interBub0, -Math.PI / 3 * 4, 1),
            new Clove(this, metalMap, -bubPos, offset, offset, Math.PI / 2, 1),
            new Clove(this, metalMap, -interBub1, offset, -interBub0, Math.PI / 3, 1),
            new Clove(this, metalMap, -interBub0, offset, -interBub1, Math.PI / 6, 1),

        ]

        // this.add(this.moon);
        for (let Clove of this.Cloves) {
            this.add(Clove);
            console.log(Clove.xPos + " " + Clove.zPos);
        }

        const lights = new BasicLights();
        this.add(lights);
        this.decay.bind(this);
        this.rot180.bind(this);
        this.rot360.bind(this);
        this.rotrandom.bind(this);
        this.pulse.bind(this);
    }

    decay() {
        for (let clove of this.Cloves) {
            clove.decay();
        }
    }

    rot90() {

        for (let clove of this.Cloves) {
            clove.maxRot = Math.PI / 2;
            clove.rotate();
        }
    }


    rot180() {

        for (let clove of this.Cloves) {
            clove.maxRot = Math.PI;
            clove.rotate();
        }
    }

    rot360() {
        for (let clove of this.Cloves) {
            clove.maxRot = Math.PI * 2;
            clove.rotate();
        }
    }

    rotrandom() {
        let count = Math.floor(Math.random() * this.Cloves.length) + 1;
        console.log(count);
        for (let i = 0; i < count; i++) {
            this.Cloves[i].maxRot = Math.PI / 2;
            setTimeout(() => {
                this.Cloves[i].rotate();
            }, i * 1000);
        }
    }

    pulse() {
        for (let i = 0; i < this.Cloves.length; i++) {
            setTimeout(() => {
                this.Cloves[i].pulse();
            }, i * 500);
        }
    }


    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;

        // orig
        // this.rotation.y = (rotationSpeed * timeStamp) / 1000;

        // every second
        // this.rotation.y = (2 * Math.PI * timeStamp) / 60000;

        // // every minute
        this.rotation.y = (2 * Math.PI * timeStamp) / 60000;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
        // if (this.state.count == this.colors.length * this.interval) {
        //     this.state.count = 0;
        //     this.state.color = 0;
        // }
        // else if (this.state.count % this.interval == 0) {
        //     this.state.color += 1;
        //     this.state.count += 1;
        // }
        // let distance = (this.state.count % this.interval)
        // // change bg
        // if (this.state.color < this.colors.length - 1) {
        //     let color = new Color(
        //         this.colors[this.state.color][0] + (this.state.count % this.interval) * ((this.colors[this.state.color + 1][0] - this.colors[this.state.color][0]) / this.interval),
        //         this.colors[this.state.color][1] + (this.state.count % this.interval) * ((this.colors[this.state.color + 1][1] - this.colors[this.state.color][1]) / this.interval),
        //         this.colors[this.state.color][2] + (this.state.count % this.interval) * ((this.colors[this.state.color + 1][2] - this.colors[this.state.color][2]) / this.interval)
        //     );
        //     this.background = color;
        // }
        // else {
        //     let color = new Color(
        //         this.colors[this.state.color][0] + (this.state.count % this.interval) * ((this.colors[0][0] - this.colors[this.state.color][0]) / this.interval),
        //         this.colors[this.state.color][1] + (this.state.count % this.interval) * ((this.colors[0][1] - this.colors[this.state.color][1]) / this.interval),
        //         this.colors[this.state.color][2] + (this.state.count % this.interval) * ((this.colors[0][2] - this.colors[this.state.color][2]) / this.interval)
        //     );
        //     this.background = color;
        // }

        // this.state.count++;
    }


}

export default MainScene;