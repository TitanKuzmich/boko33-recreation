import GSAP from "gsap"
import * as THREE from "three"

import Experience from "../experience"
import {RectAreaLightHelper} from "three/examples/jsm/helpers/RectAreaLightHelper"

export default class Room {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.room = this.resources.items.room
        this.actualRoom = this.room.scene

        this.roomChildren = {}

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1
        }

        this.setModel()
        this.setAnimation()
        this.onMouseMove()
    }

    setModel() {
        this.actualRoom.children.map(child => {
            child.receiveShadow = true
            if (child.name !== "conditioner") child.castShadow = true

            if (child instanceof THREE.Group) {
                child.children.map(groupChild => {
                    groupChild.castShadow = true
                    groupChild.receiveShadow = true
                })
            }

            if (child.name === "sofa") {
                child.children[0].castShadow = false
            }

            // if (child.name === "tank") {
            //     child.material = new THREE.MeshPhysicalMaterial()
            //     child.material.roughness = 0
            //     child.material.color.set("#549dd2")
            //     child.material.ior = 3
            //     child.material.transmission = 1
            //     child.material.opacity = 1
            // }

            if (child.name === "computer") {
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen
                })
            }

            if (child.name === "ground") {
                child.position.x = -0.409899
                child.position.z = 12.8737
            }

            // if (
            //     child.name === "mailbox"
            //     || child.name === "lamp"
            //     || child.name === "step-first"
            //     || child.name === "step-second"
            //     || child.name === "step-third"
            // ) {
            //     child.scale.set(0,0,0)
            // }

            child.scale.set(0,0,0)

            if(child.name === "preloader") {
                child.position.set(0, -1, 0);
                child.rotation.y = Math.PI / 4;
            }

            this.roomChildren[child.name.toLowerCase()] = child
        })

        const width = 0.45
        const height = 0.7
        const intensity = 1
        const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height)
        rectLight.position.set(8.2, 5.4, 2.8)
        rectLight.rotation.x = - Math.PI / 2
        rectLight.rotation.z = Math.PI / 4

        this.actualRoom.add(rectLight)
        this.roomChildren["rectLight"] = rectLight

        this.scene.add(this.actualRoom)
        this.actualRoom.scale.set(0.11, 0.11, 0.11)
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom)
        this.swim = this.mixer.clipAction(this.room.animations[0])
        this.swim.play()
    }

    onMouseMove() {
        window.addEventListener("mousemove", (event) => {
            this.rotation = ((event.clientX - window.innerWidth / 2) * 2) / window.innerWidth
            this.lerp.target = this.rotation * 0.1
        })
    }

    resize() {

    }

    update() {
        this.mixer.update(this.time.delta * 0.0009)

        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        )
        this.actualRoom.rotation.y = this.lerp.current
    }
}