// /*console.log('Hello Wrld0')

// let x = 5;

// console.log(x)




// -- 1.- 
// */
// /*
// let a = 5;
// let b = 3;
// console.log( a+b);
// console.log( a-b);
// console.log( a*b);
// console.log( a/b);

// /*2.-*/
// /*
// let x = 10
// let r = x % 2
// if(r == 0 )
// {
//     console.log('the number is even')
// }
// else
// {
//     console.log('the number is odd')
// }

// /**3.-*/
// /*
// let n = -7
// if (n > 0)
// {
//     console.log('The number is positive')
// }
// else if (n < 0)
// {
//     console.log('THe number is negative')
// }
// else
// {
//     console.log('The number is zero')
// }
// /*4.- */
// /*
// let y = 15
// if(y > 10 & y < 20)
// {
//     console.log('THe number is in range')
// }    
// else
// {
//     console.log(' The number is out of range')
// }

// */


// /*5.- */
// /*
// let suma = 0

// for(i=0; i <= 20; i++)
// {
//      o = i % 2
//     if(o ==  0 )
//     {
//         suma += i;
//         console.log(suma)
//     }
//     else
//     {
//         continue
//     }
// }
//     */

// /*6.-*/

// /*
// let suma = 0

// for(i=0; i <= 20; i++)
// {
//      o = i % 2
//     if(o !=  0 )
//     {
//          continue
//     }
//     else
//     {
//         suma += i;
//         console.log(suma)
//     }

// }
//     */

// /*6.-*/
// /*
// let co = 1
// switch(co)
// {
//     case 1:
//         console.log('')
// }
//         */
       
// /*
// function authenticateUser(user, password)
// {
//     if(user == 'admin' & password == 'password123')
//     {
//         objecto = {authenticated: true }   
//     }
//     else
//     {
//         objecto = { authenticated: false }
//     }
//     return objecto.authenticated
// }

// retorno = authenticateUser('admin', 'password123')

// console.log(retorno)
// */

// /* 2.-
// */

// /*

// function parseQueryString(name='John',age=30,city='NewYork')
// {
//     objeto = {nombre: name, edad: age, ciudad:city}
//     return objeto
// }

// retorno = parseQueryString()

// console.log(retorno.nombre, retorno.edad, retorno.ciudad)
// */
// /*

// var hhtp = require("hhtp");
// hhtp.createServer(function(request, response
//     {
//         response.writeHead(200, {'Content-TYpe': 'text/plain'});
//         response.end('Hello World')
//     }
// ))
//     */


// /* Run my first server
// const http = require('http');

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello, World!\n');
// });

// const port = 3000;
// server.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}/`);
// });

// */



// /* MY first connection with mysql*/

// /*
// const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'pubs',
//   password: 'c0nygre'

// });

// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL database!');
// });

// connection.query('SELECT * FROM authors', (error, results, fields) => {
//     if (error) throw error;
//     console.log(results);
//   });
//   */

// /*

  
//   const http = require('http');
// const url = require('url');
// const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'c0nygre',
//   database: 'pubs'
// });

// const server = http.createServer((req, res) => {
//   const parsedUrl = url.parse(req.url, true);

//   switch (req.method) {
//     case 'GET':
//       if (parsedUrl.pathname === '/') {
//         handleGetRequest(res);
//       } else {
//         sendResponse(res, 404, 'Not Found');
//       }
//       break;
//     default:
//       sendResponse(res, 404, 'Not Found');
//   }
// });

// const port = 3000;
// server.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}/`);
// });

// function handleGetRequest(res) {
//   connection.query('SELECT * FROM authors', (error, results, fields) => {
//     if (error) throw error;

//     const html = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>User Data</title>
//         </head>
//         <body>
//           <h1>User Data</h1>
//           <table>
//             <tr>
//               <th>Name</th>
//             </tr>
//             ${results.map(user => `
//               <tr>
//                 <td>${user.au_lname}</td>
//               </tr>
//             `).join('')}
//           </table>
//         </body>
//       </html>
//     `;

//     sendResponse(res, 200, html);
//   });
// }

// function sendResponse(res, statusCode, content) {
//   res.statusCode = statusCode;
//   res.setHeader('Content-Type', 'text/html');
//   res.end(content);
// }

// */

// /*
// const http = require("http");
// const mysql = require("mysql2/promise");
 
 
// async function inicializar() {
 
// // Create the connection to database
// const connection = await mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'pubs',
//     password:'c0nygre'
//   });
 
//   http.createServer(async(req,res)=> {      
//          res.writeHead(200, {'Content-Type': 'text/plain'});
 
//          const statement = await connection.prepare("SELECT * FROM authors LIMIT 10");
//         const result = await statement.execute();
//         const autores = result[0];
 
//          res.end(JSON.stringify(autores));
//   }).listen(3000);
// }
 
// inicializar();

// */


// /*


// /* FUnciones asincronas*/

// /*1.-*/

// /*
// function delayedGreeting(name, delay) {
//   return new Promise((resolver) => {
//     setTimeout(() => {
//       console.log(`¡Hola, ${name}!`);
//       resolver(name);
//     }, delay);
//   });
// }

// delayedGreeting("Alice", 2000)
//   .then((name) => {
//     console.log("¡Saludo enviado!" + name);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });



//   /*2.-*/
// /*
//   fetch('https://jsonplaceholder.typicode.com/todos/1')
//   .then(response => response.json())
//   .then(data => {
//     console.log('Datos recibidos:', data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
//   */

// /*


// const http = require('http');
// const url = require('url');
// const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'c0nygre',
//   database: 'portfolio'
// });

// const server = http.createServer((req, res) => {
//   const parsedUrl = url.parse(req.url, true);

//   switch (req.method) {
//     case 'GET':
//       if (parsedUrl.pathname === '/') {
//         handleGetRequest(res);
//       } else {
//         sendResponse(res, 404, 'Not Found');
//       }
//       break;
//     default:
//       sendResponse(res, 404, 'Not Found');
//   }
// });

// const port = 3000;
// server.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}/`);
// });

// function handleGetRequest(res) {
//   connection.query('SELECT * FROM authors', (error, results, fields) => {
//     if (error) throw error;

//     const html = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>User Data</title>
//         </head>
//         <body>
//           <h1>User Data</h1>
//           <table>
//             <tr>
//               <th>Name</th>
//             </tr>
//             ${results.map(user => `
//               <tr>
//                 <td>${user.au_lname}</td>
//               </tr>
//             `).join('')}
//           </table>
//         </body>
//       </html>
//     `;

//     sendResponse(res, 200, html);
//   });
// }

