/**
 * Manages all sound-related functionality in the game.
 * Handles volume control, mute toggling, sound registration, and persistent settings.
 */
class SoundHub {
    
    /**
     * Creates a new SoundHub instance.
     * Initializes sound settings and loads saved preferences from localStorage.
     */
    constructor() {
        this.sounds = [];
        this.volume = 0.2;
        this.muted = false;
        this.loadSettings();
    }

    /**
     * Adds a sound to the internal sound list and applies the current volume.
     * @param {HTMLAudioElement} sound - The sound object to register
     */
    addSound(sound) {
        sound.volume = this.volume;
        this.sounds.push(sound);
    }

    /**
     * Sets the global volume for all registered sounds.
     * Updates each sound's volume and saves the setting.
     * @param {number|string} value - The new volume value (0.0 to 1.0)
     */
    setVolume(value) {
        this.volume = parseFloat(value);
        this.sounds.forEach(s => s.volume = this.muted ? 0 : this.volume);
        this.saveSettings();
        let slider = document.getElementById('volumeSlider');
    }

    /**
     * Toggles the mute state and updates all sound volumes accordingly.
     * Also updates the sound icon and saves the setting.
     */
    toggleMute() {
        this.muted = !this.muted;
        this.setVolume(this.volume);
        this.updateSoundToggleIcon();
        this.saveSettings();
    }

    /**
     * Updates the sound toggle icon in the UI based on mute state.
     */
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

    /**
     * Saves the current sound settings (volume and mute state) to localStorage.
     */
    saveSettings() {
        let settings = {
            muted: this.muted,
            volume: this.volume
        };
        localStorage.setItem('soundSettings', JSON.stringify(settings));
    }

    /**
     * Loads sound settings from localStorage and applies them.
     * Updates volume and sound icon accordingly.
     */
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


