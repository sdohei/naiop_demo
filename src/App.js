import * as React from "react";

import './App.css';
import Event from './Event.js';
import EventList from './EventList.js';
import Register from './Register.js';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <EventList/>,
  },
  {
    path: "events/:eventId",
    element: <Event />,
  },
  {
    path: "events/:eventId/register",
    element: <Register />,
  },
], {basename: "/naiop_demo/build"});


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
