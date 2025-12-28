import { Injectable, signal } from '@angular/core';
import { ObstacleService } from './obstacle.service';
@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  public score = signal<number>(0);
  private scoreInterval: number = 0;
  private readonly runnerLeft = 5;
  private readonly dodgeBonus = 10;
  public obstaclesDodged = signal<number>(0);
  public highScore = signal<number>(0);
  constructor(private obstacleService: ObstacleService) {
    const saved = localStorage.getItem('highScore');
    if (saved) {
      this.highScore.set(Number(saved));
    }
  }
  public startScoring(): void {
    if (this.scoreInterval) return;

    this.scoreInterval = setInterval(() => {
      const multiplier = this.obstacleService.speed();
      this.score.update((s) => s + multiplier);
      this.checkDodged();
    }, 100);
  }
  public stopScoring(): void {
    clearInterval(this.scoreInterval);
    this.scoreInterval = 0;
  }
  public checkDodged(): void {
    const obstacles = this.obstacleService.obstacles();
    let bonusEarned = false;

    const updated = obstacles.map((obstacle) => {
      if (!obstacle.dodged && obstacle.leftPosition + obstacle.width < this.runnerLeft) {
        bonusEarned = true;
        return { ...obstacle, dodged: true };
      }
      return obstacle;
    });

    if (bonusEarned) {
      //   console.log('dodged');
      this.obstacleService.obstacles.set(updated);
      this.score.update((s) => s + this.dodgeBonus);
      this.obstaclesDodged.update((d) => d + 1);
    }
  }
  public updateHighScore(): void {
    if (this.score() > this.highScore()) {
      const newHighScore = Math.floor(this.score());
      this.highScore.set(newHighScore);
      localStorage.setItem('highScore', newHighScore.toString());
    }
  }
  public reset(): void {
    this.stopScoring();
    this.score.set(0);
    this.obstaclesDodged.set(0);
  }
}
