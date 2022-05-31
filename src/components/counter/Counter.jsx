import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './Counter.css'

class Counter extends Component{

    constructor() {
        super(); 
        this.state = {
            counter : 0 
        }

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }

    render() {
        return (
            <div className="counter">
              <CounterButton by={1} incrementMethod = {this.increment} decrementMethod = {this.decrement}/>
              <CounterButton by={5} incrementMethod = {this.increment} decrementMethod = {this.decrement}/>
              <CounterButton by={10} incrementMethod = {this.increment} decrementMethod = {this.decrement}/>
              <span className="count">{this.state.counter}</span>   
              <div><button className = "reset" onClick = {this.reset}>Reset</button></div>
            </div>
        )
    }

    reset (){
        this.setState({ counter: 0}
        );
    }

    increment(by) { 
        //console.log(`increment from child - ${by}`)
        // using prevState rather than this.state 因为多次使用时，override 不会叠加，还是第一次加的数
        this.setState(
            (prevState) => {
                return { counter: prevState.counter + by}
            }
        );
    }

    decrement(by) { 
        //console.log(`increment from child - ${by}`)
        // using prevState rather than this.state 因为多次使用时，override 不会叠加，还是第一次加的数
        this.setState(
            (prevState) => {
                return { counter: prevState.counter - by}
            }
        );
    }
}


class CounterButton extends Component{
    //define the initial state in a constructor
    //state => counter 0
    constructor() {
        super(); //Error1 no super error
        this.state = {
            counter : 0 ,    //initial 
        }

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }


    render() {
    // render =() => {}  another writing: don't need this.increment = this.increment.bind(this);
        //const style ={fontSize: "50px", padding : "15px 30px"} 替代counter。css里对counter的修饰
        //<span className='count' style = {style}>{this.state.counter}</span>
        return (
            <div className="counter">
                {/* JavaScript function */}
                <button onClick={this.increment} >+{this.props.by}</button>
                <button onClick={this.decrement} >-{this.props.by}</button>
                {/* <span className='count'>{this.state.counter}</span> */}
            </div>
    );
  }

    increment() {  // Update state - counter++
    // increment =() => {}
        //console.log('increment');
        //this.state.counter++; //bad practice
        this.setState({
            counter: this.state.counter + this.props.by

        });

        this.props.incrementMethod(this.props.by);
    }

    decrement() {  // Update state - counter++
        // increment =() => {}
            //console.log('increment');
            //this.state.counter++; //bad practice
            this.setState({
                counter: this.state.counter - this.props.by
    
            });
    
            this.props.decrementMethod(this.props.by);
        }

}

//set 默认值, 定义by
CounterButton.defaultProps = {
    by : 1
}

//限定类型， 定义 by
CounterButton.propTypes = {
    by : PropTypes.number
}

export default Counter
  