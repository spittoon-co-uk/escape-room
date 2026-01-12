import { initialState } from "./content/initialState";
import { Action } from "./domain/action";
import { GameState } from "./domain/state";
import { applyAction } from "./engine/applyAction";


function main(): void {
  let state: GameState = {
    rooms: [{
      name: "Foyer", description: "the first room", objects: [{ name: "painting", description: "maybe this can be moved..." }]
    }],
    inventory: [{
      name: "key", description: "can unlock doors"
    }],
    isComplete: false,
  };

  console.log("=== Initial State ===");
  console.log(state);

  // Example action
  const action: Action = { kind: "inspect", objectId: "painting" };

  state = applyAction(action, state);

  console.log("=== State After Action ===");
  console.log(state);
}

main();