// function sendResponse(res, statusCode, content) {
//   res.statusCode = statusCode;
//   res.setHeader('Content-Type', 'text/html');
//   res.end(content);
// }

// */




// /*EXERCISES FROM OOP*/

// /*1.- */
// /*
// class Animal {
//   constructor(name) {
//     this._name = name;
//   }

//   get name() {
//     return this._name;
//   }

//   speak() {
//     console.log(`${this._name} makes a noise`);
//   }
// }
// */

// /*2.-*/
// /*
// class Dog extends Animal {
//   speak() {
//     console.log(`${this._name} barks.`);
//   }
// }

// // Example usage
// var leon = new Dog('Stitt');
// leon.speak(); // Output: Stitt barks.

// */
// /*3.-*/
// /*
// class Counter {
//   #count = 0;

//   increment() {
//     this.#count++;
//   }

//   decrement() {
//     this.#count--;
//   }

//   getCount() {
//     return this.#count;
//   }
// }

// // Example usage
// const myCounter = new Counter();
// console.log(myCounter.getCount()); // Output: 0

// myCounter.increment();
// console.log(myCounter.getCount()); // Output: 1

// myCounter.decrement();
// console.log(myCounter.getCount()); // Output: 0
// */

// /*4.- */
// /*
// class MathUtilities {
//   static add(a, b) {
//     return a + b;
//   }

//   static multiply(a, b) {
//     return a * b;
//   }
// }

// // Example usage
// console.log(MathUtilities.add(2, 3)); // Output: 5
// console.log(MathUtilities.multiply(4, 5)); // Output: 20
// */
// /*5.-*/

// /*
// class Singleton {
//   static #instance = null;

//   constructor() {
//     if (Singleton.#instance) {
//       return Singleton.#instance;
//     }
//     Singleton.#instance = this;
//   }

//   static getInstance() {
//     if (!Singleton.#instance) {
//       Singleton.#instance = new Singleton();
//     }
//     return Singleton.#instance;
//   }
// }

// // Example usage
// const instance1 = new Singleton();
// const instance2 = new Singleton();

// console.log(instance1 === instance2); // Output: true
// console.log(Singleton.getInstance() === instance1); // Output: true
// */

// /*Exercises of generator */
// /*1.-*/    
// /*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
// function* generateNumbers() {
//   for (let i = 1; i <= 5; i++) {
//     yield i;
//   }
// }

// // Example usage
// const numberGenerator = generateNumbers();

// console.log(numberGenerator.next().value); // Output: 1
// console.log(numberGenerator.next().value); // Output: 2
// console.log(numberGenerator.next().value); // Output: 3
// console.log(numberGenerator.next().value); // Output: 4
// console.log(numberGenerator.next().value); // Output: 5
// console.log(numberGenerator.next().value); // Output: undefined
// */

// /*2.-*/
// /*
// function* generateEvenNumbers() {
//   let currentNumber = 0;
//   while (true) {
//     yield currentNumber;
//     currentNumber += 2;
//   }
// }

// // Example usage
// const evenNumberGenerator = generateEvenNumbers();
// let currentValue = evenNumberGenerator.next().value;

// while (currentValue !== undefined) {
//   console.log(currentValue);
//   currentValue = evenNumberGenerator.next().value;
// }

// */
// /*3.-*/


// /*
// function* customSequence(startValue, incrementValue) {
//   let currentValue = startValue;
//   while (true) {
//     yield currentValue;
//     currentValue += incrementValue;
//   }
// }

// // Example usage
// const sequence = customSequence(40, 5);

// console.log(sequence.next().value); // Output: 40
// console.log(sequence.next().value); // Output: 45
// console.log(sequence.next().value); // Output: 50
// console.log(sequence.next().value); // Output: 55
// // The sequence continues indefinitely
// */

// /*4.- */
// // Generator function to generate a sequence of numbers up to a given value


// /*
// function* generateSequence(maxValue) {
//   let currentValue = 0;
//   while (currentValue <= maxValue) {
//     yield currentValue;
//     currentValue++;
//   }
// }

// // Generator function to filter out odd numbers from a sequence
// function* filterOddNumbers(sequence) {
//   for (const value of sequence) {
//     if (value % 2 === 0) {
//       yield value;
//     }
//   }
// }

// // Example usage
// const sequence = generateSequence(10);
// const evenNumbers = filterOddNumbers(sequence);

// console.log(Array.from(sequence)); // Output: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// console.log(Array.from(evenNumbers)); // Output: [0, 2, 4, 6, 8, 10]

// */
// /*5.-*/



// /*Exercises de pagina  */

// // import http from 'http';
// // import mysql from 'mysql2';
// // import express from 'express'

// // const connection = mysql.createConnection({
// //   host: 'localhost',
// //   user: 'root',
// //   password: 'c0nygre',
// //   database: 'pubs',
// //   port: 3306
// // });

// // connection.connect((err) => {
// //   if (err) {
// //     console.error('Error connecting to the database:', err.stack);
// //     return;
// //   }
// //   console.log('Connected to the database');
// // });



// // const app = express()

// // app.get('/', function (req, res) {
// //   res.send('Hello World')
// // })

// // app.listen(3001)







// // const server = http.createServer((req, res) => {
// //   if (req.url === '/users') {
// //     connection.query('SELECT * FROM authors', (error, results, fields) => {
// //       if (error) {
// //         res.statusCode = 500;
// //         res.setHeader('Content-Type', 'text/plain');
// //         res.end('Database query error\n');
// //         return;
// //       }

// //       res.statusCode = 200;
// //       res.setHeader('Content-Type', 'application/json');
// //       res.end(JSON.stringify(results));
// //     });
// //   } else {
// //     res.statusCode = 404;
// //     res.setHeader('Content-Type', 'text/plain');
// //     res.end('Not Found\n');
// //   }
// // });

// // server.listen(3000, '127.0.0.1', () => {
// //   console.log('Server running at http://127.0.0.1:3000/');
// // });

// // import mysql from 'mysql2';
// // import express from 'express'

// // const connection = mysql.createConnection({
// //   host: 'localhost',
// //   user: 'root',
// //   password: 'c0nygre',
// //   database: 'pubs',
// //   port: 3306
// // });

// // connection.connect((err) => {
// //   if (err) {
// //     console.error('Error connecting to the database:', err.stack);
// //     return;
// //   }
// //   console.log('Connected to the database');
// // });

// // const app = express()

// // app.get('/authors/', function (req, res)
// // {
// //   connection.query('SELECT * FROM authors', (error, results, fields) => {
// //     if (error) {
// //       res.status(500).json({ error: 'Database query error' });
// //     } else {
// //       res.json(results);
// //     }
// //   });
// // })

