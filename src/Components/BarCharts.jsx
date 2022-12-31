import React from "react";
import css from "./style/barcharts.module.css";

const BarCharts = () => {
  const rowData = [
    { name: "html", value: 100 },
    { name: "css", value: 20 },
    { name: "java script", value: 50 },
    { name: "React Js", value: 80 },
  ];
  return (
    <>
      <div className={css.container}>
        <h1 className={css.heading}>Bar chart</h1>
        <div className={css.col_area}>
          <div className={css.col_data} data-last-value="100">
            80
          </div>
          <div className={css.col_data}>60</div>
          <div className={css.col_data}>40</div>
          <div className={css.col_data}>20</div>
          <div className={css.col_data}>0</div>

          <div className={css.row_area}>
            {rowData?.map(({ name, value }, indx) => {
              return (
                <div
                  key={indx}
                  className={css.row_data}
                  style={{
                    left: `${4 * (indx + 1)}rem`,
                    height: `${value}%`,
                  }}
                  data-name={name}
                  data-value={value + "%"}
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
