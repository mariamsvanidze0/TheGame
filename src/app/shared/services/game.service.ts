import { Injectable, signal } from '@angular/core';
import { ScoreService } from './score.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public isRunning = signal<boolean>(false);
  public timerValue = signal<number>(0);
  public timeRemaining = signal<number>(0);
  public disableStart = signal<boolean>(true);
  public resetGameState = signal<boolean>(false);
  public isGameOver = signal<boolean>(false);

  private timerInterval: number = 0;
  constructor(private scoreService: ScoreService) {}
  private clearTimer(): void {
    clearInterval(this.timerInterval);
    this.timerInterval = 0;
  }

  public startGame(): void {
    if (this.timerValue() <= 0 || this.isRunning()) return;
    if (this.timeRemaining() <= 0) {
      this.timeRemaining.set(this.timerValue());
    }
    this.isRunning.set(true);
    this.startCountdown();
  }

  public pauseGame(): void {
    this.isRunning.set(false);
    this.clearTimer();
  }

  public setCountdownValue(value: number): void {
    if (this.isRunning()) {
      this.resetGame();
    }
    this.timerValue.set(value);
  }

  private startCountdown(): void {
    this.timerInterval = setInterval(() => {
      const current = this.timeRemaining();
      if (current <= 1) {
        this.timeRemaining.set(0);
        this.gameOver();
        return;
      }
      this.timeRemaining.update((v) => v - 1);
    }, 1000);
  }

  public gameOver(): void {
    this.isRunning.set(false);
    this.clearTimer();
    this.scoreService.updateHighScore();
    this.isGameOver.set(true);
  }

  public resetGame(): void {
    this.isRunning.set(false);
    this.clearTimer();
    this.timeRemaining.set(0);
    this.resetGameState.set(true);
    this.isGameOver.set(false);
  }
}