// // // Catch-all route to handle any other requests
// // app.use((req, res) => {
// //   res.status(404).json({ error: 'Not found' });
// // });

// // app.listen(3001, () => {
// //   console.log('Server running at http://localhost:3001/');
// // });





// // import mysql from 'mysql2';
// // import express from 'express'

// // const connection = mysql.createConnection({
// //   host: 'localhost',
// //   user: 'root',
// //   password: 'c0nygre',
// //   database: 'pubs',
// //   port: 3306
// // });

// // connection.connect((err) => {
// //   if (err) {
// //     console.error('Error connecting to the database:', err.stack);
// //     return;
// //   }
// //   console.log('Connected to the database');
// // });

// // const app = express()

// // app.get('/employees/', function (req, res)
// // {
// //   const query = `
// //     SELECT emp.emp_id, emp.fname, emp.lname, job.job_desc
// //     FROM pubs.employee AS emp
// //     JOIN pubs.jobs AS job ON emp.job_id = job.job_id
// //   `;

// //   connection.query(query, (error, results, fields) => {
// //     if (error) {
// //       console.error('Database query error:', error);
// //       res.status(500).json({ error: 'Database query error' });
// //     } else {
// //       res.json(results);
// //     }
// //   });
// // })

// // // Catch-all route to handle any other requests
// // app.use((req, res) => {
// //   res.status(404).json({ error: 'Not found' });
// // });

// // app.listen(3001, () => {
// //   console.log('Server running at http://localhost:3001/');
// // });


// // import mysql from 'mysql2';
// // import express from 'express'

// // const connection = mysql.createConnection({
// //   host: 'localhost',
// //   user: 'root',
// //   password: 'c0nygre',
// //   database: 'pubs',
// //   port: 3306
// // });

// // connection.connect((err) => {
// //   if (err) {
// //     console.error('Error connecting to the database:', err.stack);
// //     return;
// //   }
// //   console.log('Connected to the database');
// // });

// // const app = express()

// // app.get('/employees/', function (req, res)
// // {
// //   const query = `
// //     SELECT emp.emp_id, emp.fname, emp.lname, job.job_desc
// //     FROM pubs.employee AS emp
// //     JOIN pubs.jobs AS job ON emp.job_id = job.job_id
// //   `;

// //   connection.query(query, (error, results, fields) => {
// //     if (error) {
// //       console.error('Database query error:', error);
// //       res.status(500).json({ error: 'Database query error' });
// //     } else {
// //       res.json(results);
// //     }
// //   });
// // })

// // // Update the job_lvl for the employee with emp_id 'A-C71970F'
// // // app.put('/employees/A-C71970F', (req, res) => {
// // //   const query = `
// // //     UPDATE pubs.employee
// // //     SET emp_id = 'A-C71970F', fname = 'Aria', minit = 'M', lname = 'Cruz', job_id = '10', job_lvl = '87', salary = '1389', hire_date = '1991-10-26'
// // //     WHERE emp_id = 'A-C71970F'
// // //   `;

// // //   connection.query(query, (error, results, fields) => {
// // //     if (error) {
// // //       console.error('Database query error:', error);
// // //       res.status(500).json({ error: 'Database query error' });
// // //     } else {
// // //       if (results.affectedRows === 1) {
// // //         res.json({ message: 'Employee updated successfully' });
// // //       } else {
// // //         res.status(404).json({ error: 'Employee not found' });
// // //       }
// // //     }
// // //   });
// // // });

// // // Catch-all route to handle any other requests
// // app.use((req, res) => {
// //   res.status(404).json({ error: 'Not found' });
// // });

// // app.listen(3001, () => {
// //   console.log('Server running at http://localhost:3001/');
// // });

// // import mysql from 'mysql2';
// // import express from 'express'

// // const connection = mysql.createConnection({
// //   host: 'localhost',
// //   user: 'root',
// //   password: 'c0nygre',
// //   database: 'pubs',
// //   port: 3306
// // });

// // connection.connect((err) => {
// //   if (err) {
// //     console.error('Error connecting to the database:', err.stack);
// //     return;
// //   }
// //   console.log('Connected to the database');
// // });

// // const app = express()

// // app.get('/employees/', function (req, res)
// // {
// //   const query = `
// //     SELECT emp.emp_id, emp.fname, emp.lname, job.job_desc
// //     FROM pubs.employee AS emp
// //     JOIN pubs.jobs AS job ON emp.job_id = job.job_id
// //   `;

// //   connection.query(query, (error, results, fields) => {
// //     if (error) {
// //       console.error('Database query error:', error);
// //       res.status(500).json({ error: 'Database query error' });
// //     } else {
// //       res.json(results);
// //     }
// //   });
// // })

// // app.get('/authors/', function (req, res)
// // {
// //   const { city, state } = req.query;
// //   let query = `
// //     SELECT a.au_id, a.au_fname, a.au_lname, a.city, a.state
// //     FROM pubs.authors a
// //   `;

// //   if (city && state) {
// //     query += `
// //       WHERE a.city = ? AND a.state = ?
// //     `;
// //     connection.query(query, [city, state], (error, results, fields) => {
// //       if (error) {
// //         console.error('Database query error:', error);
// //         res.status(500).json({ error: 'Database query error' });
// //       } else {
// //         res.json(results);
// //       }
// //     });
// //   } else {
// //     connection.query(query, (error, results, fields) => {
// //       if (error) {
// //         console.error('Database query error:', error);
// //         res.status(500).json({ error: 'Database query error' });
// //       } else {
// //         res.json(results);
// //       }
// //     });
// //   }
// // })

// // // Catch-all route to handle any other requests
// // app.use((req, res) => {
// //   res.status(404).json({ error: 'Not found' });
// // });

// // app.listen(3001, () => {
// //   console.log('Server running at http://localhost:3001/');
// // });




// // import mysql from 'mysql2';
// // import express from 'express'

// // const connection = mysql.createConnection({
// //   host: 'localhost',
// //   user: 'root',
// //   password: 'c0nygre',
// //   database: 'pubs',
// //   port: 3306
// // });

// // connection.connect((err) => {
// //   if (err) {
// //     console.error('Error connecting to the database:', err.stack);
// //     return;
// //   }
// //   console.log('Connected to the database');
// // });

// // const app = express()

// // app.get('/employees/', function (req, res)
// // {
// //   const query = `
// //     SELECT emp.emp_id, emp.fname, emp.lname, job.job_desc
// //     FROM pubs.employee AS emp
// //     JOIN pubs.jobs AS job ON emp.job_id = job.job_id
// //   `;

