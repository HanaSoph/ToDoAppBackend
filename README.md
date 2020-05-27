# The Big Day To Do List Database
An API link with a to do list app for Brides and Grooms with a big list of things to do for their big day! It integrates with a frontend, available here:https://github.com/HanaSoph/ToDoAppReact

Click here to view the app: https://hanasoph.github.io/ToDoAppReact/

## Introduction
This simple to do list application and back end was a project built as part of a 15-week full-stack web development course. 

## Technologies
The back end uses Javascript for the API and axios to link it to the database in AWS Lambda. It's dependencies are: axios, body-parser, cors, express, mysql and serverless-http.

The front end app is made with JavaScript, React and Bootstrap.

## Features
### Back end
CRUD implimentation.

### Front end
The Big Day To Do List lets you add in a task. If it's urgent you can toggle it so. Urgent items are signaled with a simple '!' in the lists.

The to do list section lets you either mark the item as complete, or delete the item if it's no longer required.

When you delete a list item it is removed from the database.

When you mark as complete, the item will list in the completed list which is ordered from newest completed to oldest completed. When this list reaches 7 the oldest list items will be removed.

## Sources
This project was built on a 15-week full stack web development course delivered by Tech Returners.
