"use client";

import { useState, useContext } from 'react';
import { FavoriteContext } from '@context/FavoriteContext';
import { useSession, getSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

import Image from 'next/image';

import FileCopyIcon from '@mui/icons-material/FileCopy';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
	const { data: session } = useSession();
	const pathName = usePathname();
	const router = useRouter();

	const { addFavoritePrompt, removeFavoritePrompt, isPromptFavorite } =
    useContext(FavoriteContext);

	const [copied, setCopied] = useState("");
	const isFavorite = isPromptFavorite(post._id);

	const handleProfileClick = () => {
		if (post.creator._id === session?.user.id) return router.push("/profile");

		router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
	};

	const handleCopy = () => {
		setCopied(post.prompt);
		navigator.clipboard.writeText(post.prompt);
		setTimeout(() => setCopied(false), 3000);
	}

	const handleFavouriteToggle = async () => {
		if (isFavorite) {
			removeFavoritePrompt(post._id);
		} else {
			addFavoritePrompt(post);
		}

		try {
		  const session = await getSession();
	  
		  if (!session?.user?.id) {
			console.log('User is not authenticated.');
			return;
		  }
	  
		  const response = await fetch("/api/favourite/toggle-favourite", {
			method: "POST",
			body: JSON.stringify({ userId: session.user.id, promptId: post._id }),
			headers: {
			  "Content-Type": "application/json",
			  Authorization: `Bearer ${session.accessToken}`,
			},
		  });
	  
		  if (response.ok) {
			setIsFavourite(!isFavourite);
		  } else {
			console.log("Failed to toggle favourite prompt");
		  }
		} catch (error) {
		  console.log("Failed to toggle favourite prompt", error);
		}
	  };  
	  
  	return (
    	<div className="prompt_card">
			<div className="flex justify-between items-start gap-5">
				<div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
				onClick={handleProfileClick}>
					<Image 
						src={post.creator?.image}
						alt="user_image"
						width={40}
						height={40}
						className="rounded-full object-contain"
					/>

					<div className="flex flex-col">
						<h3 className="font-satoshi font-semibold text-gray-900">
							{post.creator?.username}
						</h3>
						<p className="font-inter text-sm text-gray-500">
							{post.creator?.email}
						</p>
					</div>
				</div>
				<div className="flex flex-col justify-content items-center">
					<div className="copy_btn" onClick={handleCopy}>
						{copied !== post.prompt
						? <FileCopyIcon 
							className="text-gray-400"
						/>
						: <FileDownloadDoneIcon 
							className="text-light-blue"
						/>}
					</div>
					<div className="favourite_btn mt-2" onClick={handleFavouriteToggle}>
        				{isFavorite ? (
          					<FavoriteIcon className="text-red-500" />
        				) : (
          					<FavoriteBorderIcon className="text-gray-400" />
        				)}
      				</div>
				</div>
			</div>
			<p className="my-4 font-satoshi text-sm text-gray-700">
				{post.prompt}
			</p>
			<p className="font-inter text-sm blue_gradient cursor-pointer"
			onClick={() => handleTagClick && handleTagClick(post.tag)}>
				#{post.tag}
			</p>

			{/* /* Checking if the current logged in user is the creator of the post */}
			{/* And if they are on the profile page*/}
			{session?.user.id === post.creator?._id && pathName === '/profile' && (
				<div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
					<p className="font-inter text-sm green_gradient cursor-pointer"
					onClick={handleEdit}>Edit</p>

					<p className="font-inter text-sm green_gradient cursor-pointer"
					onClick={handleDelete}>Delete</p>
							
				</div>
			)}
		</div>
  	)
}

export default PromptCard;
