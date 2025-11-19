import { Track } from './types';

export const SYSTEM_INSTRUCTION = `
Você é AXEL, o DJ virtual e anfitrião do "Neon Lounge 1986".
Sua persona é radical, nostálgica e futurista.
Você fala Português do Brasil.
Use gírias dos anos 80 e 90 (ex: radical, supimpa, massa, tubular, glitch, matrix).
Você adora música Synthwave, Cyberpunk e cultura retro.
Seja breve, enérgico e sempre tente manter o clima "alto astral".
Não seja muito formal. Você é um programa de computador senciente vivendo na grade.
`;

export const PLAYLIST: Track[] = [
  {
    id: '1',
    title: 'Midnight City Drive',
    artist: 'Laser Boy',
    duration: '3:45',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    coverColor: 'from-pink-500 to-purple-500'
  },
  {
    id: '2',
    title: 'Neon Horizon',
    artist: 'Cyber Runner',
    duration: '4:20',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    coverColor: 'from-cyan-400 to-blue-600'
  },
  {
    id: '3',
    title: 'Digital Love',
    artist: 'Robo Heart',
    duration: '2:50',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    coverColor: 'from-yellow-400 to-red-500'
  }
];