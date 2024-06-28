# B2C Monorepo

## Overview

This monorepo project is designed to provide a base template for developing both backend and frontend applications using TurboRepo. The backend is built with NestJS, the frontend with NextJS, and a shared common library is used across both applications.

## Directory Structure

```
b2c/
├── apps/
│ ├── backend/ # NestJS application
│ └── frontend/ # NextJS application
├── packages/
│ └── common/ # Shared common library
├── node_modules/
├── package.json
├── turbo.json
└── ...
```

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v20.x or higher)
- **npm** (v9.x or higher)
- **Git**

## Getting Started

### Step 1: Clone the Repository

First, clone the repository to your local machine using Git:

```bash
git clone [https://github.com/your-org/b2c.git](https://github.com/Revivme/B2C.git)
cd b2c
```
### Step 2: Install Dependencies

Install the required dependencies for the project using npm or yarn. We recommend using npm for this project.

```
npm install
```

### Step 3: Set Up Environment Variables

Create a .env file in the root directory of the project and add the necessary environment variables. You can use the provided .env.example file as a reference:

```
cp .env.example .env
```

Edit the .env file to configure the required environment variables, such as database connection strings, API keys, and other settings.

### Step 4: Run the Development Server

Start the development server to run the Next.js and NestJS applications:

```
npm run dev
```

This command will start both the Next.js frontend and the NestJS backend applications.

### Step 5: Verify the Setup

Open your browser and navigate to ```http://localhost:3000``` to verify that the application is running correctly. You should see the homepage of the application.

## Running Tests

To run the tests for the project, use the following command:

```
npm run test
```

## Building the Project

To build the project for production, use the following command:

```
npm run build
```

## Troubleshooting

If you encounter any issues during the setup, refer to the following:

<ul>
<li>Check the console logs for any error messages and follow the suggested fixes.</li>
<li>Ensure all environment variables are set correctly in the .env file.</li>
<li>Make sure all dependencies are installed correctly by running npm install again.</li>
<ul>



