import { Action } from "../domain/action";
import { GameState } from "../domain/state";
import { getArticle, getOrdinal } from "./helpers";

type ActionHandler = (action: Action, state: GameState) => GameState;

export function applyAction(action: Action, state: GameState): GameState {
  // Log the action being applied for debugging
  console.log(`Applying action: ${action.kind} on ${action.objectId}`);

  // Look up and execute the appropriate handler for this action type
  const handler = actionHandlers[action.kind];
  return handler(action, state);
}

const actionHandlers: Record<Action["kind"], ActionHandler> = {
  inspect: handleInspect,
  take: handleTake,
  move: handleMove,
  unlock: handleUnlock,
  explore: handleExplore,
};

function handleInspect(action: Action, state: GameState): GameState {
  const currentRoom = state.rooms[state.currentRoomIndex];
  const objectInRoom = currentRoom!.objects.find(
    (obj) => obj.name === action.objectId
  );

  if (objectInRoom) {
    const inspectCount = (objectInRoom.inspected || 0) + 1;
    const countText = getOrdinal(inspectCount);
    const article = getArticle(countText);

    // Display different message based on inspection count
    if (inspectCount === 1) {
      console.log(`You inspect the ${objectInRoom.name}: ${objectInRoom.description}`);
    } else {
      console.log(`You inspect the ${objectInRoom.name} for ${article} ${countText} time...`);
      console.log(objectInRoom.description);
    }

    // Return new state with incremented inspection count
    return {
      ...state,
      rooms: state.rooms.map((room, index) =>
        index === state.currentRoomIndex
          ? {
              ...room,
              objects: room.objects.map((obj) =>
                obj.name === action.objectId ? { ...obj, inspected: inspectCount } : obj
              ),
            }
          : room
      ),
    };
  } else {
    // Object not found in current room
    console.log(`There is no ${action.objectId} here to inspect.`);
    return state;
  }
}

function handleTake(action: Action, state: GameState): GameState {
  const currentRoom = state.rooms[state.currentRoomIndex];
  const objectInRoom = currentRoom!.objects.find(
    (obj) => obj.name === action.objectId
  );

  if (objectInRoom) {
    // Notify player they've taken the object
    console.log(`You take the ${objectInRoom.name}.`);

    // Return new state with object removed from room and added to inventory
    return {
      ...state,
      rooms: state.rooms.map((room, index) =>
        index === state.currentRoomIndex
          ? {
              ...room,
              // Filter out the taken object from the room
              objects: room.objects.filter(
                (obj) => obj.name !== action.objectId
              ),
            }
          : room
      ),
      // Add the object to the player's inventory
      inventory: [...state.inventory, objectInRoom],
    };
  } else {
    // Object not found in current room
    console.log(`There is no ${action.objectId} here to take.`);
    return state;
  }
}

function handleMove(action: Action, state: GameState): GameState {
  const targetRoomIndex = state.rooms.findIndex(
    (room) => room.name.toLowerCase() === action.objectId.toLowerCase()
  );

  if (targetRoomIndex === -1) {
    // Room doesn't exist
    console.log(`There is no room called ${action.objectId}.`);
    return state;
  }

  // Notify player of successful room transition
  console.log(`You move to the ${state.rooms[targetRoomIndex]!.name}.`);

  // Return new state with updated current room index
  return {
    ...state,
    currentRoomIndex: targetRoomIndex,
  };
}

function handleUnlock(action: Action, state: GameState): GameState {
  const currentRoom = state.rooms[state.currentRoomIndex];
  const objectInRoom = currentRoom!.objects.find(
    (obj) => obj.name === action.objectId
  );

  if (!objectInRoom) {
    // Object doesn't exist in current room
    console.log(`There is no ${action.objectId} here to unlock.`);
    return state;
  }

  if (!objectInRoom.locked) {
    // Object is already unlocked
    console.log(`The ${objectInRoom.name} is already unlocked.`);
    return state;
  }

  // Check if player has the required key
  if (objectInRoom.unlockedBy) {
    const hasKey = state.inventory.some(item => item.name === objectInRoom.unlockedBy);
    
    if (!hasKey) {
      console.log(`You need a ${objectInRoom.unlockedBy} to unlock the ${objectInRoom.name}.`);
      return state;
    }
  }

  // Notify player of successful unlock
  console.log(`You unlock the ${objectInRoom.name}.`);

  // Return new state with object's locked property set to false
  return {
    ...state,
    rooms: state.rooms.map((room, index) =>
      index === state.currentRoomIndex
        ? {
            ...room,
            objects: room.objects.map((obj) =>
              obj.name === action.objectId ? { ...obj, locked: false } : obj
            ),
          }
        : room
    ),
  };
}

function handleExplore(action: Action, state: GameState): GameState {
  const currentRoom = state.rooms[state.currentRoomIndex]!;
  
  // Display room description
  console.log(`\nYou are in ${currentRoom.name}`);
  console.log(currentRoom.description);
  
  // List objects in the room
  if (currentRoom.objects.length > 0) {
    console.log("\nYou see:");
    currentRoom.objects.forEach(obj => {
      const lockedStatus = obj.locked ? " (locked)" : "";
      console.log(`  - ${obj.name}${lockedStatus}`);
    });
  } else {
    console.log("\nThe room is empty.");
  }
  
  // List inventory
  if (state.inventory.length > 0) {
    console.log("\nYou are carrying:");
    state.inventory.forEach(item => {
      console.log(`  - ${item.name}`);
    });
  }
  
  // No state change for explore action
  return state;
}
