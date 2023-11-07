Once you have the clone then do 
* npm i 

then run the server 

* npm run dev

## DATABASE

MONGODB ATLAS ACCOUNT

* copy uri link to the .env file


## PROBLEM ENDPOINTS

## LOCAL HOST 
The server url
* http://localhost:4000/

## HTTP REQUEST

(POST http request) ==>> /api/v1/problems
* Publish a problem 

(GET http request) ==>> /api/v1/problems
* display all problem.

Applied the search query in the database 
* search() ==>> search with keywords inside the "title" and "description" fields in the document.
* sort() ==>> display documents in ascending order.
* 

(GET http request) ==>> /api/v1/problem/:id
* search for a single problem 

(DELETE http request) ==>> /api/v1/problem/:id
* delete a single problem 






## SOLUTION ENDPOINTS
 (POST http request) ==>> /api/v1/solutions
 * propose a solution

 (GET http request) ==>> /api/v1/solutions
 * display all solutions in the database.

Applied the search query in the database 
* search() ==>> search with keywords inside the "title" and "description" fields in the document.
* sort() ==>> display documents in ascending order.
* 


 (GET http request) ==>> /api/v1/solution/:id
 * search for a single a solution
 
(DELETE http request)  ==>> /api/v1/solution/:id
* delete solution with id




## COMMENTS ENDPOINTS 

(POST http request) ==>> /api/v1/:solutionId/comments
 * add comments 
 * this would display the title of comment and full comments
 so you add comment to title, description , totalBudgget, successMeasure
 * ["title","description","totalBudget","successMeasure"]

 (GET http request) ==>> /api/v1/:solutionId/comments
 * display all solutions in the database.

## Auth
* jwt token was used for authenticating the user with the wallet address

## Register
<!-- (POST http request) ==>> /api/v1/auth/signup
* email,username,walletAddress.

* ===>> username is required and it unique
* ===>> wallet address is required
* ===>> email is required to signup  -->


## Login
User login  walletAdress and if it doesn't exist its create one and signin.

* "walletAddress":"ayg612eisaicbkwo9u98w"

* (POST http request) ==>> /api/v1/auth/login
   accept user 

* please note that authentication uses jsonwebtoken 
* we have protected routes only authenticated user can add and delete a problem and solution and also make upvotes


## FOR UPVOTE (protected route)
user can create and removes upvotes from problem and a propose solution

## problem upvotes
(POST http request) ==>> /api/v1/problems/problemId/create-upvote
* Add an upvote
(DELETE http request) ==>> /api/v1/problems/problemId/remove-upvote
* Remove an upvote 
(GET http request)===>> /api/v1/problems/problemId/upvotes
* return all solutions with upvotes
(GET http request) ===>> /api/v1/problems/upvotes/upvoteId
* return a single upvote 



# solution upvotes
(POST http request) ==>> /api/v1/solutions/solutionId/create-upvote
* Add an upvote
(DELETE http request) ==>> /api/v1/solutions/solutionId/remove-upvote
* Remove an upvote 
(GET http request)===>> /api/v1/solutions/solutionId/upvotes
* return all solutions with upvotes
(GET http request) ===>> /api/v1/soltuions/upvotes/upvoteId
* return a single upvote 