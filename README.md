# Revature Project 1 React frontend + Spring backend

For this project, I created a frontend/backend service from scratch. Primarily, this application is used to login, create reimbursement tickets, and modify those tickets. The goals for the project is listed below:

### Employee User Stories
Users using the application can:
- Create an account (create new User – default role should be employee)
- Create a new Reimbursement
- See all reimbursement tickets (only their own)
- See only their pending reimbursement tickets
- [Some other functionality of your choice]
- OPTIONAL: Update the description of a pending reimbursement

### Manager User Stories
Managers using the application can:
- See all reimbursements
- See all pending reimbursements
- Resolve a reimbursement
  - (update status from PENDING to APPROVED or DENIED)
- See all Users
- Delete a User
  - (should also delete any related reimbursements)
- OPTIONAL: Update an employee’s role to manager

\*Managers can do anything Users can do. No need for role checks on User functionalities.

Users who are not logged in to the application can ONLY:
- Attempt to log in.
- Register for a new account (create new User)

Users should not be able to access the other user stories before logging in. 

## Usage:
Firstly, a SQL database of some type is needed for this app to work. I recommend using DBeaver, making a PostgreSQL server, and I already have the `application.properties` file set up already, so long as the password and username match it should connect. Afterwards, I recommend using VSCode or Intellij for running the backend, right-clicking and pressing something along the lines of 'Run with Java' on `backend/src/main/java/com/revature/project1/Project1Application.java`.\
For the frontend, go into the `/frontend` directory, run `npm install` to receive the neccessary packages, then run `npm run dev` to run the frontend. It will most likely run on `http://localhost:5173/`, and will say so if otherwise. 
