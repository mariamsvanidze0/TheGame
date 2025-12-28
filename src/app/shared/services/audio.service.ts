import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private backgroundMusic: HTMLAudioElement | null = null;
  private moveSound: HTMLAudioElement | null = null;
  private gameOverSound: HTMLAudioElement | null = null;

  public isMuted = signal<boolean>(false);

  constructor() {
    this.initSounds();
  }

  private initSounds(): void {
    this.backgroundMusic = new Audio('audio/background.mp3');
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.3;

    this.moveSound = new Audio('audio/move.mp3');
    this.moveSound.volume = 0.5;

    this.gameOverSound = new Audio('audio/gameover.mp3');
    this.gameOverSound.volume = 0.5;
  }

  public playBackgroundMusic(): void {
    if (this.isMuted() || !this.backgroundMusic) return;
    this.backgroundMusic.play();
  }

  public stopBackgroundMusic(): void {
    if (!this.backgroundMusic) return;
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
  }

  public playMove(): void {
    if (this.isMuted() || !this.moveSound) return;
    this.moveSound.currentTime = 0;
    this.moveSound.play();
  }

  public playGameOver(): void {
    if (this.isMuted() || !this.gameOverSound) return;
    this.gameOverSound.currentTime = 0;
    this.gameOverSound.play();
  }

  public toggleMute(): void {
    this.isMuted.update((m) => !m);
    if (this.isMuted()) {
      this.backgroundMusic?.pause();
    } else {
      this.backgroundMusic?.play();
    }
  }
}
