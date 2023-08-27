import React, { Component } from 'react'
import './index.css'
import PubSub from 'pubsub-js'


export default class List extends Component {

    state ={
        users:[],
        isFirst:true,
        isLoading:false,
        error:""

    }

    componentDidMount(){
         this.token = PubSub.subscribe('mytopic', (_,stateObj)=>{
            this.setState(stateObj)
        })
    }
    
    componentWillUnmount(){
        PubSub.unsubscribe(this.token)
    }

    render() {

        const {users, isFirst, isLoading, error} = this.state
        return (            
            <div className="row">
            {
                isFirst ? <h2>welcomt to use search, please chick serach.</h2> :
                isLoading ? <h2>Loading....</h2> :
                error ? <h2 style={{color:'red'}}> {error.message}</h2> :
                users.map((userObj)=>{
                    return (
                        <div className="card" key={userObj.id}>
                                <a href={userObj.html_url} taget="_blank">
                                    <img src={userObj.avatar_url} alt="not found" style={{ width: '100px' }}></img>
                                </a>
                                <p className="card-text">{userObj.login}</p>
                        </div>
                    )
                })
            }
            </div>
            
        )
    }
}