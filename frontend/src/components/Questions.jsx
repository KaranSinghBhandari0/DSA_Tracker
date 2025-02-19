import React, { useContext, useState, useMemo } from 'react';
import NotesModal from './NotesModal';
import QuestionItem from './QuestionItem';
import { AppContext } from '../context/AppContext';

export default function Questions() {
    const { filteredQuestions, selectedTopic } = useContext(AppContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showImp, setShowImp] = useState(false);

    // Filter questions based on "Important" checkbox state
    const displayedQuestions = useMemo(() => {
        return showImp
            ? filteredQuestions.filter(question => question.important === true)
            : filteredQuestions;
    }, [filteredQuestions, showImp]);

    return (
        <div className="container mx-auto px-4 py-6">
            <div className='flex justify-between items-center'>
                <p></p>
                <p className="text-slate-800 text-2xl font-bold text-center">{selectedTopic}</p>
                <div className="flex items-center cursor-pointer" onClick={() => setShowImp(prev => !prev)}>
                    <input
                        checked={showImp}
                        id="checked-checkbox"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                        readOnly
                    />
                    <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-slate-800">
                        Important
                    </label>
                </div>
            </div>

            <div className="mt-6 space-y-6">
                {displayedQuestions.length === 0 ? (
                    <p className='text-center text-stone-500'>No Questions Available</p>
                ) : (
                    displayedQuestions.map((question, index) => (
                        <QuestionItem key={index} question={question} index={index} setIsModalOpen={setIsModalOpen} />
                    ))
                )}
            </div>

            <NotesModal
                isOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </div>
    );
}
