import React, { useState} from "react";
import BudgetCardFront from "./BudgetCardFront";
import BudgetMonthCard from "./BudgetMonthCard";
import NewBudget from "./NewBudget";

const  BudgetContainer = ({ months, expenses, pageBack, pageForward, categories, userInfo, fetchAll}) =>  {
  const [isFlagged, setIsFlagged] = useState(false);
  const [isCancelled, setIsCancelled] = useState(true)

  const renderBudgetMonth = () => {
    return months.map(month => {
      return (
        <BudgetMonthCard
          key={month.id}
          id={month.id}
          pageBack={pageBack}
          pageForward={pageForward}
          month={month}
          expenses={expenses}
        />
      );
    });
  }

  const renderBudgetCard = () => {
    return categories.map(category => {
      return (
        <BudgetCardFront
          key={category.id}
          category={category}
          expenses={expenses}
        />
      );
    });
  }

  const isCardFlagged = () =>{
    setIsFlagged(!isFlagged)
    setIsCancelled(!isCancelled)
  };


  return (
    <div>
      {renderBudgetMonth()}
      <div className="budget-cards">{renderBudgetCard()}</div>
      { categories.length < 1 && !isFlagged 
        ? <button className='start-budget-button'  onClick={isCardFlagged}>
            { isFlagged ? "cancel" : "Start Budget!"}
          </button> 
        : null }
      {isFlagged 
        ?  <>
          <NewBudget
            months={months}
            userInfo={userInfo}
            isCancelled={isCancelled}
            fetchAll={fetchAll}
            isFlagged={isCardFlagged}
          /> 
          <button className='start-budget-button'  onClick={isCardFlagged}>
            { isFlagged ? "cancel" : "Start Budget!"}
          </button>
        </> 
      : null}
    </div>
  );
}

export default BudgetContainer;
