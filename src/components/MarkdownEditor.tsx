import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Split from 'react-split';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState('# Welcome to Markdown Editor\n\nStart typing your markdown here...');

  return (
    <div className="h-screen max-h-screen flex flex-col">
      <div className="bg-white border-b p-2 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-700">Markdown Editor</h1>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <Split 
          className="split flex h-full"
          sizes={[50, 50]}
          minSize={100}
          gutterSize={8}
          snapOffset={30}
        >
          <div className="h-full overflow-auto">
            <textarea
              className="w-full h-full p-4 font-mono text-sm bg-gray-50 resize-none focus:outline-none"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Enter your markdown here..."
            />
          </div>
          <div className="h-full overflow-auto bg-white p-4 prose max-w-none">
            <ReactMarkdown
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={tomorrow}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </Split>
      </div>
    </div>
  );
};

export default MarkdownEditor;