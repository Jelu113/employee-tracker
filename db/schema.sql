DROP DATABASE IF EXISTS companyorg_db;
CREATE DATABASE companyorg_db;

USE companyorg_db;

CREATE TABLE department(
  id INT NOT NULL, 
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
); 

CREATE TABLE role(
    id INT NOT NULL PRIMARY KEY, 
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY(department_id) 
    REFERENCES department(id) 
);   

CREATE TABLE employee(
  id INT NOT NULL PRIMARY KEY, 
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY(role_id) 
  REFERENCES role(id), 
  FOREIGN KEY(manager_id) 
  REFERENCES employee(id) 
  ON DELETE SET NULL
);