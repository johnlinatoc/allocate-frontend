import React, { Component, Fragment } from "react";
import { Form, Button } from "react-bootstrap";
import uuid from "uuid";
import { Link, withRouter } from "react-router-dom";

//monthly income is set first. display confirmation on screen.
//add category budgets until CB == monthly income. (0 == 0 validation needed)
//enable submit button


class NewBudgetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthly_income: 0,
      month_id: this.props.months[0].id,
      user_id: this.props.userInfo.id,
      categories: [{name: '', amount: 0}],
      isEqual: false,
      categoryTotal: 0,
    };
  }

  totalUpdate(){
    if (this.state.monthly_income === this.state.categoryTotal){
      this.setState({ isEqual: true })
    } else{
      this.setState({ isEqual: false })
    }
  }


  handleMonthIncomeChange(e) {
    this.setState({
      monthly_income: parseInt(e.target.value)
    });
  }

  handleMonthSubmit(e) {
    e.preventDefault();
    const data = this.state;

    const reqObj_mon = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        mode: 'no-cors'
      },
      body: JSON.stringify(data)
    };

    fetch("http://localhost:3000/new_budget", reqObj_mon)
      .then(res => res.json())
      .then(data => console.log(data))

    // this.props.history.push('/home')
  }

  handleCategorySubmit(e) {
    e.preventDefault();
    const data = this.state;

    const reqObj_mon = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    };

    fetch("http://localhost:3000/categories", reqObj_mon)
      .then(res => res.json())
      .then(data => console.log(data))

  //   this.props.history.push('/home')
  }

  renderNewCategory() {
    let categories = this.state.categories
    categories.push({name: '', amount: 0})
    this.setState({ categories })
  }

  handleCategoryChange(e, index) {
    let newCats = [...this.state.categories]
    let categories = this.state.categories
    let isEqual = this.state.isEqual
    let monthly_income = this.state.monthly_income

    newCats[index][e.target.name] = e.target.value

    let newCatsTotal = 0
    categories.map(cat=> newCatsTotal += parseInt(cat.amount))

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


    return this.totalUpdate()
  }

  renderCategoryInputs(){
    return this.state.categories.map((category, index)=> {
      return(
        <div>
          <Form.Group>
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              onChange={e => {
                this.handleCategoryChange(e, index);
              }}
              name='name'
              type="text"
              placeholder="ex: Shopping"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Category Budget</Form.Label>
            <Form.Control
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

  render() {
    return (
      <div className="" style={{ color: "white" }}>

        <Form
          onSubmit={e => this.handleMonthSubmit(e)}
          className='new-month-budget'>
          <Form.Group>
            <Form.Label>Monthly Income</Form.Label>
            <Form.Control
              onChange={e => {
                this.handleMonthIncomeChange(e);
              }}
              type="number"
              placeholder="ex: $2500"
              />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
====================
        <Form
          onSubmit={e => {
            this.handleCategorySubmit(e);
          }}
        >
          {this.renderCategoryInputs()}
          <Button
            onClick={() => {
              this.renderNewCategory();
            }}
          >
            Add Category
          </Button>


          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(NewBudgetContainer);
