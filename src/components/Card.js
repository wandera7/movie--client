import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Stack,IconButton,Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';


 function MovieCard({movie,onUpdate,onDelete}) {
  const {id,name,desc,image_url,likes}=movie
  const[words,setWords]=React.useState(true)
  const [likeCount,setLikeCount]=React.useState(likes)
  const [styleLike,setStyleLike]=React.useState(false)

  function handleLike(){
    setStyleLike(!styleLike)
    setLikeCount((likes)=>likes+1)
    fetch(`https://wandera-movies.herokuapp.com/movies/${id}`,{
      method:'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes:likeCount

    })})
    .then((res)=>res.json())
    .then((data)=>onUpdate(data))
  }

  function handleDelete(){
    fetch(`https://wandera-movies.herokuapp.com/movies/${id}`,{
      method:'DELETE'
    })
    .then((res)=>res.json())
    .then(()=>onDelete(id))
  }


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="300"
        image={image_url}
      />
      <CardContent>
        <Typography className='name' gutterBottom variant="h5" component="div">
          {name.toUpperCase()}
        </Typography>
        <p className='genre'></p>
        <p className='desc'>
          {words?`${desc.slice(0,30)}...`:desc}<button className='btn' onClick={()=>{setWords(!words)}}>{words?'Read more':'Read Less'}</button>
        </p>
        <h4><span>{likeCount}</span> likes</h4>
      </CardContent>
      <CardActions>
        <Stack  spacing={2} direction="row"  >
        <Tooltip title="like">
        <IconButton  style={{color:styleLike?'blueviolet':null}} onClick={handleLike}><ThumbUpIcon/>
        </IconButton>
        </Tooltip>
        <Tooltip title="delete">
        <IconButton  onClick={handleDelete}><DeleteIcon/></IconButton>

        </Tooltip>
        </Stack>
      </CardActions>
    </Card>
  );
}
export default MovieCard
