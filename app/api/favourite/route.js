import { connectToDB } from "@utils/database";
import FavouritePrompt from "@models/favourites";

export const GET = async () => {
    try {
        await connectToDB();

        const favourites = await FavouritePrompt.find({}).populate("prompt");

        return new Response(JSON.stringify(favourites), {
            status: 200
        });
    } catch (error) {
        return new Response("Failed to fetch your favourite prompts.")
    }
}