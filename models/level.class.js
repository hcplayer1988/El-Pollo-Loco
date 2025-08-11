/**
 * Represents a game level containing all relevant objects and entities.
 */
class Level {

    /** @type {MovableObject[]} Array of enemy objects in the level */
    enemies;
    /** @type {MovableObject[]} Array of cloud objects for visual effects */
    clouds;
    /** @type {MovableObject[]} Array of background objects for scenery */
    backgroundObjects;
    /** @type {Collectible[]} Array of coin objects to be collected */
    coins;
    /** @type {Collectible[]} Array of bottle objects to be collected or thrown */
    bottles;
    /** @type {number} X-coordinate marking the end of the level */
    level_end_x = 3650;

    /**
     * Creates a new Level instance with the specified game objects.
     * @param {MovableObject[]} enemies - List of enemies in the level
     * @param {MovableObject[]} clouds - List of cloud objects
     * @param {MovableObject[]} backgroundObjects - List of background scenery
     * @param {Collectible[]} coins - List of coin collectibles
     * @param {Collectible[]} bottles - List of bottle collectibles
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}
