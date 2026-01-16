import * as readline from "readline";
import { initialState } from "./content/initialState";
import { Action } from "./domain/action";
import { GameState } from "./domain/state";
import { applyAction } from "./engine/applyAction";

function main(): void {
  let state: GameState = initialState;

  // Create readline interface for user input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Display initial game state
  console.log("\n=== Escape Room Simulator ===");
  console.log(`You are in: ${state.rooms[state.currentRoomIndex]!.name}`);
  console.log(state.rooms[state.currentRoomIndex]!.description);
  console.log("\nCommands: inspect <object>, take <object>, move <room>, unlock <object>, explore, quit\n");

  // Game loop - prompt for input
  const promptUser = () => {
    rl.question("> ", (input) => {
      const trimmed = input.trim().toLowerCase();

      // Handle quit command
      if (trimmed === "quit" || trimmed === "exit") {
        console.log("Thanks for playing!");
        rl.close();
        return;
      }

      // Parse command
      const parts = trimmed.split(" ");
      const command = parts[0];
      const target = parts.slice(1).join(" ");

      // Validate command
      const validActions = ["inspect", "take", "move", "unlock", "explore"];
      if (!validActions.includes(command)) {
        console.log(`Unknown action: ${command}`);
        promptUser();
        return;
      }

      // Explore doesn't need a target
      if (command === "explore") {
        const action: Action = { kind: "explore", objectId: "" };
        state = applyAction(action, state);
        console.log("");
        promptUser();
        return;
      }

      if (!target) {
        console.log("Invalid command. Use: <action> <object/room>");
        promptUser();
        return;
      }

      // Create and apply action
      const action: Action = {
        kind: command as Action["kind"],
        objectId: target,
      };

      state = applyAction(action, state);

      // Check win condition
      if (state.isComplete) {
        console.log("\n🎉 Congratulations! You've escaped!");
        rl.close();
        return;
      }

      // Continue game loop
      console.log("");
      promptUser();
    });
  };

  // Start the game loop
  promptUser();
}

main();
