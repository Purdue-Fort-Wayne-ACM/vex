import React, { useState, useRef, useEffect } from 'react';

export const combineTooltips = (...tooltipSets) => {
  return Object.assign({}, ...tooltipSets);
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
    'color()': 'Returns the color detected by the sensor'
  };

// OpenCV Image Processing Tooltip Set. problemati because regex makles selecting with dots hard, so doing tk.TK or cv2.imshow it iffy
export const opencvImageProcessingTooltips = {
  // Core OpenCV functions
  'imread': 'Loads an image from file. Use cv2.IMREAD_COLOR for color, cv2.IMREAD_GRAYSCALE for grayscale.',
  'imshow': 'Displays an image in a window. First parameter is window name, second is the image array.',
  'imwrite': 'Saves an image to file. First parameter is filename, second is the image array.',
  'waitKey': 'Waits for a key press. Parameter is wait time in milliseconds (0 = wait indefinitely).',
  'destroyAllWindows': 'Closes all OpenCV windows. Always call this to clean up properly.',
  'resize': 'Resizes an image. Can specify exact dimensions or scaling factors.',
  'cvtColor': 'Converts image between color spaces (BGR to RGB, color to grayscale, etc.).',
  'threshold': 'Applies binary threshold to create black and white images from grayscale.',
  'GaussianBlur': 'Applies Gaussian blur filter to smooth/reduce noise in images.',
  'Canny': 'Edge detection algorithm that finds edges and contours in images.',
  'findContours': 'Finds contours (object boundaries) in binary images.',
  'drawContours': 'Draws contour lines on an image for visualization.',
  'rectangle': 'Draws a rectangle on an image. Useful for marking detected objects.',
  'circle': 'Draws a circle on an image at specified center point and radius.',
  'putText': 'Adds text overlay to an image. Useful for labels and annotations.',
  'VideoCapture': 'Captures video from camera or file. Use (0) for default camera.',
  'flip': 'Flips an image horizontally, vertically, or both directions.',
  'morphologyEx': 'Morphological operations like opening, closing, erosion, dilation.',
  'inRange': 'Creates mask for pixels within specified color range (useful for color detection).',
  'bitwise_and': 'Performs bitwise AND operation, often used with masks.',
  'HoughCircles': 'Detects circles in images using Hough Circle Transform.',
  'matchTemplate': 'Template matching to find specific patterns/objects in images.',
  'getRotationMatrix2D': 'Creates rotation matrix for rotating images around a point.',
  'warpAffine': 'Applies affine transformation (rotation, scaling, translation) to images.',

  // Numpy operations for image processing
  'np.array': 'Converts data to numpy array. Images in OpenCV are numpy arrays.',
  'zeros': 'Creates array filled with zeros. Useful for creating blank images or masks.',
  'ones': 'Creates array filled with ones. Can be used for creating white images.',
  'uint8': 'Unsigned 8-bit integer data type. Standard for image pixel values (0-255).',
  'float32': '32-bit floating point. Used for some OpenCV operations requiring decimal precision.',
  'concatenate': 'Joins arrays along an axis. Useful for combining multiple images side by side.',
  'hstack': 'Stacks arrays horizontally (side by side). Shortcut for horizontal image concatenation.',
  'vstack': 'Stacks arrays vertically (top to bottom). Shortcut for vertical image concatenation.',
  'where': 'Returns elements based on condition. Useful for conditional image processing.',
  'clip': 'Limits array values to specified range. Prevents pixel values from exceeding 0-255.',
  'mean': 'Calculates average value. Useful for getting average brightness of image regions.',
  'std': 'Calculates standard deviation. Measures variation in pixel intensities.',
  'max': 'Finds maximum value in array. Useful for finding brightest pixels.',
  'min': 'Finds minimum value in array. Useful for finding darkest pixels.',
  'shape': 'Tuple containing array dimensions. For images: (height, width, channels).',
  'dtype': 'Data type of array elements. Important for proper image processing.',

  // Basic Tkinter for OpenCV GUIs. 
  'Tk': 'Creates main window for GUI application. Root container for all widgets.',
  'Label': 'Widget for displaying text or images. Can show processed OpenCV images.',
  'Button': 'Clickable button widget. Use for triggering image processing functions.',
  'Scale': 'Slider widget for numeric input. Great for adjusting processing parameters.',
  'Frame': 'Container widget for organizing other widgets in groups.',
  'mainloop': 'Starts the GUI event loop. Must be called to make window responsive.',
  'pack': 'Simple layout manager. Stacks widgets vertically or horizontally.',
  'grid': 'Grid-based layout manager. More precise control over widget positioning.',
  'place': 'Absolute positioning layout manager. Specify exact x,y coordinates.',
  'command': 'Parameter that specifies function to call when button is clicked.',
  'PIL.Image.fromarray': 'Converts numpy array to PIL Image. Needed for displaying OpenCV images in Tkinter.',
  'PIL.ImageTk.PhotoImage': 'Converts PIL Image to format Tkinter can display.',

  // Image processing concepts
  'BGR': 'Blue-Green-Red color format used by OpenCV (opposite of standard RGB).',
  'RGB': 'Red-Green-Blue color format standard in most image applications.',
  'HSV': 'Hue-Saturation-Value color space. Better for color-based object detection.',
  'grayscale': 'Single-channel image with only brightness information (no color).',
  'binary': 'Image with only two values: 0 (black) and 255 (white).',
  'mask': 'Binary image used to select specific regions for processing.',
  'kernel': 'Small matrix used for filtering operations (blur, sharpen, edge detection).',
  'morphology': 'Operations that process image shape/structure (erosion, dilation, etc.).',
  'contour': 'Curve joining continuous points of same color/intensity. Object boundary.',
  'ROI': 'Region of Interest - specific area of image selected for processing.',
  'threshold': 'Value used to separate pixels into different categories (usually black/white).'
};

