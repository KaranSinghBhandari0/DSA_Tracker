import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import Spinner from '../components/Spinner';

export default function NotesModal({ isOpen, setIsModalOpen }) {
    const { saveNotes, loading, selectedQuestion } = useContext(AppContext);
    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (selectedQuestion) {
            setNotes(selectedQuestion.notes || '');
        }
    }, [selectedQuestion]);

    const handleSubmit = () => {
        const trimmedNotes = notes.trim();
        if (trimmedNotes === '') {
            alert('Notes cannot be empty!');
            return;
        }
        saveNotes(trimmedNotes);
        setIsModalOpen(false);
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[500px]">
                        <h3 className="text-xl font-semibold text-center mb-4">Edit Notes</h3>
                        <textarea
                            className="w-full h-32 p-2 border border-gray-300 rounded-md"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            disabled={loading} // Prevent editing while loading
                        />
                        <div className="flex justify-end mt-4 space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
                                onClick={() => setIsModalOpen(false)}
                                disabled={loading} // Disable cancel while loading
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                onClick={handleSubmit}
                                disabled={loading} // Prevent multiple clicks
                            >
                                {loading ? <Spinner /> : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
