import { scaleFactor } from '@/services/Kaboom/constants';
import { displayDialogue } from '@/services/Kaboom/utils';
import { signOut } from 'next-auth/react';

export default class Player {
  constructor(kaboomInstance, refs) {
    this.kaboomInstance = kaboomInstance;
    this.refs = refs;
    this.player = this.kaboomInstance.make();
  }

  init(layers) {
    this.spawn();
    this.load(layers);
  }

  spawn() {
    this.player = this.kaboomInstance.make([
      this.kaboomInstance.sprite('spritesheet', { anim: 'idle-down' }),
      this.kaboomInstance.area({
        shape: new this.kaboomInstance.Rect(
          this.kaboomInstance.vec2(0, 3),
          10,
          10
        ),
      }),
      this.kaboomInstance.body(),
      this.kaboomInstance.anchor('center'),
      this.kaboomInstance.pos(),
      this.kaboomInstance.scale(scaleFactor),
      {
        speed: 200,
        direction: 'down',
        isInDialoge: false,
      },
      'player',
    ]);
  }

  load(layers) {
    for (const layer of layers) {
      if (layer.name == 'boundaries') {
        for (const boundary of layer.objects) {
          if (boundary.name) {
            this.player.onCollide(boundary.name, () => {
              if (boundary.name === 'exit') {
                signOut();
              } else {
                this.player.isInDialogue = true;
                const cleanupDialogue = displayDialogue(
                  boundary.name,
                  () => {
                    this.player.isInDialogue = false;
                    if (typeof cleanupDialogue === 'function') {
                      cleanupDialogue();
                    }
                  },
                  this.refs
                );
              }
            });
          }
        }
        continue;
      }
    }
  }

  handleCollision(name, onCollide) {
    if (this.player) {
      this.player.onCollide(name, () => onCollide());
    } else {
      console.error('Player not initialized');
    }
  }

  getPlayer() {
    return this.player;
  }
}