// //   connection.query(query, (error, results, fields) => {
// //     if (error) {
// //       console.error('Database query error:', error);
// //       res.status(500).json({ error: 'Database query error' });
// //     } else {
// //       res.json(results);
// //     }
// //   });
// // })

// // // Catch-all route to handle any other requests
// // app.use((req, res) => {
// //   res.status(404).json({ error: 'Not found' });
// // });

// // app.listen(3001, () => {
// //   console.log('Server running at http://localhost:3001/');
// // });


// // import mysql from 'mysql2';
// // import express from 'express'

// // const connection = mysql.createConnection({
// //   host: 'localhost',
// //   user: 'root',
// //   password: 'c0nygre',
// //   database: 'pubs',
// //   port: 3306
// // });

// // connection.connect((err) => {
// //   if (err) {
// //     console.error('Error connecting to the database:', err.stack);
// //     return;
// //   }
// //   console.log('Connected to the database');
// // });

// // const app = express()

// // app.get('/employees/', function (req, res)
// // {
// //   const query = `
// //     SELECT emp.emp_id, emp.fname, emp.lname, job.job_desc
// //     FROM pubs.employee AS emp
// //     JOIN pubs.jobs AS job ON emp.job_id = job.job_id
// //   `;

// //   connection.query(query, (error, results, fields) => {
// //     if (error) {
// //       console.error('Database query error:', error);
// //       res.status(500).json({ error: 'Database query error' });
// //     } else {
// //       res.json(results);
// //     }
// //   });
// // })

// // // Update the job_lvl for the employee with emp_id 'A-C71970F'
// // // app.put('/employees/A-C71970F', (req, res) => {
// // //   const query = `
// // //     UPDATE pubs.employee
// // //     SET emp_id = 'A-C71970F', fname = 'Aria', minit = 'M', lname = 'Cruz', job_id = '10', job_lvl = '87', salary = '1389', hire_date = '1991-10-26'
// // //     WHERE emp_id = 'A-C71970F'
// // //   `;

// // //   connection.query(query, (error, results, fields) => {
// // //     if (error) {
// // //       console.error('Database query error:', error);
// // //       res.status(500).json({ error: 'Database query error' });
// // //     } else {
// // //       if (results.affectedRows === 1) {
// // //         res.json({ message: 'Employee updated successfully' });
// // //       } else {
// // //         res.status(404).json({ error: 'Employee not found' });
// // //       }
// // //     }
// // //   });
// // // });

// // // Catch-all route to handle any other requests
// // app.use((req, res) => {
// //   res.status(404).json({ error: 'Not found' });
// // });

// // app.listen(3001, () => {
// //   console.log('Server running at http://localhost:3001/');
// // });



// /*
// import mysql from 'mysql2';
// import express from 'express'

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'c0nygre',
//   database: 'pubs',
//   port: 3306
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err.stack);
//     return;
//   }
//   console.log('Connected to the database');
// });

// const app = express()

// app.get('/employees/', function (req, res)
// {
//   const query = `
//     SELECT emp.emp_id, emp.fname, emp.lname, job.job_desc
//     FROM pubs.employee AS emp
//     JOIN pubs.jobs AS job ON emp.job_id = job.job_id
//   `;

//   connection.query(query, (error, results, fields) => {
//     if (error) {
//       console.error('Database query error:', error);
//       res.status(500).json({ error: 'Database query error' });
//     } else {
//       res.json(results);
//     }
//   });
// })

// app.get('/authors/', function (req, res)
// {
//   const { city, state } = req.query;
//   let query = `
//     SELECT a.au_id, a.au_fname, a.au_lname, a.city, a.state
//     FROM pubs.authors a
//   `;

//   if (city && state) {
//     query += `
//       WHERE a.city = ? AND a.state = ?
//     `;
//     connection.query(query, [city, state], (error, results, fields) => {
//       if (error) {
//         console.error('Database query error:', error);
//         res.status(500).json({ error: 'Database query error' });
//       } else {
//         res.json(results);
//       }
//     });
//   } else {
//     connection.query(query, (error, results, fields) => {
//       if (error) {
//         console.error('Database query error:', error);
//         res.status(500).json({ error: 'Database query error' });
//       } else {
//         res.json(results);
//       }
//     });
//   }
// })

// app.put('/titles/:title_id', (req, res) => {
//   const { title_id } = req.params;
//   const { price } = req.query;

//   const query = `
//     UPDATE pubs.titles
//     SET price = ?
//     WHERE title_id = ? AND price < ?
//   `;

//   connection.query(query, [price, title_id, price], (error, results, fields) => {
//     if (error) {
//       console.error('Database query error:', error);
//       res.status(500).json({ error: 'Database query error' });
//     } else {
//       if (results.affectedRows === 1) {
//         res.json({ message: 'Title price updated successfully' });
//       } else {
//         res.status(404).json({ error: 'Title not found or does not meet the minimum price criteria' });
//       }
//     }
//   });
// });

// // Catch-all route to handle any other requests
// app.use((req, res) => {
//   res.status(404).json({ error: 'Not found' });
// });

// app.listen(3001, () => {
//   console.log('Server running at http://localhost:3001/');
// });
// */



// // export function isPalindrome(str)
// // {
// //   const cleaned = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCAse();
// //   return cleaned === cleaned.split('').reverse().join('');
// // }

// // export function add(a,b)
// // {
// //   return a+b;
// // }

// // export function subtract(a,b)
// // {
// //   return a - b;
// // }

// // export function multiply(a,b)
// // {
// //   return a*b;
// // }

// // export function divide(a,b)
// // {
// //   if (b === 0) throw new Error('CAnnot divide by zero')
// //     return a/ b;
// // }


// import mysql from 'mysql2';
// // import express from 'express'

// // const connection = mysql.createConnection({
// //   host: 'localhost',
// //   user: 'root',
// //   password: 'c0nygre',
// //   database: 'pubs',
// //   port: 3306
// // });

// // connection.connect((err) => {
// //   if (err) {
// //     console.error('Error connecting to the database:', err.stack);
// //     return;
// //   }
// //   console.log('Connected to the database');
// // });

// // const app = express()

// // app.get('/employees/', function (req, res)
// // {
// //   const query = `
// //     SELECT emp.emp_id, emp.fname, emp.lname, job.job_desc
// //     FROM pubs.employee AS emp
// //     JOIN pubs.jobs AS job ON emp.job_id = job.job_id
// //   `;

