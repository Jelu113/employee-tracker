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
                    'Update Departments',
                    'Update Roles',
                    'Update Employees',
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
                case 'Update Departments':
                    updateDepartment();
                    break;
                case 'Update Roles':
                    updateRole();
                    break;
                case 'Update Employees':
                    updateEmployee();
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

const updateDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter the department ID you want to update:',
                name: 'departmentID',
            },
            {
                type: 'input',
                message: 'Enter the new department name:',
                name: 'newDepartmentName',
            },
        ])
        .then((data) => {
            const sql = 'UPDATE department SET name = ? WHERE id = ?';
            db.query(sql, [data.newDepartmentName, data.departmentID], (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Department updated successfully!');
                }
            });
        });
};

const updateRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter the role ID you want to update:',
                name: 'roleID',
            },
            {
                type: 'input',
                message: 'Enter the new title for the role:',
                name: 'newRoleTitle',
            },
            {
                type: 'input',
                message: 'Enter the new salary for the role:',
                name: 'newRoleSalary',
            },
            {
                type: 'input',
                message: 'Enter the new department ID (foreign key):',
                name: 'newDepartmentID',
            },
        ])
        .then((data) => {
            const sql = 'UPDATE role SET title = ?, salary = ?, department_id = ? WHERE id = ?';
            db.query(sql, [data.newRoleTitle, data.newRoleSalary, data.newDepartmentID, data.roleID], (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Role updated successfully!');
                }
            });
        });
};

const updateEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter the employee ID you want to update:',
                name: 'employeeID',
            },
            {
                type: 'input',
                message: 'Enter the new first name for the employee:',
                name: 'newFirstName',
            },
            {
                type: 'input',
                message: 'Enter the new last name for the employee:',
                name: 'newLastName',
            },
            {
                type: 'input',
                message: 'Enter the new role ID (foreign key) for the employee:',
                name: 'newRoleID',
            },
            {
                type: 'input',
                message: 'Enter the new manager ID for the employee:',
                name: 'newManagerID',
            },
        ])
        .then((data) => {
            const sql = 'UPDATE employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?';
            db.query(sql, [data.newFirstName, data.newLastName, data.newRoleID, data.newManagerID, data.employeeID], (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Employee updated successfully!');
                }
            });
        });
};

mainMenu();


