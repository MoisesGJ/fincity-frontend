import { useEffect, useRef, useState } from 'react';
import { initKaboom } from '@/libs/Kaboom/init';

import MainScene from '@/libs/Kaboom/Scenes/MainScene';

import Player from '@/libs/Kaboom/Classes/Player';
import World from '@/libs/Kaboom/Classes/World';

export default function Game({ session }) {
  const canvasRef = useRef(null);
  const textboxContainerRef = useRef(null);
  const dialogueRef = useRef(null);
  const closeBtnRef = useRef(null);

  const { user } = session;

  const [map, setMap] = useState(null);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await fetch('/api/map');
        if (!response.ok) {
          throw new Error('Error fetching map data');
        }
        const data = await response.json();
        setMap(data.layers);
      } catch (error) {
        console.error('Error fetching map data:', error);
      }
    };

    fetchMapData();
  }, []);

  useEffect(() => {
    if (!map || !canvasRef.current) return;

    const instance = initKaboom(canvasRef.current);

    const entities = {
      player: new Player(instance, {
        textboxContainerRef,
        dialogueRef,
        closeBtnRef,
      }),
      world: new World(instance),
    };

    const mainScene = new MainScene(instance, entities);

    (async () => {
      await mainScene.init(map);
    })();

    instance.go('game');
  }, [map]);

  return (
    <main className="overflow-hidden text-[2rem] min-h-[100dvh]">
      <div className="relative w-full h-[100dvh]">
        <div id="ui">
          <p className="text-gray-200 select-none absolute left-5 top-[1vh] flex flex-col">
            ¡Hola, {user.first_name}!
          </p>
          <div
            id="textbox-container"
            className="absolute bottom-0 w-full hidden"
            ref={textboxContainerRef}
          >
            <div
              id="textbox"
              className="absolute left-10 right-10 bottom-[2vh] min-h-[10vh] bg-white rounded border outline outline-gray-300 p-4 flex flex-col flex-wrap justify-start items-start word-spacing-[0.2rem] shadow-md"
            >
              <p
                id="dialogue"
                className="m-0 select-none"
                ref={dialogueRef}
              ></p>
              <div className="self-end mt-4">
                <button
                  id="close"
                  className="font-mono border-none rounded p-4 text-inherit text-lg"
                  ref={closeBtnRef}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          className="min-h-[100dvh]"
        ></canvas>
      </div>
    </main>
  );
}
