
class SoundHub {
    constructor() {
        this.sounds = [];
        this.volume = 0.2;
        this.muted = false;
    }

    addSound(sound) {
        sound.volume = this.volume;
        this.sounds.push(sound);
    }

    setVolume(value) {
        this.volume = parseFloat(value);
        this.sounds.forEach(s => s.volume = this.muted ? 0 : this.volume);
    }

    toggleMute() {
        this.muted = !this.muted;
        this.setVolume(this.volume);
        this.updateSoundToggleIcon();
    }

    updateSoundToggleIcon() {
        const icon = document.getElementById('soundToggleIcon');
        if (this.muted) {
            icon.src = './assets/icons/sound_off.png';
            icon.alt = 'sound off';
        } else {
            icon.src = './assets/icons/sound_on.png';
            icon.alt = 'sound on';
        }
    }
}


let soundhub = new SoundHub();
