import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  public bottomPosition = signal<number>(6);
  public isJumping = signal<boolean>(false);
  public charSize = signal<number>(10);

  public jump(): void {
    if (this.isJumping()) return;

    this.isJumping.set(true);
    this.bottomPosition.set(20);

    setTimeout(() => {
      this.bottomPosition.set(6);
      this.isJumping.set(false);
    }, 700);
  }

  public duck(): void {
    if (this.isJumping()) return;
    this.charSize.set(5);
    setTimeout(() => {
      this.charSize.set(10);
    }, 800);
  }
}
