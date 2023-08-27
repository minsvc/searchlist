import React,{Component} from "react";
import axios from 'axios'


export default class Search extends Component {

    search = ()=> {
        const {keyWordElement:{value:keyWord}} = this

        this.props.updateAppState({isFirst:false, isLoading: true})
        axios.get(`https://api.github.com/search/users333?q=${keyWord}`).then(
            response => {
                this.props.updateAppState({users:response.data.items, isLoading: false})
            },
            error => {
                console.log(error)
                this.props.updateAppState({error:error, isLoading:false, users:[]})
            }
        )
        
    }


    render() {
        return (
            <section className='jumbotron'>
                <h3 className='jumbotron-heading'>Search Github Users</h3>
                <div>
                    <input ref={c => this.keyWordElement = c } type="text" placeholder='enter the name you search' style={{width: '250px'}}/>&nbsp;
                    <button onClick={this.search}>Search</button>
                </div>
            </section>
        )
    }
    
}