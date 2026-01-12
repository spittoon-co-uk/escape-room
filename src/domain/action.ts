export interface Action {
    kind: "inspect" | "take" | "move" | "unlock";
    objectId: string;
}