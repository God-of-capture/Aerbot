'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

interface Section {
  id: string;
  title: string;
  content: string;
  order: number;
  isEditing: boolean;
}

interface ResumeEditorProps {
  initialSections?: Section[];
  onSave: (sections: Section[]) => void;
}

export default function ResumeEditor({
  initialSections = [],
  onSave,
}: ResumeEditorProps) {
  const [sections, setSections] = useState<Section[]>(
    initialSections.map((section) => ({ ...section, isEditing: false }))
  );

  const addSection = () => {
    const newSection: Section = {
      id: Date.now().toString(),
      title: 'New Section',
      content: '',
      order: sections.length,
      isEditing: true,
    };
    setSections([...sections, newSection]);
  };

  const deleteSection = (id: string) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const toggleEdit = (id: string) => {
    setSections(
      sections.map((section) =>
        section.id === id
          ? { ...section, isEditing: !section.isEditing }
          : section
      )
    );
  };

  const updateSection = (id: string, field: 'title' | 'content', value: string) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Resume Editor
        </h2>
        <button
          onClick={addSection}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Section
        </button>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border dark:border-gray-700 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              {section.isEditing ? (
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                  className="text-xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none dark:text-white"
                  autoFocus
                />
              ) : (
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {section.title}
                </h3>
              )}
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleEdit(section.id)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  {section.isEditing ? (
                    <CheckIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <PencilIcon className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                <button
                  onClick={() => deleteSection(section.id)}
                  className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-full"
                >
                  <TrashIcon className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>
            {section.isEditing ? (
              <textarea
                value={section.content}
                onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                className="w-full h-32 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter section content..."
              />
            ) : (
              <div className="prose dark:prose-invert max-w-none">
                {section.content.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => onSave(sections)}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Save Resume
        </button>
      </div>
    </div>
  );
} 