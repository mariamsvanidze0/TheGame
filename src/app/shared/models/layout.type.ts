export interface Obstacle {
  id: number;
  type: 'ground' | 'air';
  leftPosition: number;
  width: number;
  height: number;
  bottomPosition: number;
  dodged: boolean;
}
export type Difficulty = 'easy' | 'normal' | 'hard';