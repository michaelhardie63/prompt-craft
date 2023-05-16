import { Schema, model, models } from 'mongoose';

const FavouritePromptSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: Schema.Types.ObjectId,
    ref: 'Prompt',
  },
});

const FavouritePrompt = models.FavouritePrompt || model('FavouritePrompt', FavouritePromptSchema);

export default FavouritePrompt;