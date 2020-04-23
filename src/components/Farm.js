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