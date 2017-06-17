package main

import (
	"bytes"
	"database/sql"
	"fmt"
	"net/http"
	"os"
	
	"encoding/base64"
    "strings"
    "path/filepath"

    "io/ioutil"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

func main() {

	db, err := sql.Open("mysql", "root:root@/test")
	if err != nil {
		fmt.Print(err.Error())
	}
	defer db.Close()
	err = db.Ping()
	if err != nil {
		fmt.Print(err.Error())
	}
	type Item struct {
		Id      int
		Item_id int
		Title   string
		Image   string
		Parent  int
		Level   int
		Left    int
		Right   int
	}
	type ItemPost struct {
		Id         int
		Item_id    int    `json:"item_id"`
		Title      string `json:"title"`
		Image      string `json:"image"`
		Image_name string `json:"image_name"`
		Parent     int    `json:"parent"`
		Level      int    `json:"level"`
		Children   bool   `json:"children"`
		Left       int    `json:"lft"`
		Right      int    `json:"rgt"`
	}

	router := gin.Default()

    router.GET("/getTree", func(c *gin.Context) {
		var (
			item  Item
			items []Item
		)
		rows, err := db.Query("SELECT node.id, node.item_id, node.title, node.image, node.parent, node.level, node.lft, node.rgt FROM table_2 AS node;")
		
		if err != nil {
			fmt.Print(err.Error())
		}
		for rows.Next() {
			err = rows.Scan(&item.Id, &item.Item_id, &item.Title, &item.Image, &item.Parent, &item.Level, &item.Left, &item.Right)
			items = append(items, item)
			if err != nil {
				fmt.Print(err.Error())
			}
		}
		defer rows.Close()
		c.JSON(http.StatusOK, gin.H{
			"result": items,
			"count":  len(items),
		})

	})

	router.POST("/addNode", func(c *gin.Context) {
		var json ItemPost

		c.BindJSON(&json)
		Item_id := json.Item_id
		Title := json.Title
		Image := json.Image
		Image_name := json.Image_name
		Parent := json.Parent
		Level := json.Level
		Children := json.Children
		
		idx := strings.Index(Image, ";base64,")
	    reader := base64.NewDecoder(base64.StdEncoding, strings.NewReader(Image[idx+8:]))
	    buff := bytes.Buffer{}
	    _, err := buff.ReadFrom(reader)
	    if err != nil {
	        fmt.Print(err.Error())
	    }

		Path_to_save, err := filepath.Abs("./images/" + Image_name)	
	    ioutil.WriteFile(Path_to_save, buff.Bytes(), 0644)

	    Path_to_image := "http://localhos:3050/images/" + Image_name

    	if err != nil {
           fmt.Print(err.Error())
    	}

    	if Parent == 0 {

    		stmt, err := db.Prepare("INSERT INTO table_2 (item_id, title, image, parent, level, lft, rgt) VALUES(?,?,?,?,?,?,?);")
			if err != nil {
				fmt.Print(err.Error())
			}

			_, err = stmt.Exec(Item_id, Title, Path_to_image, Parent, Level, 1, 2)
			if err != nil {
				fmt.Print(err.Error())
			}

			defer stmt.Close()

    	} else {

			if Children == true {
				var rgt int
				db.QueryRow("SELECT rgt FROM table_2 WHERE parent= ? ORDER BY item_id DESC;", Parent).Scan(&rgt)

				db.Exec("UPDATE table_2 SET rgt = rgt + 2 WHERE rgt > ?;", rgt)
				db.Exec("UPDATE table_2 SET lft = lft + 2 WHERE lft > ?;", rgt)

				stmt, err := db.Prepare("INSERT INTO table_2 (item_id, title, image, parent, level, lft, rgt) VALUES(?,?,?,?,?,?,?);")
				if err != nil {
					fmt.Print(err.Error())
				}

				_, err = stmt.Exec(Item_id, Title, Path_to_image, Parent, Level, rgt+1, rgt+2)
				if err != nil {
					fmt.Print(err.Error())
				}

				defer stmt.Close()
			} else {
				var lft int
				db.QueryRow("SELECT lft FROM table_2 WHERE item_id= ?;", Parent).Scan(&lft)

				db.Exec("UPDATE table_2 SET rgt = rgt + 2 WHERE rgt > ?;", lft)
				db.Exec("UPDATE table_2 SET lft = lft + 2 WHERE lft > ?;", lft)

				stmt, err := db.Prepare("INSERT INTO table_2 (item_id, title, image, parent, level, lft, rgt) VALUES(?,?,?,?,?,?,?);")
				if err != nil {
					fmt.Print(err.Error())
				}

				_, err = stmt.Exec(Item_id, Title, Path_to_image, Parent, Level, lft+1, lft+2)
				if err != nil {
					fmt.Print(err.Error())
				}

				defer stmt.Close()
			}
    	}

		c.JSON(200, gin.H{
			"message": fmt.Sprintf("%s successfully created", Title),
		})
	})

	router.POST("/deleteNode", func(c *gin.Context) {
		var json ItemPost

		c.BindJSON(&json)
		Item_id := json.Item_id

		var lft int
		var rgt int
		var image string
		
		db.QueryRow("SELECT image FROM table_2 WHERE item_id= ?;", Item_id).Scan(&image)

		str, err := filepath.Abs("." + image[20:])
		err = os.Remove(str)	
		if err != nil {
			fmt.Print(err.Error())
		}
		
		db.QueryRow("SELECT lft, rgt FROM table_2 WHERE item_id= ?;", Item_id).Scan(&lft, &rgt)

		width := rgt - lft + 1

		db.Exec("DELETE FROM table_2 WHERE lft BETWEEN ? AND ?;", lft, rgt)
		db.Exec("UPDATE table_2 SET rgt = rgt - ? WHERE rgt > ?;", width, rgt)
		db.Exec("UPDATE table_2 SET lft = lft - ? WHERE lft > ?;", width, rgt)

		c.JSON(200, gin.H{
			"message": fmt.Sprintf("Successfully deleted user: %d", Item_id),
		})
	})

	router.Static("/images", "./images") 

	router.Run(":3050")
}
