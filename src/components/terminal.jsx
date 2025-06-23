'use client';

export default function Terminal({
  title = "Terminal",
  children,
  className = "",
}) {
  function highlightError(text) {
    return text.split('\n').map((line, i) => {
      if (line.includes('Traceback')) {
        return <div key={i} className="text-yellow-400">{line}</div>;
      } else if (line.includes('NameError')) {
        return <div key={i} className="text-red-500 font-semibold">{line}</div>;
      }
      return <div key={i}>{line}</div>;
    });
  }

  return (
    <div className={`rounded-md border border-[#2e2e2e] bg-[#1e1e1e] text-[#d4d4d4] font-mono mb-3 ${className}`}>
      {/* Header bar */}
      <div className="flex justify-between items-center px-4 py-2.5 border-b border-[#2e2e2e] bg-[#2b2b2b]">
        <span className="text-sm text-[#dcdcdc]">{title}</span>
      </div>

      {/* Terminal content */}
      <pre className="px-4 py-3 pb-1 pl-10 overflow-x-auto text-sm leading-relaxed whitespace-pre-wrap m-0">
        <code className="text-[#f0f0f0]">
          {typeof children === 'string' ? highlightError(children.trimEnd()) : children}
        </code>
      </pre>
    </div>
  );
}