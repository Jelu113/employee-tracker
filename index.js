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
        choices: ['View Departments', 'View Roles', 'View Employees'],
      },
    ])
    .then((data) => {
      console.log(data);

      if (data.user_input === 'View Departments') {
        viewDepartments();
      } else if (data.user_input === 'View Roles') {
        viewRoles();
      } else if (data.user_input === 'View Employees') {
        viewEmployees();
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

mainMenu();
