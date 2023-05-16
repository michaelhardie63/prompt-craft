"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
	// Current user data
	const { data: session } = useSession(); 
	const [ toggleDropdown, setToggleDropdown ] = useState(false);

	//Google & Next Auth
	const [ providers, setProviders ] = useState(null);

	useEffect(() => {
		(async () => {
		  const res = await getProviders();
		  setProviders(res);
		})();
	  }, []);

  	return (
    	<nav className="flex-between w-full mb-16 pt-3">
      		<Link href="/" className="flex gap-2 flex-center text-2xl">
				<Image 
					src="/assets/images/logo.svg"
					alt="Logo"
					width={50}
					height={50}
					className="object-contain"
				/>
				<p className="logo-text"><strong><span className="logo-style">Prompt<span className="text-black">Craft</span></span></strong></p>
      		</Link>

			{/* Desktop Navigation */}
			<div className="sm:flex hidden">
				{session?.user ? (
					<div className="flex gap-3 md:gap-5">
						<Link 
							href="/create-prompt"
							className="brand_btn">
								Create prompt
						</Link>
						<button 
							type="button" 
							onClick={signOut}
							className="outline_btn">
								Sign out
						</button>
						<Link href="/profile">
							<Image 
								src={session?.user.image}
								alt="Profile"
								width={37}
								height={37}
								className="round-full"
							/>
						</Link>
					</div>
				) : (
					<>
						{/* Allowing the providers to show their sign in buttons */}
						{providers && 
							Object.values(providers).map((provider) => (
								<button
									type="type"
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className="brand_btn">
										Sign in
								</button>
							))}
					</>
				)}
			</div>

			{/* Mobile Navigation */}
			<div className="sm:hidden flex relative">
				{session?.user ? (
					<div className="flex">
						<Image 
							src={session?.user.image}
							alt="Profile"
							width={37}
							height={37}
							className="round-full dropdown_link"
							onClick={() => setToggleDropdown((prev) => !prev)}
						/>

						{toggleDropdown && (
							<div className="dropdown">
								<Link
									href="/profile"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}>
										My Profile
								</Link>
								<Link
									href="/create-prompt"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}>
										Create Prompt
								</Link>
								<button
									type="button"
									className="mt-5 w-full black_btn"
									onClick={() => {
										setToggleDropdown(false);
										signOut();
									}}>
										Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{/* Allowing the providers to show their sign in buttons */}
						{providers && 
							Object.values(providers).map((provider) => (
								<button
									type="type"
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className="black_btn">
										Sign in
								</button>
							))}
					</>
				)}
			</div>
    	</nav>
  	)
}

export default Nav;
