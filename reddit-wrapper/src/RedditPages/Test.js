import React, {Component} from 'react';
import * as RedditAPI from 'reddit-wrapper-v2';
import path from 'path';
require('dotenv').config({ path: path.join(__dirname, '.env') });

class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: this.props.title,
            body: this.props.body,
            user: this.props.user
        }
    }
    render(){
        return (
            <div>
                <h3>{this.props.title}</h3>
                <small>{this.props.user} </small>
                <h4>{this.props.body}</h4>
                <img src = {this.props.thumbnail} alt = {this.props.title}/>
                <h4> Comments</h4>
                {
                    this.props.dict2.map(
                        function(val, ind){
                            return (
                                <div>
                                    {val.data.body}
                                </div>
                            )
                        }
                    )
                }
            </div>
        )
    }
}

class Test extends Component{
    constructor(props){
        super(props);
        this.state = {
            dict: {},
            dict2: []
        }
    }
    componentDidMount(){
        var redditconn = RedditAPI({
            username: 'PLEASE PUT USERNAME HERE',
            password: 'PLEASE PUT PASSWORD HERE',
            app_id : 'ySWZpyWQF46Hxg',
            api_secret: 'hltA3a2ptWLou0XEk6c52CRJFCM',
            retry_on_wait: true,
            retry_on_server_error: 5,
            retry_delay: 1,
            logs: true
        });
        redditconn.api.get('/r/nottheonion/comments/erzlgb',{}).then( data => {
            console.log(data);
            //console.log(data[1][1].data.children);
            // data[1][1].data.children.map(
            //     function(val, ind) {
            //         console.log(val.data.body);
            //     }
            // )
            this.setState({dict: data[1][0].data.children[0].data, dict2: data[1][1].data.children})
            }
        );
    }

    render(){
        console.log(this.state.dict.title);
        return (
            <div>
                <Post title = {this.state.dict.title} body = {this.state.dict.body} user = {this.state.dict.author}
                    thumbnail = {this.state.dict.thumbnail}
                    dict2 = {this.state.dict2}
                />
            </div>
        )
    }

}

export default Test;