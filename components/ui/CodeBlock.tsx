import React from 'react';

interface CodeBlockProps {
  title: string;
  code: string;
  isGood: boolean;
  compact?: boolean;
}

/**
 * Highlights PHP code using a non-recursive strategy.
 * It identifies tokens, protects them with placeholders, and then performs a single-pass restoration.
 * This prevents the highlighter from "highlighting its own HTML tags".
 */
export const highlightPHP = (text: string) => {
  // 1. Initial escape to prevent XSS and ensure we treat code as raw text
  let escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const tokens = [
    { name: 'comment', regex: /(\/\/[^\n]*)/g, className: 'code-comment' },
    { name: 'string', regex: /("(?:[^"\\]|\\.)*")/g, className: 'code-string' },
    { name: 'keyword', regex: /\b(class|interface|extends|implements|function|public|private|protected|static|new|return|if|else|throw|instanceof)\b/g, className: 'code-keyword' },
    { name: 'type', regex: /\b(MissionHandler|FireService|PoliceService|MissionLogger|RescueVehicle|MissionLauncher|Vehicle|Snowplow|Cruiser|AllTerrain|UniversalPack|FlightPack|FirePack|Mission|Marshall|Chase|Skye|Everest|Zuma|Rocky|Firefighter|string|void|int|bool|IFlightGear|IFireGear|FleetVehicle|RyderTablet|Exception|Error)\b/g, className: 'code-type' },
    { name: 'variable', regex: /(\$[a-zA-Z_]\w*)/g, className: 'code-variable' },
    { name: 'operator', regex: /(->|=>|==|===|!=|!==|\.|\+|\-|\*|\/)/g, className: 'code-operator' },
  ];

  const placeholderMap: Record<string, string> = {};
  let tokenCounter = 0;

  // 2. Identify and protect tokens
  tokens.forEach(token => {
    escaped = escaped.replace(token.regex, (match) => {
      const placeholder = `##TOKEN_${tokenCounter++}##`;
      placeholderMap[placeholder] = `<span class="${token.className}">${match}</span>`;
      return placeholder;
    });
  });

  // 3. Restore protected tokens
  // We iterate in reverse to handle any potential nested placeholders correctly (though our regexes are mostly exclusive)
  Object.keys(placeholderMap).reverse().forEach(placeholder => {
    escaped = escaped.replace(placeholder, placeholderMap[placeholder]);
  });

  return escaped;
};

export const CodeBlock: React.FC<CodeBlockProps> = ({ title, code, isGood, compact = false }) => {
  const highlighted = highlightPHP(code);
  const titleId = `code-title-${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <section 
      className={`rounded-xl overflow-hidden border-2 ${isGood ? 'border-green-500/30 bg-green-50/5' : 'border-red-500/30 bg-red-50/5'} shadow-lg flex flex-col h-full`}
      aria-labelledby={titleId}
    >
      <div 
        className={`px-4 py-2 text-[10px] font-black flex justify-between items-center tracking-tighter ${isGood ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
        id={titleId}
      >
        <span className="flex items-center gap-1.5 uppercase">
          <span aria-hidden="true">{isGood ? '✅' : '🚨'}</span>
          {isGood ? 'Correct Implementation' : 'Principle Violation'}
        </span>
        <span className="opacity-80 uppercase tracking-widest bg-black/20 px-2 py-0.5 rounded" aria-label="File name or context">
          {title}
        </span>
      </div>
      <div className={`${compact ? 'p-3' : 'p-5'} bg-slate-900 overflow-x-auto flex-1 font-mono leading-relaxed custom-scrollbar`}>
        <pre 
          className="text-xs sm:text-sm text-blue-100 whitespace-pre focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
          tabIndex={0}
          role="code"
          aria-label={`PHP Code Snippet for ${title}`}
        >
          <code 
            dangerouslySetInnerHTML={{ __html: highlighted }} 
            className="block"
          />
        </pre>
      </div>
      <div className="sr-only">
        End of code block for {title}.
      </div>
    </section>
  );
};
