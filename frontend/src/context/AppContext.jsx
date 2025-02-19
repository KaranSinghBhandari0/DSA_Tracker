import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axiosInstance';
import { toast } from 'react-toastify';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('Arrays');
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    useEffect(() => {
        userQues();
    }, []);
    
    useEffect(() => {
        setFilteredQuestions(questions.filter((question) => question.topic === selectedTopic));
    }, [questions, selectedTopic]);
    
    useEffect(()=>{
        setFilteredQuestions(filteredQuestions);
    }, [filteredQuestions])

    // signUp
    const signup = async (username,email,password) => {
        setLoading(true);
        try {
            const res = await axiosInstance.post(`/auth/signup`, {username,email,password});
            setUser(res.data.user);
            toast.success(`Welcome ${username}`);
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    }

    // login
    const login = async (email,password) => {
        setLoading(true);
        try {
            const res = await axiosInstance.post(`/auth/login`, {email,password});
            setUser(res.data.user);
            await userQues();
            toast.success('login successful');
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    // Logout
    const logout = async () => {
        try {
            await axiosInstance.get('/auth/logout');
            toast.success('Logout successful');
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Logout failed");
        }
    };

    // Check authentication
    const checkAuth = async () => {
        try {
            const res = await axiosInstance.get('/auth/isAuth');
            setUser(res.data);
        } catch (error) {
            console.error('Authentication check failed', error);
        } finally {
            setCheckingAuth(false);
        }
    };

    // add new ques
    const addQues = async (formData) => {
        try {
            setLoading(true);
            const res = await axiosInstance.post('/ques/add', formData);
            toast.success('Question added');
            await userQues();
            navigate('/')
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Failed to add Question");
        } finally {
            setLoading(false);
        }
    }

    // user Questions
    const userQues = async () => {
        try {
            const res = await axiosInstance.get('/ques/all');
            setQuestions(res.data.questions);
        } catch (error) {
            console.log(error);
        }

    }

    // save Notes
    const saveNotes = async (notes) => {
        setLoading(true);
        try {
            const res = await axiosInstance.post('/ques/editNotes', {selectedQuestion,notes});
            await userQues();
            toast.success('Notes Updated');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "failed to save notes");
        } finally {
            setLoading(false);
        }
    }

    // search feature
    const search = (query) => {
        if (!query) {
            setSelectedTopic('Arrays');
            return;
        }

        setSelectedTopic('Search Results');
        const filteredQuestions = (questions || []).filter(q => 
            q?.title?.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredQuestions(filteredQuestions);
    }

    // delete Question
    const deleteQues = async (ques) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this question?");
        if (!confirmDelete) return;
    
        setLoading(true);
        try {
            await axiosInstance.delete(`/ques/${ques._id}`);
            toast.success("Question Deleted");
            await userQues();
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message || "Deletion failed");
        } finally {
            setLoading(false);
        }
    };    

    // edit Question
    const editQues = async (title,link) => {
        const newTitle = title.trim();
        const newLink = link.trim();

        if(newTitle === selectedQuestion.title && newLink === selectedQuestion.link) {
            navigate('/');
            return;
        }
    
        setLoading(true);
        try {
            const id = selectedQuestion._id;
            await axiosInstance.post(`/ques/edit`, {id,title,link});
            await userQues();
            toast.success("Question Editted");
            navigate('/')
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message || "failed to edit Ques");
        } finally {
            setLoading(false);
        }
    };

    // mark important
    const markImp = async (id) => {
        try {
            const res = await axiosInstance.get(`/ques/markImp/${id}`);
            toast.success(res.data.message);
            await userQues();
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message || "failed to mark as important");
        }
    };  

    return (
        <AppContext.Provider value={{ signup, login, logout, checkAuth, 
        loading, checkingAuth, user, questions, filteredQuestions, selectedTopic, setSelectedTopic, selectedQuestion, setSelectedQuestion,
        addQues, userQues, saveNotes, search, deleteQues, editQues, markImp }}>
            {children}
        </AppContext.Provider>
    );
};