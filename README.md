This branch is live at http://miltonbecker.com:8001

# How to run:

## Dev environment:

1. `npm install`
2. `npm run dev`
3. Access http://localhost:8000

## Production environment without Docker

1. `npm install`
2. `npm run build`
3. Make sure you have a Postgres instance up and running
4. Edit the file `postgres.js` with your db info (or set the env variables accordingly)
5. `npm start`
6. Access http://localhost:8000

## Dockerized 

1. `npm install`
2. Make sure you have Docker installed
3. `npm run docker`
4. You should now have 2 docker images: milton/comment-app and milton/comment-db
5. To run the db: 
* Without keeping the db changes: `docker run -d -p 5444:5432 milton/comment-db`
* Keeping the db changes: `docker run -d -p 5444:5432 -v YourLocalPathToAnEmptyDirHere:/var/lib/postgresql/data milton/comment-db`
6. To run the app: `docker run -d -p 8000:8000 --env-file docker.env milton/comment-app`
7. Access http://localhost:8000

# Features:

* You can create and delete comments

* Adding a comment follows an optimistic approach, that is:
  * The comment gets added instantaneously 
  * Its id is temporary while the API is processing  
  * Once the API is done and responds, the comment gets its real id (the id generated by the database)  
  * The user will only be able to delete it once it gets its real id
  * If there is an error on the server side, the user is notified and that comment gets removed

* Deleting a comment also follows an optimistic approach:
  * The comment gets deleted instantaneously
  * If there is an error on the server side, the user is notified and the comments are re-fetched from the server

* npm scripts:
  * `npm start` starts the server in production mode without the webpack hooks
  * `npm run dev` starts the server with the webpack hooks
  * `npm run build` generates the production bundle
  * `npm run docker` generates the production bundle and creates the docker images
