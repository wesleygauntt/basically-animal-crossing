import React from 'react';
import '../styles/store.scss';

class Store extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      inventory: [
        {name: 'apple-tree', cost: 10, owned: 0, profit: 1, display: 'Apple Tree'},
        {name: 'orange-tree', cost: 20, owned: 0, profit: 2, display: 'Orange Tree'},
        {name: 'pear-tree', cost: 30, owned: 0, profit: 3, display: 'Pear Tree'},
        {name: 'peach-tree', cost: 40, owned: 0, profit: 4, display: 'Peach Tree'},
      ],
      upgrades: [
        {name: 'copper-axe', cost: 100, owned: 0, clickIncrease: 1, display: 'Copper Axe'},
        {name: 'iron-axe', cost: 500, owned: 0, clickIncrease: 2, display: 'Iron Axe'},
        {name: 'gold-axe', cost: 2000, owned: 0, clickIncrease: 5, display: 'Gold Axe'},
        {name: 'copper-shovel', cost: 1000, owned: 0, clickIncrease: 1, display: 'Copper Shovel'},
        {name: 'iron-shovel', cost: 5000, owned: 0, clickIncrease: 2, display: 'Iron Shovel'},
        {name: 'gold-shovel', cost: 20000, owned: 0, clickIncrease: 5, display: 'Gold Shovel'},
      ]
    }
  }

  /*
    Purchase function
  */
  buySomething(item){
    console.log("Attempting to buy: ", item);
    console.log("Has: ", this.props.bells);

    if(this.props.bells >= item.cost){

      this.props.deductBells(item.cost)
      item.cost = (item.cost * 1.15).toFixed(2);
      item.owned += 1;

      this.props.setInventory(this.state.inventory);
      this.props.setUpgrades(this.state.upgrades);
    }

    this.forceUpdate();
  }

  /*
    Render function for items available
  */
  displayItems(){
    const listItems = this.state.inventory.map((item) =>
      <div className="item" onClick={(e) => this.buySomething(item)} >
        <div className="item-details">
          <span className="item-name">{item.display}</span>
          <span className="item-price">{item.cost}</span>
        </div>

        <div className="item-owned-count">You currently have {item.owned}, Producing {item.owned * item.profit} bells/s</div>
      </div>
    );

    return listItems
  }
  /*
    Render function for upgrades available
  */
  displayUpgrades(){
    const listItems = this.state.upgrades.map((item) =>
      <div className="item" onClick={(e) => this.buySomething(item)} >
        <div className="item-details">
          <span className="item-name">{item.display}</span>
          <span className="item-price">{item.cost}</span>
        </div>

        <div className="item-owned-count">You have {item.owned}, giving you an extra {item.clickIncrease * item.owned} bells per click!</div>
      </div>
    );

    return listItems
  }

  render () {
    return <div className={this.props.classNames + ' store'}>

      <div className="store-header">
        <button onClick={this.props.closeStore}>Close Store</button>
      </div>

      <div className="passive-items">
        <div className="title">Crops and Critters</div>
        <div className="items">
          { this.displayItems() }
        </div>
      </div>

      <div className="active-items">
        <div className="title">Tools</div>
        <div className="items">
          { this.displayUpgrades() }
        </div>
      </div>
    </div>
  }
}

export default Store;