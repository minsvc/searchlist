import React,{Component} from "react";
import axios from 'axios'
import PubSub from 'pubsub-js'


export default class Search extends Component {


    //获取点击事件执行搜索
    search = ()=> {

        //多重析构赋值+重命名
        const {keyWordElement:{value:keyWord}} = this

        //this.props.updateAppState({isFirst:false, isLoading: true})

        //更新状态
        PubSub.publish("mytopic", {isFirst:false, isLoading: true})

        axios.get(`https://api.github.com/search/users?q=${keyWord}`).then(
            response => {
                //this.props.updateAppState({users:response.data.items, isLoading: false})
                PubSub.publish("mytopic", {users:response.data.items, isLoading: false})
                console.log(response)
            },
            error => {
                //this.props.updateAppState({error:error, isLoading:false, users:[]})
                PubSub.publish("mytopic",{error:error, isLoading:false, users:[]})
                console.log(error)
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