// Tkinter Advanced Functionality with OpenCV Basics
export const tkinterAdvancedTooltips = {
  // Advanced Tkinter widgets
  'tkinter.Toplevel': 'Creates additional window separate from main window. Useful for dialog boxes.',
  'tkinter.Canvas': 'Widget for drawing graphics and displaying images. Very flexible for custom visuals.',
  'tkinter.Text': 'Multi-line text widget with advanced formatting and editing capabilities.',
  'tkinter.Entry': 'Single-line text input widget. For getting user text input.',
  'tkinter.Listbox': 'Widget displaying list of items that user can select from.',
  'tkinter.Combobox': 'Dropdown menu widget. Combines entry and listbox functionality.',
  'tkinter.Checkbutton': 'Checkbox widget for boolean (on/off) options.',
  'tkinter.Radiobutton': 'Radio button for selecting one option from multiple choices.',
  'tkinter.Spinbox': 'Widget for selecting numeric values with up/down arrows.',
  'tkinter.Progressbar': 'Shows progress of long-running operations visually.',
  'tkinter.Notebook': 'Tabbed interface widget for organizing content in tabs.',
  'tkinter.PanedWindow': 'Resizable panes that user can adjust by dragging.',
  'tkinter.Scrollbar': 'Scrollbar widget for scrolling through large content.',
  'tkinter.Menu': 'Creates menu bars, context menus, and dropdown menus.',
  'tkinter.Menubutton': 'Button that displays menu when clicked.',

  // Layout management
  'sticky': 'Grid parameter controlling how widget expands within its cell (N,S,E,W).',
  'columnspan': 'Grid parameter making widget span multiple columns.',
  'rowspan': 'Grid parameter making widget span multiple rows.',
  'padx': 'Horizontal padding (space) around widget.',
  'pady': 'Vertical padding (space) around widget.',
  'ipadx': 'Internal horizontal padding within widget borders.',
  'ipady': 'Internal vertical padding within widget borders.',
  'anchor': 'Controls how widget is positioned within its allocated space.',
  'fill': 'Controls how widget expands to fill available space (X, Y, or BOTH).',
  'expand': 'Boolean controlling whether widget expands when window is resized.',
  'side': 'Pack parameter controlling which side widget is placed on (TOP, BOTTOM, LEFT, RIGHT).',

  // Event handling
  'bind': 'Attaches event handler function to widget. Responds to user interactions.',
  'event': 'Object containing information about user interaction (click position, key pressed, etc.).',
  '<Button-1>': 'Left mouse button click event. Most common click event.',
  '<Button-3>': 'Right mouse button click event. Often used for context menus.',
  '<Double-Button-1>': 'Double-click event. Useful for activating items.',
  '<Motion>': 'Mouse movement event. Tracks mouse position over widget.',
  '<Enter>': 'Mouse enters widget area event.',
  '<Leave>': 'Mouse leaves widget area event.',
  '<KeyPress>': 'Any key pressed event. Can capture keyboard input.',
  '<Return>': 'Enter key pressed event. Common for form submission.',
  '<Configure>': 'Widget size/position changed event. Useful for responsive layouts.',
  'after': 'Schedules function to run after specified time delay (in milliseconds).',
  'after_idle': 'Schedules function to run when GUI is idle (not processing other events).',

  // Variables and data binding
  'tkinter.StringVar': 'Special variable that automatically updates connected widgets when changed.',
  'tkinter.IntVar': 'Integer variable that automatically updates connected widgets.',
  'tkinter.DoubleVar': 'Floating-point variable that automatically updates connected widgets.',
  'tkinter.BooleanVar': 'Boolean variable that automatically updates connected widgets.',
  'textvariable': 'Links widget to StringVar so changes update automatically.',
  'variable': 'Links widget (like Checkbutton) to IntVar or BooleanVar.',
  'get': 'Method to retrieve current value from widget or variable.',
  'set': 'Method to change value of widget or variable.',
  'trace': 'Monitors variable for changes and calls function when it changes.',

  // Advanced GUI patterns
  'protocol': 'Handles window manager events like closing window.',
  'WM_DELETE_WINDOW': 'Event triggered when user tries to close window.',
  'withdraw': 'Hides window without destroying it. Can be shown again later.',
  'deiconify': 'Shows previously hidden window.',
  'iconify': 'Minimizes window to taskbar.',
  'lift': 'Brings window to front (above other windows).',
  'focus_set': 'Gives keyboard focus to widget.',
  'grab_set': 'Makes window modal (blocks interaction with other windows).',
  'update': 'Forces GUI to process pending events and redraw.',
  'update_idletasks': 'Processes only idle events without waiting for user input.',

  // Styling and appearance
  'configure': 'Changes widget properties after creation (color, font, size, etc.).',
  'config': 'Shorthand for configure method.',
  'cget': 'Gets current value of widget property.',
  'tkinter.font.Font': 'Creates custom font objects with specific family, size, and style.',
  'relief': 'Border style of widget (FLAT, RAISED, SUNKEN, GROOVE, RIDGE).',
  'borderwidth': 'Width of widget border in pixels.',
  'highlightbackground': 'Color of focus highlight when widget doesn\'t have focus.',
  'highlightcolor': 'Color of focus highlight when widget has focus.',
  'cursor': 'Mouse cursor style when hovering over widget.',
  'state': 'Widget state: NORMAL (active), DISABLED (grayed out), or READONLY.',

  // Basic OpenCV integration
  'cv2.imread': 'Loads image file into numpy array for processing.',
  'cv2.cvtColor': 'Converts between color formats (BGR to RGB for Tkinter display).',
  'cv2.resize': 'Changes image dimensions. Important for fitting images in GUI.',
  'PIL.Image.fromarray': 'Converts OpenCV numpy array to PIL Image for Tkinter.',
  'PIL.ImageTk.PhotoImage': 'Converts PIL Image to PhotoImage for display in Tkinter widgets.',
  'cv2.VideoCapture': 'Captures frames from camera or video file.',
  'read': 'Method of VideoCapture that gets next frame from video source.',
  'release': 'Closes video capture device. Important for cleanup.',
  'BGR2RGB': 'OpenCV constant for converting BGR (OpenCV format) to RGB (display format).',
  'IMREAD_COLOR': 'OpenCV flag for loading color images.',
  'IMREAD_GRAYSCALE': 'OpenCV flag for loading images as grayscale.',

  // Threading for GUI responsiveness
  'threading.Thread': 'Runs code in separate thread to prevent GUI freezing during long operations.',
  'queue.Queue': 'Thread-safe way to pass data between main GUI thread and worker threads.',
  'daemon': 'Thread property that makes thread close when main program ends.',
  'start': 'Begins execution of thread.',
  'join': 'Waits for thread to complete before continuing.',
  'is_alive': 'Checks if thread is still running.',
  'put': 'Adds item to queue (thread-safe).',
  'get': 'Removes and returns item from queue (thread-safe).',
  'empty': 'Checks if queue has no items.',
};

