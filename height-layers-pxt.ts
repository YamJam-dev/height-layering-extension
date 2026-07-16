let zlayer = 0
let az = 0
let jumping = false
let fallingIndex = 0
let location = tiles.getTileLocation(0, 0)
//% weight=100 color=#000080
namespace height {
    /**
     * Return the current zlayer of the player sprite.
     */
    //% block
    export function returnzlayer() {
        return zlayer
    }

    /**
     * Return the current z movement of the player
     */
    //% block
    export function returnaz() {
        return az
    }

    /**
     * Make a sprite jump 
     * @param sprite to make jump 
     * @param height to make sprite jump 
     * @param extra height sprite gains at the peak of the jump
     */
    //% block="make $sprite jump ||$height pixels with |$extra float pixels"
    //% expandableArgumentMode="toggle"
    //% sprite.defl="mySprite"
    //% sprite.shadow=variables_get
    //% height.defl=23
    //% extra.defl=1
    export function Jump(sprite: Sprite, height?: number, extra?: number) {
        jumping = true
        
        sprite.setFlag(SpriteFlag.Ghost, true)
        fallingIndex = height || 23
        for (let index = 0; index <= height - 1; index++) {
            az += 1
            pause(index)
        }
        az += extra || 1
        pause(30)
        az += extra || 1
        pause(40)
        az += extra * - 1 || -1
        pause(50)
        az += extra * -1 || -1
        pause(40)
        for (let index = 0; index < height; index++) {
            fallingIndex += -1
            az += -1
            pause(fallingIndex)
        }
        jumping = false
        sprite.setFlag(SpriteFlag.Ghost, true)
    }
    /**
     * Check for layer collisions on the current frame
     * @param the player hitbox to detect collisions on
     * @param the tile to let the player hitbox move on
     * @param the tiles to detect as "layer 1". This should be the same as the previous parameter
     * @param the tile to let the player hitbox move on in "layer 2"
     * @param the tiles to detect as "layer 2". This should be the same as the previous parameter
     * @param the tiles to detect as the ground
     */
    //% block="Run layer detections on $hitbox with $layer1tile for layer 1 $layer1 and $layer2tile for layer 2 $layer2 and $groundTile as ground"
    //% hitbox.defl="myHitbox"
    //% hitbox.shadow=variables_get
    //% layer1.shadow=lists_create_with
    //% layer2.shadow=lists_create_with
    //% layer1tile.shadow=tileset_tile_picker
    //% layer2tile.shadow=tileset_tile_picker
    //% groundTile.shadow=tileset_tile_picker
    export function mainLoop2layer(hitbox: Sprite, layer1: tiles.Location[], layer1tile: Image, groundTile: Image, layer2: tiles.Location[], layer2tile: Image) {
        if (tiles.tileAtLocationEquals(location, layer1tile)) {
            if (!(jumping)) {
                for (let value of layer2) {
                    tiles.setWallAt(value, true)
                }
                zlayer = 1
            }
            for (let value2 of layer1) {
                tiles.setWallAt(value2, false)
            }
        } else if (tiles.tileAtLocationEquals(location, layer2tile)) {
            if (zlayer >= 1) {
                for (let value4 of layer2) {
                    tiles.setWallAt(value4, false)
                }
                for (let value5 of layer1) {
                    tiles.setWallAt(value5, false)
                }
            }
        } else if (tiles.tileAtLocationEquals(location, groundTile)) {
            if (!(jumping)) {
                for (let value7 of layer2) {
                    tiles.setWallAt(value7, true)
                }
                for (let value8 of layer1) {
                    tiles.setWallAt(value8, true)
                }
                zlayer = 0
            }
        }
    }

    /**
     * Check for layer collisions on the current frame
     * @param the player hitbox to detect collisions on
     * @param the tile to let the player hitbox move on
     * @param the tiles to detect as "layer 1". This should be the same as the previous parameter
     * @param the tile to let the player hitbox move on in "layer 2"
     * @param the tiles to detect as "layer 2". This should be the same as the previous parameter
     * @param the tiles to detect as the ground
     */
    //% block="Run layer detections on $hitbox with $layer1tile for layer 1 $layer1 and $groundTile as ground"
    //% hitbox.defl="myHitbox"
    //% hitbox.shadow=variables_get
    //% layer1.shadow=lists_create_with
    //% layer1tile.shadow=tileset_tile_picker
    //% groundTile.shadow=tileset_tile_picker
    export function mainLoop1layer(hitbox: Sprite, layer1: tiles.Location[], layer1tile: Image, groundTile: Image) {
        location = tiles.getTileLocation(hitbox.tilemapLocation().column, hitbox.tilemapLocation().row)
        if (tiles.tileAtLocationEquals(location, layer1tile)) {
            for (let value2 of layer1) {
                tiles.setWallAt(value2, false)
            }
        } else if (tiles.tileAtLocationEquals(location, groundTile)) {
            if (!(jumping)) {
                for (let value8 of layer1) {
                    tiles.setWallAt(value8, true)
                }
                zlayer = 0
            }
        }
    }

    /**
     * Set the sprite position
     * @param the hitbox of the player sprite. Usually used as a shadow.
     * @param the player sprite to update the position of.
     */
    //% block="listen for $player jump and position update to $hitbox"
    //% player.defl=mySprite
    //% player.shadow=variables_get
    //% hitbox.defl=myHitbox
    //% hitbox.shadow=variables_get
    export function listenForJump(hitbox: Sprite, player: Sprite) {
        player.setPosition(hitbox.x, hitbox.y - az)
    }

}


