export interface Theme {
  name: string;
  background: string;
  text: string;
  accent: string;
  editor: string;
  preview: string;
}

export interface EditorState {
  content: string;
  wordCount: number;
  readingTime: number;
  history: string[];
  currentIndex: number;
}