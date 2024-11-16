import React, { useRef, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface PreviewProps {
  content: string;
  scrollInfo: { scrollTop: number; scrollHeight: number } | null;
  isDarkMode: boolean;
}

const Preview: React.FC<PreviewProps> = ({ content, scrollInfo, isDarkMode }) => {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollInfo && previewRef.current) {
      const ratio = scrollInfo.scrollTop / scrollInfo.scrollHeight;
      const scrollTarget = previewRef.current.scrollHeight * ratio;
      previewRef.current.scrollTop = scrollTarget;
    }
  }, [scrollInfo]);

  const sanitizedHtml = DOMPurify.sanitize(marked(content));

  return (
    <div
      ref={previewRef}
      className={`w-full h-full overflow-auto pt-16 p-4 prose ${
        isDarkMode ? 'prose-invert bg-gray-800' : 'bg-gray-50'
      } max-w-none`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

export default Preview;