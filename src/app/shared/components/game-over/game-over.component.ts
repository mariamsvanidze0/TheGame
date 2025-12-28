import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { ScoreService } from '../../services/score.service';

@Component({
  selector: 'app-game-over',
  standalone: false,
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameOverComponent {
  constructor(
    public gameService: GameService,
    public scoreService: ScoreService
  ) {}

  public restart(): void {
    this.gameService.resetGame();
  }
}