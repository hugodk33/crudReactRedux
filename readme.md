# Nested List with action in react redux
## a frontend and backend working togheter 

### starting

`cd backend`
`npm install`
`npm start`
`cd frontend`
`npm install`
`npm start`

app start at 

`src/main/index.jsx`

this component calls `app.jsx` with redux

in app component, a list of objects from api is received, in next this list is processed in a nested list where parent itens receive they childrens. This component call another two components

`form.jsx` and `list.jsx`

in the form, a html tag is called with the methods from redux, this methods are: search, add and clear
in list, nested list is render by the logic of app component this nested is renderized

each item in list, calls a modal to confirm action buttons (edit and delete) from redux

each modal action call a differnt template with your own logic

this app work with redux plugin (google chrome) to debug 
