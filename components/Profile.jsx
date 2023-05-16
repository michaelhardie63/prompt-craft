import { useContext, useEffect } from "react";
import { FavoriteContext } from "@context/FavoriteContext";

import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
	const { favoritePrompts } = useContext(FavoriteContext)

	useEffect(() => {
		// Fetch the user's favorite prompts from the API or database
		const fetchFavouritePrompts = async () => {
		  try {
			const response = await fetch('/api/favourite', {
			  method: 'GET',
			  // Add any necessary headers or authorization
			});
			const data = await response.json();
			setFavouritePrompts(data);
		  } catch (error) {
			console.log('Failed to fetch favourite prompts:', error);
		  }
		};
	
		fetchFavouritePrompts();
	  }, []);

  	return (
    	<section className="w-full">
			<h1 className="head_text text-left">
				<span className="purple_gradient">
					{name} Profile
				</span>
			</h1>
			<p className="desc text-left">{desc}</p>

			{/* Users prompts */}
			<div className="mt-10 prompt_layout">
				{data.map((post) => (
					<PromptCard 
						key={post._id}
						post={post}
						handleEdit={() => handleEdit && handleEdit(post)}
						handleDelete={() => handleDelete && handleDelete(post)}
					/>
				))}
			</div>

			<div className="mt-10 prompt_layout">
				{favoritePrompts.map((post) => (
					<PromptCard 
						key={post._id}
						post={post.prompt}
						isFavourite={true}
						handleEdit={() => handleEdit && handleEdit(post)}
						handleDelete={() => handleDelete && handleDelete(post)}
					/>
				))}
			</div>

			
			
    	</section>
  	)
}

export default Profile;
