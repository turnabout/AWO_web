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
    image: EntityImage;
}

/**
 * An image representing an entity.
 */
export declare interface EntityImage {
    dataURL: string;
    width: number;
    height: number;
}

/**
 * Every possible kind of entity the game editor can select.
 */
export enum SelectedEntityKind {
    Tile,
    Unit,
}

/**
 * Every possible kind of game entity.
 */
export enum EntityKind {
    NeutralTile,
    Property,
    Unit,
}

/**
 * Every weather variation used ingame. Used as a palette variation for tiles.
 */
export enum Weather {
    Clear,
    Snow,
    Rain,
}
