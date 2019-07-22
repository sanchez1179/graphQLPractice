import React, { Component } from 'react';
import { getBookQuery } from '../queries/queries';
import { graphql } from 'react-apollo';
import MinusButton from './Buttons/MinusButton';


class BookDetails extends Component{
    displayBookDetails(){
        const {book} = this.props.data;
        if(book){
            return(
                <div>
                    <h2>Book Name: {book.name}</h2>
                    <p>Genre: {book.genre}</p>
                    <p>Author Name: {book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        { book.author.books.map(item => {
                            return <li key={item.id}>{item.name}</li>
                        })
                            
                        }
                    </ul>
                </div>
            )
        } else {
            return(
                <div>No book selected...</div>
            )
        }
    }
    render(){
        return (
            <div id="book-details">
                {this.displayBookDetails()}
                <MinusButton/>
            </div>
        );
    }
}

export default graphql(getBookQuery, {
    options:(props) => {
        return{
            variables:{
                id:props.bookId
            }
        }
    }
})(BookDetails)