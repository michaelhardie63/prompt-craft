import FavouritePrompt from "@models/favourites";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, promptId } = await request.json();

    try {
        await connectToDB();
        const newFavouritePrompt = new FavouritePrompt({ user: userId, prompt: promptId });

        await newFavouritePrompt.save();
        return new Response(JSON.stringify(newFavouritePrompt), { status: 200 });

    } catch (error) {
        return new Response("Failed to save prompt as a favourite", { status: 500 });

    }
};