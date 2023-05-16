import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already in use"],
        required: [true, "Email is required"],
    },
    username: {
        type: String,
        required: [true, "Please enter your username"],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 
        "Username is invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    }
});

// Look into the models.User object, see if the user already exists.
// Only if it doesn't exist, add the User

const User = models.User || model("User", UserSchema);

export default User;