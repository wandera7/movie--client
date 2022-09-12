import React, { useState } from 'react'

function  MovieForm({onAdd}){
  const [movieForm,setMovieForm]=useState({
    name:'',
    desc:'',
    image:'',
    genre:1
  })
  function handleChange(e){
    setMovieForm({...movieForm,[e.target.name]:e.target.value})
  }

  function handleSubmit(e){
    e.preventDefault();
    fetch("https://wandera-movies.herokuapp.com/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        name:movieForm.name,
        desc:movieForm.desc,
        image:movieForm.image,
        genre:movieForm.genre,
        likes:0
      })
  })
  .then((res)=>res.json())
  .then((data)=>{
    onAdd(data)
    setMovieForm({...movieForm,name:'',image:'',desc:'',genre:1})
  })
}



  return (
    <div className="container">
      <form className="add-movie-form" onSubmit={handleSubmit} >
        <p className='h3'>Create new movie review</p>
        <input
          type="text"
          name="name"
          placeholder="Enter the movie's name..."
          className="input-text"
          value={movieForm.name}
         onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Paste movie's image address..."
          className="input-text"
          value={movieForm.image}
          onChange={handleChange}
        />
        <br />
        <textarea
          name="desc"
          rows="4"
          className='moviedesc'
          placeholder="Enter movie  description.."
          value={movieForm.desc}
          cols="67"
          onChange={handleChange}
          />
        <br />
        <label className='label'>
        Genre:
        <select name="genre"  value={movieForm.genre} onChange={handleChange} >
          <option value='1'>Action</option>
          <option value='2'>Crime</option>
          <option value='3'>Animation</option>
          <option value='4'>Comedy</option>
        </select>
       </label>
        <button className="submit">Publish Review</button>
      </form>
    </div>

  )
}

export default MovieForm
