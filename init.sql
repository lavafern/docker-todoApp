USE mydb;

DROP TABLE IF EXISTS tasks; 

CREATE TABLE tasks (
  task_id INT NOT NULL AUTO_INCREMENT,
  task_name VARCHAR(255) NOT NULL,
  task_status INT NOT NULL DEFAULT 0,
  PRIMARY KEY (task_id)
);

-- docker container create --name mysqldb --publish 3306:3306 --env MYSQL_ROOT_PASSWORD=123456 --env MYSQL_DATABASE=mydb --env MYSQL_USER=rian --env MYSQL_PASSWORD=123456 mysql:latest