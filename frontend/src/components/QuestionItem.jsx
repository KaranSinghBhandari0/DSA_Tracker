import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotepadText, EllipsisVertical } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import Spinner from '../components/Spinner';

export default function QuestionItem({ question, index, setIsModalOpen }) {
    const navigate = useNavigate();
    const { setSelectedQuestion, deleteQues, loading } = useContext(AppContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleEdit = (e) => {
        e.preventDefault();
        setSelectedQuestion(question);
        navigate('/editQues');
    }

    return (
        <div className="relative flex items-center justify-between p-4 border border-slate-300 rounded-lg shadow-md hover:shadow-lg transition-all max-w-5xl mx-auto">
            <div className="flex items-center gap-1 w-[65%]">
                <p className="text-xs md:text-sm font-semibold text-slate-700">{index + 1}.</p>
                <p className="text-xs md:text-sm truncate font-semibold text-slate-700">{question.title}</p>
            </div>
            <div className="flex space-x-4 items-center ml-3">
                <a
                    href={question.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-xs dm:text-sm md:text-base"
                >
                    Link
                </a>
                <NotepadText
                    className="text-green-500 cursor-pointer w-4 h-4 sm:w-5 sm:h-5"
                    onClick={() => {
                        setIsModalOpen(true);
                        setSelectedQuestion(question);
                    }}
                />
                <div className="relative" ref={dropdownRef}>
                    <EllipsisVertical
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                    />
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-300 rounded-lg shadow-md z-10">
                            <button
                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                onClick={handleEdit}
                                disabled={loading}
                            >
                                { loading ? <Spinner/> : 'Edit' }
                            </button>
                            <button
                                className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                                onClick={() => {deleteQues(question), setIsDropdownOpen(false)} }
                                disabled={loading}
                            >
                                { loading ? <Spinner/> : 'Delete' }
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
