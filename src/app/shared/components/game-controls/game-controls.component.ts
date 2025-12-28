import { Component, signal, effect, ChangeDetectionStrategy } from '@angular/core';
import { GameService } from '../../services/game.service';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-game-controls',
  standalone: false,
  templateUrl: './game-controls.component.html',
  styleUrl: './game-controls.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameControlsComponent {
  disableStart = signal<boolean>(true);

  constructor(private gameService: GameService, public audioService: AudioService) {
    effect(() => {
      this.disableStart.set(this.gameService.disableStart());
    });
  }
  public toggleSound(): void {
    this.audioService.toggleMute();
  }

  public startGame(): void {
    if (this.gameService.isGameOver()) return;
    this.gameService.startGame();
  }

  public pauseGame(): void {
    this.gameService.pauseGame();
  }
  public restartGame(): void {
    this.gameService.resetGame();
  }
}
