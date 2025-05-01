# Team Management Application

A full-stack web application for managing team members with image upload capabilities.

## Project Description

This Team Management Application allows users to:
- Add new team members with their details and profile image
- View a list of all team members
- See detailed information about individual team members

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API requests
- CSS for styling

### Backend
- Node.js with Express
- MongoDB for data storage
- Multer for file uploads

## Installation Steps

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (local installation or MongoDB Atlas)

### Backend Setup
1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create an `uploads` folder (if it doesn't exist):
   ```
   mkdir uploads
   ```

4. Start the server:
   ```
   npm start
   ```
   The server will run on http://localhost:5000

### Frontend Setup
1. Open a new terminal and navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm start
   ```
   The application will open in your browser at http://localhost:3000

## Project Structure

```
team-management-app/
├── client/                # React frontend
│   ├── public/            # Public assets
│   └── src/
│       ├── components/    # Reusable components
│       ├── pages/         # Page components
│       ├── App.js         # Main app component with routing
│       └── index.js       # Entry point
├── server/                # Node.js backend
│   ├── models/            # MongoDB schema models
│   ├── routes/            # API routes
│   ├── uploads/           # For storing uploaded images
│   └── server.js          # Entry point for backend
├── .gitignore             # Git ignore file
└── README.md              # Project documentation
```

## API Endpoints

### Members API

- **GET /api/members**  
  Returns a list of all team members.

- **GET /api/members/:id**  
  Returns details of a specific team member.

- **POST /api/members**  
  Adds a new team member.  
  Requires form data with the following fields:
  - name (required)
  - role (required)
  - email (required)
  - phone (optional)
  - bio (optional)
  - image (optional) - File upload for profile image

- **DELETE /api/members/:id**  
  Deletes a team member.

## How to Use the Application

1. Start both the backend and frontend servers as described in the installation steps.

2. Navigate to http://localhost:3000 in your web browser.

3. From the home page, you can:
   - Click "Add Member" to add a new team member
   - Click "View Members" to see all team members

4. On the "Add Member" page:
   - Fill out the form with the member's details
   - Upload a profile image (optional)
   - Click "Add Member" to save

5. On the "View Members" page:
   - See all team members in a card layout
   - Click "View Details" on any member to see more information

6. On the "Member Details" page:
   - View comprehensive information about the selected team member
   - Click "Back to Members" to return to the list view
