import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'
import Navbar from '../components/Navbar'
import NoteForm from '../components/NoteForm'

export default function NotesPage() {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [editingNote, setEditingNote] = useState(null)
    const navigate = useNavigate()

    // Check if user is authenticated
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
        }
    }, [navigate])

    // Fetch notes from API
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setLoading(true)
                const response = await API.get('/notes')
                setNotes(response.data)
                setLoading(false)
            } catch (err) {
                setError('Failed to fetch notes')
                setLoading(false)
                if (err.response?.status === 401) {
                    localStorage.removeItem('token')
                    navigate('/login')
                }
            }
        }

        fetchNotes()
    }, [navigate])

    // Handle adding a new note
    const handleAddNote = async (note) => {
        try {
            const response = await API.post('/notes', note)
            setNotes([...notes, response.data])
            setIsFormVisible(false)
        } catch (err) {
            setError('Failed to add note')
            if (err.response?.status === 401) {
                localStorage.removeItem('token')
                navigate('/login')
            }
        }
    }

    // Handle updating a note
    const handleUpdateNote = async (id, updatedNote) => {
        try {
            const response = await API.put(`/notes/${id}`, updatedNote)
            setNotes(notes.map(note => note.id === id ? response.data : note))
            setEditingNote(null)
            setIsFormVisible(false)
        } catch (err) {
            setError('Failed to update note')
            if (err.response?.status === 401) {
                localStorage.removeItem('token')
                navigate('/login')
            }
        }
    }

    // Handle deleting a note
    const handleDeleteNote = async (id) => {
        try {
            await API.delete(`/notes/${id}`)
            setNotes(notes.filter(note => note.id !== id))
        } catch (err) {
            setError('Failed to delete note')
            if (err.response?.status === 401) {
                localStorage.removeItem('token')
                navigate('/login')
            }
        }
    }

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
                        <div className="flex space-x-4">
                            <button 
                                onClick={() => {
                                    setEditingNote(null)
                                    setIsFormVisible(!isFormVisible)
                                }}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {isFormVisible ? 'Cancel' : 'Add Note'}
                            </button>
                            <button 
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {isFormVisible && (
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6 p-6">
                            <NoteForm 
                                onSubmit={editingNote ? (note) => handleUpdateNote(editingNote.id, note) : handleAddNote}
                                initialNote={editingNote}
                            />
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                        </div>
                    ) : notes.length === 0 ? (
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
                            <p className="text-gray-500">No notes yet. Create one!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {notes.map((note) => (
                                <div key={note.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">{note.title}</h3>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">{note.content}</p>
                                        <div className="mt-4 flex space-x-3">
                                            <button 
                                                onClick={() => {
                                                    setEditingNote(note)
                                                    setIsFormVisible(true)
                                                }}
                                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteNote(note.id)}
                                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
