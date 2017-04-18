I went ahead and created this branch.
It is live at http://miltonbecker.com:8001

# The changes:

* Adding a comment now follows an optimistic approach, that is:
  * The comment gets added instantaneously 
  * Its id is temporary while the API is processing
  * Once the API is done and responds, the comment gets its real id  
  * If there is an error on the server side, the user is notified and that comment gets removed

* Added feature to delete a comment

* Deleting a comment also follows an optimistic approach:
  * The comments gets deleted instantaneously
  * If there is an error on the server side, the user is notified and the comments are re-fetched from the server

* Renamed `devServer.js` to simply `server.js`

* npm script changes:
  * The `npm start` script now starts the server in production mode without the webpack hooks
  * Created a new npm script called `dev`, it starts the server with the webpack hooks
  * The `npm build` script now generates the production bundle only
  * Created new npm script called `docker`, which generates the production bundle and creates the docker image

* Reduced the bundle size - the jquery lib was being added to it unnecessarily 

* Improved the css to use color inheritance instead of setting the same color twice

* Changed some variable and function names to improve code readability 
