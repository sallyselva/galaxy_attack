namespace SpriteKind {
    export const PowerUP = SpriteKind.create()
}

controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    
    projectile = sprites.createProjectileFromSprite(assets.image`
        myImage8
    `, mySprite, 200, 0)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function on_on_zero(status: StatusBarSprite) {
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    enemyDeath(status.spriteAttachedTo())
    web.open("http://192.168.111.210:889/api/ECommReflection?playername=" + info.score() + "&score=" + info.score())
})
function enemyDeath(enemy: Sprite) {
    sprites.destroy(enemy, effects.disintegrate, 500)
}

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -30
    info.changeScoreBy(1)
    sprites.destroy(sprite, effects.disintegrate, 500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_on_overlap2(sprite2: Sprite, otherSprite2: Sprite) {
    scene.cameraShake(8, 500)
    info.changeLifeBy(-1)
    enemyDeath(otherSprite2)
    music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.UntilDone)
})
let statusbar : StatusBarSprite = null
let enemyShip : Sprite = null
let projectile : Sprite = null
let mySprite : Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(assets.image`
    myImage6
`, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
info.setScore(0)
info.setLife(5)
music.play(music.createSong(hex`
        0078000408020105001c000f0a006400f4010a00000400000000000000000000000000000000026f0000000400011904000800011d08000c0001200c00100002192410001400021e271400180002192a18001c00021d271c00200003191e2420002400012a24002800021d2528002c00021b202c00300002192430003400031b202734003800031d252a38003c00011e3c00400003202529
    `), music.PlaybackMode.LoopingInBackground)
game.onUpdateInterval(2000, function on_update_interval() {
    
    enemyShip = sprites.create(img`
            ........................
                    ........................
                    ........................
                    ........................
                    ........................
                    ........................
                    ........................
                    ..........99.....5......
                    .........9999...55......
                    ......22229922222.......
                    ........222255522.......
                    ............555.........
                    .............55.........
                    ..............5.........
                    ........................
                    ........................
                    ........................
                    ........................
                    ........................
                    ........................
                    ........................
                    ........................
                    ........................
                    ........................
        `, SpriteKind.Enemy)
    enemyShip.x = scene.screenWidth()
    enemyShip.vx = -85
    enemyShip.y = randint(10, scene.screenHeight() - 10)
    statusbar = statusbars.create(15, 2, StatusBarKind.EnemyHealth)
    statusbar.attachToSprite(enemyShip)
})
