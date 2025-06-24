import React from 'react';
import { ExternalLink, ChevronRight } from 'lucide-react';

// Sample data - replace with your actual links
const linkData = [
  {
    id: 1,
    name: "Python Basics",
    description: "Begin your Python knowledge by learning about the basics",
    href: "/python/python-basics",
    isExternal: false
  },
  {
    id: 2,
    name: "Python - Functions", 
    description: "A more in-depth article about Python functions",
    href: "/python/python-functions",
    isExternal: false
  },
  {
    id: 3,
    name: "Python - Inputs",
    description: "Learn about how input handling works in Python",
    href: "/python/python-input-handling",
    isExternal: false
  },
  {
    id: 4,
    name: "Python - Threading",
    description: "Learn about how threading works in Python",
    href: "/python/python-threading",
    isExternal: false
  },
  {
    id: 5,
    name: "OpenCV Basics",
    description: "Learn about Python OpenCV",
    href: "/python/opencv-image-processing",
    isExternal: false
  },
  {
    id: 6,
    name: "MatPlotLib Basics",
    description: "Learn about Python's MatPlotLib library",
    href: "/python/matplotlib-basics-pyplot",
    isExternal: false
  },
  {
    id: 7,
    name: "Tkinter - Intro",
    description: "Learn about Python's Tkinter library",
    href: "/python/tkinter-intro",
    isExternal: false
  }
];

const LinkPanel = ({ name, description, href, isExternal }) => {
  const handleClick = () => {
    if (isExternal) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = href;
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="group cursor-pointer bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200 transform hover:-translate-y-1"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
            {name}
          </h3>
          <p className="mt-2 text-gray-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0">
          {isExternal ? (
            <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
          )}
        </div>
      </div>
    </div>
  );
};

export default function LinkPanelPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Resource Links
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quick access to important documentation, tutorials, and guides for your development journey.
          </p>
        </div>

        {/* Link Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {linkData.map((link) => (
            <LinkPanel
              key={link.id}
              name={link.name}
              description={link.description}
              href={link.href}
              isExternal={link.isExternal}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Click any panel to navigate to the resource. External links will open in a new tab.
          </p>
        </div>
      </div>
    </div>
  );
}

/*
// Replace this with catalog of other pages. 
export default function App(){
  return (<><body>
    {/ <a href="/vexexp/psuedo-code-intro">Psuedocode - Intro</a><br/ > /}
    <a href="/vexexp/logic-diagrams-intro">Logic Diagrams - Intro</a><br/ >
    <a href="/vexexp/python-basics">Python - Basics</a><br/ >
    <a href="/vexexp/python-functions">Python - Functions</a><br/ >
    <a href="/vexexp/matplotlib-basics-pyplot">MatPlotLib - Basics & Pyplot</a><br/ >
    <a href="/python/opencv-image-processing">OpenCV - Image Processing</a><br/ >
    <a href="/vexexp/color-detection">Color Detection</a><br />
  </body></>)
}
*/