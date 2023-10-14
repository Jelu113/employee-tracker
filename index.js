const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

// Connect to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'faq',
    database: 'companyorg_db',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the companyorg_db database.');
});

const mainMenu = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Choose an option',
                name: 'user_input',
                choices: [
                    'View Departments',
                    'View Roles',
                    'View Employees',
                    'Add Department',
                    'Add Role',
                    'Add Employee',
                ],
            },

        ])

        .then((data) => {
            switch (data.user_input) {
                case 'View Departments':
                    viewDepartments();
                    break;
                case 'View Roles':
                    viewRoles();
                    break;
                case 'View Employees':
                    viewEmployees();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
            }

        });
};

const viewDepartments = () => {
    const sql = 'SELECT * FROM department';

    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.table(result);
    });
};

const viewRoles = () => {
    const sql = 'SELECT * FROM role';

    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.table(result);
    });
};

const viewEmployees = () => {
    const sql = 'SELECT * FROM employee';

    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.table(result);
    });
};




const addDepartment = () => {

    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter the department name:',
                name: 'departmentName',
            },
        ])
        .then((data) => {
            const sql = 'INSERT INTO department (name) VALUES (?)';
            db.query(sql, [data.departmentName], (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Department added successfully!');
                }
            });
        });
}

const addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input', 
                message: 'Enter the title of the role: ',
                name: 'roleTitle',
            },
            {
                type: 'input',
                message: 'Enter the Salary of the role: ',
                name: 'roleSalary',
            },
            {
                type: 'input',
                message: 'Enter the department ID (foreign key):',
                name: 'departmentID',
            },
        ])
        .then((data) => {
            const sql = 'INSERT INTO role (title, salary, department_id) VALUES(?, ?, ?)';
            db.query(sql, [data.roleTitle, data.roleSalary, data.departmentID], (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Role added successfully!');
                }
            });
        });

}

const addEmployee = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'Enter the Employees first name:',
            name: 'firstName',
        },
        {
            type: 'input',
            message: 'Enter the Employees last name:',
            name: 'lastName',
        },
        {
            type: 'input',
            message: 'Enter the employee role ID (foreign key):',
            name: 'roleID',
        },
        {
            type: 'input',
            message: 'Enter the Employee manager ID:',
            name: 'managerID',
        },
    ])
    .then((data) => {
        const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        db.query(sql, [data.firstName, data.lastName, data.roleID, data.managerID], (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Employee added successfully!');
            }
        });
    });

}


mainMenu();


