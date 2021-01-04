import React, { Component } from 'react';
import Identicon from 'identicon.js';
import { Spin, Alert, Skeleton, Space, Divider, Switch, Form, Radio } from 'antd';
import { Upload, message, Button } from 'antd';
import { Player } from 'video-react';
import { UploadOutlined, InboxOutlined  } from '@ant-design/icons';

const logo = 'https://spee.ch/8/upSpeak1.png'
const eth = 'https://spee.ch/f/ethicon.png'
const { Dragger } = Upload;

const motd = [ 'adTrumpet is an Ethereum based Decentralized Social Network!',
               'adTrumpet Naturally Incentivises High Quality Posts!', 
               'adTrumpet Topics are Added by its Users!',
               'adTrumpet is Opensource and Ad-free.',
               'Content on adTrumpet can Never be Modified or Deleted.',
               'adTrumpet is 100% Censorship Resistant.',
               'Your Ethereum Address is in the Upper Right Corner.',
               'adTrumpet is Literally Un-Stoppable!',
               'adTrumpet is Powered by Ethereum Smart Contracts!',
               'adTrumpet has No Owners or Employees, only Developers!',
               'adTrumpet is Autonimous and Decentralized.',
               'adTrumpet is Deployed to Ethereum Main Net!',
               'adTrumpet is a Blockchain Application.',
               'up-its! are part of a Fully Peer-to-Peer Rewards System.',
               'adTrumpet Developers Only get Paid when You Add a Topic.',
               'adTrumpet Naturally De-Incentivises Spam & Illicit Content.',
               'Whats on Your Mind?',
               'What do You Say?',
               'adTrumpets Logo & images are hosted on the LBRY blockchain!',
               'adTrumpet is Experimental, Users Choose All of the Content.',
               'adTrumpet was Made for You.',
               'The adTrumpet Blockchain is Independent of adTrumpet.Online. ',
               'Each adTrumpet User has an Equal Leverage on the Network.',
               'adTrumpet is a Free Speach Platform.',
               'The Most Appreciated Posts Rise to the Top!',
               'adTrumpet Users are Paid Instantly in Ethereum!',
               'Speed Up the Mining of Your Post by Paying a Higher Gas Fee.',
               'The Reward for One up-it! is 0.007 ETH.',
               'You Can Run Your Own adTrumpet Web Server.',
               'All Post & Topics on adTrumpet are permanently stored.',
               'adTrumpet Users Pay Other Users Directly by Clicking up-it!'
              ];

function Rand(motd){
  const keys = Object.keys(motd);
  let i = keys.length - 1;
  const j = Math.floor(Math.random() * i);
  return motd[keys[j]];
}

document.body.style = 'background: #DFE5E8;';

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


class Main extends Component {

  render() {
    return (
      <div className="container">
        {/* <Player ref={(player) => { this.player = player }}>
          <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
        </Player> */}
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '504px', background: '#DFE5E8' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const content = this.postContent.value
                  this.props.createPost(content)
                }}>
                <div className="form-group">
                {/* <img src={logo} width="496" height="301" alt="adTrumpet" /> */}
                  <h2>AdTrumpet</h2>


                  <p>&nbsp;</p>

                  <input
                    id="postContent"
                    type="text"
                    ref={(input) => { this.postContent = input }}
                    className="form-control"
                    placeholder= {Rand(motd)}
                    required 
                  />
                </div>

                <button type="submit" className="btn btn-info btn-block"><UploadOutlined />Upload</button>
                {/* <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload> */}
              </form>

              <p>&nbsp;</p>

              { this.props.posts.map((post, key) => {
                return(
                  <div className="card mb-4" key={key} >
                    <div className="card-header">
                      <img
                        className='mr-2'
                        width='30'
                        height='30'
                        src={`data:image/png;base64,${new Identicon(post.author, 30).toString()}`}
                      />
                      <small className="text-muted">{post.author}</small>
                    </div>
                    <ul id="postList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p>{post.content}</p>
                      </li>
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                        <img src={eth} width="9" height="14" alt="adTrumpet" /> [{window.web3.utils.fromWei(post.tipAmount.toString(), 'Ether')} ETH]
                        </small>
                        <button
                          className="btn btn-info btn-sm float-right pt-0"
                          name={post.id}
                          onClick={(event) => {
                            let tipAmount = window.web3.utils.toWei('0.007', 'Ether')
                            console.log(event.target.name, tipAmount)
                            this.props.tipPost(event.target.name, tipAmount)
                          }}
                        >
                          [0.007 ETH]
                        </button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button
                          className="btn btn-info btn-sm float-right pt-0"
                          name={post.id}
                          onClick={(event) => {
                            let tipAmount = window.web3.utils.toWei('0.015', 'Ether')
                            console.log(event.target.name, tipAmount)
                            this.props.tipPost(event.target.name, tipAmount)
                          }}
                        >
                          [0.015 ETH]
                        </button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button
                          className="btn btn-info btn-sm float-right pt-0"
                          name={post.id}
                          onClick={(event) => {
                            let tipAmount = window.web3.utils.toWei('0.150', 'Ether')
                            console.log(event.target.name, tipAmount)
                            this.props.tipPost(event.target.name, tipAmount)
                          }}
                        >
                         [0.150 ETH]
                        </button>
                      </li>
                    </ul>
                  </div>
                )
              })}
            </div>
          </main>
        </div>


      </div>
    );
  }
}

export default Main;
