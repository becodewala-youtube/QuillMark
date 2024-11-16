import React from 'react';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link,
  Image,
  Code,
  Table,
  FileDown,
  Sun,
  Moon,
  HelpCircle,
  Undo,
  Redo,
  Target,
} from 'lucide-react';

interface ToolbarProps {
  onFormat: (format: string) => void;
  onExport: () => void;
  onThemeToggle: () => void;
  isDarkMode: boolean;
  onHelp: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onFocusMode: () => void;
  isFocusMode: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onFormat,
  onExport,
  onThemeToggle,
  isDarkMode,
  onHelp,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onFocusMode,
  isFocusMode,
}) => {
  const tools = [
    { icon: <Bold size={20} />, format: '**', tooltip: 'Bold (Ctrl+B)' },
    { icon: <Italic size={20} />, format: '_', tooltip: 'Italic (Ctrl+I)' },
    { icon: <List size={20} />, format: '- ', tooltip: 'Bullet List' },
    { icon: <ListOrdered size={20} />, format: '1. ', tooltip: 'Numbered List' },
    { icon: <Link size={20} />, format: '[](url)', tooltip: 'Link (Ctrl+K)' },
    { icon: <Image size={20} />, format: '![](url)', tooltip: 'Image' },
    { icon: <Code size={20} />, format: '```\n\n```', tooltip: 'Code Block' },
    { icon: <Table size={20} />, format: '| Header | Header |\n| --- | --- |\n| Cell | Cell |', tooltip: 'Table' },
  ];

  return (
    <div className="flex items-center fixed top-0 left-0 w-full dark:bg-white space-x-2 p-2 border-b dark:border-gray-700">
      <div className="flex space-x-1">
        {tools.map((tool, index) => (
          <button
            key={index}
            onClick={() => onFormat(tool.format)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title={tool.tooltip}
          >
            {tool.icon}
          </button>
        ))}
      </div>

      <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2" />

      <div className="flex space-x-1">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`p-2 rounded-lg transition-colors ${
            canUndo ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : 'opacity-50 cursor-not-allowed'
          }`}
          title="Undo (Ctrl+Z)"
        >
          <Undo size={20} />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`p-2 rounded-lg transition-colors ${
            canRedo ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : 'opacity-50 cursor-not-allowed'
          }`}
          title="Redo (Ctrl+Y)"
        >
          <Redo size={20} />
        </button>
      </div>

      <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2" />

      <div className="flex space-x-1">
        <button
          onClick={onExport}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="Export"
        >
          <FileDown size={20} />
        </button>
        <button
          onClick={onThemeToggle}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          onClick={onFocusMode}
          className={`p-2 rounded-lg transition-colors ${
            isFocusMode ? 'bg-blue-100 dark:bg-blue-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          title="Focus Mode"
        >
          <Target size={20} />
        </button>
        <button
          onClick={onHelp}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="Markdown Help"
        >
          <HelpCircle size={20} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;