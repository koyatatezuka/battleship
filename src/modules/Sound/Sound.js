class Sound {
	constructor(src) {
		this.src = src;
		this.sound = document.createElement('audio');
		this.sound.src = this.src;
		this.sound.loop = true;
		this.sound.setAttribute('preload', 'auto');
		this.sound.setAttribute('controls', 'none');
		this.sound.style.display = 'none';
		document.body.appendChild(this.sound);
	}
	play() {
		if (this.sound.paused) {
			this.sound.play();
		} else {
			this.sound.currentTime = 0;
		}
	}
	stop() {
		this.sound.pause();
	}
}

const preStartMusic = new Sound('http://cd.textfiles.com/sbsw/HIGHTECH/PINNGGG.WAV');
const gameMusic = new Sound(
	'http://sampleswap.org/samples-ghost/LOOPING%20AMBIENCE%20and%20NOISE/432[kb]mellow-beeps-into-atmosphere.wav.mp3'
);
const water = new Sound('http://koo.corpus.cam.ac.uk/naturesound/waves/waterSPLASH.WAV');
const explosion = new Sound('http://d-gun.com/files/sounds/XPLOMAS2.WAV');

preStartMusic.sound.volume = 0.2;

water.sound.loop = false;
explosion.sound.loop = false;

export { preStartMusic, gameMusic, water, explosion };
