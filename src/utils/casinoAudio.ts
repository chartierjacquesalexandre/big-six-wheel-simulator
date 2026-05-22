type SoundName = "chip" | "wheel" | "win";

const soundSources: Record<SoundName, string> = {
  chip: "/sounds/drop-coin.mp3",
  wheel: "/sounds/wheel-stop.mp3",
  win: "/sounds/win-bonus.mp3",
};

export class CasinoAudio {
  private muted = true;
  private volume = 0.45;
  private sounds: Record<SoundName, HTMLAudioElement>;

  constructor() {
    this.sounds = {
      chip: new Audio(soundSources.chip),
      wheel: new Audio(soundSources.wheel),
      win: new Audio(soundSources.win),
    };

    Object.values(this.sounds).forEach((audio) => {
      audio.preload = "auto";
      audio.volume = this.volume;
    });
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    Object.values(this.sounds).forEach((audio) => {
      audio.muted = muted;
    });
  }

  play(sound: SoundName) {
    if (this.muted) return;

    const source = this.sounds[sound];
    const audio = source.cloneNode(true) as HTMLAudioElement;
    audio.volume = sound === "win" ? 0.36 : this.volume;
    audio.muted = this.muted;

    void audio.play().catch(() => {
      // Browser autoplay policies can still reject audio if the user has not enabled sound.
    });
  }
}
