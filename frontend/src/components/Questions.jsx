import React, { useContext, useEffect, useState } from 'react';
import NotesModal from './NotesModal';
import QuestionItem from './QuestionItem';
import { AppContext } from '../context/AppContext';

export default function Questions() {
    const { filteredQuestions, selectedTopic } = useContext(AppContext);

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="text-center">
                <p className="text-slate-800 text-2xl font-bold">{selectedTopic}</p>
            </div>

            <div className="mt-6 space-y-6">
                {filteredQuestions.length === 0 ? (
                    <p className='text-center text-stone-500'>No Questions Available</p>
                ) : (
                    filteredQuestions.map((question, index) => (
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
