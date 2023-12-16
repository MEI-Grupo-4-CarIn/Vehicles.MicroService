# Vehicles.MicroService

This is a microservice for managing vehicles, developed as part of a master's degree project. It's built with Node.js and Express.js, and uses MongoDB for data persistence. The service provides endpoints for creating, updating, retrieving, and deleting vehicle records.

## Getting Started

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/duartefernandes/Vehicles.MicroService.git
cd Vehicles.MicroService
npm install
```

Next, set up your environment variables by following the instructions in the [Environment Variables](#environment-variables) section.

Finally, start the server:

```bash
npm start
```

The server will start on port 3000, and you can make requests to the `http://localhost:3000/api` endpoint.

## Environment Variables

This project uses environment variables for configuration. To set up your local environment, follow these steps:

1. Copy the `.env.example` file and rename it to `.env`.
2. Open the `.env` file and replace the placeholder values with your actual values.

## Environment Variables

The following environment variables are used in this project:

- `MONGO_URI`: The connection string for your MongoDB database.
- `JWT_PUBLIC_KEY`: The public key used for JWT authentication.
- `SERVICE_SECRET_KEY`: The secret key used by the service.

Remember not to commit the `.env` file to the repository. This file is included in the `.gitignore` file to prevent it from being accidentally committed.

## Disclaimer

This project is part of a master's degree project and is intended for educational purposes only. It should not be used in production without further development and testing.
