import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Api from '../services/api';

class NewBudgetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthly_income: 0,
      month_id: this.props.months[0].id,
      user_id: this.props.userInfo.id,
      categories: [{name: '', amount: 0}],
      categoryTotal: 0,
      monthSubmitted: false,
      isEqual: false,
    };
  }

  handleMonthIncomeChange(e) {
    this.setState({
      monthly_income: parseInt(e.target.value),
      monthSubmitted: false,
      categories: [{name: '', amount: 0}],
      categoryTotal: 0,
    });
  }

  handleMonthSubmit(e) {
    e.preventDefault();

    const data = this.state;
    Api.postMonthBudget(data)
    .then( this.setState({ monthSubmitted: true }) )
  }

  renderNewCategory() {
    const { categories } = this.state;
    categories.push({name: '', amount: 0})
    this.setState({ categories })
  }

  handleCategoryChange(e, index) {
    const {categories, monthly_income} = this.state;
    let newCats = [...this.state.categories]
    let newCatsTotal = 0;

    newCats[index][e.target.name] = e.target.value
    categories.map(cat => newCatsTotal += parseInt(cat.amount))

    if (newCatsTotal === monthly_income){
      return this.setState({
        categories: newCats,
        categoryTotal: newCatsTotal,
        isEqual: true,
      })
    } else {
      return this.setState({
        categories: newCats,
        categoryTotal: newCatsTotal,
        isEqual: false,
      })
    }
  }

  handleCategorySubmit(e) {
    e.preventDefault();

    const data = this.state;
    Api.postCategories(data)
    .then(data => {
      this.setState({
        monthly_income: 0,
        month_id: this.props.months[0].id,
        user_id: this.props.userInfo.id,
        categories: [{name: '', amount: 0}],
        isEqual: false,
        monthSubmitted: false,
        categoryTotal: 0,
      })
      this.props.fetchAll()
      this.props.isFlagged()
    })
  }

  renderCategoryInputs(){
    return this.state.categories.map((category, index)=> {
      return(
        <div className='category-groups'>
          <h4>New Category</h4>
          <Form.Group
            style = {{ marginTop: "2px", }}
            >
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              required
              onChange={e => {
                this.handleCategoryChange(e, index);
              }}
              name='name'
              type='text'
              placeholder="ex: Shopping"
            />
          </Form.Group>
          <Form.Group
            style = {{ marginTop: "2px", }}
            controlId="formBasicPassword">
            <Form.Label>Category Budget</Form.Label>
            <Form.Control
              required
              onChange={e => {
                this.handleCategoryChange(e, index);
              }}
              name='amount'
              type="number"
              placeholder="ex: $100"
            />
          </Form.Group>
        </div>
      )
    })
  }

  renderSubmitButton(){
    return <Button className ='submit-budget' variant="primary" type="submit">
            Submit Budget!
            </Button>
  }

  renderNewCatButton(){
    return <button
      className='enter-category'
      onClick={() => {
        this.renderNewCategory();
      }}>
      Add Category
    </button>
  }

  renderBudgetTracker(){
    return <div>
    <h3>Planned Expenses: <span>${this.state.categoryTotal}</span> </h3>
    <hr />
    <h3 style={ this.state.isEqual ? {color: 'green'} : null}>
      { this.state.isEqual ? 'Budget Ready!' : 'Remaining:'}
      <span style={ this.state.isEqual ? {color: 'green'} : {color: 'red'}}>${this.calcRemainder()}</span>
    </h3>
    </div>
  }

  calcRemainder(){
    return this.state.monthly_income - this.state.categoryTotal
  }

  render() {
    return (
      <div className="new-budget" style={{ color: "black" }}>
        <h2>Start Your New Budget</h2>
        <Form
          className='main-budget-form'
          onSubmit={e => this.handleMonthSubmit(e)}
          >
          <Form.Group>
            <Form.Label><h4>This Month's Income</h4></Form.Label>
            <Form.Control
              required
              onChange={e => {
                this.handleMonthIncomeChange(e);
              }}
              type="number"
              placeholder="ex: $2500"/>
          </Form.Group>
          { this.state.monthly_income > 0 && !this.state.monthSubmitted ? <Button className='enter-income'variant="primary" type="submit">
            Enter Income
          </Button> : null}

        </Form>
        <div className="side-budget-form">
          <h3>This Month's Income: <span>${this.state.monthly_income ? this.state.monthly_income : 0}</span> </h3>
          { this.state.monthSubmitted  ?  this.renderBudgetTracker() : null }

        </div>
        <Form
          className='cat-budget-form'
          onSubmit={e => {
            this.handleCategorySubmit(e);
          }}>
          { this.state.monthSubmitted ? this.renderCategoryInputs() : null }
          { this.state.monthSubmitted && !this.state.isEqual? this.renderNewCatButton() : null }
          { this.state.isEqual ? this.renderSubmitButton() : null }
        </Form>
      </div>
    );
  }
}

export default withRouter(NewBudgetContainer);
