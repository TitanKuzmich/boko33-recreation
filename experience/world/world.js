import {EventEmitter} from "events"
import * as THREE from "three"

import Experience from "../experience"

import Controls from "./controls"
import Environment from "./environment"
import Floor from "./floor"
import Room from "./room"

export default class World extends EventEmitter {
    constructor() {
        super()
        this.experience = new Experience()

        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.canvas = this.experience.canvas
        this.camera = this.experience.camera
        this.resources = this.experience.resources
        this.theme = this.experience.theme

        this.resources.on("ready", () => {
            this.environment = new Environment()
            this.floor = new Floor()
            this.room = new Room()
            this.controls = new Controls()
            this.emit("world-ready")
        })

        this.theme.on("switch", (theme) => {
            this.switchTheme(theme)
        })
    }

    switchTheme(theme) {
        if(this.environment){
            this.environment.switchTheme(theme)
        }
    }

    resize() {
        if(this.controls){
            this.controls.resize()
        }
    }

    update() {
        if(this.room){
            this.room.update()
        }
        if(this.controls){
            this.controls.update()
        }
    }
}