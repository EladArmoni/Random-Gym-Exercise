import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Muscles, AllExercises,ErrorPage,RandomExercise } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/muscles" element={<Muscles/>} />
        <Route path="/exercises" element={<AllExercises/>} />
        <Route path="/random-exercise" element={<RandomExercise/>} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
