import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { Add } from "@mui/icons-material";
import { selectISAuth,fetchAuthMe } from "./redux/slices/auth";
import React from "react";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectISAuth)

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [])

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes> 
          <Route path="/" element={<Home />}/>
          <Route path="/posts/:id" element={<FullPost/>}/>
          <Route path="/add-post" element={<AddPost/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Registration/>}/>
        </Routes>  
      </Container>
    </>
  );
}

export default App;
