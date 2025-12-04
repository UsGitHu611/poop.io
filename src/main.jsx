import './index.css';
import App from './pages/App.jsx';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Layout from './layout.jsx';
import DetailNote from '@pages/DetailNote';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				element: <App />,
				index: true,
			},
			{
				path: '/:noteId',
				element: <DetailNote />,
			},
		],
	},
]);

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
