import FavouritePrompt from "@models/favourites";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  	const { userId, promptId } = await request.json();

  	try {
    	await connectToDB();
    	const existingFavouritePrompt = await FavouritePrompt.findOne({ user: userId, prompt: promptId });

    	if (existingFavouritePrompt) {
      	await FavouritePrompt.findOneAndDelete({ user: userId, prompt: promptId });
    	} else {
      	const newFavouritePrompt = new FavouritePrompt({ user: userId, prompt: promptId });
      	await newFavouritePrompt.save();
    	}

    	return new Response('', { status: 200 });
  	} catch (error) {
    	return new Response('Failed to toggle favourite prompt', { status: 500 });
  	}
};