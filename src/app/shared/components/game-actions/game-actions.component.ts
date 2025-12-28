import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CharacterService } from '../../services/character.service';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-game-actions',
  standalone: false,
  templateUrl: './game-actions.component.html',
  styleUrl: './game-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameActionsComponent {
  constructor(
    public gameService: GameService,
    public characterService: CharacterService,
    private audioService: AudioService
  ) {}
  public jump(): void {
    if (this.gameService.isRunning()) {
      this.characterService.jump();
      this.audioService.playMove();
    } else if (!this.gameService.disableStart()) {
      this.gameService.startGame();
    }
  }

  public duck(): void {
    if (this.gameService.isRunning()) {
      this.characterService.duck();
      this.audioService.playMove();
    }
  }
}