// //   connection.query(query, (error, results, fields) => {
// //     if (error) {
// //       console.error('Database query error:', error);
// //       res.status(500).json({ error: 'Database query error' });
// //     } else {
// //       res.json(results);
// //     }
// //   });
// // })

// // // Catch-all route to handle any other requests
// // app.use((req, res) => {
// //   res.status(404).json({ error: 'Not found' });
// // });

// // app.listen(3001, () => {
// //   console.log('Server running at http://localhost:3001/');
// // });


// import mysql from 'mysql2/promise';
// import express from 'express';
// import { Chart } from 'chart.js/auto';

// const connection = await mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'c0nygre',
//   database: 'pubs',
//   port: 3306
// });

// const app = express();

// // Middleware para manejar las rutas
// const dashboardRouter = express.Router();

// // Ruta para obtener el dashboard
// dashboardRouter.get('/', async (req, res) => {
//   try {
//     const { city, state } = req.query;
//     let query = `
//       SELECT emp.emp_id, job.job_desc
//       FROM pubs.employee AS emp
//       JOIN pubs.jobs AS job ON emp.job_id = job.job_id
//     `;

//     const params = [];
//     if (city && state) {
//       query += `WHERE emp.city = ? AND emp.state = ?`;
//       params.push(city, state);
//     }

//     const [results] = await connection.query(query, params);

//     // Contar la cantidad de IDs por cada trabajo
//     const jobCounts = {};
//     results.forEach((employee) => {
//       const jobDesc = employee.job_desc;
//       if (jobCounts[jobDesc]) {
//         jobCounts[jobDesc]++;
//       } else {
//         jobCounts[jobDesc] = 1;
//       }
//     });

//     // Crear el HTML del dashboard
//     let html = `
//       <h1>Dashboard</h1>
//       <canvas id="myChart"></canvas>
//       <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
//       <script>
//         const ctx = document.getElementById('myChart').getContext('2d');
//         const myChart = new Chart(ctx, {
//           type: 'bar',
//           data: {
//             labels: ${JSON.stringify(Object.keys(jobCounts))},
//             datasets: [{
//               label: 'Cantidad de IDs',qq
//               qq
//               data: ${JSON.stringify(Object.values(jobCounts))},
//               backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//               ],
//               borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//               ],
//               borderWidth: 1
//             }]
//           },
//           options: {
//             scales: {
//               y: {
//                 beginAtZero: true
//               }
//             }
//           }
//         });
//       </script>
//     `;

//     res.send(html);
//   } catch (error) {
//     console.error('Database query error:', error);
//     res.status(500).json({ error: 'Database query error' });
//   }
// });

// // Usar el router en la aplicación
// app.use('/dashboard', dashboardRouter);

// // Catch-all route to handle any other requests
// app.use((req, res) => {
//   res.status(404).json({ error: 'Not found' });
// });

// app.listen(3001, () => {
//   console.log('Server running at http://localhost:3001/');
// });


// import mysql from 'mysql2/promise';
// import express from 'express';
// import { Chart } from 'chart.js/auto';

// const connection = await mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'c0nygre',
//   database: 'portfolio',
//   port: 3306
// });

// const app = express();

// // Middleware para manejar las rutas
// const financePageRouter = express.Router();

// // Ruta para obtener la página de finanzas
// financePageRouter.get('/', async (req, res) => {
//   try {
//     const { id_company } = req.query;
//     let query = `
//       SELECT sdate, adj_close
//       FROM stocks
//       WHERE id_company = ?
//     `;

//     const [results] = await connection.query(query, [id_company]);

//     // Crear los datos para el gráfico de línea
//     const labels = results.map((row) => row.sdate);
//     const data = results.map((row) => row.adj_close);

//     // Crear el HTML de la página de finanzas
//     let html = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>Finance Page</title>
//         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
//       </head>
//       <body>
//         <div class="container my-5">
//           <h1 class="mb-4">Finance Page</h1>
//           <div class="row">
//             <div class="col-md-8">
//               <canvas id="myChart"></canvas>
//             </div>
//             <div class="col-md-4">
//               <div class="card">
//                 <div class="card-body">
//                   <h5 class="card-title">Stock Information</h5>
//                   <p class="card-text">Company ID: ${id_company}</p>
//                   <p class="card-text">Latest Adjusted Close: ${data[data.length - 1]}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
//         <script>
//           const ctx = document.getElementById('myChart').getContext('2d');
//           const myChart = new Chart(ctx, {
//             type: 'line',
//             data: {
//               labels: ${JSON.stringify(labels)},
//               datasets: [{
//                 label: 'Adjusted Close',
//                 data: ${JSON.stringify(data)},
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 borderWidth: 1
//               }]
//             },
//             options: {
//               scales: {
//                 y: {
//                   beginAtZero: false
//                 }
//               }
//             }
//           });
//         </script>
//       </body>
//       </html>
//     `;

//     res.send(html);
//   } catch (error) {
//     console.error('Database query error:', error);
//     res.status(500).json({ error: 'Database query error' });
//   }
// });

// // Usar el router en la aplicación
// app.use('/finance', financePageRouter);

// // Catch-all route to handle any other requests
// app.use((req, res) => {
//   res.status(404).json({ error: 'Not found' });
// });

// app.listen(3001, () => {
//   console.log('Server running at http://localhost:3001/');
// });





// import mysql from 'mysql2/promise';
// import express from 'express';
// import { Chart } from 'chart.js/auto';

// const connection = await mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'c0nygre',
//   database: 'portfolio',
//   port: 3306
// });

// const app = express();

// // Middleware para manejar las rutas
// const financePageRouter = express.Router();

// // Ruta para obtener la página de finanzas
// financePageRouter.get('/', async (req, res) => {
//   try {
//     const { id_company } = req.query;
//     let query = `
//       SELECT sdate, adj_close
//       FROM stocks
//       WHERE id_company = ?
//     `;

//     const [results] = await connection.query(query, [id_company]);

//     // Crear los datos para el gráfico de línea
//     const labels = results.map((row) => row.sdate);
//     const data = results.map((row) => row.adj_close);

//     // Crear el HTML de la página de finanzas
//     let html = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>Finance Page</title>
//         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
//       </head>
//       <body>
//         <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
//           <div class="container">
//             <a class="navbar-brand" href="#">Finance Page</a>
//             <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//               <span class="navbar-toggler-icon"></span>
//             </button>
//             <div class="collapse navbar-collapse" id="navbarNav">
//               <ul class="navbar-nav ms-auto">
//                 <li class="nav-item">
//                   <a class="nav-link" href="#">Home</a>
//                 </li>
//                 <li class="nav-item">
//                   <a class="nav-link" href="#">About</a>
//                 </li>
//                 <li class="nav-item">
//                   <a class="nav-link" href="#">Contact</a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>

