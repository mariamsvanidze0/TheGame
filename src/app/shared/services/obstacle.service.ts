import { Injectable, signal } from '@angular/core';
import { Difficulty, Obstacle } from '../models/layout.type';

@Injectable({
  providedIn: 'root',
})
export class ObstacleService {
  public obstacles = signal<Obstacle[]>([]);
  private moveInterval: number = 0;
  public speed = signal<number>(0.5);
  private nextId = 1;
  private spawnInterval: number = 0;
  ///speed
  private speedInterval: number = 0;
  private readonly maxSpeed = 1.5;
  private readonly speedIncrement = 0.05;
  public difficulty = signal<Difficulty>('normal');

  public addObstacle(type: 'ground' | 'air'): void {
    const obstacle: Obstacle = {
      id: this.nextId++,
      type,
      leftPosition: 120,
      width: type === 'ground' ? 6 : 9,
      height: type === 'ground' ? 6 : 7,
      bottomPosition: type === 'ground' ? 6 : 11,
      dodged: false,
    };
    this.obstacles.update((list) => [...list, obstacle]);
  }

  public startMovement(): void {
    if (this.moveInterval) return;

    this.moveInterval = setInterval(() => {
      this.obstacles.update((list) =>
        list
          .map((obstacle) => ({
            ...obstacle,
            leftPosition: obstacle.leftPosition - this.speed(),
          }))
          .filter((obstacle) => obstacle.leftPosition > -10)
      );
    }, 16);
  }
  public stopMovement(): void {
    clearInterval(this.moveInterval);
    this.moveInterval = 0;
  }
  public startSpawning(): void {
    if (this.spawnInterval) return;

    this.spawnInterval = setInterval(() => {
      this.spawnObstacle();
    }, this.getRandomSpawnTime());
  }

  private spawnObstacle(): void {
    const type = Math.random() > 0.5 ? 'ground' : 'air';
    this.addObstacle(type);

    if (this.spawnInterval) {
      clearInterval(this.spawnInterval);
      this.spawnInterval = setInterval(() => {
        this.spawnObstacle();
      }, this.getRandomSpawnTime());
    }
  }
  private getRandomSpawnTime(): number {
    return Math.random() * 1500 + 1500;
  }
  public startSpeedIncrease(): void {
    if (this.difficulty() !== 'normal') return;
    if (this.speedInterval) return;

    this.speedInterval = setInterval(() => {
      if (this.speed() < this.maxSpeed) {
        this.speed.update((s) => Math.min(s + this.speedIncrement, this.maxSpeed));
      }
    }, 3000);
  }

  public setDifficulty(level: Difficulty): void {
    this.difficulty.set(level);
  }
  public stopSpeedIncrease(): void {
    clearInterval(this.speedInterval);
    this.speedInterval = 0;
  }
  public stopSpawning(): void {
    clearInterval(this.spawnInterval);
    this.spawnInterval = 0;
  }

  public clearObstacles(): void {
    this.obstacles.set([]);
    this.nextId = 1;
    if (this.difficulty() === 'easy') {
      this.speed.set(0.5);
    } else if (this.difficulty() === 'hard') {
      this.speed.set(1.5);
    } else {
      this.speed.set(0.5);
    }
    this.stopSpeedIncrease();
  }
}
