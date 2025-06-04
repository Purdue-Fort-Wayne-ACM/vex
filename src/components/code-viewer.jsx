import React, { useState, useRef, useEffect } from 'react';

export const CSharpScriptRenderer = ({ 
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

  // C# keywords and Unity-specific terms
  const keywords = [
    'public', 'private', 'protected', 'internal', 'static', 'virtual', 'override',
    'abstract', 'sealed', 'const', 'readonly', 'class', 'struct', 'interface',
    'enum', 'namespace', 'using', 'if', 'else', 'switch', 'case', 'default',
    'for', 'foreach', 'while', 'do', 'break', 'continue', 'return', 'void',
    'int', 'float', 'double', 'bool', 'string', 'char', 'byte', 'short',
    'long', 'decimal', 'object', 'var', 'new', 'this', 'base', 'null',
    'true', 'false', 'try', 'catch', 'finally', 'throw', 'throws'
  ];

  const unityKeywords = [
    'MonoBehaviour', 'GameObject', 'Transform', 'Vector3', 'Vector2', 'Quaternion',
    'Time', 'Input', 'Debug', 'Rigidbody', 'Collider', 'Renderer', 'Camera',
    'AudioSource', 'Animator', 'Canvas', 'Button', 'Text', 'Image', 'Slider',
    'Start', 'Update', 'FixedUpdate', 'LateUpdate', 'Awake', 'OnEnable',
    'OnDisable', 'OnDestroy', 'OnTriggerEnter', 'OnCollisionEnter', 'Instantiate',
    'Destroy', 'DontDestroyOnLoad', 'FindObjectOfType', 'GetComponent', 'AddComponent'
  ];

  const tokenizeCode = (code) => {
    const tokens = [];
    const lines = code.split('\n');
    
    lines.forEach((line, lineIndex) => {
      const lineTokens = [];
      let currentIndex = 0;
      
      // Regex patterns for different token types
      const patterns = [
        { type: 'comment', regex: /\/\/.*$/g },
        { type: 'multiComment', regex: /\/\*[\s\S]*?\*\//g },
        { type: 'string', regex: /"(?:[^"\\]|\\.)*"/g },
        { type: 'string', regex: /'(?:[^'\\]|\\.)*'/g },
        { type: 'number', regex: /\b\d+\.?\d*[fFdDmM]?\b/g },
        { type: 'attribute', regex: /\[[\s\S]*?\]/g },
        { type: 'preprocessor', regex: /#\w+/g },
        { type: 'identifier', regex: /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g },
        { type: 'operator', regex: /[+\-*/%=<>!&|^~?:]+/g },
        { type: 'punctuation', regex: /[{}()\[\];,.]/g },
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
      
      // Fill in gaps and create tokens
      let lastEnd = 0;
      allMatches.forEach(match => {
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
          } else if (unityKeywords.includes(match.value)) {
            tokenType = 'unity';
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
        unity: 'text-green-400 font-semibold',
        string: 'text-green-300',
        number: 'text-yellow-300',
        comment: 'text-gray-500 italic',
        multiComment: 'text-gray-500 italic',
        attribute: 'text-purple-400',
        preprocessor: 'text-orange-400',
        operator: 'text-red-400',
        punctuation: 'text-gray-300',
        identifier: 'text-white',
        text: 'text-white'
      },
      light: {
        keyword: 'text-blue-600 font-semibold',
        unity: 'text-green-600 font-semibold',
        string: 'text-green-700',
        number: 'text-orange-600',
        comment: 'text-gray-600 italic',
        multiComment: 'text-gray-600 italic',
        attribute: 'text-purple-600',
        preprocessor: 'text-red-600',
        operator: 'text-red-500',
        punctuation: 'text-gray-700',
        identifier: 'text-gray-900',
        text: 'text-gray-900'
      }
    };
    
    return styles[theme][type] || styles[theme].text;
  };

  const handleTokenHover = (e, token) => {
    if (tooltips[token.value]) {
      const rect = e.target.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10
      });
      setHoveredTooltip({
        content: tooltips[token.value],
        token: token.value
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
    <div className={`relative rounded-t-lg rounded-b-none border ${themeClasses} ${className}`}>
      {/* Header with copy button */}
      <div className={`flex rounded-t-lg rounded-b-none justify-between items-center px-4 py-2 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-gray-50'}`}>
        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          C# Script
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
                    const hasTooltip = tooltips[token.value];
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

export const commonTooltipConfig = {
    'MonoBehaviour': 'Base class for Unity scripts that can be attached to GameObjects. Provides access to Unity lifecycle methods.',
    'SerializeField': 'Attribute that makes private fields visible in the Unity Inspector.',
    'Start': 'Unity lifecycle method called once before the first frame update. Used for initialization.',
    'Update': 'Unity lifecycle method called once per frame. Used for regular updates like input handling.',
    'GetComponent': 'Unity method to retrieve a component attached to the same GameObject.',
    'Vector3': 'Unity struct representing a 3D vector with x, y, and z components.',
    'Input.GetAxis': 'Unity method to get smooth input values from input axes defined in Input Manager.',
    'Debug.Log': 'Unity method to print messages to the Console window for debugging purposes.',
    'Rigidbody': 'Unity component that enables physics simulation for GameObjects.',
    'moveSpeed': 'Controls how fast the player moves. Higher values = faster movement.',
    'normalized': 'Returns a vector with the same direction but with a magnitude of 1.'
  };


// Example usage component
const ScriptRendererDemo = () => {
  const sampleCode = `using UnityEngine;
using System.Collections;

public class PlayerController : MonoBehaviour
{
    [SerializeField]
    private float moveSpeed = 5.0f;
    
    private Rigidbody rb;
    private Vector3 moveDirection;
    
    void Start()
    {
        rb = GetComponent<Rigidbody>();
        Debug.Log("Player controller initialized");
    }
    
    void Update()
    {
        HandleInput();
        MovePlayer();
    }
    
    private void HandleInput()
    {
        float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");
        
        moveDirection = new Vector3(horizontal, 0, vertical).normalized;
    }
    
    private void MovePlayer()
    {
        if (moveDirection != Vector3.zero)
        {
            Vector3 velocity = moveDirection * moveSpeed;
            rb.velocity = new Vector3(velocity.x, rb.velocity.y, velocity.z);
        }
    }
}`;

  const tooltipConfig = {
    'MonoBehaviour': 'Base class for Unity scripts that can be attached to GameObjects. Provides access to Unity lifecycle methods.',
    'SerializeField': 'Attribute that makes private fields visible in the Unity Inspector.',
    'Start': 'Unity lifecycle method called once before the first frame update. Used for initialization.',
    'Update': 'Unity lifecycle method called once per frame. Used for regular updates like input handling.',
    'GetComponent': 'Unity method to retrieve a component attached to the same GameObject.',
    'Vector3': 'Unity struct representing a 3D vector with x, y, and z components.',
    'Input.GetAxis': 'Unity method to get smooth input values from input axes defined in Input Manager.',
    'Debug.Log': 'Unity method to print messages to the Console window for debugging purposes.',
    'Rigidbody': 'Unity component that enables physics simulation for GameObjects.',
    'moveSpeed': 'Controls how fast the player moves. Higher values = faster movement.',
    'normalized': 'Returns a vector with the same direction but with a magnitude of 1.'
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">C# Script Renderer with Tooltips</h1>
        <p className="text-gray-600 mb-6">
          Hover over highlighted keywords to see educational tooltips. Perfect for annotating Unity scripts for students.
        </p>
      </div>
      
      <CSharpScriptRenderer
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
          {`<CSharpScriptRenderer
  code={yourCSharpCode}
  tooltips={{
    'MonoBehaviour': 'Base class for Unity scripts...',
    'Start': 'Unity lifecycle method...',
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

export default ScriptRendererDemo;