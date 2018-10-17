export default class Sound {
    constructor(src) {
        this.src = src;       
        this.sound = document.createElement("audio");
        this.sound.src = this.src
        this.sound.loop = true;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }
    play() {
        if (this.sound.paused) {
            this.sound.play()
        } else {
            this.sound.currentTime = 0
        }
        
    }
    stop() {
        this.sound.pause();
    }
}