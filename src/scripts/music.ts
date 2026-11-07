import { playlist } from '../data/music';
import { withBase } from '../lib/urls';

export function initMusicPlayer() {
  const root = document.querySelector<HTMLElement>('[data-music-widget]');
  if (!root) return;
  const audio = root.querySelector<HTMLAudioElement>('[data-music-audio]');
  const panel = root.querySelector<HTMLElement>('[data-music-panel]');
  const title = root.querySelector<HTMLElement>('[data-music-title]');
  const artist = root.querySelector<HTMLElement>('[data-music-artist]');
  const status = root.querySelector<HTMLElement>('[data-music-status]');
  const playButton = root.querySelector<HTMLButtonElement>('[data-music-play]');
  if (!audio || !panel || !title || !artist || !status || !playButton || !playlist.length) return;

  let index = 0;
  const loadTrack = () => {
    const track = playlist[index];
    audio.src = withBase(`/${track.url}`);
    title.textContent = track.title;
    artist.textContent = track.artist;
  };
  const play = async () => {
    try { if (!audio.src) loadTrack(); await audio.play(); playButton.textContent = 'Ⅱ'; status.textContent = '正在播放'; }
    catch { status.textContent = '音频文件不存在或无法播放，请先添加本地音乐。'; }
  };
  const next = (step: number) => { index = (index + step + playlist.length) % playlist.length; loadTrack(); void play(); };
  root.querySelector('[data-music-toggle]')?.addEventListener('click', () => { panel.hidden = !panel.hidden; });
  playButton.addEventListener('click', () => { if (audio.paused) void play(); else { audio.pause(); playButton.textContent = '▶'; status.textContent = '已暂停'; } });
  root.querySelector('[data-music-prev]')?.addEventListener('click', () => next(-1));
  root.querySelector('[data-music-next]')?.addEventListener('click', () => next(1));
  audio.addEventListener('ended', () => next(1));
  loadTrack();
}
