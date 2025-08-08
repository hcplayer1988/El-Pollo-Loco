
class SoundHub {
    
    constructor() {
        this.sounds = [];
        this.volume = 0.2;
        this.muted = false;
        this.loadSettings();
    }

    addSound(sound) {
        sound.volume = this.volume;
        this.sounds.push(sound);
    }

    setVolume(value) {
        this.volume = parseFloat(value);
        this.sounds.forEach(s => s.volume = this.muted ? 0 : this.volume);
        this.saveSettings();
        let slider = document.getElementById('volumeSlider');
    }

    toggleMute() {
        this.muted = !this.muted;
        this.setVolume(this.volume);
        this.updateSoundToggleIcon();
        this.saveSettings();
    }

    updateSoundToggleIcon() {
        let icon = document.getElementById('soundToggleIcon');
        if (this.muted) {
            icon.src = './assets/icons/sound_off.png';
            icon.alt = 'sound off';
        } else {
            icon.src = './assets/icons/sound_on.png';
            icon.alt = 'sound on';
        }
    }

    saveSettings() {
        let settings = {
            muted: this.muted,
            volume: this.volume
        };
        localStorage.setItem('soundSettings', JSON.stringify(settings));
    }

    loadSettings() {
        let saved = localStorage.getItem('soundSettings');
        if (saved) {
            let settings = JSON.parse(saved);
            this.muted = settings.muted;
            this.volume = settings.volume;
            this.setVolume(this.volume);
            this.updateSoundToggleIcon();

        }
    }
}



