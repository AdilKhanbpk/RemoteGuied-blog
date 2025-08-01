'use client';

import React, { useEffect, useRef } from 'react';

interface BlogContentProps {
  content: string;
  className?: string; 
}

const BlogContent: React.FC<BlogContentProps> = ({ content, className = '' }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const blogContent = contentRef.current;

    // Apply Tailwind classes to all HTML elements
    const applyStyles = () => {
      // H1 styling
      const h1Elements = blogContent.querySelectorAll('h1');
      h1Elements.forEach((h1) => {
        h1.className = 'text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6 mt-10 tracking-tight';
      });

      // H2 styling
      const h2Elements = blogContent.querySelectorAll('h2');
      h2Elements.forEach((h2) => {
        h2.className = 'text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-5 mt-8 tracking-tight';
      });

      // H3 styling
      const h3Elements = blogContent.querySelectorAll('h3');
      h3Elements.forEach((h3) => {
        h3.className = 'text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 leading-tight mb-4 mt-7';
      });

      // H4 styling
      const h4Elements = blogContent.querySelectorAll('h4');
      h4Elements.forEach((h4) => {
        h4.className = 'text-base sm:text-lg font-semibold text-gray-900 leading-tight mb-3 mt-6';
      });

      // H5 styling
      const h5Elements = blogContent.querySelectorAll('h5');
      h5Elements.forEach((h5) => {
        h5.className = 'text-base font-semibold text-gray-800 leading-tight mb-3 mt-5';
      });

      // H6 styling
      const h6Elements = blogContent.querySelectorAll('h6');
      h6Elements.forEach((h6) => {
        h6.className = 'text-sm font-semibold text-gray-700 uppercase tracking-wide leading-tight mb-3 mt-4';
      });

      // Paragraph styling with special content handling
      const paragraphs = blogContent.querySelectorAll('p');
      paragraphs.forEach((p) => {
        const text = p.textContent || '';

        // Handle special content types
        if (text.includes('💡') || text.toLowerCase().includes('tip:') || text.toLowerCase().includes('note:')) {
          p.className = 'bg-blue-50 border-l-4 border-blue-400 p-4 my-6 text-gray-800 leading-relaxed rounded-r-lg';
          // Remove emoji if present
          p.innerHTML = p.innerHTML.replace('💡', '').trim();
        } else if (text.includes('✅') || text.toLowerCase().includes('important:') || text.toLowerCase().includes('key point:')) {
          p.className = 'bg-green-50 border-l-4 border-green-400 p-4 my-6 text-gray-800 leading-relaxed rounded-r-lg';
          // Remove emoji if present
          p.innerHTML = p.innerHTML.replace('✅', '').trim();
        } else if (text.toLowerCase().includes('warning:') || text.toLowerCase().includes('caution:') || text.includes('⚠️')) {
          p.className = 'bg-amber-50 border-l-4 border-amber-400 p-4 my-6 text-gray-800 leading-relaxed rounded-r-lg';
          // Remove emoji if present
          p.innerHTML = p.innerHTML.replace('⚠️', '').trim();
        } else {
          // Standard paragraph styling
          p.className = 'text-gray-700 mb-6 leading-relaxed text-base sm:text-lg';
        }
      });

      // List styling
      const ulElements = blogContent.querySelectorAll('ul');
      ulElements.forEach((ul) => {
        ul.className = 'mb-6 pl-6 space-y-2';
      });

      const olElements = blogContent.querySelectorAll('ol');
      olElements.forEach((ol) => {
        ol.className = 'mb-6 pl-6 space-y-2 list-decimal';
      });

      // List item styling
      const liElements = blogContent.querySelectorAll('li');
      liElements.forEach((li) => {
        if (li.parentElement?.tagName === 'UL') {
          li.className = 'text-gray-700 leading-relaxed text-base sm:text-lg list-disc';
        } else if (li.parentElement?.tagName === 'OL') {
          li.className = 'text-gray-700 leading-relaxed text-base sm:text-lg';
        }
      });

      // Strong/Bold styling
      const strongElements = blogContent.querySelectorAll('strong');
      strongElements.forEach((strong) => {
        strong.className = 'font-semibold text-gray-900';
      });

      // Emphasis/Italic styling
      const emElements = blogContent.querySelectorAll('em');
      emElements.forEach((em) => {
        em.className = 'italic text-gray-700';
      });

      // Horizontal rule styling
      const hrElements = blogContent.querySelectorAll('hr');
      hrElements.forEach((hr) => {
        hr.className = 'my-12 border-0 h-px bg-gray-200';
      });

      // Blockquote styling
      const blockquotes = blogContent.querySelectorAll('blockquote');
      blockquotes.forEach((blockquote) => {
        blockquote.className = 'border-l-4 border-gray-300 pl-6 my-8 italic text-gray-600 text-lg leading-relaxed';
      });

      // Link styling
      const aElements = blogContent.querySelectorAll('a');
      aElements.forEach((a) => {
        a.className = 'text-blue-600 hover:text-blue-800 transition-colors duration-200 underline decoration-blue-600/30 hover:decoration-blue-800/50 underline-offset-2';
      });

      // Inline code styling
      const codeElements = blogContent.querySelectorAll('code');
      codeElements.forEach((code) => {
        if (code.parentElement?.tagName !== 'PRE') {
          code.className = 'bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono';
        }
      });

      // Code block styling
      const preElements = blogContent.querySelectorAll('pre');
      preElements.forEach((pre) => {
        pre.className = 'bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6';
        const code = pre.querySelector('code');
        if (code) {
          code.className = 'text-sm font-mono text-gray-100';
        }
      });

      // Table styling
      const tables = blogContent.querySelectorAll('table');
      tables.forEach((table) => {
        table.className = 'w-full border-collapse border border-gray-200 my-8 rounded-lg overflow-hidden';
      });

      const thElements = blogContent.querySelectorAll('th');
      thElements.forEach((th) => {
        th.className = 'border border-gray-200 bg-gray-50 px-4 py-3 text-left font-semibold text-gray-900';
      });

      const tdElements = blogContent.querySelectorAll('td');
      tdElements.forEach((td) => {
        td.className = 'border border-gray-200 px-4 py-3 text-gray-700';
      });

      // Image styling
      const images = blogContent.querySelectorAll('img');
      images.forEach((img) => {
        img.className = 'w-full h-auto rounded-lg shadow-sm my-8 max-w-full';
        
        // Wrap images in figure if not already wrapped
        if (img.parentElement?.tagName !== 'FIGURE') {
          const figure = document.createElement('figure');
          figure.className = 'my-8';
          img.parentNode?.insertBefore(figure, img);
          figure.appendChild(img);
        }
      });

      // Figure caption styling
      const figcaptions = blogContent.querySelectorAll('figcaption');
      figcaptions.forEach((figcaption) => {
        figcaption.className = 'text-sm text-gray-600 text-center mt-2 italic';
      });
    };

    // Apply styles after content is rendered
    const timer = setTimeout(applyStyles, 0);
    
    return () => clearTimeout(timer);
  }, [content]);

  return (
    <div 
      ref={contentRef}
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default BlogContent;
