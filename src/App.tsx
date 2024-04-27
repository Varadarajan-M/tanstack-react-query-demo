import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Nav';
import EditPost from './pages/EditPost';
import PostFeed from './pages/PostFeed';
import ViewPost from './pages/ViewPost';

function App() {
	return (
		<main className='min-h-lvh h-full w-full bg-dark-blue text-white flex flex-col'>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/posts' element={<PostFeed />} />
					<Route path='/post/:id/' element={<ViewPost />} />
					<Route path='/post/:id/edit' element={<EditPost />} />
					<Route path='*' element={<Navigate to={'/posts'} replace />} />
				</Routes>
				<Toaster
					position='top-right'
					toastOptions={{
						style: {
							background: '#0b1121',
							color: '#fff',
						},
					}}
				/>
			</BrowserRouter>
		</main>
	);
}

export default App;
