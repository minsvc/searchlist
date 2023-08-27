import React, { Component } from 'react'
import './index.css'


export default class List extends Component {
    render() {

        const {users, isFirst, isLoading, error} = this.props

        return (
            
            <div className="row">
            {
                isFirst ? <h2>welcomt to use search, please chick serach.</h2> :
                isLoading ? <h2>Loading....</h2> :
                error ? <h2 style={{color:'red'}}> {error.message}</h2> :
                this.props.users.map((userObj)=>{
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