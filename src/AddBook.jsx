import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

export default function AddBook({addBook})
{
    const [open, setOpen] = useState(false);
    const [book, setBook] = useState({title:"", author:"", year:"", isbn:"", price:"",});

    function handlePopUp()
    {
        setOpen(!open)
    }

    function handleSave()
    {
        addBook(book);
        handlePopUp();
    }

    function inputChanged(event)
    {
        setBook({...book, [event.target.name]: event.target.value})
    }

    return <>
        {/*Dialog opening button*/}
        <Button
            variant="outlined"
            onClick={handlePopUp}>
                Add a book
        </Button>

        <Dialog open={open}> {/*Dialog is a popup window*/}
            <DialogTitle>New Book</DialogTitle>
            <DialogContent>
                <TextField
                    name="title"
                    value={book.title}
                    onChange={inputChanged}
                    margin="dense"
                    label="Title"
                    fullWidth
                /> 

                <TextField
                    name="author"
                    value={book.author}
                    onChange={inputChanged}
                    margin="dense"
                    label="Author"
                    fullWidth
                /> 

                <TextField
                    name="year"
                    value={book.year}
                    onChange={inputChanged}
                    margin="dense"
                    label="Year"
                    fullWidth
                /> 

                <TextField
                    name="isbn"
                    value={book.isbn}
                    onChange={inputChanged}
                    margin="dense"
                    label="ISBN"
                    fullWidth
                /> 

                <TextField
                    name="price"
                    value={book.price}
                    onChange={inputChanged}
                    margin="dense"
                    label="Price"
                    fullWidth
                /> 
            </DialogContent>
            <DialogActions>
            <Button color="primary" onClick={handlePopUp}>Cancel</Button>
            <Button color="primary" onClick={handleSave}>Save</Button>
            </DialogActions>

        </Dialog>
    </>
}   
