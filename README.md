# Eliscops Coding Study - MERN Stack Website

A web application for studying and appering in quizes , built using the MERN (MongoDB, Express, React, Node.js) stack. This project aims to provide a platform for coding enthusiasts to learn and share their knowledge.

## PPT For better understand

# [shivam.pptx](https://github.com/Shivampatel07/FSD-INDIVIDUAL-FINAL/files/12844255/shivam.pptx)

## Demo 

https://github.com/Shivampatel07/FSD-INDIVIDUAL-FINAL/assets/102176101/56c1a33a-5823-4365-ba3c-fccaaeacd998


## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- User authentication and authorization.
- CRUD (Create, Read, Update, Delete) operations for coding resources.
- Commenting and discussion on coding resources.
- User profiles with personal details.
- A user-friendly and responsive user interface.
- Search functionality for finding coding resources.

## Technologies

- **Frontend:**
  - React
  - Redux for state management
  - React Router for routing
  - CSS (or SASS/LESS) for styling

- **Backend:**
  - Node.js with Express.js
  - MongoDB for data storage
  - Mongoose for database modeling
  - JWT for user authentication


## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager)
- MongoDB database (locally or cloud-based)
- An internet connection to access external resources and dependencies.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/eliscops-coding-study.git
2. Install server dependencies:
   ```bash 
   cd server
   npm install
3. Install client dependencies:
   ```bash
   cd ../client
   npm install
4. Set up your environment variables by creating a .env file in the server directory. Include your MongoDB connection string and JWT secret:
   ```bash
   MONGO_DB_URL=your_mongodb_uri
   HASH_PASSWORD_SALT=your_hash_password_salt
   JWT_SECRET=your_secret_key
5. Start the server:
   ```bash
   # From the server directory
   node index
6. Start the client:
   ```bash
   # From the client directory
   npm start
7. Visit "http://localhost:3000" to access the application in your web browser.

## Usage
- Sign up and log in to start exploring and sharing coding resources.
- Add coding resources, comment on others' resources, and engage in discussions.

## Contributing
- If you'd like to contribute to this project, please follow these steps:

  1. Fork the project.
  2. Create a new branch for your feature or bugfix: git checkout -b feature/your-feature-name or bugfix/your-bugfix-name.
  3. Commit your changes: git commit -m "Add feature/fix bug"
  4. Push to your branch: git push origin feature/your-feature-name.
  5. Create a Pull Request on GitHub.

```bash
import React, { useRef, useEffect } from 'react';

const AudioPlayer = ({ audioData }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const audioBuffer = context.createBuffer(2, audioData.length, context.sampleRate);

    for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
      const nowBuffering = audioBuffer.getChannelData(channel);
      for (let i = 0; i < audioBuffer.length; i++) {
        nowBuffering[i] = audioData[i];
      }
    }

    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);

    source.start();

    audioRef.current = source;

    return () => {
      if (audioRef.current) {
        audioRef.current.stop();
      }
    };
  }, [audioData]);

  return <div>Audio Player</div>;
};

export default AudioPlayer;
