import React from 'react';
import { X } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black text-black dark:text-white bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold">Markdown Guide</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <section>
            <h3 className="font-bold mb-2">Basic Syntax</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <code className="block bg-gray-100 dark:bg-gray-900 p-2 rounded">
                  # Heading 1
                  ## Heading 2
                  ### Heading 3
                </code>
              </div>
              <div>
                <code className="block bg-gray-100 dark:bg-gray-900 p-2 rounded">
                  **bold text**
                  *italic text*
                  ~~strikethrough~~
                </code>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-bold mb-2">Lists</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <code className="block bg-gray-100 dark:bg-gray-900 p-2 rounded">
                  - Unordered item
                  - Another item
                    - Nested item
                </code>
              </div>
              <div>
                <code className="block bg-gray-100 dark:bg-gray-900 p-2 rounded">
                  1. Ordered item
                  2. Another item
                     1. Nested item
                </code>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-bold mb-2">Links and Images</h3>
            <code className="block bg-gray-100 dark:bg-gray-900 p-2 rounded mb-2">
              [Link text](https://example.com)
              ![Alt text](image-url.jpg)
            </code>
          </section>

          <section>
            <h3 className="font-bold mb-2">Code</h3>
            <code className="block bg-gray-100 dark:bg-gray-900 p-2 rounded mb-2">
              `inline code`
              ```
              code block
              ```
            </code>
          </section>

          <section>
            <h3 className="font-bold mb-2">Keyboard Shortcuts</h3>
            <ul className="list-disc list-inside">
              <li><kbd>Ctrl</kbd> + <kbd>B</kbd> - Bold</li>
              <li><kbd>Ctrl</kbd> + <kbd>I</kbd> - Italic</li>
              <li><kbd>Ctrl</kbd> + <kbd>K</kbd> - Link</li>
              <li><kbd>Ctrl</kbd> + <kbd>Z</kbd> - Undo</li>
              <li><kbd>Ctrl</kbd> + <kbd>Y</kbd> - Redo</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;