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

    // Apply professional blog styling with responsive typography
    const applyStyles = () => {
      // Professional H1 styling - Article main headings
      const h1Elements = blogContent.querySelectorAll('h1');
      h1Elements.forEach((h1) => {
        h1.className = 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-slate-900 leading-[1.1] mb-6 sm:mb-8 md:mb-10 mt-12 sm:mt-16 md:mt-20 tracking-tight max-w-4xl';
        
        // Add professional styling elements
        const wrapper = document.createElement('div');
        wrapper.className = 'relative mb-8 sm:mb-12';
        h1.parentNode?.insertBefore(wrapper, h1);
        wrapper.appendChild(h1);
        
        // Add subtle accent line
        const accentLine = document.createElement('div');
        accentLine.className = 'w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-4 sm:mt-6';
        wrapper.appendChild(accentLine);
      });

      // Professional H2 styling - Section headers
      const h2Elements = blogContent.querySelectorAll('h2');
      h2Elements.forEach((h2) => {
        h2.className = 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 leading-[1.2] mb-4 sm:mb-6 md:mb-8 mt-10 sm:mt-12 md:mt-16 tracking-tight max-w-4xl';
        
        // Add professional container
        const container = document.createElement('div');
        container.className = 'relative group';
        h2.parentNode?.insertBefore(container, h2);
        container.appendChild(h2);
        
        // Add hover accent
        const accent = document.createElement('div');
        accent.className = 'absolute -left-4 sm:-left-6 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300';
        container.appendChild(accent);
      });

      // Professional H3 styling - Subsection headers
      const h3Elements = blogContent.querySelectorAll('h3');
      h3Elements.forEach((h3) => {
        h3.className = 'text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-800 leading-[1.3] mb-3 sm:mb-4 md:mb-6 mt-8 sm:mt-10 md:mt-12 tracking-tight max-w-4xl relative';
        
        // Add subtle underline effect
        const underline = document.createElement('div');
        underline.className = 'absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 group-hover:w-full';
        h3.appendChild(underline);
        h3.classList.add('group');
      });

      // Professional H4 styling
      const h4Elements = blogContent.querySelectorAll('h4');
      h4Elements.forEach((h4) => {
        h4.className = 'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-slate-800 leading-[1.4] mb-3 sm:mb-4 md:mb-5 mt-6 sm:mt-8 md:mt-10 tracking-tight max-w-4xl';
      });

      // Professional H5 styling
      const h5Elements = blogContent.querySelectorAll('h5');
      h5Elements.forEach((h5) => {
        h5.className = 'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-slate-700 leading-[1.4] mb-2 sm:mb-3 md:mb-4 mt-5 sm:mt-6 md:mt-8 tracking-wide uppercase max-w-4xl';
      });

      // Professional H6 styling
      const h6Elements = blogContent.querySelectorAll('h6');
      h6Elements.forEach((h6) => {
        h6.className = 'text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-slate-600 leading-[1.4] mb-2 sm:mb-3 mt-4 sm:mt-5 md:mt-6 tracking-wider uppercase border-l-3 border-slate-300 pl-3 sm:pl-4 max-w-4xl';
      });

      // Professional paragraph styling with optimal reading experience
      const paragraphs = blogContent.querySelectorAll('p');
      paragraphs.forEach((p) => {
        const text = p.textContent || '';

        // Handle special content types with professional callout boxes
        if (text.includes('💡') || text.toLowerCase().includes('tip:') || text.toLowerCase().includes('note:')) {
          p.className = 'relative bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm border border-blue-200/60 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 my-6 sm:my-8 md:my-10 text-slate-800 leading-[1.7] text-sm sm:text-base md:text-lg lg:text-xl font-normal shadow-sm hover:shadow-md transition-shadow duration-300 max-w-4xl before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-blue-400 before:to-blue-600 before:rounded-l-xl sm:before:rounded-l-2xl';
          p.innerHTML = p.innerHTML.replace('💡', '').trim();
          
          // Add tip icon
          const icon = document.createElement('div');
          icon.className = 'absolute top-4 sm:top-5 md:top-6 right-4 sm:right-5 md:right-6 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-500 rounded-full flex items-center justify-center';
          icon.innerHTML = '<svg class="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>';
          p.appendChild(icon);
          
        } else if (text.includes('✅') || text.toLowerCase().includes('important:') || text.toLowerCase().includes('key point:')) {
          p.className = 'relative bg-gradient-to-r from-emerald-50/80 to-green-50/80 backdrop-blur-sm border border-emerald-200/60 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 my-6 sm:my-8 md:my-10 text-slate-800 leading-[1.7] text-sm sm:text-base md:text-lg lg:text-xl font-normal shadow-sm hover:shadow-md transition-shadow duration-300 max-w-4xl before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-emerald-400 before:to-green-600 before:rounded-l-xl sm:before:rounded-l-2xl';
          p.innerHTML = p.innerHTML.replace('✅', '').trim();
          
          // Add success icon
          const icon = document.createElement('div');
          icon.className = 'absolute top-4 sm:top-5 md:top-6 right-4 sm:right-5 md:right-6 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-emerald-500 rounded-full flex items-center justify-center';
          icon.innerHTML = '<svg class="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>';
          p.appendChild(icon);
          
        } else if (text.toLowerCase().includes('warning:') || text.toLowerCase().includes('caution:') || text.includes('⚠️')) {
          p.className = 'relative bg-gradient-to-r from-amber-50/80 to-yellow-50/80 backdrop-blur-sm border border-amber-200/60 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 my-6 sm:my-8 md:my-10 text-slate-800 leading-[1.7] text-sm sm:text-base md:text-lg lg:text-xl font-normal shadow-sm hover:shadow-md transition-shadow duration-300 max-w-4xl before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-amber-400 before:to-orange-500 before:rounded-l-xl sm:before:rounded-l-2xl';
          p.innerHTML = p.innerHTML.replace('⚠️', '').trim();
          
          // Add warning icon
          const icon = document.createElement('div');
          icon.className = 'absolute top-4 sm:top-5 md:top-6 right-4 sm:right-5 md:right-6 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-amber-500 rounded-full flex items-center justify-center';
          icon.innerHTML = '<svg class="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>';
          p.appendChild(icon);
          
        } else {
          // Professional standard paragraph styling - optimized for reading
          p.className = 'text-slate-700 mb-4 sm:mb-5 md:mb-6 lg:mb-8 leading-[1.7] sm:leading-[1.8] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-normal tracking-wide max-w-4xl mx-auto antialiased';
        }
      });

      // Professional list styling
      const ulElements = blogContent.querySelectorAll('ul');
      ulElements.forEach((ul) => {
        ul.className = 'mb-6 sm:mb-8 md:mb-10 pl-0 space-y-2 sm:space-y-3 md:space-y-4 list-none max-w-4xl mx-auto';
      });

      const olElements = blogContent.querySelectorAll('ol');
      olElements.forEach((ol) => {
        ol.className = 'mb-6 sm:mb-8 md:mb-10 pl-0 space-y-2 sm:space-y-3 md:space-y-4 list-none counter-reset-item max-w-4xl mx-auto';
      });

      // Professional list item styling with custom bullets/numbers
      const liElements = blogContent.querySelectorAll('li');
      liElements.forEach((li, index) => {
        if (li.parentElement?.tagName === 'UL') {
          li.className = 'text-slate-700 leading-[1.7] text-sm sm:text-base md:text-lg lg:text-xl font-normal pl-8 sm:pl-10 md:pl-12 relative before:absolute before:left-2 sm:before:left-3 before:top-2 sm:before:top-3 before:w-2 before:h-2 sm:before:w-2.5 sm:before:h-2.5 before:bg-gradient-to-br before:from-blue-500 before:to-purple-600 before:rounded-full before:shadow-sm';
        } else if (li.parentElement?.tagName === 'OL') {
          li.className = 'text-slate-700 leading-[1.7] text-sm sm:text-base md:text-lg lg:text-xl font-normal pl-10 sm:pl-12 md:pl-14 relative';
          
          // Create custom numbered bullet
          const bullet = document.createElement('div');
          bullet.className = 'absolute left-0 top-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs sm:text-sm md:text-base font-bold rounded-full flex items-center justify-center shadow-md';
          bullet.textContent = (index + 1).toString();
          li.insertBefore(bullet, li.firstChild);
        }
      });

      // Professional strong/bold styling
      const strongElements = blogContent.querySelectorAll('strong');
      strongElements.forEach((strong) => {
        strong.className = 'font-bold text-slate-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent';
      });

      // Professional emphasis/italic styling
      const emElements = blogContent.querySelectorAll('em');
      emElements.forEach((em) => {
        em.className = 'italic text-slate-700 font-medium bg-slate-50 px-1 py-0.5 rounded';
      });

      // Professional horizontal rule styling
      const hrElements = blogContent.querySelectorAll('hr');
      hrElements.forEach((hr) => {
        hr.className = 'my-12 sm:my-16 md:my-20 border-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-2xl mx-auto';
      });

      // Professional blockquote styling
      const blockquotes = blogContent.querySelectorAll('blockquote');
      blockquotes.forEach((blockquote) => {
        blockquote.className = 'relative bg-gradient-to-r from-slate-50/80 to-white/80 backdrop-blur-sm border border-slate-200 rounded-xl sm:rounded-2xl pl-6 sm:pl-8 md:pl-10 pr-4 sm:pr-6 md:pr-8 py-6 sm:py-8 md:py-10 my-8 sm:my-12 md:my-16 italic text-slate-700 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-[1.6] shadow-sm max-w-4xl mx-auto before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-blue-500 before:to-purple-600 before:rounded-l-xl sm:before:rounded-l-2xl after:absolute after:top-4 sm:after:top-6 after:left-4 sm:after:left-6 after:text-4xl sm:after:text-5xl md:after:text-6xl after:text-blue-300/50 after:content-["\\""] after:font-serif after:leading-none';
      });

      // Professional link styling
      const aElements = blogContent.querySelectorAll('a');
      aElements.forEach((a) => {
        a.className = 'text-blue-600 hover:text-purple-600 transition-all duration-300 font-medium relative inline-flex items-center gap-1 underline decoration-blue-600/30 decoration-2 underline-offset-4 hover:decoration-purple-600/50 hover:underline-offset-2';
        
        // Add external link indicator if it's an external link
        if (a.href && !a.href.includes(window.location.hostname)) {
          const icon = document.createElement('svg');
          icon.className = 'w-3 h-3 sm:w-4 sm:h-4 ml-1 opacity-60';
          icon.innerHTML = '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>';
          icon.setAttribute('fill', 'none');
          icon.setAttribute('viewBox', '0 0 24 24');
          a.appendChild(icon);
        }
      });

      // Professional inline code styling
      const codeElements = blogContent.querySelectorAll('code');
      codeElements.forEach((code) => {
        if (code.parentElement?.tagName !== 'PRE') {
          code.className = 'bg-slate-100 text-slate-800 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm md:text-base font-mono border border-slate-200 shadow-sm font-medium';
        }
      });

      // Professional code block styling
      const preElements = blogContent.querySelectorAll('pre');
      preElements.forEach((pre) => {
        // Create wrapper for better control
        const wrapper = document.createElement('div');
        wrapper.className = 'relative my-8 sm:my-10 md:my-12 max-w-4xl mx-auto group';
        pre.parentNode?.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
        
        pre.className = 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl overflow-x-auto shadow-2xl border border-slate-700 relative';
        
        const code = pre.querySelector('code');
        if (code) {
          code.className = 'text-xs sm:text-sm md:text-base font-mono text-slate-100 leading-relaxed block';
        }
        
        // Add language label if detected
        const languageLabel = document.createElement('div');
        languageLabel.className = 'absolute top-3 sm:top-4 left-4 sm:left-6 text-xs sm:text-sm text-slate-400 font-medium bg-slate-800 px-2 sm:px-3 py-1 rounded-md border border-slate-600';
        languageLabel.textContent = 'Code';
        pre.appendChild(languageLabel);
        
        // Add professional copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'absolute top-3 sm:top-4 right-3 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 opacity-0 group-hover:opacity-100 border border-slate-600 hover:border-slate-500';
        copyButton.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>';
        copyButton.setAttribute('aria-label', 'Copy code');
        pre.appendChild(copyButton);
        


        
        // Add copy functionality
        copyButton.addEventListener('click', () => {
          const codeText = code?.textContent || '';
          navigator.clipboard.writeText(codeText).then(() => {
            copyButton.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
            setTimeout(() => {
              copyButton.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>';
            }, 1500);
          });
        });
      });

      // Professional table styling
      const tables = blogContent.querySelectorAll('table');
      tables.forEach((table) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'my-8 sm:my-12 md:my-16 overflow-hidden rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 max-w-4xl mx-auto';
        table.parentNode?.insertBefore(wrapper, table);
        wrapper.appendChild(table);
        table.className = 'w-full border-collapse bg-white';
      });

      const thElements = blogContent.querySelectorAll('th');
      thElements.forEach((th) => {
        th.className = 'bg-gradient-to-r from-slate-50 to-slate-100 px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 text-left font-bold text-slate-900 border-b-2 border-slate-200 text-xs sm:text-sm md:text-base lg:text-lg';
      });

      const tdElements = blogContent.querySelectorAll('td');
      tdElements.forEach((td) => {
        td.className = 'px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 text-slate-700 border-b border-slate-100 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed';
      });

      // Professional image styling
      const images = blogContent.querySelectorAll('img');
      images.forEach((img) => {
        // Create professional figure wrapper
        if (img.parentElement?.tagName !== 'FIGURE') {
          const figure = document.createElement('figure');
          figure.className = 'my-8 sm:my-12 md:my-16 lg:my-20 relative group max-w-4xl mx-auto';
          img.parentNode?.insertBefore(figure, img);
          figure.appendChild(img);
          
          // Add shadow container for hover effect
          const shadowDiv = document.createElement('div');
          shadowDiv.className = 'absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700';
          figure.insertBefore(shadowDiv, img);
        }
        
        img.className = 'relative w-full h-auto rounded-xl sm:rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] border border-slate-200 bg-white';
        
        // Add loading optimization
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
      });

      // Professional figure caption styling
      const figcaptions = blogContent.querySelectorAll('figcaption');
      figcaptions.forEach((figcaption) => {
        figcaption.className = 'text-center mt-3 sm:mt-4 md:mt-6 text-slate-600 italic font-light text-xs sm:text-sm md:text-base lg:text-lg bg-slate-50 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg border border-slate-200 mx-auto max-w-2xl';
      });

      // Add reading progress indicator styling area
      const firstHeading = blogContent.querySelector('h1, h2, h3');
      if (firstHeading && !document.querySelector('.reading-progress')) {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'reading-progress sticky top-0 z-10 w-full h-1 bg-slate-200 mb-4 sm:mb-6 md:mb-8';
        const progressBar = document.createElement('div');
        progressBar.className = 'h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-150 ease-out';
        progressContainer.appendChild(progressBar);
        blogContent.insertBefore(progressContainer, blogContent.firstChild);
        
        // Add scroll progress functionality
        const updateProgress = () => {
          const scrolled = window.scrollY;
          const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = (scrolled / maxHeight) * 100;
          progressBar.style.width = `${Math.min(progress, 100)}%`;
        };
        
        window.addEventListener('scroll', updateProgress);
        updateProgress();
      }
    };

    // Apply styles after content is rendered
    const timer = setTimeout(applyStyles, 0);
    
    return () => clearTimeout(timer);
  }, [content]);

  return (
    <div 
      ref={contentRef}
      className={`prose prose-xl max-w-none ${className}`}
      style={{
        // Ensure proper text rendering
        textRendering: 'optimizeLegibility',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default BlogContent;