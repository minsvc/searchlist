import React, { Component } from 'react'
import './index.css'
import PubSub from 'pubsub-js'


export default class List extends Component {

    state ={
        users:[],    //用户信息
        isFirst:true,       //是否初始状态，提示用户搜索
        isLoading:false,    //搜索状态
        error:""

    }


    //页面加载完毕订阅消息，更新状态
    componentDidMount(){
         this.token = PubSub.subscribe('mytopic', (_,stateObj)=>{
            this.setState(stateObj)
        })
    }
    
    //卸载组件后取消订阅
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