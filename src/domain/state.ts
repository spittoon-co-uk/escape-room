export interface GameState {
    rooms: Room[];
    inventory: Object[];
    isComplete: boolean;
};

export interface Room {
    name: string;
    description: string;
    objects: Object[];
};