/**
 * Basic data describing a neutral tile type.
 */
export declare interface TileTypeData {
    value: number;
    name: string;
    variations: TileVariationData[];
}

/**
 * Basic data describing a neutral tile variation.
 */
export declare interface TileVariationData {
    value: number;
    name: string;
}

/**
 * Every possible kind of entity the game editor can select.
 */
export enum SelectedEntityKind {
    Tile,
    Unit,
}
