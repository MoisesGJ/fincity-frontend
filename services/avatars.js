const avatars = ['Beaveron', 'Hoodina', 'Skeleton', 'Skullcrasher', 'Widomer'];

const randomIndex = Math.floor(Math.random() * (avatars.length + 1));

export function RandomAvatar() {
  return `Character${avatars[randomIndex]}`;
}
