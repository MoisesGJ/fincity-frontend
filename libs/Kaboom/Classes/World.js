import { scaleFactor } from '@/libs/Kaboom/constants';

export default class World {
  constructor(kaboomInstance) {
    this.kaboomInstance = kaboomInstance;
    this.map = this.kaboomInstance.add();
  }

  init(layers) {
    this.spawn();
    this.load(layers);
  }

  spawn() {
    this.map = this.kaboomInstance.add([
      this.kaboomInstance.sprite('map'),
      this.kaboomInstance.pos(0),
      this.kaboomInstance.scale(scaleFactor),
    ]);
  }

  load(layers) {
    for (const layer of layers) {
      if (layer.name == 'boundaries') {
        for (const boundary of layer.objects) {
          this.map.add([
            this.kaboomInstance.area({
              shape: new this.kaboomInstance.Rect(
                this.kaboomInstance.vec2(0),
                boundary.width,
                boundary.height
              ),
            }),
            this.kaboomInstance.body({ isStatic: true }),
            this.kaboomInstance.pos(boundary.x, boundary.y),
            boundary.name,
          ]);
        }
        continue;
      }
    }
  }

  getMap() {
    return this.map;
  }
}
