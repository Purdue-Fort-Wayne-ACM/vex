import React, { useState, useRef, useEffect } from 'react';

export const PythonScriptRenderer = ({ 
  code, 
  tooltips = {}, 
  className = "",
  showLineNumbers = true,
  copyButton = true,
  theme = "dark" 
}) => {
  const [hoveredTooltip, setHoveredTooltip] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);

  // Python keywords
  const keywords = [
    'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del',
    'elif', 'else', 'except', 'finally', 'for', 'from', 'global',
    'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or',
    'pass', 'raise', 'return', 'try', 'while', 'with', 'yield',
    'True', 'False', 'None'
  ];

  // Common Python built-ins and popular libraries
  const builtins = [
    'print', 'len', 'range', 'enumerate', 'zip', 'map', 'filter', 'sorted',
    'list', 'dict', 'set', 'tuple', 'str', 'int', 'float', 'bool',
    'type', 'isinstance', 'hasattr', 'getattr', 'setattr', 'super',
    'open', 'input', 'abs', 'min', 'max', 'sum', 'all', 'any',
    '__init__', '__str__', '__repr__', '__len__', '__call__', '__enter__', '__exit__',
    'self', 'cls'
  ];

  // Popular library keywords (can be extended)
  const libraryKeywords = [
    'numpy', 'pandas', 'matplotlib', 'requests', 'json', 'os', 'sys',
    'datetime', 'math', 'random', 'time', 'urllib', 'sqlite3',
    'DataFrame', 'Series', 'array', 'ndarray', 'plt', 'np', 'pd',
    'vex'
  ];

  const tokenizeCode = (code) => {
    const tokens = [];
    const lines = code.split('\n');
    
    lines.forEach((line, lineIndex) => {
      const lineTokens = [];
      let currentIndex = 0;
      
      // Regex patterns for different token types
      const patterns = [
        { type: 'comment', regex: /#.*$/g },
        { type: 'docstring', regex: /"""[\s\S]*?"""/g },
        { type: 'docstring', regex: /'''[\s\S]*?'''/g },
        { type: 'fstring', regex: /f["'](?:[^"'\\]|\\.)*["']/g },
        { type: 'string', regex: /"(?:[^"\\]|\\.)*"/g },
        { type: 'string', regex: /'(?:[^'\\]|\\.)*'/g },
        { type: 'number', regex: /\b\d+\.?\d*[jJ]?\b/g },
        { type: 'decorator', regex: /@\w+(?:\.\w+)*/g },
        { type: 'identifier', regex: /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g },
        { type: 'operator', regex: /[+\-*/%=<>!&|^~]+|\/\/|\*\*|==|!=|<=|>=|<<|>>|\+=|-=|\*=|\/=|%=|&=|\|=|\^=|<<=|>>=|\*\*=/g },
        { type: 'punctuation', regex: /[{}()\[\];:,.]/g },
        { type: 'whitespace', regex: /\s+/g }
      ];
      
      const allMatches = [];
      
      patterns.forEach(pattern => {
        let match;
        const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
        while ((match = regex.exec(line)) !== null) {
          allMatches.push({
            type: pattern.type,
            value: match[0],
            start: match.index,
            end: match.index + match[0].length
          });
        }
      });
      
      // Sort matches by position
      allMatches.sort((a, b) => a.start - b.start);
      
      // Remove overlapping matches (keep the first one found)
      const filteredMatches = [];
      allMatches.forEach(match => {
        const hasOverlap = filteredMatches.some(existing => 
          (match.start < existing.end && match.end > existing.start)
        );
        if (!hasOverlap) {
          filteredMatches.push(match);
        }
      });
      
      // Fill in gaps and create tokens
      let lastEnd = 0;
      filteredMatches.forEach(match => {
        if (match.start > lastEnd) {
          lineTokens.push({
            type: 'text',
            value: line.slice(lastEnd, match.start),
            line: lineIndex,
            column: lastEnd
          });
        }
        
        let tokenType = match.type;
        if (match.type === 'identifier') {
          if (keywords.includes(match.value)) {
            tokenType = 'keyword';
          } else if (builtins.includes(match.value)) {
            tokenType = 'builtin';
          } else if (libraryKeywords.includes(match.value)) {
            tokenType = 'library';
          }
        }
        
        lineTokens.push({
          type: tokenType,
          value: match.value,
          line: lineIndex,
          column: match.start
        });
        
        lastEnd = match.end;
      });
      
      if (lastEnd < line.length) {
        lineTokens.push({
          type: 'text',
          value: line.slice(lastEnd),
          line: lineIndex,
          column: lastEnd
        });
      }
      
      tokens.push(lineTokens);
    });
    
    return tokens;
  };

  const getTokenStyle = (type, theme) => {
    const styles = {
      dark: {
        keyword: 'text-blue-400 font-semibold',
        builtin: 'text-green-400 font-semibold',
        library: 'text-purple-400 font-semibold',
        string: 'text-green-300',
        fstring: 'text-cyan-300',
        docstring: 'text-green-300 italic',
        number: 'text-yellow-300',
        comment: 'text-gray-500 italic',
        decorator: 'text-orange-400',
        operator: 'text-red-400',
        punctuation: 'text-gray-300',
        identifier: 'text-white',
        text: 'text-white'
      },
      light: {
        keyword: 'text-blue-600 font-semibold',
        builtin: 'text-green-600 font-semibold',
        library: 'text-purple-600 font-semibold',
        string: 'text-green-700',
        fstring: 'text-cyan-700',
        docstring: 'text-green-700 italic',
        number: 'text-orange-600',
        comment: 'text-gray-600 italic',
        decorator: 'text-orange-600',
        operator: 'text-red-500',
        punctuation: 'text-gray-700',
        identifier: 'text-gray-900',
        text: 'text-gray-900'
      }
    };
    
    return styles[theme][type] || styles[theme].text;
  };

  const handleTokenHover = (e, token) => {
    let tooltipKey = null;
    let tooltipContent = null;
    
    // Direct match
    if (tooltips[token.value]) {
      tooltipKey = token.value;
      tooltipContent = tooltips[token.value];
    }
    // For decorators, check if any tooltip key is contained within the token
    else if (token.type === 'decorator') {
      for (const key in tooltips) {
        if (token.value.includes(key)) {
          tooltipKey = key;
          tooltipContent = tooltips[key];
          break;
        }
      }
    }
    
    if (tooltipContent) {
      const rect = e.target.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10
      });
      setHoveredTooltip({
        content: tooltipContent,
        token: tooltipKey
      });
    }
  };

  const handleTokenLeave = () => {
    setHoveredTooltip(null);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const tokens = tokenizeCode(code);
  const themeClasses = theme === 'dark' 
    ? 'bg-gray-900 text-white border-gray-700' 
    : 'bg-white text-gray-900 border-gray-300';

  return (
    <div className={`relative rounded-lg border ${themeClasses} ${className}`}>
      {/* Header with copy button */}
      <div className={`flex justify-between items-center px-4 py-2 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-gray-50'}`}>
        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Python Script
        </span>
        {copyButton && (
          <button
            onClick={copyToClipboard}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {/* Code content */}
      <div className="p-4">
        <pre className="overflow-x-auto" ref={codeRef}>
          <code className="text-sm font-mono">
            {tokens.map((lineTokens, lineIndex) => (
              <div key={lineIndex} className="flex">
                {showLineNumbers && (
                  <span className={`select-none w-12 text-right pr-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                    {lineIndex + 1}
                  </span>
                )}
                <div className="flex-1">
                  {lineTokens.map((token, tokenIndex) => {
                    // Check for tooltip availability
                    let hasTooltip = tooltips[token.value];
                    if (!hasTooltip && token.type === 'decorator') {
                      hasTooltip = Object.keys(tooltips).some(key => token.value.includes(key));
                    }
                    
                    return (
                      <span
                        key={tokenIndex}
                        className={`${getTokenStyle(token.type, theme)} ${
                          hasTooltip ? 'cursor-help underline decoration-dotted underline-offset-2' : ''
                        }`}
                        onMouseEnter={hasTooltip ? (e) => handleTokenHover(e, token) : undefined}
                        onMouseLeave={hasTooltip ? handleTokenLeave : undefined}
                      >
                        {token.value}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Tooltip */}
      {hoveredTooltip && (
        <div
          className={`fixed z-50 px-3 py-2 text-sm rounded-lg shadow-lg max-w-xs pointer-events-none transform -translate-x-1/2 -translate-y-full ${
            theme === 'dark' 
              ? 'bg-gray-800 text-white border border-gray-600' 
              : 'bg-white text-gray-900 border border-gray-300'
          }`}
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y
          }}
        >
          <div className="font-semibold text-blue-400 mb-1">{hoveredTooltip.token}</div>
          <div>{hoveredTooltip.content}</div>
          <div
            className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
              theme === 'dark' ? 'border-t-gray-800' : 'border-t-white'
            }`}
          />
        </div>
      )}
    </div>
  );
};

export const tooltipConfig = {
    'import': 'Statement used to include modules or specific functions from other Python files or libraries.',
    'class': 'Keyword used to define a new class - a blueprint for creating objects with attributes and methods.',
    '__init__': 'Special method (constructor) called when creating a new instance of a class. Used for initialization.',
    'self': 'Reference to the current instance of the class. Always the first parameter in instance methods.',
    '@property': 'Decorator that allows a method to be accessed like an attribute, enabling getter functionality.',
    'def': 'Keyword used to define a function or method.',
    'try': 'Starts a try-except block for error handling. Code that might raise an exception goes here.',
    'except': 'Catches and handles specific exceptions that occur in the try block.',
    'raise': 'Manually raises an exception with a custom message.',
    'len': 'Built-in function that returns the number of items in a sequence (list, string, etc.).',
    'print': 'Built-in function that outputs text or variables to the console.',
    'pd.read_csv': 'Pandas function to read CSV files into a DataFrame.',
    'dropna': 'Pandas method that removes rows containing null/NaN values.',
    'datetime': 'Module for working with dates and times in Python.',
    'BLUE': 'The ENUM storing the color blue: (0, 0, 255)',
    'Optical': 'The Optical Sensor class, accepts a port as its parameter.',
    'PORT1': 'Enum value representing Port1 on the Vex EXP',
    'optical_sensor': 'An instance of the Optical class',
    'color()': 'Returns the color detected by the sensor'
  };

// Example usage component
const PythonRendererDemo = () => {
  const sampleCode = `import pandas as pd
import numpy as np
from datetime import datetime

class DataProcessor:
    """A class for processing and analyzing data."""
    
    def __init__(self, data_file: str):
        self.data_file = data_file
        self.df = None
        self.processed = False
    
    @property
    def is_loaded(self) -> bool:
        """Check if data is loaded."""
        return self.df is not None
    
    def load_data(self):
        """Load data from the specified file."""
        try:
            self.df = pd.read_csv(self.data_file)
            print(f"Loaded {len(self.df)} rows of data")
        except FileNotFoundError:
            print("File not found!")
            return False
        return True
    
    def process_data(self):
        """Clean and process the loaded data."""
        if not self.is_loaded:
            raise ValueError("No data loaded")
        
        # Remove null values
        self.df = self.df.dropna()
        
        # Convert timestamp column
        if 'timestamp' in self.df.columns:
            self.df['timestamp'] = pd.to_datetime(self.df['timestamp'])
        
        self.processed = True
        print("Data processing complete!")
    
    def get_summary(self) -> dict:
        """Return a summary of the processed data."""
        if not self.processed:
            self.process_data()
        
        return {
            'total_rows': len(self.df),
            'columns': list(self.df.columns),
            'memory_usage': self.df.memory_usage().sum(),
            'processed_at': datetime.now()
        }

# Usage example
if __name__ == "__main__":
    processor = DataProcessor("data.csv")
    
    if processor.load_data():
        summary = processor.get_summary()
        print(f"Summary: {summary}")`;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Python Script Renderer with Tooltips</h1>
        <p className="text-gray-600 mb-6">
          Hover over highlighted keywords to see educational tooltips. Perfect for annotating Python code for students.
        </p>
      </div>
      
      <PythonScriptRenderer
        code={sampleCode}
        tooltips={tooltipConfig}
        theme="dark"
        showLineNumbers={true}
        copyButton={true}
        className="mb-6"
      />
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <h3 className="font-semibold mb-2">Usage:</h3>
        <code className="text-sm bg-gray-100 p-2 rounded block">
          {`<PythonScriptRenderer
  code={yourPythonCode}
  tooltips={{
    'import': 'Statement used to include modules...',
    'class': 'Keyword used to define a new class...',
    '__init__': 'Constructor method for classes...',
    // Add more tooltips as needed
  }}
  theme="dark" // or "light"
  showLineNumbers={true}
  copyButton={true}
/>`}
        </code>
      </div>
    </div>
  );
};

export default PythonRendererDemo;