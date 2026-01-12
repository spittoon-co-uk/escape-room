import { Action } from "../domain/action"
import { GameState } from "../domain/state"

const applyAction: boolean(action: Action, state: GameState) => {
    return true;
}