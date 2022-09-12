import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MovieCard from './Card';

 function MovieGrid({movies,onDelete,onUpdate}) {
  return (
    <Box className='box' sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {movies.map((movie)=>{
        return (
          <Grid item xs={2} sm={4} md={3} key={movie.id}>
            <MovieCard movie={movie} onUpdate={onUpdate} onDelete={onDelete}/>
          </Grid>
        )
        })}
      </Grid>
    </Box>
  );
}
export default MovieGrid
