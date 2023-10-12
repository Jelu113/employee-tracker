-- Insert data into the department table
INSERT INTO department (id, name)
VALUES (1, "Customer Service"),
       (2, "Youth"),
       (3, "Kids");

-- Insert data into the role table
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "CS Lead", 35000, 1),
       (2, "Youth Sales Associate", 20000, 2),
       (3, "CS Manager", 50000, 1);

-- Insert data into the employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Mark", "Smith", 1, 2),
       (2, "Jessica", "Moore", 3, NULL);
