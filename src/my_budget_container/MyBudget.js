import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap';

class MyBudgetContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      month_id: 0,
      monthly_income: 0,
      year: 0,
      user_id: props.userInfo,
      category_name: '',
      category_budget: 0,
    }
  }

  handleMonthChange(e){
    this.setState({
      month_id: e.target.value
    });
  }

  handleYearChange(e){
    this.setState({
      year: e.target.value
    });
  }

  handleMonthIncomeChange(e){
    this.setState({
      monthly_income: e.target.value
    });
  }

  handleCategoryChange(e){
    this.setState({
      category_id: e.target.value
    });
  }

  handleCategoryIncomeChange(e){
    console.log(e.target.value)
  }

  handleSubmit(e){
    e.preventDefault()
    console.log('working')
  //   const { amount, category_id, monthly_budget_id, user_id, expense_title } = this.state
  //
  //   const info = this.state
  //   const reqObj = {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       name: expense_title,
  //       amount,
  //       category_id,
  //       monthly_budget_id,
  //       user_id: this.props.id
  //     })
  //   }
  //   return fetch('http://localhost:3000/transactions', reqObj)
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  }


  render(){
    {console.log(this.props.id)}
    return (
      <div className="" style={{ color: "white" }}>
        <Form onSubmit={(e)=>{this.handleSubmit(e)}}>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Month</Form.Label>
            <Form.Control
              onChange={(e)=>{this.handleMonthChange(e)}}
              defaultValue="8"
              as="select">
              <option value={1}>January</option>
              <option value={2}>February</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Year</Form.Label>
            <Form.Control
              onChange={(e)=>{this.handleYearChange(e)}}
              defaultValue="2019"
              as="select">
              <option>2016</option>
              <option>2017</option>
              <option>2018</option>
              <option>2019</option>
              <option>2020</option>
              <option>2021</option>
              <option>2022</option>
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Monthly Income</Form.Label>
            <Form.Control
              onChange={(e)=>{this.handleMonthIncomeChange(e)}}
              type="number"
              placeholder="ex: $2500" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              onChange={(e)=>{this.handleCategoryChange(e)}}
              type="text"
              placeholder="ex: Shopping" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Category Budget</Form.Label>
            <Form.Control
              onChange={(e)=>{this.handleCategoryIncomeChange(e)}}
              type="number"
              placeholder="ex: $100" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              onChange={(e)=>{this.handleCategoryChange(e)}}
              type="text"
              placeholder="ex: Shopping" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Category Budget</Form.Label>
            <Form.Control
              onChange={(e)=>{this.handleCategoryIncomeChange(e)}}
              type="number"
              placeholder="ex: $100" />
          </Form.Group>
          
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              onChange={(e)=>{this.handleCategoryChange(e)}}
              type="text"
              placeholder="ex: Shopping" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Category Budget</Form.Label>
            <Form.Control
              onChange={(e)=>{this.handleCategoryIncomeChange(e)}}
              type="number"
              placeholder="ex: $100" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );

  }
};

export default MyBudgetContainer;
