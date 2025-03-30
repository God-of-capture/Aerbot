'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  TrashIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';

interface Slide {
  id: string;
  title: string;
  content: string;
  order: number;
}

interface PPTEditorProps {
  initialSlides?: Slide[];
  onSave: (slides: Slide[]) => void;
}

export default function PPTEditor({ initialSlides = [], onSave }: PPTEditorProps) {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [activeSlide, setActiveSlide] = useState<string | null>(
    initialSlides[0]?.id || null
  );

  const addSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      title: `Slide ${slides.length + 1}`,
      content: '',
      order: slides.length,
    };
    setSlides([...slides, newSlide]);
    setActiveSlide(newSlide.id);
  };

  const deleteSlide = (id: string) => {
    setSlides(slides.filter((slide) => slide.id !== id));
    if (activeSlide === id) {
      setActiveSlide(slides[0]?.id || null);
    }
  };

  const moveSlide = (id: string, direction: 'up' | 'down') => {
    const index = slides.findIndex((slide) => slide.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === slides.length - 1)
    ) {
      return;
    }

    const newSlides = [...slides];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newSlides[index], newSlides[newIndex]] = [newSlides[newIndex], newSlides[index]];
    
    setSlides(newSlides.map((slide, i) => ({ ...slide, order: i })));
  };

  const updateSlide = (id: string, field: 'title' | 'content', value: string) => {
    setSlides(
      slides.map((slide) =>
        slide.id === id ? { ...slide, [field]: value } : slide
      )
    );
  };

  return (
    <div className="flex h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {/* Slides List */}
      <div className="w-64 border-r dark:border-gray-700 p-4 overflow-y-auto">
        <button
          onClick={addSlide}
          className="w-full mb-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Slide
        </button>
        {slides.map((slide) => (
          <motion.div
            key={slide.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`mb-2 p-2 rounded-lg cursor-pointer ${
              activeSlide === slide.id
                ? 'bg-blue-100 dark:bg-blue-900'
                : 'bg-gray-100 dark:bg-gray-700'
            }`}
            onClick={() => setActiveSlide(slide.id)}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{slide.title}</span>
              <div className="flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    moveSlide(slide.id, 'up');
                  }}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                >
                  <ArrowUpIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    moveSlide(slide.id, 'down');
                  }}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                >
                  <ArrowDownIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSlide(slide.id);
                  }}
                  className="p-1 hover:bg-red-200 dark:hover:bg-red-900 rounded"
                >
                  <TrashIcon className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Slide Editor */}
      <div className="flex-1 p-6">
        {activeSlide ? (
          <div className="space-y-4">
            <input
              type="text"
              value={slides.find((s) => s.id === activeSlide)?.title || ''}
              onChange={(e) => updateSlide(activeSlide, 'title', e.target.value)}
              className="w-full p-2 text-xl font-bold border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Slide Title"
            />
            <textarea
              value={slides.find((s) => s.id === activeSlide)?.content || ''}
              onChange={(e) => updateSlide(activeSlide, 'content', e.target.value)}
              className="w-full h-[400px] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Slide Content"
            />
            <button
              onClick={() => onSave(slides)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a slide or create a new one
          </div>
        )}
      </div>
    </div>
  );
} 