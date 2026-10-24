interface ICounter {
  value: number;
}

export const Counter = ({ value }: ICounter) => {
  const tallyGroups: number[] = [];
  const tallyCount = Number.isFinite(value)
    ? Math.max(0, Math.floor(value))
    : 0;
  for (let remaining = tallyCount; remaining > 0; remaining -= 5) {
    tallyGroups.push(Math.min(remaining, 5));
  }

  return (
    <div className="d-flex justify-content-between w-100">
      <span className="counter__tallies" aria-hidden="true">
        {tallyGroups.map((groupCount, groupIndex) => (
          <svg
            key={groupIndex}
            className="counter__group"
            viewBox="0 0 28 30"
            focusable="false"
          >
            {[
              "M 5.5 5.2 L 4.8 24.7",
              "M 11.4 4.5 L 11.8 24.2",
              "M 17.5 5.1 L 18.2 24.8",
              "M 23.1 4.6 L 22.6 24.4",
            ]
              .slice(0, Math.min(groupCount, 4))
              .map((path, strokeIndex) => (
                <path
                  key={strokeIndex}
                  className="counter__stroke"
                  d={path}
                  pathLength="1"
                  style={{ animationDelay: `${strokeIndex * 65}ms` }}
                />
              ))}
            {groupCount === 5 && (
              <path
                className="counter__stroke counter__stroke--slash"
                d="M 3.2 25.2 L 25 4.4"
                pathLength="1"
                style={{ animationDelay: "260ms" }}
              />
            )}
          </svg>
        ))}
      </span>
      <span className="counter__value">{value ?? 0}</span>
    </div>
  );
};
