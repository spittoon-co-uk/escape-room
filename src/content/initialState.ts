import { GameState } from "../domain/state";

export const initialState: GameState = {
  currentRoomIndex: 0,
  rooms: [
    {
      name: "Foyer",
      description:
        "A dimly lit entrance hall. A large painting hangs on the wall.",
      objects: [
        {
          name: "painting",
          description:
            "An ornate painting that looks slightly askew. Maybe it can be moved...",
        },
        {
          name: "statue",
          description: "A marble statue of a dog. It looks heavy.",
        },
        {
          name: "rug",
          description:
            "A very ugly rug. It does not match the decor at all, maybe it does not belong in this room.",
        },
      ],
    },
    {
      name: "Library",
      description:
        "A cozy room filled with dusty books. A locked desk sits in the corner.",
      objects: [
        {
          name: "desk",
          description: "An old wooden desk with a locked drawer.",
          locked: true,
          unlockedBy: "miniature key",
        },
        {
          name: "book",
          description:
            "A leather-bound journal with strange symbols on the cover.",
        },
        {
          name: "rusty key",
          description:
            "A key warped by its rust. It could possibly still work...",
        },
      ],
    },
    {
      name: "Garden",
      description: "An overgrown garden with a stone fountain in the center.",
      objects: [
        {
          name: "fountain",
          description:
            "The fountain is dry, but something glints at the bottom.",
        },
        {
          name: "gate",
          description: "A rusty iron gate leading out. It's locked tight.",
          locked: true,
          unlockedBy: "rusty key",
        },
      ],
    },
  ],
  inventory: [
    {
      name: "miniature key",
      description: "A very small aluminium key. Surely it unlocks something...",
    },
  ],
  memory: [],
  isComplete: false,
};
