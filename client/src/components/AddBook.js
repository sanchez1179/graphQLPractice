import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import { getAuthorsQuery, getBooksQuery, addBookMutation, addAuthorMutation, getAuthorIdQuery} from '../queries/queries';
import PlusButton from './Buttons/PlusButton';



class AddBook extends Component{
    constructor(props){
        super(props);
        this.state =  {
            name: '',
            genre: '',
            authorId: '',
            authorName: '',
            age: ''
        }
    }
    displayAuthors(){
        var data = this.props.getAuthorsQuery;
        if(data.loading){
            return(<option disabled>Loading Authors</option>)
        } else {
            return data.authors.map(author => {
                return(<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
    }



async submitForm(e){
        e.preventDefault();
        if(this.state.authorId === "new"){
             await this.props.addAuthorMutation({
                variables:{
                    name: this.state.authorName,
                    age: parseInt(this.state.age)
                }
            })

        }


        let id = await this.props.getAuthorIdQuery({
            variables:{
                authorName: this.state.authorName
            }
        })

        console.log(id)


        // This is something else I tried and got the race condition that I mentioned
        // let authorObject = await this.props.getAuthorsQuery;
        // let authorsArray = await authorObject.authors;
        // var nombre = await this.state.authorName
        //var id = await _.find(authorsArray, {name: nombre})
    
        this.props.addBookMutation({
            variables:{
                name: this.state.name,
                genre: this.state.genre,
                authorId: (id === null) ? this.state.authorId : id
            },
            refetchQueries: [{query: getBooksQuery}]
        })
    }
    render(){
        return (
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>Book Name:</label>
                    <input type="text" onChange={(e) => this.setState({name:e.target.value})}/>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={(e) => this.setState({genre:e.target.value})}/>
                </div>
                {this.state.authorId === "new" ? 
                        <div>
                            <div className="author">
                                <label>Author Name: </label>
                                <input type="text" onChange={(e) => this.setState({authorName:e.target.value})}/>
                            </div>
                            <div className="author">
                                <label>Age: </label>
                                <input type="number" onChange={(e) => this.setState({age:e.target.value})}/>
                            </div>
                        </div>
                        : null}
                <div className="field">
                    <label>Author:</label>
                    <select onChange={(e) => this.setState({authorId:e.target.value})}>
                        <option>Select Author</option>
                        <option value="new">New Author</option>
                        {this.displayAuthors()}
                    </select>
                    
                </div>
                <PlusButton/>
                </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(getBooksQuery, { name: "getBooksQuey"}),
    graphql(addBookMutation, { name: "addBookMutation" }),
    graphql(addAuthorMutation, { name: "addAuthorMutation" }),
    graphql(getAuthorIdQuery, { name: "getAuthorIdQuery" })
    )(AddBook);