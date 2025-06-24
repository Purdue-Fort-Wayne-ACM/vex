import React, { useState, useRef, useEffect } from 'react';

// Utility function to combine multiple tooltip sets
export const combineTooltips = (...tooltipSets) => {
  return Object.assign({}, ...tooltipSets);
};


export const beginnerTooltips = {
  'public': 'Access modifier that allows this member to be accessed from anywhere in the code.',
  'private': 'Access modifier that restricts access to only within the same class.',
  'class': 'Blueprint for creating objects. Contains properties and methods that define behavior.',
  'void': 'Return type indicating the method does not return any value.',
  'string': 'Data type used to store text (a sequence of characters).',
  'int': 'Data type used to store whole numbers (integers).',
  'float': 'Data type used to store decimal numbers (floating-point numbers).',
  'bool': 'Data type that can only be true or false.',
  'if': 'Conditional statement that executes code only when a condition is true.',
  'else': 'Executes code when the preceding if condition is false.',
  'for': 'Loop that repeats code a specific number of times.',
  'while': 'Loop that repeats code as long as a condition remains true.',
  'return': 'Exits a method and optionally sends a value back to the caller.',
  'new': 'Creates a new instance of a class or allocates memory for an object.',
  'this': 'Refers to the current instance of the class you\'re working in.',
  'null': 'Represents the absence of a value or an unassigned reference.'
};

export const unityBasicsTooltips = {
  'MonoBehaviour': 'Base class for Unity scripts. Provides access to Unity-specific methods and lifecycle events.',
  'GameObject': 'Basic object in Unity scenes. Everything visible in your game is attached to a GameObject.',
  'Transform': 'Component that stores position, rotation, and scale of GameObjects in 3D space.',
  'Start': 'Unity method called once before the first frame update. Use for initialization.',
  'Update': 'Unity method called once per frame. Use for input handling and regular updates.',
  'Awake': 'Unity method called when the script instance is being loaded, before Start.',
  'Debug.Log': 'Prints messages to Unity\'s Console window. Essential for testing and debugging.',
  'GetComponent': 'Gets a reference to a component attached to the same GameObject.',
  'SerializeField': 'Makes private fields visible in Unity\'s Inspector window for easy editing.',
  'Vector3': 'Represents a point or direction in 3D space with x, y, and z coordinates.',
  'Input': 'Unity class for handling player input from keyboard, mouse, and game controllers.',
  'Time': 'Unity class providing information about time, like deltaTime for frame-independent movement.'
};

export const unityIntermediateTooltips = {
  'FixedUpdate': 'Called at fixed intervals, independent of framerate. Use for physics calculations.',
  'LateUpdate': 'Called after all Update methods. Useful for camera following and UI updates.',
  'OnTriggerEnter': 'Called when another object enters a trigger collider attached to this GameObject.',
  'OnCollisionEnter': 'Called when this GameObject starts touching another GameObject with a collider.',
  'Instantiate': 'Creates a copy of a GameObject at runtime. Commonly used for spawning objects.',
  'Destroy': 'Removes a GameObject from the scene. Can also destroy individual components.',
  'Rigidbody': 'Component that enables physics simulation, allowing objects to fall, bounce, and react to forces.',
  'Collider': 'Component that defines the physical shape of an object for collision detection.',
  'Coroutine': 'Method that can pause execution and resume later, useful for time-based operations.',
  'yield': 'Pauses coroutine execution until a specified condition is met.',
  'WaitForSeconds': 'Coroutine instruction that waits for a specified number of seconds.',
  'Quaternion': 'Represents rotations in 3D space. More reliable than Euler angles for complex rotations.',
  'FindObjectOfType': 'Searches the scene for the first object of a specified type.',
  'AddComponent': 'Adds a new component to a GameObject at runtime.'
};

export const unityAdvancedTooltips = {
  'ScriptableObject': 'Base class for creating data containers that can be saved as assets in your project.',
  'OnValidate': 'Called when the script is loaded or a value changes in the Inspector.',
  'OnDrawGizmos': 'Allows you to draw visual debugging aids in the Scene view.',
  'ExecuteInEditMode': 'Attribute that allows scripts to run in the Unity Editor, not just during play.',
  'System.Serializable': 'Attribute that allows custom classes to be serialized and shown in the Inspector.',
  'UnityEvent': 'Serializable event system that can be configured in the Inspector.',
  'Resources.Load': 'Loads assets from a Resources folder at runtime.',
  'AssetDatabase': 'Editor-only class for managing assets in the project.',
  'EditorGUILayout': 'Editor-only class for creating custom Inspector interfaces.',
  'PropertyDrawer': 'Custom way to display specific serialized properties in the Inspector.',
  'Handles': 'Editor class for drawing 3D UI elements in the Scene view.',
  'Gizmos': 'Editor class for drawing debugging visuals in the Scene view.'
};

export const csharpFundamentalsTooltips = {
  'namespace': 'Organizes code into logical groups and prevents naming conflicts.',
  'using': 'Imports namespaces so you can use their classes without full qualification.',
  'static': 'Belongs to the type itself rather than to a specific instance.',
  'const': 'Declares a constant value that cannot be changed after compilation.',
  'readonly': 'Field that can only be assigned during declaration or in the constructor.',
  'override': 'Provides a new implementation of a virtual method inherited from a base class.',
  'virtual': 'Allows a method to be overridden in derived classes.',
  'abstract': 'Defines a method signature that must be implemented in derived classes.',
  'interface': 'Contract that defines what methods a class must implement.',
  'enum': 'Defines a set of named constants, useful for representing fixed sets of values.',
  'struct': 'Value type that can contain data members and methods, similar to classes.',
  'try': 'Begins a block of code that might throw an exception.',
  'catch': 'Handles specific exceptions that might be thrown in a try block.',
  'finally': 'Code block that always executes, regardless of whether an exception occurred.',
  'throw': 'Manually raises an exception.',
  'base': 'Refers to the parent class, used to access overridden methods or constructors.'
};

