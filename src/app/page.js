'use client'
import { useState } from "react";

export default function Home() {
  const [flashcards, setFlashcards] = useState([])
  const [topic, setTopic] = useState('')
  const [loading, setLoading] = useState(false)


  const generateFlashcards = async (event) => {
    event.preventDefault()
    setLoading(true)
    const response = await fetch('/api/word-gen',{
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        topic: topic,
      })
    })

    const flashcardsData = await response.json()
    setFlashcards(flashcardsData)
    setLoading(false)
  }

  return (
    <form onSubmit={generateFlashcards} className="flex flex-col gap-4 p-4">
      <h1 className="text-[3.2rem] font-bold text-[#B00000] my-4rem">{"Flirt the AI"}</h1>
      <input 
      type="text"
      className="h-8 bg-transparent text-gray-400 border-gray-400 text-24px" 
      placeholder="Flirt the AI" 
      name="topic" 
      onChange={(event) => setTopic(event.target.value)}/>
      <button type="submit" disabled={loading} 
      className="text-24px text-white bg-[#B00000] shadow-lg p-1 justify-center space-x-18 opacity-80 rounded-[50pt] mx-auto 0 border-2 border-[#B00000] w-[100%]">
        {loading ? 'Could you please wait?' : 'Flirt!'}
      </button>
    <h2 className="text-[1rem] font-regular text-[#B00000] my-4rem">You flirt the AI with the word {topic}</h2>
    {flashcards ?
        <div className="flex flex-wrap">
          {flashcards.map((flashcard) => (
            <div key={flashcard.id} className="w-1/2 p-2">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold">{flashcard.word}</h2>
              </div>
            </div>
          ))}
        </div> : ''}

    </form>
  );
}
