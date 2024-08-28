# Portfolio Manager

A portfolio manager for beginners.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Pre-requisites
- [Node.js](https://nodejs.org/) (version 22.6.0)

## Getting Started
1. **Clone the repository:**
    ```bash
    git clone https://github.com/BastienRiv/portfoliomanager.git
    ```

2. **Install dependencies:**
    ```bash
    cd portfoliomanager/
    npm install express
    npm install mysql2
    npm install dotenv
    npm install cors
    ```

3. **Create a `.env` file:**

    In the root of your project directory, create a file named `.env` and add the following content to it:
    ```
    host=xxxx
    user=xxxx
    password=xxxx
    database=xxxx
    port=xxxx
    ```

    Replace `xxxx` with your actual database credentials.

4. **Build and run the project:**
    ```bash
    npm run start
    ```

    Navigate to `http://localhost:4001` in your web browser.

If you want to use a dockerised database, you can run `docker compose up -d` to use the database

## Pages


- `/portfolio` shows you details about your current porfolio - how many stocks you hold, their value, etc.
