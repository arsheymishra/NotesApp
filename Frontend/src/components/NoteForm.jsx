import React, { useState, useEffect } from 'react'

const NoteForm = ({ onSubmit, initialNote }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // Set form values when editing a note
  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title || '')
      setContent(initialNote.content || '')
    } else {
      // Reset form when adding a new note
      setTitle('')
      setContent('')
    }
  }, [initialNote])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!title.trim()) return
    
    onSubmit({ 
      title, 
      content 
    })
    
    // Reset form
    setTitle('')
    setContent('')
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-gray-900">{initialNote ? 'Edit Note' : 'Add New Note'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input 
            type="text" 
            id="title"
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
            placeholder="Note title"
            required 
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <textarea 
            id="content"
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
            placeholder="Note content"
          />
        </div>

        <div className="flex justify-end">
          <button 
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {initialNote ? 'Update' : 'Add'} Note
          </button>
        </div>
      </form>
    </div>
  )
}

export default NoteForm