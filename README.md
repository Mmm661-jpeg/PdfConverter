# Fullstack PDF Converter Application

A full-stack application that allows users to upload and convert PDF files through a REST API with a React frontend and a Node.js backend. This project leverages various technologies such as **Node.js**, **React**, **MSSQL**, **Puppeteer**, **LibreOffice**, **Multer**, **Tailwind CSS**, and more to handle PDF conversion and cleanups.

## Features

- **Frontend**: Built with React and styled with Tailwind CSS.
- **Backend**: A REST API built using Node.js to handle file uploads, PDF conversion, and cleanup operations.
- **PDF Conversion**: Uses Puppeteer and LibreOffice to convert PDF files into various formats.
- **File Handling**: Handles file uploads and ensures cleanup of temporary files using Multer and a custom cleanup script.
- **CORS Support**: CORS-enabled to allow requests from the frontend.
- **Script Automation**: Automates the cleanup of temporary files.

## Tech Stack

### Frontend:
- **React** – JavaScript library for building user interfaces.
- **Tailwind CSS** – Utility-first CSS framework for designing custom UI without writing any CSS.


### Backend:
- **Node.js** – JavaScript runtime for building the backend.
- **Express.js** – Web framework for Node.js to build the REST API.
- **MSSQL** – Microsoft SQL Server for storing user and file data.
- **Multer** – Middleware for handling `multipart/form-data`, used for uploading files.
- **Puppeteer** – Headless Chrome Node.js API for PDF file conversion.
- **LibreOffice** – Open-source office suite used to convert PDF files into different formats.
- **CORS** – Middleware to handle Cross-Origin Resource Sharing for enabling communication between the frontend and backend.

### Utilities & Scripts:
- **Bash Script** (`resetGit-script.sh`) –  script to reset the environment, ensuring .env files are ignored by Git. It checks if .env is in .gitignore, removes any tracked .env files from Git, and allows for reinitializing the Git repository, providing a clean state if needed.
- **Node.js Cleanup Script** (`cleanup-converted.js`) – A script that removes temporary files generated during the PDF conversion process.


## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Mmm661-jpeg/PdfConverter.git
cd PdfConverter
````
### 2.Set up the backend (Node.js)
    cd server
    npm install

### 3.  Set up the frontend (React)
    cd client
    npm install

## Starting the development server (React)
      npm run dev
## Starting the backend server
      npm start

### Environment Variables
In the backend folder, you should create a .env file and configure your environment variables as follows:

    PORT=5000
    DB_HOST=your-db-host
    DB_USER=your-db-user
    DB_PASSWORD=your-db-password
    DB_NAME=your-db-name



