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
