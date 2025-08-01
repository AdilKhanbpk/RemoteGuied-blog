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

    // Apply modern Tailwind classes to all HTML elements
    const applyStyles = () => {
      // H1 styling - Modern, bold typography
      const h1Elements = blogContent.querySelectorAll('h1');
      h1Elements.forEach((h1) => {
        h1.className = 'text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-8 mt-16 tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent';
      });

      // H2 styling - Elegant with subtle styling
      const h2Elements = blogContent.querySelectorAll('h2');
      h2Elements.forEach((h2) => {
        h2.className = 'text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6 mt-12 tracking-tight relative pl-6 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-8 before:bg-gradient-to-b before:from-blue-500 before:to-purple-600 before:rounded-full';
      });

      // H3 styling - Modern accent
      const h3Elements = blogContent.querySelectorAll('h3');
      h3Elements.forEach((h3) => {
        h3.className = 'text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-5 mt-10 tracking-tight border-b-2 border-gradient-to-r from-blue-500 to-purple-600 pb-2 inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent';
      });

      // H4 styling
      const h4Elements = blogContent.querySelectorAll('h4');
      h4Elements.forEach((h4) => {
        h4.className = 'text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight mb-4 mt-8 relative';
      });

      // H5 styling
      const h5Elements = blogContent.querySelectorAll('h5');
      h5Elements.forEach((h5) => {
        h5.className = 'text-base sm:text-lg font-bold text-gray-800 leading-tight mb-4 mt-6 uppercase tracking-wide';
      });

      // H6 styling
      const h6Elements = blogContent.querySelectorAll('h6');
      h6Elements.forEach((h6) => {
        h6.className = 'text-sm font-bold text-gray-700 uppercase tracking-wider leading-tight mb-3 mt-5 border-l-2 border-gray-300 pl-3';
      });

      // Paragraph styling with enhanced special content handling
      const paragraphs = blogContent.querySelectorAll('p');
      paragraphs.forEach((p) => {
        const text = p.textContent || '';

        // Handle special content types with modern card styling
        if (text.includes('💡') || text.toLowerCase().includes('tip:') || text.toLowerCase().includes('note:')) {
          p.className = 'relative bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 my-8 text-gray-800 leading-relaxed shadow-sm before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-blue-400 before:to-blue-600 before:rounded-l-2xl';
          p.innerHTML = p.innerHTML.replace('💡', '').trim();
        } else if (text.includes('✅') || text.toLowerCase().includes('important:') || text.toLowerCase().includes('key point:')) {
          p.className = 'relative bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6 my-8 text-gray-800 leading-relaxed shadow-sm before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-emerald-400 before:to-green-600 before:rounded-l-2xl';
          p.innerHTML = p.innerHTML.replace('✅', '').trim();
        } else if (text.toLowerCase().includes('warning:') || text.toLowerCase().includes('caution:') || text.includes('⚠️')) {
          p.className = 'relative bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-6 my-8 text-gray-800 leading-relaxed shadow-sm before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-amber-400 before:to-orange-500 before:rounded-l-2xl';
          p.innerHTML = p.innerHTML.replace('⚠️', '').trim();
        } else {
          // Enhanced standard paragraph styling
          p.className = 'text-gray-700 mb-8 leading-relaxed text-lg sm:text-xl font-light tracking-wide';
        }
      });

      // Enhanced list styling
      const ulElements = blogContent.querySelectorAll('ul');
      ulElements.forEach((ul) => {
        ul.className = 'mb-8 pl-0 space-y-4 list-none';
      });

      const olElements = blogContent.querySelectorAll('ol');
      olElements.forEach((ol) => {
        ol.className = 'mb-8 pl-0 space-y-4 counter-reset-item';
      });

      // Modern list item styling
      const liElements = blogContent.querySelectorAll('li');
      liElements.forEach((li, index) => {
        if (li.parentElement?.tagName === 'UL') {
          li.className = 'text-gray-700 leading-relaxed text-lg font-light pl-8 relative before:absolute before:left-2 before:top-3 before:w-2 before:h-2 before:bg-gradient-to-br before:from-blue-500 before:to-purple-600 before:rounded-full';
        } else if (li.parentElement?.tagName === 'OL') {
          li.className = 'text-gray-700 leading-relaxed text-lg font-light pl-8 relative counter-increment-item before:absolute before:left-0 before:top-0 before:w-6 before:h-6 before:bg-gradient-to-br before:from-blue-500 before:to-purple-600 before:text-white before:text-sm before:font-bold before:rounded-full before:flex before:items-center before:justify-center';
          li.style.counterIncrement = 'item';
          li.setAttribute('data-counter', (index + 1).toString());
        }
      });

      // Enhanced strong/bold styling
      const strongElements = blogContent.querySelectorAll('strong');
      strongElements.forEach((strong) => {
        strong.className = 'font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent';
      });

      // Enhanced emphasis/italic styling
      const emElements = blogContent.querySelectorAll('em');
      emElements.forEach((em) => {
        em.className = 'italic text-gray-600 font-medium';
      });

      // Modern horizontal rule styling
      const hrElements = blogContent.querySelectorAll('hr');
      hrElements.forEach((hr) => {
        hr.className = 'my-16 border-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent';
      });

      // Enhanced blockquote styling
      const blockquotes = blogContent.querySelectorAll('blockquote');
      blockquotes.forEach((blockquote) => {
        blockquote.className = 'relative bg-gradient-to-r from-gray-50 to-white border-l-4 border-gradient-to-b from-blue-500 to-purple-600 pl-8 pr-6 py-6 my-12 italic text-gray-700 text-xl leading-relaxed rounded-r-2xl shadow-sm before:absolute before:left-4 before:top-4 before:text-6xl before:text-blue-300 before:content-["\\""] before:font-serif before:leading-none';
      });

      // Enhanced link styling
      const aElements = blogContent.querySelectorAll('a');
      aElements.forEach((a) => {
        a.className = 'text-blue-600 hover:text-purple-600 transition-all duration-300 font-medium relative inline-flex items-center gap-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:transition-all after:duration-300 hover:after:w-full';
      });

      // Enhanced inline code styling
      const codeElements = blogContent.querySelectorAll('code');
      codeElements.forEach((code) => {
        if (code.parentElement?.tagName !== 'PRE') {
          code.className = 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 px-3 py-1 rounded-lg text-sm font-mono border border-gray-200 shadow-sm';
        }
      });

      // Enhanced code block styling
      const preElements = blogContent.querySelectorAll('pre');
      preElements.forEach((pre) => {
        pre.className = 'relative bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-6 rounded-2xl overflow-x-auto my-10 shadow-2xl border border-gray-700';
        const code = pre.querySelector('code');
        if (code) {
          code.className = 'text-sm font-mono text-gray-100 leading-relaxed';
        }
        
        // Add copy button styling area
        const copyButton = document.createElement('div');
        copyButton.className = 'absolute top-4 right-4 w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center cursor-pointer transition-colors opacity-70 hover:opacity-100';
        copyButton.innerHTML = '<svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>';
        pre.appendChild(copyButton);
      });

      // Enhanced table styling
      const tables = blogContent.querySelectorAll('table');
      tables.forEach((table) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'my-12 overflow-hidden rounded-2xl shadow-lg border border-gray-200';
        table.parentNode?.insertBefore(wrapper, table);
        wrapper.appendChild(table);
        table.className = 'w-full border-collapse bg-white';
      });

      const thElements = blogContent.querySelectorAll('th');
      thElements.forEach((th) => {
        th.className = 'bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 text-left font-bold text-gray-900 border-b border-gray-200 first:rounded-tl-2xl last:rounded-tr-2xl';
      });

      const tdElements = blogContent.querySelectorAll('td');
      tdElements.forEach((td) => {
        td.className = 'px-6 py-4 text-gray-700 border-b border-gray-100 last:border-b-0';
      });

      // Enhanced image styling
      const images = blogContent.querySelectorAll('img');
      images.forEach((img) => {
        // Wrap images in figure if not already wrapped
        if (img.parentElement?.tagName !== 'FIGURE') {
          const figure = document.createElement('figure');
          figure.className = 'my-12 relative group';
          img.parentNode?.insertBefore(figure, img);
          figure.appendChild(img);
          
          // Add shadow container
          const shadowDiv = document.createElement('div');
          shadowDiv.className = 'absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-all duration-500';
          figure.insertBefore(shadowDiv, img);
        }
        
        img.className = 'relative w-full h-auto rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] border border-gray-200';
      });

      // Enhanced figure caption styling
      const figcaptions = blogContent.querySelectorAll('figcaption');
      figcaptions.forEach((figcaption) => {
        figcaption.className = 'text-center mt-4 text-gray-600 italic font-light bg-gray-50 px-4 py-2 rounded-lg border border-gray-200';
      });
    };

    // Apply styles after content is rendered
    const timer = setTimeout(applyStyles, 0);
    
    return () => clearTimeout(timer);
  }, [content]);

  return (
    <div 
      ref={contentRef}
      className={`prose prose-xl max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default BlogContent;