import React, { useState, useEffect, useCallback } from 'react';
import Split from 'react-split';
import html2pdf from 'html2pdf.js';
import Toolbar from './components/Toolbar';
import Editor from './components/Editor';
import Preview from './components/Preview';
import HelpModal from './components/HelpModal';
import { EditorState } from './types';

const STORAGE_KEY = 'markdown-editor-state';
const INITIAL_CONTENT = `# Welcome to the Markdown Editor (Made By Vikash Kumar)! 

Start writing your content here. Use the toolbar above or keyboard shortcuts to format your text.

## Features

- Real-time preview
- Dark/Light mode
- Export to PDF
- Autosave
- Focus mode
- And much more!

Need help? Click the help icon in the toolbar to see Markdown syntax guide.
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [scrollInfo, setScrollInfo] = useState<{ scrollTop: number; scrollHeight: number } | null>(null);
  const [editorState, setEditorState] = useState<EditorState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      content: INITIAL_CONTENT,
      wordCount: 0,
      readingTime: 0,
      history: [INITIAL_CONTENT],
      currentIndex: 0
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(editorState));
  }, [editorState]);

  useEffect(() => {
    const words = editorState.content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);
    setEditorState(prev => ({ ...prev, wordCount: words, readingTime }));
  }, [editorState.content]);

  const handleContentChange = useCallback((newContent: string) => {
    setEditorState(prev => {
      const newHistory = prev.history.slice(0, prev.currentIndex + 1);
      return {
        ...prev,
        content: newContent,
        history: [...newHistory, newContent],
        currentIndex: newHistory.length
      };
    });
  }, []);

  const handleFormat = useCallback((format: string) => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = editorState.content;
    
    let newContent = text;
    if (start === end) {
      newContent = text.substring(0, start) + format + text.substring(end);
    } else {
      const selected = text.substring(start, end);
      if (format === '**' || format === '_') {
        newContent = text.substring(0, start) + format + selected + format + text.substring(end);
      } else {
        newContent = text.substring(0, start) + format + text.substring(end);
      }
    }
    
    handleContentChange(newContent);
  }, [editorState.content, handleContentChange]);

  const handleExport = useCallback(() => {
    const element = document.createElement('div');
    element.innerHTML = document.querySelector('.prose')?.innerHTML || '';
    
    const opt = {
      margin: 1,
      filename: 'document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  }, []);

  const handleUndo = useCallback(() => {
    if (editorState.currentIndex > 0) {
      setEditorState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex - 1,
        content: prev.history[prev.currentIndex - 1]
      }));
    }
  }, [editorState.currentIndex]);

  const handleRedo = useCallback(() => {
    if (editorState.currentIndex < editorState.history.length - 1) {
      setEditorState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        content: prev.history[prev.currentIndex + 1]
      }));
    }
  }, [editorState.currentIndex, editorState.history.length]);

  return (
    <div className={`h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex-none">
        <Toolbar
          onFormat={handleFormat}
          onExport={handleExport}
          onThemeToggle={() => setIsDarkMode(!isDarkMode)}
          isDarkMode={isDarkMode}
          onHelp={() => setIsHelpOpen(true)}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={editorState.currentIndex > 0}
          canRedo={editorState.currentIndex < editorState.history.length - 1}
          onFocusMode={() => setIsFocusMode(!isFocusMode)}
          isFocusMode={isFocusMode}
        />
      </div>

      <Split
        sizes={[50, 50]}
        minSize={0}
        expandToMin={false}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
        className="flex-1 flex"
      >
        <div className={`h-full ${isFocusMode ? 'w-full' : ''}`}>
          <Editor
            value={editorState.content}
            onChange={handleContentChange}
            onScroll={setScrollInfo}
            isDarkMode={isDarkMode}
          />
        </div>
        {!isFocusMode && (
          <div className="h-full">
            <Preview
              content={editorState.content}
              scrollInfo={scrollInfo}
              isDarkMode={isDarkMode}
            />
          </div>
        )}
      </Split>

      <div className="flex-none p-2 border-t dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>{editorState.wordCount} words</span>
          <span>~{editorState.readingTime} min read</span>
        </div>
      </div>

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}

export default App;
