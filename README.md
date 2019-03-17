# resturantdishes
An Node js Server made using express, Postgres, Sequalize and Docker for resturant recommendations

Description:
Techlogies Used:

  1. Node JS ->> Express JS
  2. Database ->> PostgreSql
  3. ORM: Sequalize
  4. Docker

How To Install(Without Docker):
  1. Clone the repo
  2. Run npm install
  3. Install PostgreSql In your Machine
  4. set it's username and password
  5. Next Change configs in server/config.json file
  6. Provide your Db's Username and password
  7. Create a table on the config.json file provide same database name 
  8. Now Run Command : sequelize db:migrate on the same directory
  9. This will create the tables automatically in db
  10. Now You can register user or login.
  11. All the Password's encrypted in db so you will not able to decode by seeing db

How To Run:
  1. Run Command npm start



How To Install(With Docker):
  1. Install Docker
  2. Go to particular directory and run command : docker build -t resturantdishes .
  3. docker run -p 8181:8080 -d resturantdishes
  4. You can now access all the server on port 8181


