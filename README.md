# To upgrade the project version

npm run release

This will increment the last number of the project version. It just does npm version patch

# To build a production bundle and create a docker image

npm run build

# To run the docker image

1. Please, edit the file docker.env and put your PostgreSQL credentials/config there
2. Do: docker run --env-file docker.env -d -p 8000:8000 milton/comment-app
3. Open http://localhost:8000

# Check

You can check this branch at http://miltonbecker.com:8000 
