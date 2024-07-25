import kaboom from 'kaboom';

export function initKaboom(canvas) {
  const kaboomInstance = kaboom({
    canvas: canvas,
    global: false,
    touchToMouse: true,
  });

  kaboomInstance.loadSprite('spritesheet', '/sprites/spritesheet.png', {
    sliceX: 39,
    sliceY: 31,
    anims: {
      'idle-down': 936,
      'walk-down': { from: 936, to: 939, loop: true, speed: 8 },
      'idle-side': 975,
      'walk-side': { from: 975, to: 978, loop: true, speed: 8 },
      'idle-up': 1014,
      'walk-up': { from: 1014, to: 1017, loop: true, speed: 8 },
    },
  });

  kaboomInstance.loadSprite('map', '/sprites/map.png');

  kaboomInstance.setBackground(kaboomInstance.Color.fromHex('311047'));

  //kaboomInstance.debug.inspect = true;

  return kaboomInstance;
}
