# PromptCraft

![PromptCraft - Web App](/PromptCraft_Splash.png)

[Visit app here](https://prompt-craft-15xhukkmp-michaelhardie63.vercel.app/)

The AI Prompt App is a web application built with Next.js that allows users to sign in using their Google account and create helpful prompts for AI. Users can also search for and discover prompts shared by other users.

## Features

- User authentication using Google Sign-In
- Create and share prompts for AI
- Search and discover prompts by tag or username
- Favourite prompts and view them in the user's profile
- Edit and delete prompts owned by the user
- Responsive design for seamless user experience on different devices

## Technologies Used

- Next.js
- NextAuth.js
- MongoDB
- Mongoose
- Tailwind CSS
- Material-UI

### Installation

1. Clone the repository:
  - git clone https://github.com/your-username/ai-prompt-app.git
 
2. Navigate to the project directory:
  - cd ai-prompt-app

3. Install dependencies:
  - npm install
 
4. Set up environment variables:
Create a .env.local file in the root of the project and add the following variables:

NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
MONGODB_URI=your-mongodb-uri
Replace your-google-client-id, your-google-client-secret, and your-mongodb-uri with your own values.

5. Start the development server:
  - npm run dev

6. Open your browser and navigate to http://localhost:3000 to access the application.



