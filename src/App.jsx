import { useState, useEffect } from 'react'
import './App.css'
import AddBook from './AddBook';
// MUI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
// AG grid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-material.css';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([ AllCommunityModule ]);

function App() {
  const [books, setBooks] = useState([])

  // creates a "id" property based on the firebase push-id, returns an array 
  // of books with the id
  function addKeys(data)
   {
    // Creates an array of the keys, (push id's on the firebase)
    // keys === ["MGvq69vFRNAi6N4RPPf", "MGvqCptPhR1BMdNN2IQ"]

      const keys = Object.keys(data); 
      
      // Object.values() returns an array of the values. (It's array of books now)
      /*
        valuesArray === [
          { author:"Leo Tolstoy", isbn:"9780140864854", price:"13.5", title:"Anna Karenina", year:"1877" },
          { author:"Shirley Jackson", isbn:"9780141191447", price:"9.75", title:"The Haunting of Hill House", year:"1992" }
        ];
    */
      // New array is created based on that array using map.
      // map takes all the values(book) and the book's index on array
      const valueKeys = Object.values(data).map((book, index) => 
        //Object.defineProperty adds a new property on the book. It's read-only
      // the new property's key is "id" and it's value is the element on the array (keys) on the place of index
      Object.defineProperty(book, 'id', {value: keys[index]}))
      setBooks(valueKeys);
   }

  // Fetch items from the database
  function fetchItems() {
    fetch("https://bookstore-5f5d3-default-rtdb.europe-west1.firebasedatabase.app/books.json")
    .then(response => response.json())
    .then(data => addKeys(data)) // Moves the object full of books to addKeys()
    .catch(err => console.error(err))
  }

  // On page enter, fetchItems
  useEffect(() => {fetchItems()}, [])

  // Posts the book on the database
  function addBook(newBook)
  {
    fetch("https://bookstore-5f5d3-default-rtdb.europe-west1.firebasedatabase.app/books.json",
      {
        method:"POST", // uses POST to submit items in
        body: JSON.stringify(newBook) // turns the Object to a JSON string
      }
    )
    .then(response => fetchItems(response)) // fetches updated content
    .catch(err => console.error(err))

  }

  function deleteBook(id) 
  {
    fetch(`https://bookstore-5f5d3-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
      {
        method: 'DELETE',
      })
      .then(response => fetchItems(response)) // fetches updated content
      .catch(err => console.error(err))
  }


  // Settings for the grid
  const columnDefs = [
    {field: "title", sortable: true, filter: true},
    {field: "author", sortable: true, filter: true},
    {field: "year", sortable: true, filter: true},
    {field: "isbn", sortable: true, filter: true},
    {field: "price", sortable: true, filter: true},
    { headerName: '',
      field: 'id',
      width: 90,
      cellRenderer: params => 
      <IconButton onClick={() => deleteBook(params.value)} size="small" color="error">
        <DeleteIcon />
      </IconButton> }
  ]

  return (
    <>
    {/* Header */}
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h5">
            Bookstore
          </Typography>
        </Toolbar>
        </AppBar>

        {/* Button and PopUp to add new books */}
        <AddBook addBook={addBook}/>

        {/* Grid */}
        <div className="bookgrid" style={{height: 400, width: 1100}}>
          <AgGridReact
            rowData={books}
            columnDefs={columnDefs}/>
        </div>
    </>
  )
}

export default App