//         <div class="container my-5">
//           <div class="row">
//             <div class="col-md-8">
//               <h2 class="mb-4">Stock Chart</h2>
//               <canvas id="myChart"></canvas>
//             </div>
//             <div class="col-md-4">
//               <h2 class="mb-4">Stock Information</h2>
//               <div class="card">
//                 <div class="card-body">
//                   <h5 class="card-title">Company ID: ${id_company}</h5>
//                   <p class="card-text">Latest Adjusted Close: ${data[data.length - 1]}</p>
//                   <a href="#" class="btn btn-primary">View More</a>
//                   <a href="#" class="btn btn-secondary">Download Data</a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
//         <script>
//           const ctx = document.getElementById('myChart').getContext('2d');
//           const myChart = new Chart(ctx, {
//             type: 'line',
//             data: {
//               labels: ${JSON.stringify(labels)},
//               datasets: [{
//                 label: 'Adjusted Close',
//                 data: ${JSON.stringify(data)},
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 borderWidth: 1
//               }]
//             },
//             options: {
//               scales: {
//                 y: {
//                   beginAtZero: false
//                 }
//               }
//             }
//           });
//         </script>
//       </body>
//       </html>
//     `;

//     res.send(html);
//   } catch (error) {
//     console.error('Database query error:', error);
//     res.status(500).json({ error: 'Database query error' });
//   }
// });

// // Usar el router en la aplicación
// app.use('/finance', financePageRouter);

// // Catch-all route to handle any other requests
// app.use((req, res) => {
//   res.status(404).json({ error: 'Not found' });
// });

// app.listen(3001, () => {
//   console.log('Server running at http://localhost:3001/');
// });

// import mysql from 'mysql2/promise';
// import express from 'express';
// import { Chart } from 'chart.js/auto';

// const connection = await mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'c0nygre',
//   database: 'portfolio',
//   port: 3306
// });

// const app = express();

// // Middleware para manejar las rutas
// const financePageRouter = express.Router();

// // Ruta para obtener la página de finanzas
// financePageRouter.get('/', async (req, res) => {
//   try {
//     const { id_company } = req.query;
//     let query = `
//       SELECT sdate, adj_close
//       FROM stocks
//       WHERE id_company = ?
//     `;

//     const [results] = await connection.query(query, [id_company]);

//     // Crear los datos para el gráfico de línea
//     const labels = results.map((row) => row.sdate);
//     const data = results.map((row) => row.adj_close);

//     // Crear el HTML de la página de finanzas
//     let html = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>Finance Page</title>
//         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
//       </head>
//       <body>
//         <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
//           <div class="container">
//             <a class="navbar-brand" href="#">Finance Page</a>
//             <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//               <span class="navbar-toggler-icon"></span>
//             </button>
//             <div class="collapse navbar-collapse" id="navbarNav">
//               <ul class="navbar-nav ms-auto">
//                 <li class="nav-item">
//                   <a class="nav-link" href="/finance?id_company=AMZN">Amazon</a>
//                 </li>
//                 <li class="nav-item">
//                   <a class="nav-link" href="/finance?id_company=AAPL">Apple</a>
//                 </li>
//                 <li class="nav-item">
//                   <a class="nav-link" href="/finance?id_company=GOOG">Google</a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>

//         <div class="container my-5">
//           <div class="row">
//             <div class="col-md-8">
//               <h2 class="mb-4">Stock Chart</h2>
//               <canvas id="myChart"></canvas>
//             </div>
//             <div class="col-md-4">
//               <h2 class="mb-4">Stock Information</h2>
//               <div class="card">
//                 <div class="card-body">
//                   <h5 class="card-title">Company ID: ${id_company}</h5>
//                   <p class="card-text">Latest Adjusted Close: ${data[data.length - 1]}</p>
//                   <a href="#" class="btn btn-primary">View More</a>
//                   <a href="#" class="btn btn-secondary">Download Data</a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
//         <script>
//           const ctx = document.getElementById('myChart').getContext('2d');
//           const myChart = new Chart(ctx, {
//             type: 'line',
//             data: {
//               labels: ${JSON.stringify(labels)},
//               datasets: [{
//                 label: 'Adjusted Close',
//                 data: ${JSON.stringify(data)},
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 borderWidth: 1
//               }]
//             },
//             options: {
//               scales: {
//                 y: {
//                   beginAtZero: false
//                 }
//               }
//             }
//           });
//         </script>
//       </body>
//       </html>
//     `;

//     res.send(html);
//   } catch (error) {
//     console.error('Database query error:', error);
//     res.status(500).json({ error: 'Database query error' });
//   }
// });

// // Usar el router en la aplicación
// app.use('/finance', financePageRouter);

// // Catch-all route to handle any other requests
// app.use((req, res) => {
//   res.status(404).json({ error: 'Not found' });
// });

// app.listen(3001, () => {
//   console.log('Server running at http://localhost:3001/');
// });






// import mysql from 'mysql2/promise';
// import express from 'express';
// import { Chart } from 'chart.js/auto';

// const connection = await mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'c0nygre',
//   database: 'portfolio',
//   port: 3306
// });

// const app = express();

// // Middleware para manejar las rutas
// const financePageRouter = express.Router();

// // Ruta para obtener la página de finanzas
// financePageRouter.get('/', async (req, res) => {
//   try {
//     const { id_company } = req.query;

//     // Obtener la lista de empresas
//     const [companies] = await connection.query('SELECT DISTINCT id_company FROM portfolio.stocks');

//     let query = `
//       SELECT sdate, adj_close
//       FROM stocks
//       WHERE id_company = ?
//     `;

//     const [results] = await connection.query(query, [id_company]);

//     // Crear los datos para el gráfico de línea
//     const labels = results.map((row) => row.sdate);
//     const data = results.map((row) => row.adj_close);

//     // Crear el HTML de la página de finanzas
//     let html = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>Finance Page</title>
//         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
//       </head>
//       <body>
//         <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
//           <div class="container">
//             <a class="navbar-brand" href="#">Finance Page</a>
//             <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//               <span class="navbar-toggler-icon"></span>
//             </button>
//             <div class="collapse navbar-collapse" id="navbarNav">
//               <ul class="navbar-nav ms-auto">
//                 ${companies.map((company) => `
//                   <li class="nav-item">
//                     <a class="nav-link" href="/finance?id_company=${company.id_company}">${company.id_company}</a>
//                   </li>
//                 `).join('')}
//               </ul>
//             </div>
//           </div>
//         </nav>

