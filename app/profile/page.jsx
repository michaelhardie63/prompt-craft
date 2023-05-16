"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile';

const MyProfile = () => {
	const router = useRouter();
	const { data: session} = useSession();

	const [ posts, setPosts ] = useState([]);

	// Fetching the prompts from user's session
	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${session?.user.id}/posts`);
			const data = await response.json();

			setPosts(data);
		}

		// Only fetch if we have the user we want to fetch them for
		if(session?.user.id) fetchPosts();
	}, [session?.user.id]);

	const handleEdit = (post) => {
		router.push(`/update-prompt?id=${post._id}`)
	}

	const handleDelete = async (post) => {
		const hasComfirmed = confirm(
			"Are you sure you want to delete this prompt?"
		);

		if(hasComfirmed) {
			try {
				await fetch(`/api/prompt/${post._id.toString()}`, {
					method: "DELETE",
				});

				const filteredPosts = posts.filter((item) => item._id !== post._id);

				setPosts(filteredPosts);
			} catch (error) {
				console.log(error);
			}
		}
	}

  return (
    	<Profile 
        	name="My"
        	desc="Welcome to you profile page"
        	data={posts}
        	handleEdit={handleEdit}
        	handleDelete={handleDelete}
    	/>
  	)
}

export default MyProfile;
