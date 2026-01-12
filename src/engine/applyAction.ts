import { Action } from "../domain/action"
import { GameState } from "../domain/state"

export function applyAction(action: Action, state: GameState): GameState {
    console.log(`Applying action: ${action.kind} on ${action.objectId}`);
    // For now, do nothing and return the same state
    return state;

}