export const gameDevPatternsTooltips = {
  'Singleton': 'Design pattern ensuring only one instance of a class exists throughout the application.',
  'Update': 'Part of the game loop pattern - handles per-frame logic and input.',
  'State Machine': 'Pattern for managing different states (idle, running, jumping) in game objects.',
  'Object Pooling': 'Reuses objects instead of constantly creating/destroying them for better performance.',
  'Observer Pattern': 'Allows objects to notify other objects about changes without tight coupling.',
  'Component System': 'Unity\'s architecture where GameObjects are composed of modular components.',
  'Factory Pattern': 'Creates objects without specifying their exact classes, useful for spawning enemies.',
  'Command Pattern': 'Encapsulates actions as objects, useful for input handling and undo systems.',
  'MVC': 'Model-View-Controller pattern for separating game logic, display, and input handling.',
  'Event System': 'Decoupled communication system where objects can send and receive messages.'
};


// Common combinations for different learning scenarios
export const beginnerUnityTooltips = combineTooltips(beginnerTooltips, unityBasicsTooltips);
export const intermediateUnityTooltips = combineTooltips(beginnerTooltips, unityBasicsTooltips, unityIntermediateTooltips);
export const advancedUnityTooltips = combineTooltips(csharpFundamentalsTooltips, unityIntermediateTooltips, unityAdvancedTooltips);
export const gameDevTooltips = combineTooltips(unityBasicsTooltips, unityIntermediateTooltips, gameDevPatternsTooltips);
export const comprehensiveTooltips = combineTooltips(
  beginnerTooltips, 
  csharpFundamentalsTooltips, 
  unityBasicsTooltips, 
  unityIntermediateTooltips, 
  unityAdvancedTooltips,
  gameDevPatternsTooltips
);


const CSharpScriptRenderer = ({ 
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
      
      // Regex patterns for different token types (order matters - more specific patterns first)
      const patterns = [
        { type: 'multiComment', regex: /\/\*[\s\S]*?\*\//g },
        { type: 'comment', regex: /\/\/.*$/g },
        { type: 'string', regex: /"(?:[^"\\]|\\.)*"/g },
        { type: 'string', regex: /'(?:[^'\\]|\\.)*'/g },
        { type: 'attribute', regex: /\[[\s\S]*?\]/g },
        { type: 'number', regex: /\b\d+\.?\d*[fFdDmM]?\b/g },
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
    let tooltipKey = null;
    let tooltipContent = null;
    
    // Direct match
    if (tooltips[token.value]) {
      tooltipKey = token.value;
      tooltipContent = tooltips[token.value];
    }
    // For attributes, check if any tooltip key is contained within the token
    else if (token.type === 'attribute') {
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
          <code className="text-xs sm:text-sm font-mono">
            {tokens.map((lineTokens, lineIndex) => (
              <div key={lineIndex} className="flex">
                {showLineNumbers && (
                  <div className={`select-none w-10 sm:w-12 text-right pr-2 sm:pr-4 text-xs sm:text-sm flex-shrink-0 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                    {lineIndex + 1}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {lineTokens.map((token, tokenIndex) => {
                    // Check for tooltip availability
                    let hasTooltip = tooltips[token.value];
                    if (!hasTooltip && token.type === 'attribute') {
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
        float horizontal = Input.GetAxis("Horizontal"); // Let's see how comments 
        float vertical = Input.GetAxis("Vertical"); // Work out!
        
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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">C# Script Renderer with Tooltips</h1>
        <p className="text-gray-600 mb-6">
          Hover over highlighted keywords to see educational tooltips. Perfect for annotating Unity scripts for students.
        </p>
      </div>
      
      {/* Beginner Level Example */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Beginner Level (Basic C# + Unity Basics)</h2>
        <CSharpScriptRenderer
          code={sampleCode}
          tooltips={beginnerUnityTooltips}
          theme="dark"
          showLineNumbers={true}
          copyButton={true}
          className="mb-4"
        />
      </div>
      
      {/* Advanced Level Example */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Advanced Level (All Tooltips)</h2>
        <CSharpScriptRenderer
          code={sampleCode}
          tooltips={comprehensiveTooltips}
          theme="light"
          showLineNumbers={true}
          copyButton={true}
          className="mb-4"
        />
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <h3 className="font-semibold mb-2">Available Tooltip Sets:</h3>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li><code>beginnerTooltips</code> - Basic C# concepts</li>
          <li><code>unityBasicsTooltips</code> - Essential Unity concepts</li>
          <li><code>unityIntermediateTooltips</code> - Intermediate Unity features</li>
          <li><code>unityAdvancedTooltips</code> - Advanced Unity topics</li>
          <li><code>csharpFundamentalsTooltips</code> - Advanced C# concepts</li>
          <li><code>gameDevPatternsTooltips</code> - Game development patterns</li>
        </ul>
        
        <h3 className="font-semibold mt-4 mb-2">Pre-combined Sets:</h3>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li><code>beginnerUnityTooltips</code> - Perfect for new Unity developers</li>
          <li><code>intermediateUnityTooltips</code> - For students with some experience</li>
          <li><code>advancedUnityTooltips</code> - For advanced topics and editor scripting</li>
          <li><code>gameDevTooltips</code> - Focus on game development patterns</li>
          <li><code>comprehensiveTooltips</code> - Everything combined</li>
        </ul>
      </div>
    </div>
  );
};

export default ScriptRendererDemo;