//         <div class="container my-5">
//           <div class="row">
//             <div class="col-md-8">
//               <h2 class="mb-4">Stock Chart</h2>
//               <canvas id="myChart"></canvas>
//             </div>
//             <div class="col-md-4">
//               <h2 class="mb-4">Stock Information</h2>
//               <div class="card">
//                 <div class="card-body">
//                   <h5 class="card-title">Company ID: ${id_company}</h5>
//                   <p class="card-text">Latest Adjusted Close: ${data[data.length - 1]}</p>
//                   <a href="#" class="btn btn-primary">View More</a>
//                   <a href="#" class="btn btn-secondary">Download Data</a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
//         <script>
//           const ctx = document.getElementById('myChart').getContext('2d');
//           const myChart = new Chart(ctx, {
//             type: 'line',
//             data: {
//               labels: ${JSON.stringify(labels)},
//               datasets: [{
//                 label: 'Adjusted Close',
//                 data: ${JSON.stringify(data)},
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 borderWidth: 1
//               }]
//             },
//             options: {
//               scales: {
//                 y: {
//                   beginAtZero: false
//                 }
//               }
//             }
//           });
//         </script>
//       </body>
//       </html>
//     `;

//     res.send(html);
//   } catch (error) {
//     console.error('Database query error:', error);
//     res.status(500).json({ error: 'Database query error' });
//   }
// });

// // Usar el router en la aplicación
// app.use('/finance', financePageRouter);

// // Catch-all route to handle any other requests
// app.use((req, res) => {
//   res.status(404).json({ error: 'Not found' });
// });

// app.listen(3001, () => {
//   console.log('Server running at http://localhost:3001/');
// });








// import mysql from 'mysql2/promise';
// import express from 'express';

// const connection = await mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'c0nygre',
//   database: 'portfolio',
//   port: 3306
// });

// const app = express();

// // Middleware para manejar las rutas
// const financePageRouter = express.Router();

// // Endpoint para obtener los datos de la tabla 'stocks'
// financePageRouter.get('/stocks', async (req, res) => {
//   try {
//     const [rows] = await connection.query('SELECT sdate, adj_close FROM portfolio.stocks WHERE id_company = ?', ['AMZN']);
//     res.json(rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al obtener los datos' });
//   }
// });

// app.use('/finance', financePageRouter);

// app.listen(3000, () => {
//   console.log('Servidor escuchando en el puerto 3000');
// });


// import * as tf from '@tensorflow/tfjs-node';
// import readline from 'readline';

// // Load the pre-trained model
// async function loadModel() {
//   try {
//     const model = await tf.loadLayersModel('file://./model.json');
//     console.log('Model loaded');
//     return model;
//   } catch (error) {
//     console.error('Error loading model:', error);
//   }
// }

// // Generate a response based on user input
// async function generateResponse(model, tokenizer, maxLen) {
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });

//   rl.on('line', async (userInput) => {
//     if (userInput.toLowerCase() === 'salir') {
//       rl.close();
//       return;
//     }

//     const inputSeq = await tokenizer.encode(userInput);
//     const inputSeqPadded = tf.tensor2d([inputSeq.fill(0, inputSeq.length, maxLen)]);

//     const predictedSequence = await model.predict(inputSeqPadded);
//     const predictedIds = predictedSequence.argMax(1).dataSync();
//     const response = await tokenizer.decode(predictedIds);

//     console.log(`Respuesta del chatbot: ${response}`);
//     rl.prompt();
//   });

//   rl.on('close', () => {
//     console.log('Saliendo...');
//   });

//   rl.prompt();
// }

// // Example usage
// (async () => {
//   const model = await loadModel();
//   const tokenizer = await loadTokenizer(); // Implement this function to load your tokenizer
//   const maxLen = 100; // Set the maximum length of the input sequence

//   await generateResponse(model, tokenizer, maxLen);
// })();







// import * as tf from '@tensorflow/tfjs-node';
// import * as use from '@tensorflow-models/universal-sentence-encoder';

// const modelJsonPath = '/root/nodejs_task/model.json';
// const modelWeightsPath = '/root/nodejs_task/group1-shard1of1.bin';
// const maxLen = 100; // Longitud máxima de la secuencia de entrada

// // Función para cargar el modelo
// async function loadModel() {
//   try {
//     const model = await tf.loadLayersModel(modelJsonPath, {
//       weights: modelWeightsPath
//     });
//     console.log("Modelo cargado");
//     return model;
//   } catch (error) {
//     console.error("Error al cargar el modelo:", error);
//   }
// }

// // Función para generar la respuesta
// async function generateResponse(model, inputText) {
//   try {
//     // Tokenizar y procesar el texto de entrada
//     const encoder = await use.load();
//     const inputTensor = await encoder.embed([inputText]);
//     const inputSequence = inputTensor.dataSync().slice(0, maxLen);

//     // Aplicar padding a la secuencia de entrada
//     const inputPadded = tf.tensor2d([inputSequence], [1, maxLen]);

//     // Realizar la predicción
//     const prediction = model.predict(inputPadded);
//     const predictedIndex = tf.argMax(prediction, 1).dataSync()[0];
//     const response = await encoder.decode([predictedIndex]);

//     console.log(`Respuesta del chatbot: ${response}`);
//   } catch (error) {
//     console.error("Error en generateResponse:", error);
//   }
// }

// // Ejemplo de uso
// (async function() {
//   const model = await loadModel();
//   if (model) {
//     const userInput = "Hazme una pregunta";
//     await generateResponse(model, userInput);
//   }
// })();



// import mysql from 'mysql2/promise';
// import express from 'express';
// import { Chart } from 'chart.js/auto';

// const connection = await mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'c0nygre',
//   database: 'portfolio',
//   port: 3306
// });

// const app = express();

// // Middleware para manejar las rutas
// const financePageRouter = express.Router();

// // Ruta para obtener la página de finanzas
// financePageRouter.get('/', async (req, res) => {
//   try {
//     const { id_company } = req.query;

//     // Obtener la lista de empresas
//     const [companies] = await connection.query('SELECT DISTINCT id_company FROM portfolio.stocks');

//     let query = `
//       SELECT sdate, adj_close
//       FROM stocks
//       WHERE id_company = ?
//     `;

//     const [results] = await connection.query(query, [id_company]);

//     // Crear los datos para el gráfico de línea
//     const labels = results.map((row) => row.sdate);
//     const data = results.map((row) => row.adj_close);

