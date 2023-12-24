import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useSelector } from 'react-redux';
import { selectISAuth } from '../../redux/slices/auth';
import 'easymde/dist/easymde.min.css';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import styles from './AddPost.module.scss';
import axios from '../../axios';
import { Link } from 'react-router-dom';
import { set } from 'react-hook-form';
export const AddPost = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectISAuth);
  const [ isLoading , setLoading ] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setimageUrl] = React.useState('');
  const inputFileRef = React.useRef(null);
  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setimageUrl(data.url);
    } 
    catch(err){
        console.warn(err);
        alert('Warning in get file');
    }
  };

  const onClickRemoveImage = () => {
    setimageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setDescription(value);
  }, []);

  const onSubmit = async () => {
    try{
      setLoading(true);
      const fields = {
        title,
        imageUrl,
        tags,
        description,
      }
      const { data } = isEditing ? await axios.patch(`/posts/${id}`, fields) : await axios.post('/posts', fields);

      const _id = isEditing ? id : data._id;

      navigate(`/posts/${_id}`)

    } catch (err) {
        console.warn(err)
        alert('Warning when uou want to create  file');
    }
  }

  React.useEffect(() => {
    if(id){
      axios.get(`/posts/${id}`).then(({data}) => {
        setTitle(data.title);
        setTags(data.tags.join(','));
        setDescription(data.description);
        setimageUrl(data.imageUrl);
      }).catch (err => {
        console.warn(err)
        alert('Warning when get  file');
    });
    }    
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );


  if(!window.localStorage.getItem('token') && !isAuth){
    return <Navigate to='/' />;
  }
  console.log({title, tags, description})
  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
        </>
      )}
    
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField classes={{ root: styles.tags }} 
      variant="standard" 
      placeholder="Тэги" 
      fullWidth 
      value={tags}
      onChange={(e) => setTags(e.target.value)}
      />

      <SimpleMDE className={styles.editor} value={description} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} type='submit' size="large" variant="contained">
          {isEditing ? 'Save' : 'Опубликовать'}
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
