import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameControlsComponent } from './components/game-controls/game-controls.component';
import { GameActionsComponent } from './components/game-actions/game-actions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameHudComponent } from './components/game-hud/game-hud.component';
import { GameOverComponent } from './components/game-over/game-over.component';

@NgModule({
  declarations: [GameHudComponent, GameControlsComponent, GameActionsComponent, GameOverComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [GameHudComponent, GameControlsComponent, GameActionsComponent,GameOverComponent],
})
export class SharedModule {}
