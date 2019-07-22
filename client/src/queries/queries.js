import{ gql } from 'apollo-boost';

const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }
`;

const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }
    }
`;

const getAuthorIdQuery = gql` 
    
        query($authorName: String!){
            authorByName(authorName: $authorName){
                id
            }
        }
    
`;

const addAuthorMutation = gql`
    mutation($name: String!, $age:Int!){
        addAuthor(name: $name, age: $age){
            name
            age
        }
    }
`;
const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;

const getBookQuery = gql`
    query($id: ID){
        book(id: $id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }
`;

export{ getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery, addAuthorMutation, getAuthorIdQuery}