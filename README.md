Project Readme

Prerequisites
Make sure you have Docker installed on your machine before proceeding.

Setting Up Environment Variables
Create a .env file in the project's root based on the structure of the .env.sample file

Launching the Project
Open your terminal and navigate to the project's root.
Use the following command to launch the project with Docker Compose:
bash
```
docker-compose up
```

This will build and start the necessary containers to run the application.

Postman Testing
Once the project is up and running, import the Tp api.postman_collection.json file into Postman.
You can now perform route tests using the prepared requests in the collection.
Application Testing
To run application tests, navigate to the backend folder via the terminal:
bash
```
cd backend
```

Use the following command to execute tests with Jest:
bash
Copy code
```
npx jest
```
This will run unit tests to ensure the proper functioning of the application.

And there you go! You should now be ready to explore and contribute to this project. Feel free to delve into the code, add new features, and report any issues. Happy coding!




