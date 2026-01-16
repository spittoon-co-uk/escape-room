export interface GameState {
    rooms: Room[];
    currentRoomIndex: number;
    inventory: Key[];
    memory: Code[];
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
    unlockedBy?: string;
    inspected?: number;
}

export interface Code {
    value: string;
    source: Object;
    used?: number;
}

export interface Key extends Object {
    used?: number;
}