// Combined sets for different learning scenarios
export const opencvGUIBasicsTooltips = combineTooltips(
  opencvImageProcessingTooltips,
  {
    // Additional basic GUI concepts
    'pack': 'Simple layout manager that stacks widgets.',
    'grid': 'Precise layout manager using rows and columns.',
    'mainloop': 'Starts the GUI - makes it responsive to user input.',
    'destroy': 'Closes window and ends program.',
  }
);

export const tkinterOpenCVIntegrationTooltips = combineTooltips(
  tkinterAdvancedTooltips,
  {
    // Additional integration concepts
    'np.array': 'OpenCV images are numpy arrays that can be processed mathematically.',
    'shape': 'Image dimensions: (height, width, channels).',
    'dtype': 'Image data type, usually uint8 for standard images.',
    'cv2.waitKey': 'In GUI apps, use waitKey(1) to process OpenCV events without blocking.',
  }
);

export const comprehensiveImageGUITooltips = combineTooltips(
  opencvImageProcessingTooltips,
  tkinterAdvancedTooltips
);


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
    'cv2', 'tkinter', 'PIL', 'Image', 'ImageTk', 'threading', 'queue',
    // OpenCV methods
    'imread', 'imshow', 'imwrite', 'waitKey', 'destroyAllWindows',
    'resize', 'cvtColor', 'threshold', 'GaussianBlur', 'Canny',
    'findContours', 'drawContours', 'rectangle', 'circle', 'putText',
    'VideoCapture', 'flip', 'morphologyEx', 'inRange', 'bitwise_and',
    // NumPy methods  
    'zeros', 'ones', 'concatenate', 'hstack', 'vstack', 'where',
    'clip', 'mean', 'std', 'max', 'min',
    // Tkinter classes
    'Tk', 'Label', 'Button', 'Scale', 'Frame', 'Canvas', 'Entry',
    'Listbox', 'Checkbutton', 'Radiobutton', 'Text', 'Scrollbar'
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
    // For dotted identifiers (like cv2.imread), check for exact match first, then partial matches
    else if (token.type === 'dotted_identifier' || token.type === 'library') {
      // Try exact match first
      if (tooltips[token.value]) {
        tooltipKey = token.value;
        tooltipContent = tooltips[token.value];
      } else {
        // Try partial matches (e.g., "imread" from "cv2.imread")
        const parts = token.value.split('.');
        for (const part of parts) {
          if (tooltips[part]) {
            tooltipKey = part;
            tooltipContent = tooltips[part];
            break;
          }
        }
        // Also try combinations like "cv2.imread"
        if (!tooltipContent) {
          for (const key in tooltips) {
            if (key.includes('.') && token.value === key) {
              tooltipKey = key;
              tooltipContent = tooltips[key];
              break;
            }
          }
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
                    if (!hasTooltip && token.type === 'decorator') {
                      hasTooltip = Object.keys(tooltips).some(key => token.value.includes(key));
                    }
                    if (!hasTooltip && (token.type === 'dotted_identifier' || token.type === 'library')) {
                      // Check for exact match or partial matches
                      const parts = token.value.split('.');
                      hasTooltip = parts.some(part => tooltips[part]) || 
                                  Object.keys(tooltips).some(key => key.includes('.') && token.value === key);
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
const PythonRendererDemo = () => {
  const sampleCode = `import cv2
import numpy as np
import tkinter as tk
from PIL import Image, ImageTk

class ImageProcessor:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("OpenCV Image Processor")
        
        # Load and display image
        self.original_image = cv2.imread("sample.jpg")
        self.processed_image = self.original_image.copy()
        
        self.setup_gui()
        
    def setup_gui(self):
        # Image display
        self.image_label = tk.Label(self.root)
        self.image_label.pack(pady=10)
        
        # Control frame
        control_frame = tk.Frame(self.root)
        control_frame.pack(pady=10)
        
        # Blur slider
        tk.Label(control_frame, text="Blur:").grid(row=0, column=0)
        self.blur_scale = tk.Scale(control_frame, from_=1, to=50, 
                                  orient=tk.HORIZONTAL, command=self.apply_blur)
        self.blur_scale.grid(row=0, column=1)
        
        # Buttons
        tk.Button(control_frame, text="Grayscale", 
                 command=self.convert_grayscale).grid(row=1, column=0)
        tk.Button(control_frame, text="Reset", 
                 command=self.reset_image).grid(row=1, column=1)
        
        self.update_display()
        
    def apply_blur(self, value):
        blur_value = int(value)
        if blur_value % 2 == 0:
            blur_value += 1
        self.processed_image = cv2.GaussianBlur(
            self.original_image, (blur_value, blur_value), 0)
        self.update_display()
        
    def convert_grayscale(self):
        gray = cv2.cvtColor(self.original_image, cv2.COLOR_BGR2GRAY)
        self.processed_image = cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR)
        self.update_display()
        
    def reset_image(self):
        self.processed_image = self.original_image.copy()
        self.blur_scale.set(1)
        self.update_display()
        
    def update_display(self):
        # Convert BGR to RGB for display
        rgb_image = cv2.cvtColor(self.processed_image, cv2.COLOR_BGR2RGB)
        # Resize for GUI
        rgb_image = cv2.resize(rgb_image, (400, 300))
        # Convert to PhotoImage
        pil_image = Image.fromarray(rgb_image)
        photo = ImageTk.PhotoImage(pil_image)
        # Update label
        self.image_label.configure(image=photo)
        self.image_label.image = photo  # Keep reference
        
    def run(self):
        self.root.mainloop()

if __name__ == "__main__":
    app = ImageProcessor()
    app.run()`;

  // Sample OpenCV tooltips for demo
  const opencvTooltips = {
    'cv2.imread': 'Loads an image from file. Use cv2.IMREAD_COLOR for color, cv2.IMREAD_GRAYSCALE for grayscale.',
    'cv2.cvtColor': 'Converts image between color spaces (BGR to RGB, color to grayscale, etc.).',
    'cv2.GaussianBlur': 'Applies Gaussian blur filter to smooth/reduce noise in images.',
    'cv2.resize': 'Resizes an image. Can specify exact dimensions or scaling factors.',
    'tk.Tk': 'Creates main window for GUI application. Root container for all widgets.',
    'tk.Label': 'Widget for displaying text or images. Can show processed OpenCV images.',
    'tk.Button': 'Clickable button widget. Use for triggering image processing functions.',
    'tk.Scale': 'Slider widget for numeric input. Great for adjusting processing parameters.',
    'tk.Frame': 'Container widget for organizing other widgets in groups.',
    'pack': 'Simple layout manager. Stacks widgets vertically or horizontally.',
    'grid': 'Grid-based layout manager. More precise control over widget positioning.',
    'mainloop': 'Starts the GUI event loop. Must be called to make window responsive.',
    'Image.fromarray': 'Converts numpy array to PIL Image. Needed for displaying OpenCV images in Tkinter.',
    'ImageTk.PhotoImage': 'Converts PIL Image to format Tkinter can display.',
    'import': 'Statement used to include modules or specific functions from other Python files or libraries.',
    'class': 'Keyword used to define a new class - a blueprint for creating objects with attributes and methods.',
    '__init__': 'Special method (constructor) called when creating a new instance of a class. Used for initialization.',
    'self': 'Reference to the current instance of the class. Always the first parameter in instance methods.',
    'def': 'Keyword used to define a function or method.',
    'if': 'Conditional statement that executes code only when a condition is true.',
    'from': 'Used with import to import specific items from a module.',
    'int': 'Built-in function that converts a value to an integer.',
    'copy': 'Method that creates a shallow copy of an object.',
    'text': 'Parameter for setting the display text of widgets like Label and Button.',
    'command': 'Parameter that specifies function to call when button is clicked.',
    'configure': 'Method to change widget properties after creation.',
    'set': 'Method to change the value of a widget or variable.',
    'COLOR_BGR2GRAY': 'OpenCV constant for converting color images to grayscale.',
    'COLOR_GRAY2BGR': 'OpenCV constant for converting grayscale back to 3-channel color format.',
    'COLOR_BGR2RGB': 'OpenCV constant for converting BGR (OpenCV format) to RGB (display format).'
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Python Script Renderer with OpenCV/Tkinter Tooltips</h1>
        <p className="text-gray-600 mb-6">
          Now supports dotted method names like cv2.imread and np.array! Hover over highlighted keywords to see educational tooltips.
        </p>
      </div>
      
      <PythonScriptRenderer
        code={sampleCode}
        tooltips={opencvTooltips}
        theme="dark"
        showLineNumbers={true}
        copyButton={true}
        className="mb-6"
      />
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <h3 className="font-semibold mb-2">Key Improvements:</h3>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li><strong>Mobile-responsive line numbers</strong> - Fixed width issues on smaller screens</li>
          <li><strong>Dotted identifier support</strong> - Properly tokenizes cv2.imread, np.array, tk.Label, etc.</li>
          <li><strong>Smart tooltip matching</strong> - Matches both full names (cv2.imread) and individual parts (imread)</li>
          <li><strong>Enhanced library detection</strong> - Better recognition of OpenCV, NumPy, and Tkinter methods</li>
          <li><strong>Overlap prevention</strong> - Fixed comment duplication issues</li>
        </ul>
        
        <h3 className="font-semibold mt-4 mb-2">Usage with OpenCV/Tkinter Tooltips:</h3>
        <code className="text-sm bg-gray-100 p-2 rounded block">
          {`import { PythonScriptRenderer } from './components/python-renderer'
import { opencvImageProcessingTooltips, tkinterAdvancedTooltips } from './components/python-tooltips'

<PythonScriptRenderer 
  code={pythonCode} 
  tooltips={opencvImageProcessingTooltips} 
  theme="dark" 
/>`}
        </code>
      </div>
    </div>
  );
};

export default PythonRendererDemo;