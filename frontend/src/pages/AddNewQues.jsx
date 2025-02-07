import React, { useContext, useState } from 'react';
import { Bookmark, Link2, FileText, PenTool, ChevronDown } from 'lucide-react';
import { Listbox, Transition } from '@headlessui/react';
import Spinner from '../components/Spinner.jsx';
import dsaTopics from '../lib/dsaTopics.js'
import { AppContext } from '../context/AppContext';

const AddNewQues = () => {
    const { addQues, loading } = useContext(AppContext);

    const [title, setTitle] = useState('');
    const [topic, setTopic] = useState('');
    const [link, setLink] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addQues({ title, topic, link, notes });
    };

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Question</h2>
                <form onSubmit={handleSubmit}>
                    {/* Title Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <div className="relative">
                            <PenTool className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter title"
                                required
                            />
                        </div>
                    </div>

                    {/* Topic Field (Custom Dropdown) */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
                        <div className="relative">
                            <Bookmark className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={20} />
                            <Listbox value={topic} onChange={setTopic}>
                                {({ open }) => (
                                    <>
                                        <Listbox.Button className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-left flex items-center justify-between">
                                            {topic || "Select a topic"}
                                            <ChevronDown
                                                className={`w-5 h-5 text-gray-400 transition-transform ${open ? 'transform rotate-180' : ''}`}
                                            />
                                        </Listbox.Button>
                                        <Transition
                                            enter="transition duration-100 ease-out"
                                            enterFrom="transform scale-95 opacity-0"
                                            enterTo="transform scale-100 opacity-100"
                                            leave="transition duration-75 ease-out"
                                            leaveFrom="transform scale-100 opacity-100"
                                            leaveTo="transform scale-95 opacity-0"
                                        >
                                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none">
                                                {dsaTopics.map((dsaTopic, index) => (
                                                    <Listbox.Option
                                                        key={index}
                                                        value={dsaTopic}
                                                        className={({ active }) =>
                                                            `px-4 py-2 cursor-pointer ${
                                                                active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                                            }`
                                                        }
                                                    >
                                                        {dsaTopic}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </>
                                )}
                            </Listbox>
                        </div>
                    </div>

                    {/* Link Field (Optional) */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Link (Optional)</label>
                        <div className="relative">
                            <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="url"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter link"
                            />
                        </div>
                    </div>

                    {/* Notes Field (Textarea) */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-4 text-gray-400" size={20} />
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your notes"
                                rows="4"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full h-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex justify-center items-center"
                    >
                        {loading ? <Spinner/> : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNewQues;