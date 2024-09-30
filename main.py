@namespace
class SpriteKind:
    PowerUP = SpriteKind.create()

def on_a_pressed():
    global projectile
    projectile = sprites.create_projectile_from_sprite(assets.image("""
        myImage8
    """), mySprite, 200, 0)
    music.play(music.melody_playable(music.pew_pew),
        music.PlaybackMode.UNTIL_DONE)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_zero(status):
    music.play(music.melody_playable(music.ba_ding),
        music.PlaybackMode.UNTIL_DONE)
    enemyDeath(status.sprite_attached_to())
statusbars.on_zero(StatusBarKind.enemy_health, on_on_zero)

def enemyDeath(enemy: Sprite):
    sprites.destroy(enemy, effects.disintegrate, 500)

def on_on_overlap(sprite, otherSprite):
    statusbars.get_status_bar_attached_to(StatusBarKind.enemy_health, otherSprite).value += -30
    info.change_score_by(1)
    sprites.destroy(sprite, effects.disintegrate, 500)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap)

def on_on_overlap2(sprite2, otherSprite2):
    scene.camera_shake(8, 500)
    info.change_life_by(-1)
    enemyDeath(otherSprite2)
    music.play(music.melody_playable(music.power_down),
        music.PlaybackMode.UNTIL_DONE)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap2)

statusbar: StatusBarSprite = None
enemyShip: Sprite = None
projectile: Sprite = None
mySprite: Sprite = None
effects.star_field.start_screen_effect()
mySprite = sprites.create(assets.image("""
    myImage6
"""), SpriteKind.player)
controller.move_sprite(mySprite)
mySprite.set_stay_in_screen(True)
info.set_score(0)
info.set_life(5)
music.play(music.create_song(hex("""
        0078000408020105001c000f0a006400f4010a00000400000000000000000000000000000000026f0000000400011904000800011d08000c0001200c00100002192410001400021e271400180002192a18001c00021d271c00200003191e2420002400012a24002800021d2528002c00021b202c00300002192430003400031b202734003800031d252a38003c00011e3c00400003202529
    """)),
    music.PlaybackMode.LOOPING_IN_BACKGROUND)

def on_update_interval():
    global enemyShip, statusbar
    enemyShip = sprites.create(img("""
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
        """),
        SpriteKind.enemy)
    enemyShip.x = scene.screen_width()
    enemyShip.vx = -85
    enemyShip.y = randint(10, scene.screen_height() - 10)
    statusbar = statusbars.create(15, 2, StatusBarKind.enemy_health)
    statusbar.attach_to_sprite(enemyShip)
game.on_update_interval(2000, on_update_interval)
