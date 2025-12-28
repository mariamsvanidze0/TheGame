import { Injectable, signal } from '@angular/core';
import { CharacterService } from '../../shared/services/character.service';
import { ObstacleService } from '../../shared/services/obstacle.service';

@Injectable({
  providedIn: 'root',
})
export class CollisionService {
  public collisionDetected = signal<boolean>(false);
  private checkInterval: number = 0;

  constructor(
    private characterService: CharacterService,
    private obstacleService: ObstacleService
  ) {}

  public startChecking(): void {
    if (this.checkInterval) return;

    this.checkInterval = setInterval(() => {
      this.checkCollisions();
    }, 16);
  }

  public stopChecking(): void {
    clearInterval(this.checkInterval);
    this.checkInterval = 0;
  }

  private checkCollisions(): void {
    const runnerLeft = 5;
    const runnerWidth = 6;
    const runnerRight = runnerLeft + runnerWidth;
    const runnerBottom = this.characterService.bottomPosition();
    const runnerTop = runnerBottom + this.characterService.charSize();

    for (const obstacle of this.obstacleService.obstacles()) {
      const obstacleLeft = obstacle.leftPosition;
      const obstacleRight = obstacleLeft + obstacle.width;
      const obstacleBottom = obstacle.bottomPosition;
      const obstacleTop = obstacleBottom + obstacle.height;

      const horizontalOverlap = runnerRight > obstacleLeft && runnerLeft < obstacleRight;
      const verticalOverlap = runnerTop > obstacleBottom && runnerBottom < obstacleTop;

      if (horizontalOverlap && verticalOverlap) {
        this.collisionDetected.set(true);
        this.stopChecking();
        return;
      }
    }
  }
  public reset(): void {
    this.stopChecking();
    this.collisionDetected.set(false);
  }
}
