'use client';

import { useState } from 'react';

interface TabData {
  content: string;
  techStack: {
    category: string;
    items: string[];
  }[];
  approach: string;
  impact: string;
  future: string;
}

interface ProjectTabsProps {
  data: TabData;
}

const tabItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'techstack', label: 'Tech Stack' },
  { id: 'approach', label: 'Technical Approach' },
  { id: 'impact', label: 'Impact' },
  { id: 'future', label: 'Future Development' }
];

export function ProjectTabs({ data }: ProjectTabsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="w-full px-4 py-6">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          {tabItems.map((tab) => (
            <li key={tab.id} className="mr-2">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`inline-block p-4 rounded-t-lg ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                    : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        {activeTab === 'overview' && (
          <div className="prose dark:prose-invert max-w-none">
            {data.content}
          </div>
        )}

        {activeTab === 'techstack' && (
          <div className="space-y-6">
            {data.techStack.map((category, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'approach' && (
          <div className="prose dark:prose-invert max-w-none">
            {data.approach}
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="prose dark:prose-invert max-w-none">
            {data.impact}
          </div>
        )}

        {activeTab === 'future' && (
          <div className="prose dark:prose-invert max-w-none">
            {data.future}
          </div>
        )}
      </div>
    </div>
  );
}
