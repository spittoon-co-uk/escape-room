export interface GameState {
    rooms: Room[];
    currentRoomIndex: number;
    inventory: Object[];
    isComplete: boolean;
};

export interface Room {
    name: string;
    description: string;
    objects: Object[];
};

export interface Object {
    name: string;
    description: string;
    locked?: boolean;
    inspected?: number;
}