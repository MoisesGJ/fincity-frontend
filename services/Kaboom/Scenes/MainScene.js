import { scaleFactor } from '@/services/Kaboom/constants';
import { setCamScale } from '@/services/Kaboom/utils';

export default class MainScene {
  constructor(kaboomInstance, entities) {
    this.kaboomInstance = kaboomInstance;
    this.entities = entities;
  }

  init(layers) {
    this.kaboomInstance.scene('game', () => {
      this.setupGame(layers);
    });
  }

  async setupGame(layers) {
    const player = this.entities['player'];
    const map = this.entities['world'];

    if (player.getPlayer() && map.getMap() && layers.length > 0) {
      map.init(layers);
      player.init(layers);

      for (const layer of layers) {
        if (layer.name === 'spawnpoints') {
          for (const entity of layer.objects) {
            if (entity.name === 'player') {
              player.getPlayer().pos = this.kaboomInstance.vec2(
                (map.getMap().pos.x + entity.x) * scaleFactor,
                (map.getMap().pos.y + entity.y) * scaleFactor
              );
              this.kaboomInstance.add(player.getPlayer());
              continue;
            }
          }
        }
      }

      setCamScale(this.kaboomInstance);

      this.kaboomInstance.onResize(() => {
        setCamScale(this.kaboomInstance);
      });

      //METHODS

      this.kaboomInstance.onResize(() => {
        setCamScale(this.kaboomInstance);
      });

      this.kaboomInstance.onUpdate(() =>
        this.kaboomInstance.camPos(
          player.getPlayer().pos.x,
          player.getPlayer().pos.y + 100
        )
      );

      //Movement
      //Keys

      this.kaboomInstance.onKeyDown('left', () => {
        player.getPlayer().flipX = true;
        player.getPlayer().move(-player.getPlayer().speed, 0);
      });

      this.kaboomInstance.onKeyDown('right', () => {
        player.getPlayer().flipX = false;
        player.getPlayer().move(player.getPlayer().speed, 0);
      });

      this.kaboomInstance.onKeyDown('up', () => {
        player.getPlayer().move(0, -player.getPlayer().speed);
      });

      this.kaboomInstance.onKeyDown('down', () => {
        player.getPlayer().move(0, player.getPlayer().speed);
      });

      this.kaboomInstance.onKeyDown('a', () => {
        player.getPlayer().flipX = true;
        player.getPlayer().move(-player.getPlayer().speed, 0);
      });

      this.kaboomInstance.onKeyDown('d', () => {
        player.getPlayer().flipX = false;
        player.getPlayer().move(player.getPlayer().speed, 0);
      });

      this.kaboomInstance.onKeyDown('w', () => {
        player.getPlayer().move(0, -player.getPlayer().speed);
      });

      this.kaboomInstance.onKeyDown('s', () => {
        player.getPlayer().move(0, player.getPlayer().speed);
      });

      //Mouse
      this.kaboomInstance.onMouseDown((mouseBtn) => {
        if (mouseBtn !== 'left' || player.isInDialogue) return;

        const worldMousePos = this.kaboomInstance.toWorld(
          this.kaboomInstance.mousePos()
        );
        player.getPlayer().moveTo(worldMousePos, player.getPlayer().speed);

        const mouseAngle = player.getPlayer().pos.angle(worldMousePos);
        const lowerBound = 50;
        const upperBound = 125;

        if (
          mouseAngle > lowerBound &&
          mouseAngle < upperBound &&
          player.getPlayer().curAnim() !== 'walk-up'
        ) {
          player.getPlayer().play('walk-up');
          player.getPlayer().direction = 'up';
          return;
        }

        if (Math.abs(mouseAngle) > upperBound) {
          player.getPlayer().flipX = false;
          if (player.getPlayer().curAnim() !== 'walk-side')
            player.getPlayer().play('walk-side');
          player.getPlayer().direction = 'right';
          return;
        }

        if (Math.abs(mouseAngle) < lowerBound) {
          player.getPlayer().flipX = true;
          if (player.getPlayer().curAnim() !== 'walk-side')
            player.getPlayer().play('walk-side');
          player.getPlayer().direction = 'left';
          return;
        }

        if (
          mouseAngle < -lowerBound &&
          mouseAngle > -upperBound &&
          player.getPlayer().curAnim() !== 'walk-down'
        ) {
          player.getPlayer().play('walk-down');
          player.getPlayer().direction = 'down';
          return;
        }
      });

      function stopAnims() {
        if (player.getPlayer().direction === 'down') {
          player.getPlayer().play('idle-down');
          return;
        }
        if (player.getPlayer().direction === 'up') {
          player.getPlayer().play('idle-up');
          return;
        }

        player.getPlayer().play('idle-side');
      }

      this.kaboomInstance.onMouseRelease(stopAnims);

      ['left', 'right', 'up', 'down', 'a', 'd', 'w', 's'].forEach((key) => {
        this.kaboomInstance.onKeyPress(key, () => {
          player.getPlayer().play('walk-side');
        });
        this.kaboomInstance.onKeyRelease(key, () => {
          if (
            !this.kaboomInstance.isKeyDown('left') &&
            !this.kaboomInstance.isKeyDown('right') &&
            !this.kaboomInstance.isKeyDown('up') &&
            !this.kaboomInstance.isKeyDown('down')
          ) {
            stopAnims();
          }
        });
      });
    }
  }
}
