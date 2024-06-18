import Layout from "./Layout";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import Panduan from './Panduan';
import About from "./About";
import Teams from "./Teams";
import UserAuthContext from './context/UserAuthContext';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element = { <Layout></Layout> }>
    <Route index element={<Login />}></Route>
    <Route path='/Signup' element={<Signup />}></Route>
    <Route path = "/profile" element = { <Profile></Profile> }></Route>
  </Route>
));
function App() {
  return (
      <UserAuthContext>
    <RouterProvider router={router} >
    </RouterProvider>
      </UserAuthContext>
  );
}

export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useState } from 'react';
// import { ethers } from 'ethers';

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//           <Route path = "/" element = { <Layout></Layout> }>
//             <Route index element = { <Login></Login> }></Route>
//             <Route path = "/signup" element = { <Signup></Signup> } ></Route>
//             <Route path = "/profile" element = { <Profile></Profile> }></Route>
//             <Route path = "/panduan" element = { <Panduan></Panduan> }></Route>
//             <Route path="/about" element={<About />} />
//             <Route path="/team" element={<Teams />} />
//           </Route>
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App