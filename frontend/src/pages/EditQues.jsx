import React, { useContext, useState, useEffect } from 'react';
import { Link2, PenTool } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import Spinner from '../components/Spinner.jsx';

const EditQues = () => {
    const { loading, selectedQuestion, editQues } = useContext(AppContext); 

    if (!selectedQuestion) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600 text-lg">No question selected.</p>
            </div>
        );
    }

    const [title, setTitle] = useState(selectedQuestion.title || '');
    const [link, setLink] = useState(selectedQuestion.link || '');

    useEffect(() => {
        setTitle(selectedQuestion.title || '');
        setLink(selectedQuestion.link || '');
    }, [selectedQuestion]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        editQues(title,link);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[400px]">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Question</h2>
                <form onSubmit={handleSubmit}>
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

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Link</label>
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full h-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex justify-center items-center"
                        disabled={loading}
                    >
                        {loading ? <Spinner /> : "Update Question"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditQues;
