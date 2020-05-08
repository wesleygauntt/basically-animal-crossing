import React from 'react';
import '../styles/farm.scss';

class Farm extends React.Component {

  constructor(props){
    super(props);

    this.renderGrove = this.renderGrove.bind(this);
  }

  renderGrove(item){
    let grove = [];

    if(item.owned > 0){

      const description = `You currently have ${item.owned}, Producing ${item.owned * item.profit} bells/s`;

      let n = 0;
      while (n < item.owned) {
        grove.push(<div className={item.name}></div>)
        n++;
      }

      return <div className={item.name + 's resource-row'}><div className="item-container">{grove}</div><div className='description'>{description}</div></div>;
    } else {
      return "";
    }
  } 

  render(){
    return <div className="farm">
      {
        this.props.inventory.map ( (item) => {
            return this.renderGrove(item)
        })
      }
    </div>
  }
}

export default Farm;