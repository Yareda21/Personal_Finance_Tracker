# Personal Finance Tracker

This is a **Personal Finance Tracker** application built with **Next.js**. It allows users to manage their finances by tracking income and expenses, visualizing data through charts, and setting savings goals.

## Table of Contents

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Getting Started](#getting-started)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Scripts](#scripts)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   User authentication with Firebase
-   Track income and expenses
-   Visualize financial data with charts
-   Responsive design using Tailwind CSS
-   Accessible UI components with Radix UI
-   Dark mode support

## Technologies Used

-   **Next.js**: A React framework for server-side rendering and static site generation.
-   **React**: A JavaScript library for building user interfaces.
-   **Firebase**: For authentication and database management.
-   **Tailwind CSS**: A utility-first CSS framework for styling.
-   **Radix UI**: A set of unstyled, accessible UI components.
-   **Recharts**: A composable charting library for React.

## Getting Started

To get started with the Personal Finance Tracker, follow the instructions below.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Yareda21/personal_finance_tracker
    ```

2. Navigate to the project directory:

    ```bash
    cd personal_finance_tracker
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

### Usage

1. Set up your Firebase project and add your configuration to a `.env.local` file in the root of the project:

    ```plaintext
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
    ```

2. Run the development server:

    ```bash
    npm run dev
    ```

3. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## Scripts

-   `dev`: Starts the development server.
-   `build`: Builds the application for production.
-   `start`: Starts the production server.
-   `lint`: Runs the linter to check for code quality.

## Deployed

The Personal Finance Tracker is deployed on [Vercel](https://vercel.com/). You can access the live application at:

[https://pfm-yars.vercel.app/](https://pfm-yars.vercel.app/)

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to reach out if you have any questions or need further assistance!
