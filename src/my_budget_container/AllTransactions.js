import React, { Component } from 'react'
import TransactionCard from '../transactions_container/TransactionCard'
import './my_budget_container_styles.css'


class AllTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderAllTransactions(){
    const transactions = this.props.transactions;

    return transactions.map(trans => {
            return <TransactionCard key={trans.id} info={trans} />;
    });

  }


  render(){
    return(
      <div className='my-budget-trans-container'>
        Latest Expenses
        {this.renderAllTransactions()}
      </div>
    )
  }
}

export default AllTransactions
