🐉 “Dragon Runner” (Chrome Dino–style) — Homework Spec
A lightweight runner game inspired by Google’s offline dinosaur. The player controls a dragon that runs automatically and must avoid obstacles. Add a game timer that restarts the game when changed.

✨ Core Gameplay
The dragon auto-runs horizontally.
Player jumps (and optionally ducks) to avoid obstacles.
Game ends on collision → show Game Over + final stats.
Obstacles spawn over time; speed ramps up gradually.
🎮 Controls
On-screen buttons (required):
Jump button
Duck button (optional)
Pause/Resume button
Restart button
Keyboard (optional, nice to have):
SPACE / ↑ → Jump
↓ → Duck
P → Pause/Resume
R → Restart
⏱️ Timer (Required)
A Timer input (in seconds) is displayed in the UI (e.g., number input/select).
Changing the timer value immediately restarts the game with:
Score reset
Time remaining set to the new value
Speed/difficulty reset
When the timer hits 0 → auto Game Over with final stats.
🧮 Scoring & Stats
Score increments over time survived and/or distance (e.g., +1 per tick).
Bonus: small bonus for each obstacle passed.
High Score persists for the session (optional: localStorage).
Show live HUD:
Current Score
High Score
Time Remaining (counts down)
Speed (optional)
Obstacles dodged (optional)
🧩 Game Elements
Dragon
Obstacles
Ground/Parallax
🖥️ UI Layout
Top bar HUD: Score | High Score | Time Remaining | Speed (opt.)
Center area: Game Canvas (dragon + obstacles + ground)
Bottom controls:
Jump, Duck, Pause/Resume, Restart
Timer input (sec) → changing this restarts the game
✅ Acceptance Criteria
On page load, game is ready; pressing Start/Jump begins play.
Timer input change → game restarts immediately with new duration.
Buttons alone are sufficient to play on mobile (no keyboard required).
Jump works; duck (if implemented) lowers hitbox; collisions end the game.
Score increases while running; High Score updates on better runs.
Convert-like rule: If paused, no score/time advantage is gained (define whether timer pauses or not and keep consistent).
On Game Over: show final Score and Time Survived, and Restart button.
📦 Deliverables
Playable Dragon Runner with on-screen controls.
Timer input that restarts the game when modified.
Live HUD with Score and Time Remaining.
Game Over screen with final score and Restart.
Well documented README describing controls and timer behavior.
BONUS - Add working dificulty select
State should be handled using signals