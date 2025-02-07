import React, { useContext, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dsaTopics from '../lib/dsaTopics.js';
import { AppContext } from '../context/AppContext.jsx';

const TopicsSlider = () => {
    const { selectedTopic, setSelectedTopic } = useContext(AppContext);

    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 200; // Adjust scroll distance
            if (direction === "left") {
                scrollRef.current.scrollLeft -= scrollAmount;
            } else {
                scrollRef.current.scrollLeft += scrollAmount;
            }
        }
    };

    return (
        <div className="relative w-full mt-8 sm:px-16">
            {/* Left Scroll Button */}
            <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-300 rounded-full shadow-md hover:bg-gray-400 hidden sm:block"
                onClick={() => scroll("left")}
            >
                <ChevronLeft size={24} />
            </button>

            {/* Scrollable Topics */}
            <div ref={scrollRef} className="overflow-x-auto whitespace-nowrap hide-scrollbar scroll-smooth">
                <div className="flex space-x-4 p-2">
                    {dsaTopics.map((topic, index) => (
                        <span
                            key={index}
                            className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors 
                        ${selectedTopic === topic ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            onClick={() => setSelectedTopic(topic)}
                        >
                            {topic}
                        </span>
                    ))}
                </div>
            </div>

            {/* Right Scroll Button */}
            <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-300 rounded-full shadow-md hover:bg-gray-400 hidden sm:block"
                onClick={() => scroll("right")}
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
};

export default TopicsSlider;
