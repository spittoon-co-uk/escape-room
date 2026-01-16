import { GameState } from "../domain/state";

export const initialState: GameState = {
    currentRoomIndex: 0,
    rooms: [
        {
            name: "Foyer",
            description: "A dimly lit entrance hall. A large painting hangs on the wall.",
            objects: [
                { name: "painting", description: "An ornate painting that looks slightly askew. Maybe it can be moved..." },
                { name: "statue", description: "A marble statue of a dog. It looks heavy." },
                { name: "rug", description: "A very ugly rug. It does not match the decor at all, maybe it does not belong in this room." }
            ]
        }
    ],
    inventory: [
        { name: "key", description: "A small brass key. It might unlock something." }
    ],
    isComplete: false
};