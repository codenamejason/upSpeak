import React, { Component } from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import { Spin, Alert, Skeleton, Space, Divider, Switch, Form, Radio } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './App.css';
import SocialNetwork from './abis/SocialNetwork.json'
import Navbar from './components/Navbar'
import Main from './components/Main'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const spinner =  <Spin style={{ fontSize: 24 }} tip="Loading..."></Spin>;

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = SocialNetwork.networks[networkId]
    if(networkData) {
      const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkData.address)
      this.setState({ socialNetwork })
      const postCount = await socialNetwork.methods.postCount().call()
      this.setState({ postCount })
      // Load Posts
      for (var i = 1; i <= postCount; i++) {
        const post = await socialNetwork.methods.posts(i).call()
        this.setState({
          posts: [...this.state.posts, post]
        })
      }
      // Sort posts. Show highest tipped posts first
      this.setState({
        posts: this.state.posts.sort((a,b) => b.tipAmount - a.tipAmount )
      })
      this.setState({ loading: false})
    } else {
      window.alert('SocialNetwork contract not deployed to detected network.')
    }
  }

  uploadVideo(content) {
    this.setState({ loading: true });
    

  }

  createPost(content) {
    this.setState({ loading: true })
    this.state.socialNetwork.methods.createPost(content).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      window.reload();
    })
  }

  tipPost(id, tipAmount) {
    this.setState({ loading: true })
    this.state.socialNetwork.methods.tipPost(id).send({ from: this.state.account, value: tipAmount })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  createComment(comment, postId) {

  }

  tipComment(id, tipAmount) {

  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      socialNetwork: null,
      postCount: 0,
      posts: [],
      loading: true,
      active: true,
      size: 'default',
      buttonShape: 'default',
      avatarShape: 'square',
    }

    this.createPost = this.createPost.bind(this)
    this.tipPost = this.tipPost.bind(this)
  }

  render() {
    const { active, size, buttonShape, avatarShape } = this.state;
    return (
      <div>
        <Navbar account={this.state.account} />
        {/* todo: build left panel under topics for navigation ??? */}

        { this.state.loading
          ? <>
            <div id="" className="text-center mt-5">              
                {spinner}           
            </div>
              <Space>
                <Skeleton.Button />
                <Skeleton.Button active={active} size={size} shape={buttonShape} />
                <Skeleton.Button active={active} size={size} shape={buttonShape} />
                <Skeleton.Avatar active={active} size={size} shape={avatarShape} />
                <Skeleton.Input style={{ width: 200 }} active={active} size={size} />
              </Space>
            </>
          : <Main
              posts={this.state.posts}
              createPost={this.createPost}
              tipPost={this.tipPost}
            />
        }

      </div>
    );
  }
}

export default App;