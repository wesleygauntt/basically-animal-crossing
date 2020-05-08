import React from 'react';
import '../styles/storyline.scss';

/*
  Here's the main component to drive story along, and continue the capitalist saga of Nook enterprise
*/
class StoryLine extends React.Component {

  /*
    Declares the stages of our story, and binds relevant functions
  */
  constructor(props){
    super(props);

    this.storyLineSteps = [
      {
        title: "Introduction",
        prePaymentTextFragments: ["Hello, welcome to your island!", "I'm Tom Nook, and you owe me money!", "Yes, 1000 bells will do!"],
        postPaymentTextFragments: ["!", "Without any help or guidance, you managed to scrape together some bells"],
        debtAmount: 1000,

      },
      {
        title: "Packing up camp",
        prePaymentTextFragments: ["!", "Without any help or guidance, you managed to scrape together some bells"],
        postPaymentTextFragments: ["Very good indeed!", "Now, you've shown some great initiative!", "I've gone ahead and swapped out that old camp you had, and built you a home! I know! so kind!"],
        debtAmount: 2000
      },
      {
        title: "A forever home",
        prePaymentTextFragments: ["Wow!", "Looks like your pockets are full there! How about paying off your loan?"],
        postPaymentTextFragments: ["Thanks, you win!"],
        debtAmount: 3000
      }
    ]    

    this.state = {
      storyStep: 0,
      dialogStep: 0,
      hasPaid: false,
    }

    this.payDebt = this.payDebt.bind(this);
    this.renderStoryText = this.renderStoryText.bind(this);
    this.pushDialog = this.pushDialog.bind(this);
    this.closeStoryline = this.closeStoryline.bind(this);
  }

  /*
    Pays the debt for a given step
  */
  payDebt(){
    const step = this.storyLineSteps[this.state.storyStep];

    if(this.props.bells >= step.debtAmount){
      this.setState({ hasPaid: true });
      this.setState({ dialogStep: 0 });
    } else {
      console.log("Not enough bells!");
    }
  }

  /*
    Renders the story text
  */
  renderStoryText(stepIndex, dialogIndex){
    const step = this.storyLineSteps[stepIndex];

    // If we just paid, show the post payment text
    if(this.state.hasPaid){
      return <span>{step.postPaymentTextFragments[dialogIndex]}</span>

    // Otherwise, show the pre payment text
    } else {
      if(this.props.bells >= step.debtAmount || stepIndex == 0){
        return <span>{step.prePaymentTextFragments[dialogIndex]}</span>  
      } else {
        return <span>Oh ho! Looks like you have work to do!</span>  
      }
    }
  }

  /*
    General close function, will progress the story if we've paid
  */
  closeStoryline(){
    const step = this.storyLineSteps[this.state.storyStep];

    this.props.toggleStoryLineVisibility();
    this.setState({ dialogStep: 0 });
    this.setState({ hasPaid: false });

    if(this.state.hasPaid){
      this.props.deductBells(step.debtAmount);
      this.setState({ storyStep: this.state.storyStep += 1 });
    }
  }

  /*
    Renders the buttons to pay debts, progress story, and close the window
  */
  renderActionButtons(stepIndex, dialogIndex){
    const step = this.storyLineSteps[stepIndex];

    if(this.state.hasPaid){
      let len = step.postPaymentTextFragments.length;

      if (dialogIndex + 1 == len) {
        return <button onClick={this.closeStoryline}>Close</button>
      } else {
        return <button onClick={this.pushDialog}>Next</button>
      }
    } else {
      let len = step.prePaymentTextFragments.length;

      if(this.props.bells >= step.debtAmount || (stepIndex === 0 && dialogIndex < 2)){
        if (dialogIndex + 1 == len) {
          return <button onClick={this.payDebt}>Pay Debt</button>
        } else {
          return <button onClick={this.pushDialog}>Next</button>
        }
      } else {
        return <button onClick={this.closeStoryline}>Close</button>
      }
    }
  }

  /*
    Pushes the dialog along
  */
  pushDialog(){
    this.setState({dialogStep: this.state.dialogStep += 1});
  }

  /*
    R-r-r-render!
  */
  render(){
    return <div className={this.props.classNames + ' storyline-wrapper'}>

      { this.state.storyStep < this.storyLineSteps.length ? (

        <div className="storyline-content">
          <h6>{ this.storyLineSteps[this.state.storyStep].title }</h6>

          <div className="story-text-container">
            { this.renderStoryText(this.state.storyStep, this.state.dialogStep) }
          </div>

          <div className="story-buttons-container">
            { this.renderActionButtons(this.state.storyStep, this.state.dialogStep) }
          </div>
        </div>
      ) : (
        <h6>You win!</h6>
      )}
    </div>
  }
}

export default StoryLine;