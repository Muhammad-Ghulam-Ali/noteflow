import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [notes, setNotes] = useState([])

  // STATES
  const [newNoteShow, setNewNoteShow] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all")
  // New note
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [cat, setCat] = useState("");
  const [priority, setPriority] = useState("");


  // SEARCH AND FILTER LOGIC
  const filteredNotes = notes.filter(note => {
    return (
      note.title.toLowerCase().includes(searchTxt.toLowerCase()) &&
      (selectedCategory === "all" || note.category === selectedCategory)
    )
  });

  // LOCAL STORAGE

  useEffect(function () {
    const userNotes = JSON.parse(localStorage.getItem("notesData"))
    if (userNotes) {
      setNotes(userNotes)
    }
  }, [])

  useEffect(function () {
    localStorage.setItem("notesData", JSON.stringify(notes))
  }, [notes])

  console.log(notes)
  return (
    <>
      {/* Main page section */}
      <main className='h-auto min-h-screen bg-[#111] text-[#c4c4c4]'>
        <div className="parent flex flex-col gap-4">
          {/* Header */}
          <div className={`blurToggle ${newNoteShow ? "blur-sm" : "blur-none"}`}>
            <div className="header py-6 px-12 flex flex-col gap-4 lg:flex-row items-center justify-between fixed top-0 left-0 bg-[#111] z-50 w-full">
              <div className="logo">
                <h1 className='font-bold text-4xl'>note<span className='text-[#7F77DD]'>flow</span></h1>
              </div>
              <div className="searchBar relative">
                <input
                  onChange={(e) => setSearchTxt(e.target.value)}
                  className='py-2 px-6 border border-[#222] w-90 md:w-110  lg:w-150 rounded-2xl' type="text" placeholder='Search notes...' />
                <i className="fa-solid fa-magnifying-glass text-xl text-[#818181] absolute top-2.5 right-3"></i>
              </div>
              <div className="noteButton">
                <button
                  onClick={() => setNewNoteShow(true)}
                  className='px-8 py-2 bg-[#222] font-bold rounded-2xl cursor-pointer border border-[#333] text-[#c4c4c4] hover:border-[#7F77DD] hover:text-[#7F77DD] duration-300] hover:bg-[#333] duration-300 hover:-translate-y-1'>+ New note</button>
              </div>
            </div>

            <div className="overLay relative pt-55 md:pt-60 lg:pt-32">
              {/* Dashboard  */}

              <section className='w-full px-8 md:px-12 lg:px-20'>
                <div className="dashboard grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-5">
                  <div className="totalNotes bg-[#222] py-3 gap-3 flex flex-col items-center justify-center rounded-2xl">
                    <i className="fa-solid fa-list text-2xl text-[#7F77DD]"></i>
                    <h1 className='font-bold text-2xl'>{notes.length}</h1>
                    <small>Total notes</small>
                  </div>

                  <div className="totalNotes bg-[#222] py-3 gap-3  flex flex-col items-center justify-center rounded-2xl">
                    <i className="fa-solid fa-bookmark text-2xl text-[#DD7777]"></i>
                    <h1 className='font-bold text-2xl'>{notes.filter(note => note.priority === "Urgent").length}</h1>
                    <small>Urgent</small>
                  </div>

                  <div className="totalNotes bg-[#222] py-3 gap-3 flex flex-col items-center justify-center rounded-2xl">
                    <i className="fa-regular fa-file text-2xl text-[#77DD99]"></i>
                    <h1 className='font-bold text-2xl'>{notes.filter(note => note.priority === "Important").length}</h1>
                    <small>Normal</small>
                  </div>
                </div>
              </section>
              <hr className='text-[#222] mt-3' />

              {/* Filters */}
              <section className='w-full py-2 lg:flex items-center justify-center hidden'>
                <div className="button grid grid-cols-3 md:grid-cols-7 gap-1">
                  <p className='px-8 py-2 text-[#c4c4c4]'>Category</p>
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-8 py-2 rounded-2xl bg-[#1a1a1a] cursor-pointer border border-[#333] text-[#c4c4c4] hover:border-[#7F77DD] hover:text-[#7F77DD] duration-300 ${selectedCategory === "all" ? "lg:border-[#7F77DD] lg:text-[#7F77DD]" : ""}`}>All</button>

                  <button
                    onClick={() => setSelectedCategory("Personal")}
                    className={`px-8 py-2 rounded-2xl bg-[#1a1a1a] cursor-pointer border border-[#333] text-[#c4c4c4] hover:border-[#7F77DD] hover:text-[#7F77DD] duration-300 ${selectedCategory === "Personal" ? "lg:border-[#7F77DD] lg:text-[#7F77DD]" : ""}`}>Personal</button>

                  <button
                    onClick={() => setSelectedCategory("Work")}
                    className={`px-8 py-2 rounded-2xl bg-[#1a1a1a] cursor-pointer border border-[#333] text-[#c4c4c4] hover:border-[#7F77DD] hover:text-[#7F77DD] duration-300 ${selectedCategory === "Work" ? "lg:border-[#7F77DD] lg:text-[#7F77DD]" : ""}`}>Work</button>

                  <button
                    onClick={() => setSelectedCategory("Ideas")}
                    className={`px-8 py-2 rounded-2xl bg-[#1a1a1a] cursor-pointer border border-[#333] text-[#c4c4c4] hover:border-[#7F77DD] hover:text-[#7F77DD] duration-300 ${selectedCategory === "Ideas" ? "lg:border-[#7F77DD] lg:text-[#7F77DD]" : ""}`}>Ideas</button>

                  <button
                    onClick={() => setSelectedCategory("Learning")}
                    className={`px-8 py-2 rounded-2xl bg-[#1a1a1a] cursor-pointer border border-[#333] text-[#c4c4c4] hover:border-[#7F77DD] hover:text-[#7F77DD] duration-300 ${selectedCategory === "Learning" ? "lg:border-[#7F77DD] lg:text-[#7F77DD]" : ""}`}>Learning</button>

                  <button
                    onClick={() => setSelectedCategory("Health")}
                    className={`px-8 py-2 rounded-2xl bg-[#1a1a1a] cursor-pointer border border-[#333] text-[#c4c4c4] hover:border-[#7F77DD] hover:text-[#7F77DD] duration-300 ${selectedCategory === "Health" ? "lg:border-[#7F77DD] lg:text-[#7F77DD]" : ""}`}>Health</button>
                </div>
              </section>
              <hr className='text-[#222]' />

              {/* NO NOTES MESSAGE */}
              {notes.length < 1 && (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <i className="fa-regular fa-note-sticky text-4xl text-[#333]"></i>
                  <h2 className="text-[#555] font-semibold text-lg">No notes yet</h2>
                  <p className="text-[#444] text-sm">Hit <span onClick={() => setNewNoteShow(true)} className="text-[#7F77DD] cursor-pointer">+ New note</span> to get started.</p>
                </div>
              )}


              {/* Cards */}
              <section className='w-full py-4 px-3 md:px-12'>
                <div className="card grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5 pb-23">
                  {filteredNotes.map(function (elem, index) {
                    return (
                      <div
                        key={index}
                        className="card h-auto min-h-50 px-3 py-4 bg-[#222] rounded-2xl flex flex-col justify-between gap-5">
                        <div className="filters flex items-center gap-2">
                          <small className='px-3 rounded-2xl bg-[#EEEDFE] text-[#534AB7]'>{elem.category}</small>
                          <small className='px-3 rounded-2xl bg-[#FAEEDA] text-[#854F0B]'>{elem.priority}</small>
                        </div>
                        <div className="heading flex flex-col gap-2">
                          <h1 className='font-bold text-[#dddddd]'>{elem.title}</h1>
                          <p className='text-sm'>{elem.description}</p>
                        </div>
                        <div className="time flex items-center justify-between">
                          <small className='text-[#727272]'>{elem.time}</small>
                          <button onClick={() => {
                            const updated = notes.filter((note) => note.id !== elem.id)
                            setNotes(updated)
                          }}
                            className='px-4 py-1 rounded-2xl cursor-pointer bg-[#3a1a1a] text-[#DD7777] border border-[#DD7777]/30 hover:bg-[#DD7777] hover:text-white duration-300'
                          >Delete</button>
                        </div>
                      </div>
                    )
                  })}
                </div>
                {filteredNotes.length < 1 && notes.length > 0 && (
                  <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <i className="fa-solid fa-magnifying-glass text-4xl text-[#333]"></i>
                    <h2 className="text-[#555] font-semibold text-lg">No results found</h2>
                    <p className="text-[#444] text-sm">Try a different keyword or <span className="text-[#7F77DD]">clear the filter</span>.</p>
                  </div>
                )}
              </section>
            </div>
          </div>
          <div className={`inputCard w-[90%] max-w-150 bg-[#444] rounded-2xl px-5 py-5 flex flex-col gap-6 absolute top-40 left-5 md:top-60 md:left-22 lg:top-[25%] lg:left-[29%] ${newNoteShow ? "block" : "hidden"}`}>
            <div className="heading">
              <h1 className='font-bold text-2xl text-[#e3e2e2]'>New note</h1>
            </div>

            <div className="inputs flex flex-col gap-2">
              <input
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className='px-4 py-2 border border-[#959494] rounded-2xl bg-[#3a3a3a] text-[#e2e1e1] placeholder-[#727272] focus:outline-none focus:border-[#7F77DD] focus:ring-1 focus:ring-[#7F77DD]/40 duration-300'
                type="text" placeholder='Note title...' />
              <textarea
                value={noteDescription}
                onChange={(e) => setNoteDescription(e.target.value)}
                className='px-4 py-8 border border-[#959494] rounded-2xl bg-[#3a3a3a] text-[#e2e1e1] placeholder-[#727272] focus:outline-none focus:border-[#7F77DD] focus:ring-1 focus:ring-[#7F77DD]/40 duration-300'
                placeholder={`What's on your mind?`} ></textarea>
            </div>

            <div className="filters flex items-center gap-5">
              <select
                onChange={(e) => setCat(e.target.value)}
                className='w-[50%] py-2 px-4 rounded-md border border-[#959494] bg-[#3a3a3a] text-[#e2e1e1] focus:outline-none focus:border-[#7F77DD] focus:ring-1 focus:ring-[#7F77DD]/40 duration-300'>
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Ideas">Ideas</option>
                <option value="Learning">Learning</option>
                <option value="Health">Health</option>
              </select>

              <select
                onChange={(e) => setPriority(e.target.value)}
                className='w-[50%] py-2 px-4 rounded-md border border-[#959494] bg-[#3a3a3a] text-[#e2e1e1] focus:outline-none focus:border-[#7F77DD] focus:ring-1 focus:ring-[#7F77DD]/40 duration-300'>
                <option value="Normal">Normal</option>
                <option value="Important">Important</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div className="button flex items-center gap-2 justify-end">
              <button
                onClick={() => setNewNoteShow(false)}
                className='px-6 py-1 font-bold rounded-2xl cursor-pointer bg-[#1a1a1a] text-[#c4c4c4] border border-[#444] hover:border-[#c4c4c4] hover:text-white duration-300'>Cancel</button>
              <button
                onClick={() => {
                  if (!noteTitle || !noteDescription || !cat || !priority) {
                    alert("Please fill all the fields")
                    return;
                  }
                  setNotes(
                    [...notes, {
                      id: notes.length + 1,
                      title: noteTitle,
                      description: noteDescription,
                      category: cat,
                      priority: priority,
                      time: new Date().toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })
                    }]
                  )
                  setNoteTitle("")
                  setNoteDescription("")
                  setCat("")
                  setPriority("")
                  setNewNoteShow(false)
                }}
                className='px-6 py-1 font-bold rounded-2xl cursor-pointer bg-[#2a2845] text-[#7F77DD] border border-[#7F77DD]/40 hover:bg-[#7F77DD] hover:text-white duration-300'>Save note</button>
            </div>
          </div>
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 w-full bg-[#111] text-[#444] text-center py-4 text-sm border-t border-[#222]">
        <p>Made with <span className="text-[#DD7777]">♥</span> by Muhammad Ghulam Ali</p>
      </footer>
    </>
  )
}

export default App
