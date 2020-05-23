import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Store from './components/Store';
import Farm from './components/Farm';
import StoryLine from './components/StoryLine';

class App extends React.Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.deductBells = this.deductBells.bind(this);
    this.setInventory = this.setInventory.bind(this);
    this.setUpgrades = this.setUpgrades.bind(this);
    this.toggleStoreVisibility = this.toggleStoreVisibility.bind(this);
    this.toggleStoryLineVisibility = this.toggleStoryLineVisibility.bind(this);
    this.storeVisible = false;
    this.state = {
      bells: 0,
      inventory: [],
      upgrades: [],
      storylineVisible: true
    }
  }

  /*
    On component mount, start the interval function to generate bells per second
  */
  componentDidMount() {
    this.bellInterval = setInterval(() => this.tick(), 250);
  }

  /*
    Cleanup for interval functions
  */
  componentWillUnmount() {
    clearInterval(this.bellInterval);
  }

  /*
    Called every time a player clicks the work button
  */
  handleClick(e) {
    e.preventDefault();

    const clickPower = this.getClickPower();
    const bells = this.state.bells += clickPower;
    this.setState({bells});
  }

  /*
    Interval function that runs every second.
    Adds bells per second to player inventory.
  */
  tick() {
    const bellDifference = (this.getBellsPerSecond() / 4);
    console.log("Bell bellDifference: ", bellDifference);

    this.setState({ bells: (this.state.bells + bellDifference) });
  }

  /*
    Calculates total bells generated by player assets
  */
  getBellsPerSecond(){
    let bellsPerSecond = 0;

    this.state.inventory.forEach(item => {
      bellsPerSecond += (item.profit * item.owned);
    })

    return bellsPerSecond;
  }

  /*
    Calculates power per click
  */
  getClickPower(){
    let clickPower = 500;

    this.state.upgrades.forEach(item => {
      clickPower += (item.clickIncrease * item.owned);
    })

    return clickPower;
  }

  /*
    Reduces an amount of bells from total bells
  */
  deductBells(amount){
    this.setState({bells: (this.state.bells -= amount)});
  }

  /*
    Updates inventory
  */
  setInventory(inventory){
    this.setState({inventory});
  }

  /*
    Updates upgrades
  */
  setUpgrades(upgrades){
    this.setState({upgrades});
  }

  toggleStoreVisibility(){
    this.setState({storeVisible: !this.state.storeVisible});
  }

  toggleStoryLineVisibility(){
    this.setState({storylineVisible: !this.state.storylineVisible});
  }

  renderGrove(item){

    console.log("Item: ", item);

    let grove = [];

    if(item.owned > 0){
      let n = 0;
      while (n < item.owned) {
        grove.push(<div className={item.name}></div>)
        n++;
      }

      return <div className={item.name + '-grove grove'}>{grove}</div>;
    } else {
      return "";
    }
  }

  render() {
    return <div id="App">
      <div id="grove-container">
        <Farm inventory={this.state.inventory} />
      </div>

      <StoryLine toggleStoryLineVisibility={this.toggleStoryLineVisibility} classNames={ this.state.storylineVisible ? '' : 'd-none'} bells={this.state.bells} deductBells={this.deductBells} />

        

        <div id="nook-phone" className={this.state.storylineVisible ? 'd-none' : ''}>
          <div className="sub-header">
            <div>123</div>
            <div>xx:xx</div>
            <div>123</div>
          </div>

          <div className="header">
            Bells: {this.state.bells.toFixed(2)}
          </div>

          <div className="content">

            <Store classNames={ this.state.storeVisible ? '' : 'd-none'} bells={this.state.bells} deductBells={this.deductBells} setInventory={this.setInventory} setUpgrades={this.setUpgrades} closeStore={this.toggleStoreVisibility} />

            <div className={this.state.storeVisible || this.state.storylineVisible ? 'd-none' : 'apps'}>
              <div className="wrapper">
                <button className="app toggle-store" onClick={this.toggleStoreVisibility}>
                  {this.state.storeVisible ? 'Close' : 'Open'} Store
                </button>

                <button className="app toggle-storyline" onClick={this.toggleStoryLineVisibility}>
                  {this.state.storylineVisible ? 'Close' : 'Open'} Story
                </button>

                <button className="app" onClick={this.handleClick}>
                  Click me
                </button>
              </div>
            </div>
          </div>
        </div>


        { /*
        <div class="fallingItems">
         <span className="cherry"></span>
         <span className="peach"></span>
         <span className="orange"></span>
        </div>
        */ }
    </div>
  }
}

export default App;
