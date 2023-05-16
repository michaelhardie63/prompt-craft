"use client";

import { FavoriteProvider } from '../context/FavoriteContext';
import { SessionProvider } from 'next-auth/react';

const Provider = ({ children, session }) => {
	return (
    	<SessionProvider session={session}>
			<FavoriteProvider>
      			{children}
			</FavoriteProvider>
    	</SessionProvider>
	)
}

export default Provider;
