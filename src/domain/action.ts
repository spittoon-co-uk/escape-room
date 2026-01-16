export interface Action {
    kind: "inspect" | "take" | "move" | "unlock" | "explore";
    objectId: string;
}