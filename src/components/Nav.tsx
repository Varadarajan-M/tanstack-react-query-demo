import { NavLink } from 'react-router-dom';

const links = [
	{
		to: '/posts',
		text: 'All Posts',
	},
];

const Nav = () => {
	return (
		<nav className='sticky z-10 p-3 px-6 top-0 h-20 w-full bg-blue-900 flex items-center justify-between'>
			<h3 className='text-xl font-bold text-yellow-500'>Tanstack Query Demo</h3>

			<ul className='flex gap-4'>
				{links.map((link) => (
					<li key={link.to}>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'text-yellow-500 underline' : 'text-white'
							}
							to={link.to}
						>
							{link.text}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Nav;
