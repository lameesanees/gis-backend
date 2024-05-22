# Accident Reporting Website

Welcome to the Accident Reporting Website! This project is built using the MERN stack (MongoDB, Express, React, Node.js) and provides a platform for reporting, managing, and analyzing accident reports. The website features CRUD operations, an API for external integrations, CORS support, OTP verification using Nodemailer, and payment processing through Stripe. 

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Data Collections](#data-collections)
- [Frontend Tools](#frontend-tools)
- [Contributing](#contributing)
- [License](#license)

## Features

- **CRUD Operations:** Create, Read, Update, and Delete accident reports.
- **API:** Exposed API for external integrations.
- **CORS:** Cross-Origin Resource Sharing enabled for secure API access.
- **OTP Verification:** OTP verification implemented using Nodemailer.
- **Payment Processing:** Payments handled through Stripe.
- **Data Collections:** Over 5 data collections to manage different aspects of the application.

## Tech Stack

- **Frontend:**
  - HTML
  - Bootstrap
  - Universe
  - React
- **Backend:**
  - Node.js
  - Express
- **Database:**
  - MongoDB
- **Other:**
  - Nodemailer (for OTP verification)
  - Stripe (for payment processing)

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/accident-reporting-website.git
   cd accident-reporting-website
   ```

2. **Install backend dependencies:**
   ```sh
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```sh
   cd ../frontend
   npm install
   ```

4. **Set up environment variables:**
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   MONGO_URI=your_mongo_database_uri
   NODEMAILER_USER=your_nodemailer_email
   NODEMAILER_PASS=your_nodemailer_password
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

5. **Start the backend server:**
   ```sh
   cd backend
   npm start
   ```

6. **Start the frontend development server:**
   ```sh
   cd ../frontend
   npm start
   ```

## Usage

Once the servers are running, you can access the application at `http://localhost:5000` (or the port specified in your configuration).

## API Endpoints

The following is a list of the main API endpoints available in the application:

- **Accidents:**
  - `GET /api/accidents` - Get all accident reports
  - `POST /api/accidents` - Create a new accident report
  - `GET /api/accidents/:id` - Get a specific accident report by ID
  - `PUT /api/accidents/:id` - Update a specific accident report by ID
  - `DELETE /api/accidents/:id` - Delete a specific accident report by ID

- **Users:**
  - `POST /api/users/register` - Register a new user
  - `POST /api/users/login` - User login
  - `POST /api/users/verify-otp` - Verify OTP

- **Payments:**
  - `POST /api/payments/create-session` - Create a payment session

## Data Collections

The application uses the following main data collections:

1. **Users:** Stores user information and authentication details.
2. **Accidents:** Stores accident report details.
3. **OTP:** Stores OTP verification details.
4. **Payments:** Stores payment transaction details.
5. **Sessions:** Manages user sessions and authentication tokens.

## Frontend Tools

The frontend of the application is built using a combination of the following tools and libraries:

- **HTML:** For the structure of the web pages.
- **Bootstrap:** For responsive design and styling.
- **Universe:** Additional UI components and styling.
- **React:** For building interactive user interfaces.

## Contributing

We welcome contributions from the community! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Thank you for using the Accident Reporting Website! If you have any questions or feedback, feel free to open an issue on GitHub.