//     // Crear el HTML de la página de finanzas
//     let html = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>Finance Page</title>
//         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
//       </head>
//       <body>
//         <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
//           <div class="container">
//             <a class="navbar-brand" href="#">Finance Page</a>
//             <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//               <span class="navbar-toggler-icon"></span>
//             </button>
//             <div class="collapse navbar-collapse" id="navbarNav">
//               <ul class="navbar-nav ms-auto">
//                 ${companies.map((company) => `
//                   <li class="nav-item">
//                     <a class="nav-link" href="/finance?id_company=${company.id_company}">${company.id_company}</a>
//                   </li>
//                 `).join('')}
//               </ul>
//             </div>
//           </div>
//         </nav>

//         <div class="container my-5">
//           <div class="row">
//             <div class="col-md-8">
//               <h2 class="mb-4">Stock Chart</h2>
//               <canvas id="myChart"></canvas>
//             </div>
//             <div class="col-md-4">
//               <h2 class="mb-4">Stock Information</h2>
//               <div class="card">
//                 <div class="card-body">
//                   <h5 class="card-title">Company ID: ${id_company}</h5>
//                   <p class="card-text">Latest Adjusted Close: ${data[data.length - 1]}</p>
//                   <a href="#" class="btn btn-primary">View More</a>
//                   <a href="#" class="btn btn-secondary">Download Data</a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
//         <script>
//           const ctx = document.getElementById('myChart').getContext('2d');
//           const myChart = new Chart(ctx, {
//             type: 'line',
//             data: {
//               labels: ${JSON.stringify(labels)},
//               datasets: [{
//                 label: 'Adjusted Close',
//                 data: ${JSON.stringify(data)},
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 borderWidth: 1
//               }]
//             },
//             options: {
//               scales: {
//                 y: {
//                   beginAtZero: false
//                 }
//               }
//             }
//           });
//         </script>
//       </body>
//       </html>
//     `;

//     res.send(html);
//   } catch (error) {
//     console.error('Database query error:', error);
//     res.status(500).json({ error: 'Database query error' });
//   }
// });

// // Usar el router en la aplicación
// app.use('/finance', financePageRouter);

// // Catch-all route to handle any other requests
// app.use((req, res) => {
//   res.status(404).json({ error: 'Not found' });
// });

// app.listen(3001, () => {
//   console.log('Server running at http://localhost:3001/');
// });





/* */






import mysql from 'mysql2/promise';
import express from 'express';
import { Chart } from 'chart.js/auto';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'c0nygre',
  database: 'portfolio',
  port: 3306
});

const app = express();

// Middleware para manejar las rutas
const financePageRouter = express.Router();

// Ruta para obtener la página de finanzas
financePageRouter.get('/', async (req, res) => {
  try {
    const { id_company } = req.query;

    // Obtener la lista de empresas
    const [companies] = await connection.query('SELECT DISTINCT id_company FROM portfolio.stocks');

    // Obtener los datos para el gráfico de línea
    let query = `
      SELECT sdate, adj_close
      FROM stocks
      WHERE id_company = ?
    `;
    const [lineChartResults] = await connection.query(query, [id_company]);
    const lineChartLabels = lineChartResults.map((row) => row.sdate);
    const lineChartData = lineChartResults.map((row) => row.adj_close);

    // Obtener los datos para el gráfico de círculo
    query = `
      WITH bu AS (
        SELECT id_company, SUM(tot_investment) AS tot_investment
        FROM portfolio.buy
        GROUP BY id_company
      ),
      sel AS (
        SELECT id_company, SUM(tot_sold) AS tot_sold
        FROM portfolio.sell
        GROUP BY id_company
      ),
      principal AS (
        SELECT
          COALESCE(bu.id_company, sel.id_company) AS id_company,
          COALESCE(bu.tot_investment, 0) AS tot_investment,
          COALESCE(sel.tot_sold, 0) AS tot_sold
        FROM
          bu
        LEFT JOIN
          sel ON bu.id_company = sel.id_company
        UNION ALL
        SELECT
          COALESCE(bu.id_company, sel.id_company) AS id_company,
          COALESCE(bu.tot_investment, 0) AS tot_investment,
          COALESCE(sel.tot_sold, 0) AS tot_sold
        FROM
          sel
        LEFT JOIN
          bu ON sel.id_company = bu.id_company
      )
      SELECT id_company, (tot_investment - tot_sold) as PL
      FROM principal
      WHERE id_company = ?`;
    const [circleChartResults] = await connection.query(query, [id_company]);
    const profitLoss = circleChartResults[0].PL;

    // Crear el HTML de la página de finanzas
    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Finance Page</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
      </head>
      <body>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
          <div class="container">
            <a class="navbar-brand" href="#">Finance Page</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ms-auto">
                ${companies.map((company) => `
                  <li class="nav-item">
                    <a class="nav-link" href="/finance?id_company=${company.id_company}">${company.id_company}</a>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        </nav>

        <div class="container my-5">
          <div class="row">
            <div class="col-md-8">
              <h2 class="mb-4">Stock Chart</h2>
              <canvas id="lineChart"></canvas>
            </div>
            <div class="col-md-4">
              <h2 class="mb-4">Profit/Loss</h2>
              <div class="d-flex justify-content-center">
                <canvas id="profitLossChart" width="200" height="200"></canvas>
              </div>
              <div class="card mt-4">
                <div class="card-body">
                  <h5 class="card-title">Company ID: ${id_company}</h5>
                  <p class="card-text">Latest Adjusted Close: ${lineChartData[lineChartData.length - 1]}</p>
                  <a href="#" class="btn btn-primary">View More</a>
                  <a href="#" class="btn btn-secondary">Download Data</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script>
          // Gráfico de línea
          const lineCtx = document.getElementById('lineChart').getContext('2d');
          const lineChart = new Chart(lineCtx, {
            type: 'line',
            data: {
              labels: ${JSON.stringify(lineChartLabels)},
              datasets: [{
                label: 'Adjusted Close',
                data: ${JSON.stringify(lineChartData)},
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: false
                }
              }
            }
          });

          // Gráfico de círculo
          const circleCtx = document.getElementById('profitLossChart').getContext('2d');
          const profitLossChart = new Chart(circleCtx, {
            type: 'doughnut',
            data: {
              datasets: [{
                data: [${profitLoss}, 0],
                backgroundColor: ['#36A2EB', '#CCCCCC'],
                borderWidth: 0
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: '${profitLoss.toFixed(2)}'
                }
              }
            }
          });
        </script>
      </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database query error' });
  }
});

// Usar el router en la aplicación
app.use('/finance', financePageRouter);

// Catch-all route to handle any other requests
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(3001, () => {
  console.log('Server running at http://localhost:3001/');
});