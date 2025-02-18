import React, { useRef, useEffect } from 'react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  onScroll: (scrollInfo: { scrollTop: number; scrollHeight: number }) => void;
  isDarkMode: boolean;
}

const Editor: React.FC<EditorProps> = ({ value, onChange, onScroll, isDarkMode }) => {
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && editorRef.current === document.activeElement) {
        e.preventDefault();
        const start = editorRef.current.selectionStart;
        const end = editorRef.current.selectionEnd;
        const newValue = value.substring(0, start) + '  ' + value.substring(end);
        onChange(newValue);
        editorRef.current.selectionStart = editorRef.current.selectionEnd = start + 2;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [value, onChange]);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const { scrollTop, scrollHeight } = e.currentTarget;
    onScroll({ scrollTop, scrollHeight });
  };

  return (
    <textarea
      ref={editorRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onScroll={handleScroll}
      className={`w-full h-full resize-none pt-16 p-4 focus:outline-none font-mono ${
        isDarkMode
          ? 'bg-gray-900 text-gray-100'
          : 'bg-white text-gray-900'
      }`}
      placeholder="Start writing your Markdown here..."
      spellCheck="false"
    />
  );
};

export default Editor;