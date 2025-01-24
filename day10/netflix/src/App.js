import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import requests from './requests'; // Move this import to the top

// Lazy load components
const Header = lazy(() => import('./components/Header'));
const Banner = lazy(() => import('./components/Banner'));
const Row = lazy(() => import('./components/Row'));
const Login = lazy(() => import('./components/Login'));
const Signup = lazy(() => import('./components/Signup'));

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={
              <>
                <Banner />
                <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
                <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
                <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
                <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
                <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
              </>
            } />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;