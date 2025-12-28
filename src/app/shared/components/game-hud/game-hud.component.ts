import { Component, OnInit, OnDestroy, effect, signal, ChangeDetectionStrategy } from '@angular/core';
import { GameService } from '../../services/game.service';
import { HelperService } from '../../services/helper.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { wholeNumberValidator } from '../../validators/whole-number.validator';
import { Subscription } from 'rxjs';
import { ObstacleService } from '../../services/obstacle.service';
import { ScoreService } from '../../services/score.service';
import { Difficulty } from '../../models/layout.type';

@Component({
  selector: 'app-game-hud',
  standalone: false,
  templateUrl: './game-hud.component.html',
  styleUrl: './game-hud.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameHudComponent implements OnInit, OnDestroy {
  timerDisplay = signal<string>('00:00:00');
  timerForm!: FormControl<string>;
  private subscription!: Subscription;

  constructor(
    private gameService: GameService,
    private fb: FormBuilder,
    private helperService: HelperService,
    public obstacleService: ObstacleService,
    public scoreService: ScoreService
  ) {
    effect(() => {
      const remaining = this.gameService.timeRemaining();
      if (this.gameService.isRunning()) {
        this.timerDisplay.set(this.helperService.secondsToTime(remaining));
      }
    });
    effect(() => {
      if (this.gameService.resetGameState()) {
        this.timerForm.reset();
        this.timerDisplay.set('00:00:00');
        this.scoreService.reset();
        this.gameService.resetGameState.set(false);
      }
    });
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public initForm(): void {
    this.timerForm = this.fb.nonNullable.control('', [
      Validators.required,
      Validators.min(0),
      wholeNumberValidator(),
    ]);
    this.subscription = this.timerForm.valueChanges.subscribe((value) => {
      if (this.timerForm.valid) {
        this.gameService.disableStart.set(false);
        this.timerDisplay.set(this.helperService.secondsToTime(+value));
        this.gameService.setCountdownValue(+value);
      } else {
        this.gameService.disableStart.set(true);
        this.timerDisplay.set('00:00:00');
      }
    });
  }
  public onDifficultyChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const difficulty = select.value as Difficulty;
    this.obstacleService.setDifficulty(difficulty);
    this.gameService.resetGame();
  }
}
