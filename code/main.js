import kaboom from "kaboom"
kaboom()

loadSprite("fighter", "/sprites/fighter.png")
loadSprite("Bone", "/sprites/Bone.gif")
loadSprite("Bone2", "/sprites/Bone2.gif")
loadSprite("fire hydrant", "/sprites/fire hydrant.gif")
loadSprite("Street", "/sprites/Street.gif")
loadSprite("wood", "/sprites/wood.png")
loadSprite("fireblob", "sprites/fireblob.gif")

layers([
	"player",
	"ui",
], "game")

const player = add([
  sprite("fighter"),
  origin("center"),
  rotate(0),
  scale(0.13),
  pos(height(8, width(8))),
  area(),
  solid(),
  layer("ui")
])

player.onUpdate(() => {
  camPos(player.pos)
})

//movement
const speed = 150

onKeyDown("left", () => {
  player.move(-speed, 0)
})
onKeyDown("right", () => {
  player.move(speed, 0)
})
onKeyDown("up", () => {
  player.move(0, -speed)
})
onKeyDown("down", () => {
  player.move(0, speed)
})
//health 
let life = 100

let healthBar = document.getElementById("health")
health.value = -10;
const brick_size = 32
const maps = addLevel([
  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  'a                 s                                  a',
  'a          22     s                                  a',
  'a           1  2  s             f                    a',
  'a                 s    1 12 1                        a',
  'a       f         s    2 2 1                         a',
  'a                 s      1                           a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a      f          s                                  a',
  'a                 s         f                        a',
  'a                 s                                  a',
  'a            1    s            f          1          a',
  'a           2     s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a           2     s                                  a',
  'a           2     s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s         f                        a',
  'a                 s                                  a',
  'a            1    s            f           1         a',
  'a           2     s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a           2     s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a                 s                                  a',
  'a           2     s                                  a',
  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
], {
width : brick_size,
height: brick_size,
  
  'a': () => [
    sprite("wood"),
    area(),
    solid(),
    scale(0.1)
  ],
  '1': () => [
    sprite("Bone"),
    scale(1.5),
    // layer("ui")
  ],
  's': () => [
    sprite("Street"),
    scale(1.5),
    // layer("ui")
  ],
  '2': () => [
    sprite("Bone2"),
    scale(1.5),
    // layer("ui")
  ],
  'f': () => [
    sprite("fire hydrant"),
    scale(1.5),
    area(),
    solid()
  ]

})

const fireblob_speed = 100

const fireblobSpec = (x, y) => [
  sprite("fireblob"),
  pos(x, y),
  scale(1.4),
  state("move", ["move"]),
  area(),
  layer("ui"),
  solid(90),
]

onCollide("fireblobs", "fire blobs", () =>{
  pushOutAll()
})

const coords = Array.from({ length: 10 }).map((_, i) => {
  return { x: i*100, y: i + 100}
})
const fireblobs = coords.map(c => {
  const fireblob = add(fireblobSpec(c.x, c.y))
  
  fireblob.onStateUpdate("move", () => {
  	if (!player.exists()) return
  	const dir = player.pos.sub(fireblob.pos).unit()
  	fireblob.move(dir.scale(fireblob_speed))
  })
  return fireblob
})
debug.inspect = true
