=============
Installation project
=============

------------
To install:
------------

1. Creare database "testing_task_db" and import testing_task_db.sql from folder "database"

2. Add go modules by following commands:
        go get "gopkg.in/gin-contrib/cors.v1"
	go get "github.com/gin-gonic/gin"
	go get "github.com/go-sql-driver/mysql"
	go get "github.com/disintegration/imaging"

3. In folder "backend" use command:
	go run backend.go

4. In folder "frontend" use:
	npm install
	npm start



