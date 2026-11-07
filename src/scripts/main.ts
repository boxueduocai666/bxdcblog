import { initTheme } from './theme';
import { initSearch } from './search';
import { initReadingTools, initCodeCopy } from './reader';
import { initComments } from './comments';
import { initMusicPlayer } from './music';
import { featureConfig } from '../config/features';

initTheme();
initSearch();
initReadingTools();
if (featureConfig.codeCopy) initCodeCopy();
initComments();
initMusicPlayer();
