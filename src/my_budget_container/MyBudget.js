import React, { Component, Fragment } from "react";
import { Form, Button } from "react-bootstrap";
import uuid from "uuid";

class MyBudgetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month_name: "",
      month_id: 0,
      monthly_income: 0,
      year: 0,
      user_id: this.props.userInfo.id,
      category_name: "",
      category_budget: 0
    };
  }

  handleMonthChange(e) {
    // console.log(e.target.value.toString().slice(7))
    this.setState({
      month_id: parseInt(e.target.value.toString().slice(0, 6)),
      month_name: e.target.value.toString().slice(7)
    });
  }

  handleYearChange(e) {
    this.setState({
      year: parseInt(e.target.value)
    });
  }

  handleMonthIncomeChange(e) {
    this.setState({
      monthly_income: parseInt(e.target.value)
    });
  }

  handleCategoryChange(e) {
    this.setState({
      category_name: e.target.value
    });
    console.log(e.target);
  }

  handleCategoryBudgetChange(e) {
    this.setState({
      category_budget: parseInt(e.target.value)
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("working");
    const {
      month_name,
      monthly_income,
      year,
      user_id,
      expense_title,
      category_name,
      category_budget,
      month_id
    } = this.state;

    const reqObj_mon = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        month_name,
        monthly_income,
        year,
        expense_title,
        category_name,
        category_budget,
        user_id: this.props.userInfo.id
      })
    };

    const reqObj_cats = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        month_id,
        category_name,
        category_budget,
        user_id: this.props.userInfo.id
      })
    };

    fetch("http://localhost:3000/monthly_budgets", reqObj_mon)
      .then(res => res.json())
      .then(data => console.log(data))

    // fetch("http://localhost:3000/categories", reqObj_cats)
    //   .then(res => res.json())
    //   .then(data => console.log(data));

    //first post the month with userId
    //then post the categories with the new month_id & userId
  }

  insertNew() {
    return (
      <Fragment>
        <Form.Group>
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            onChange={e => {
              this.handleCategoryChange(e);
            }}
            type="text"
            placeholder="ex: Shopping"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Category Budget</Form.Label>
          <Form.Control
            onChange={e => {
              this.handleCategoryBudgetChange(e);
            }}
            type="number"
            placeholder="ex: $100"
          />
        </Form.Group>
      </Fragment>
    );
    console.log("working");
  }

  renderNewCategory() {
    return this.insertNew();
  }

  render() {
    {
      console.log(this.props.userInfo.id);
    }
    const id_1 = Math.floor(Math.random() * 899999 + 100000);
    const id_2 = Math.floor(Math.random() * 899999 + 100000);
    const id_3 = Math.floor(Math.random() * 899999 + 100000);
    const id_4 = Math.floor(Math.random() * 899999 + 100000);
    const id_5 = Math.floor(Math.random() * 899999 + 100000);
    const id_6 = Math.floor(Math.random() * 899999 + 100000);
    const id_7 = Math.floor(Math.random() * 899999 + 100000);
    const id_8 = Math.floor(Math.random() * 899999 + 100000);
    const id_9 = Math.floor(Math.random() * 899999 + 100000);
    const id_10 = Math.floor(Math.random() * 899999 + 100000);
    const id_11 = Math.floor(Math.random() * 899999 + 100000);
    const id_12 = Math.floor(Math.random() * 899999 + 100000);

    return (
      <div className="" style={{ color: "white" }}>
        <Form
          onSubmit={e => {
            this.handleSubmit(e);
          }}
        >
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Month</Form.Label>
            <Form.Control
              onChange={e => {
                this.handleMonthChange(e);
              }}
              defaultValue="August"
              as="select"
            >
              <option value={[id_1, "January"]}>January</option>
              <option value={[id_2, "February"]}>February</option>
              <option value={[id_3, "March"]}>March</option>
              <option value={[id_4, "April"]}>April</option>
              <option value={[id_5, "May"]}>May</option>
              <option value={[id_6, "June"]}>June</option>
              <option value={[id_7, "July"]}>July</option>
              <option value={[id_8, "August"]}>August</option>
              <option value={[id_9, "September"]}>September</option>
              <option value={[id_10, "October"]}>October</option>
              <option value={[id_11, "November"]}>November</option>
              <option value={[id_12, "December"]}>December</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Year</Form.Label>
            <Form.Control
              onChange={e => {
                this.handleYearChange(e);
              }}
              defaultValue="2019"
              as="select"
            >
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
              onChange={e => {
                this.handleMonthIncomeChange(e);
              }}
              type="number"
              placeholder="ex: $2500"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              id={id_1}
              onChange={e => {
                this.handleCategoryChange(e);
              }}
              type="text"
              placeholder="ex: Shopping"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Category Budget</Form.Label>
            <Form.Control
              id={id_1}
              onChange={e => {
                this.handleCategoryBudgetChange(e);
              }}
              type="number"
              placeholder="ex: $100"
            />
          </Form.Group>

          <button
            onClick={() => {
              this.renderNewCategory();
            }}
          >
            Add Category
          </button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default MyBudgetContainer;
