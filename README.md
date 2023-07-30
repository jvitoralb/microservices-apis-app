# Microservices App

This is a end-to-end microservices app that counts with five different projects. The main goal for the app was to practice the Microservices architecture style. This project is part of the freeCodeCamp Back End Development and APIs curriculum.  

These are the 5 projects:
- [Timestamp](#timestamp)
- [Request Header Parser](#request-header-parser)
- [URL Shortener](#url-shortener)
- [Exercise Tracker](#exercise-tracker)
- [File Metadata](#file-metadata)

### [Back end]()  
To build the back end it was used Nodejs and Express following the Microservices style using a gateway.  
The choice for the database was the NoSQL MongoDB with the mongoose library.  

### [Front end](frontend)  
The main goal was to practice Back End Development. So the front end is pretty basic, done only with HTML and CSS.

## [Timestamp](timestamp/)
A simple project to convert a given date to the Unix time stamp and vice-versa. All the conversion happens in the backend where the date is sent using HTTP parameters.

## [Request Header Parser](header-parser/)
A project to practice the use of HTTP header.

## [URL Shortener](shorterner/)
A project that receives a valid URL and uses an algorithm to generate a code and then link this code to the URL and store it in a database. Then this code is sent in a request and is used to redirect the user to the original URL.

## [Exercise Tracker](exercise/)
In this project, all the data is sent in the body of an HTTP POST request by the user and stored in a NoSQL database. Reading data from the DB is possible through a HTTP GET request. The search can use filters such as LIMIT, FROM, and TO, which should be sent in the request as HTTP parameters.

## [File Metadata](file-metadata/)
A simple project that receives a file from the user, downloads it and sends back the file metadata.

[Live Project](https://micro-service-app.onrender.com/)!