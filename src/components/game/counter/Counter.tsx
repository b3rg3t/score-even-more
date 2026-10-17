interface ICounter {
  value: number;
}

export const Counter = ({ value }: ICounter) => {
  const formatValue: Array<Array<number | string>> = [];
  let idx = 0;
  let arrIdx = 0;
  for (let i = 1; i <= value; i++) {
    idx++;
    if (idx === 1) {
      formatValue.push([]);
    }

    if (idx % 5) {
      formatValue[arrIdx].push(i);
    } else {
      formatValue[arrIdx].push("5thNumber");
      formatValue.push([]);
      arrIdx++;
    }
  }

  return (
    <div className="d-flex justify-content-between w-100">
      <ul className="list-unstyled d-flex mx-1 flex-wrap">
        {formatValue.map((val, idx1) => (
          <li key={idx1}>
            <ul className="list-unstyled d-flex">
              {val.map((val2, idx2) => (
                <li
                  key={idx2}
                  className={typeof val2 === "string" ? "slash" : ""}
                >
                  {typeof val2 === "string" ? "|" : "l"}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {value ?? 0}
    </div>
  );
};
