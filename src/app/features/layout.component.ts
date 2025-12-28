import { Component, effect, signal, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { GameService } from '../shared/services/game.service';
import { CharacterService } from '../shared/services/character.service';
import { ObstacleService } from '../shared/services/obstacle.service';
import { CollisionService } from './services/collision.service';
import { Obstacle } from '../shared/models/layout.type';
import { ScoreService } from '../shared/services/score.service';
import { AudioService } from '../shared/services/audio.service';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  isRunning = signal<boolean>(false);
  bottomPosition = signal<number>(6);
  charSize = signal<number>(10);

  constructor(
    private gameService: GameService,
    private characterService: CharacterService,
    public obstacleService: ObstacleService,
    private collisionService: CollisionService,
    private scoreService: ScoreService,
    private audioService: AudioService
  ) {
    effect(() => {
      this.isRunning.set(this.gameService.isRunning());
    });
    effect(() => {
      this.bottomPosition.set(this.characterService.bottomPosition());
      this.charSize.set(this.characterService.charSize());
    });
    effect(() => {
      if (this.gameService.isRunning()) {
        this.obstacleService.startMovement();
        this.obstacleService.startSpawning();
        this.obstacleService.startSpeedIncrease();
        this.collisionService.startChecking();
        this.scoreService.startScoring();
        this.audioService.playBackgroundMusic();
      } else {
        this.obstacleService.stopMovement();
        this.obstacleService.stopSpawning();
        this.obstacleService.stopSpeedIncrease();
        this.collisionService.stopChecking();
        this.scoreService.stopScoring();
        this.audioService.stopBackgroundMusic();
      }
    });
    effect(() => {
      if (this.collisionService.collisionDetected()) {
        this.gameService.isRunning.set(false);
        this.gameService.isGameOver.set(true);
        this.audioService.playGameOver();
        setTimeout(() => {
          this.gameService.gameOver();
        }, 500);
      }
    });
    effect(() => {
      if (this.gameService.resetGameState()) {
        this.collisionService.reset();
        this.obstacleService.clearObstacles();
      }
    });
  }
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.repeat) return;
    if (this.gameService.isGameOver()) return;

    switch (event.code) {
      case 'Space':
      case 'ArrowUp':
        event.preventDefault();
        if (this.gameService.isRunning()) {
          this.characterService.jump();
          this.audioService.playMove(); 
        } else if (!this.gameService.disableStart()) {
          this.gameService.startGame();
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (this.gameService.isRunning()) {
          this.characterService.duck();
          this.audioService.playMove(); 
        }
        break;
      case 'KeyP':
        if (this.gameService.isRunning()) {
          this.gameService.pauseGame();
        } else if (this.gameService.timeRemaining() > 0) {
          this.gameService.startGame();
        }
        break;
      case 'KeyR':
        this.gameService.resetGame();
        break;
    }
  }

  public trackByObstacleId(index: number, obstacle: Obstacle): number {
    return obstacle.id;
  }
}
