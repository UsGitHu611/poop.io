import { Outlet } from 'react-router';

export default function Layout() {
	return (
		<div className="mx-auto min-h-screen">
			<Outlet />
		</div>
	);
}
