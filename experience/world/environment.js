import GSAP from "gsap"
import GUI from "lil-gui"
import * as THREE from "three"

import Experience from "../experience"

export default class Environment {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        // this.gui = new GUI({
        //     container: document.querySelector(".hero-wrapper")
        // })

        // this.guiObj = {
        //     color: { r: 0, g: 0, b: 0},
        //     intensity: 3
        // }

        this.setSunlight()
        // this.setGui()
    }

    // setGui() {
    //     this.gui.addColor(this.guiObj, "color").onChange(() => {
    //         this.sunLight.color.copy(this.guiObj.color)
    //         this.ambientLight.color.copy(this.guiObj.color)
    //     })
    //     this.gui.add(this.guiObj, "intensity", 0, 10, 0.1).onChange(() => {
    //         this.sunLight.intensity = this.guiObj.intensity
    //         this.sunLight.ambientLight = this.guiObj.intensity
    //     })
    // }

    setSunlight() {
        this.sunLight = new THREE.DirectionalLight("#ffffff", 2.5)

        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 20
        this.sunLight.shadow.mapSize.set(2048, 2048)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(-1.5, 7, 7)
        this.scene.add(this.sunLight)

        this.ambientLight = new THREE.AmbientLight("#ffffff", 1.5)
        this.scene.add(this.ambientLight)
    }

    switchTheme(theme) {
        if(theme === "dark") {
            GSAP.to(this.sunLight.color, {
                r: 0.172549,
                g: 0.231373,
                b: 0.686274
            })
            GSAP.to(this.ambientLight.color, {
                r: 0.172549,
                g: 0.231373,
                b: 0.686274
            })
            GSAP.to(this.sunLight, {
                intensity: 0.78
            })
            GSAP.to(this.ambientLight, {
                intensity: 0.78
            })
        } else {
            GSAP.to(this.sunLight.color, {
                r: 1,
                g: 1,
                b: 1
            })
            GSAP.to(this.ambientLight.color, {
                r: 1,
                g: 1,
                b: 1
            })
            GSAP.to(this.sunLight, {
                intensity: 2.5
            })
            GSAP.to(this.ambientLight, {
                intensity: 1.5
            })
        }
    }

    resize() {

    }

    update() {

    }
}