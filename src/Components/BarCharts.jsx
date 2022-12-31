import React, { useEffect, useState } from "react";
import css from "./style/barcharts.module.css";

const BarCharts = ({ row, numOfCol }) => {
  const [maxNum, setMaxNum] = useState(100);
  const [dividedNum, setDividedNum] = useState(0);
  // const [numOfCol, setNumOfCol] = useState(5);

  useEffect(() => {
    setMaxNum(Math.max(...row.map(({ value }) => parseInt(value))));
    setDividedNum(Math.round(maxNum / numOfCol));
  }, [maxNum, numOfCol, row]);
  // console.log(colArr);

  return (
    <>
      <div className={css.container}>
        <h1 className={css.heading}>Bar chart</h1>
        <div className={css.col_area}>
          <div
            className={css.col_data}
            data-col-value={maxNum + dividedNum}
          ></div>
          {Array(numOfCol)
            .fill()
            .map((val, indx) => dividedNum * (indx + 1))
            .sort((a, b) => b - a)
            .map((val, indx) => {
              return (
                <div key={indx} className={css.col_data} data-col-value={val}>
                  {/* {val} */}
                </div>
              );
            })}

          <div className={css.row_area}>
            {row?.map(({ name, value }, indx) => {
              const extraVal = maxNum / numOfCol;
              const newValue = (value / (maxNum + extraVal)) * 100;
              return (
                <div
                  key={indx}
                  className={css.row_data}
                  style={{
                    left: `${indx === 0 ? 1 : 4 * indx + 1}rem`,
                    height: `${newValue}%`,
                  }}
                  data-name={name}
                  data-value={value}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BarCharts;
