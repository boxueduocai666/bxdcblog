export interface Track {
  title: string;
  artist: string;
  url: string;
}

// Music is optional and disabled by default. Add your own licensed audio files first.
export const playlist: Track[] = [
  { title: '爱情讯息', artist: '郭静', url: 'assets/music/爱情讯息.mp3' },
  { title: '晨间新闻', artist: '蔡健雅', url: 'assets/music/晨间新闻.mp3' },
];
