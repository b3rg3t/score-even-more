interface ICounter {
  value: number;
}

export const Counter = ({ value }: ICounter) => {
  const formatValue: any = [];
  let idx = 0;
  let arrIdx = 0;
  for (let i = 1; i <= value; i++) {
    idx++;
    if (idx === 1) {
      formatValue.push(new Array());
    }

    if (idx % 5) {
      formatValue[arrIdx].push(i);
    } else {
      formatValue[arrIdx].push("5thNumber");
      formatValue.push(new Array());
      arrIdx++;
    }
  }

  return (
    <div className="d-flex justify-content-between w-100">
      <ul className="list-unstyled d-flex mx-1 flex-wrap">
        {formatValue.map((val: any, idx1: number) => (
          <li key={idx1}>
            <ul className="list-unstyled d-flex">
              {val.map((val2: any, idx2: number) => (
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
      ({value ?? 0})
    </div>
  );
};
