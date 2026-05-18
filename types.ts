
export type ViewState = 'spirit_select' | 'intro' | 'map' | 'location' | 'mystery_gate' | 'oracle' | 'reflection' | 'ending';

export type SpiritAnimal = 'deer' | 'gecko' | 'owl' | 'turtle' | 'fox';

export interface SpiritAnimalInfo {
  id: SpiritAnimal;
  name: string;
  trait: string;
  description: string;
  glowColor: string;
  image: string;
}

export type SymbolType = 'Anchor' | 'Flame' | 'Waves' | 'Landmark' | 'Droplets' | 'Leaf' | 'Star';

export interface LocationData {
  id: string;
  name: string;
  shortDescription: string;
  introImage: string;
  readingText: string[];
  mysterySentence: string;
  symbol: SymbolType;
  symbolMeaning: string;
  questions: Question[];
  sentenceBuilderTasks: SentenceBuilderTask[];
  missingWordsTasks: MissingWordsTask[];
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  hint: string;
}

export interface SentenceBuilderTask {
  id: number;
  blocks: string[];
}

export interface MissingWordsTask {
  id: number;
  sentenceParts: [string, string];
  options: string[];
  correctOption: string;
}

export interface PlayerState {
  inventory: SymbolType[];
  completedLocations: string[];
  wish: string;
  spiritAnimal: SpiritAnimal | null;
}
