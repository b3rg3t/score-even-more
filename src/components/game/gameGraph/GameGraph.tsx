import { useId } from "react";
import { FaChartLine } from "react-icons/fa";
import { text } from "../../../localization/eng";
import { TRound } from "../../../models/type/TRound";
import { TPlayer } from "../../../models/type/players/TPlayer";
import {
  selectAllRounds,
  selectPlayersProfile,
} from "../../../store/reducers/game/gameSlice";
import { useAppSelector } from "../../../store/redux/hooks";
import "./gameGraph.scss";

const chartWidth = 640;
const chartHeight = 280;
const chartPadding = { top: 20, right: 16, bottom: 52, left: 48 };
const playerColors = [
  "#6f42c1",
  "#0d6efd",
  "#198754",
  "#dc3545",
  "#fd7e14",
  "#20c997",
  "#d63384",
  "#6c757d",
];

type PlayerSeries = {
  player: TPlayer;
  color: string;
  scores: number[];
};

const formatScore = (score: number) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(score);
const formatAxisScore = (score: number) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(score);

export const GameGraph = () => {
  const chartId = useId().replace(/:/g, "");
  const rounds = useAppSelector(selectAllRounds);
  const players = useAppSelector(selectPlayersProfile);
  const orderedRounds = [...rounds].sort(
    (first, second) =>
      first.created - second.created || first.round - second.round,
  );
  const plotWidth = chartWidth - chartPadding.left - chartPadding.right;
  const plotHeight = chartHeight - chartPadding.top - chartPadding.bottom;

  const series: PlayerSeries[] = players.map((player, playerIndex) => {
    let total = 0;
    const scores = orderedRounds.map((round: TRound) => {
      total += round.score?.[player.playerId] ?? 0;
      return total;
    });

    return {
      player,
      color: playerColors[playerIndex % playerColors.length],
      scores,
    };
  });
  const allScores = series.flatMap(({ scores }) => scores);
  let minScore = Math.floor(allScores.length ? Math.min(...allScores) : 0);
  const maxScore = Math.ceil(allScores.length ? Math.max(...allScores) : 0);

  if (minScore === maxScore) minScore -= 1;

  const getX = (index: number) =>
    chartPadding.left +
    (orderedRounds.length <= 1
      ? plotWidth / 2
      : (index / (orderedRounds.length - 1)) * plotWidth);
  const getY = (score: number) =>
    chartPadding.top +
    ((maxScore - score) / (maxScore - minScore)) * plotHeight;
  const firstIntegerTick = minScore;
  const lastIntegerTick = maxScore;
  const scoreTicks = Array.from({ length: 5 }, (_, index) => {
    const score =
      lastIntegerTick -
      Math.round(((lastIntegerTick - firstIntegerTick) * index) / 4);
    return { score, y: getY(score) };
  }).filter(
    (tick, index, ticks) =>
      ticks.findIndex((candidate) => candidate.score === tick.score) === index,
  );
  const roundLabelInterval = Math.max(
    1,
    Math.ceil((orderedRounds.length - 1) / 7),
  );

  return (
    <section className="game-graph">
      <header className="game-graph__header d-flex align-items-center justify-content-between gap-2 px-3 py-3">
        <div className="d-flex align-items-center gap-3">
          <span className="game-graph__icon" aria-hidden="true">
            <FaChartLine />
          </span>
          <div>
            <h2 className="fs-6 fw-semibold mb-1">{text.gameGraph.header}</h2>
            <p className="game-graph__subtitle mb-0">
              {text.gameGraph.chartLabel}
            </p>
          </div>
        </div>
        <span className="game-graph__round-count">
          {orderedRounds.length} {text.gameGraph.rounds}
        </span>
      </header>
      {players.length === 0 ? (
        <p className="mb-0 px-3 pb-3 text-secondary">
          {text.gameGraph.noPlayers}
        </p>
      ) : (
        <>
          <div className="game-graph__chart px-2">
            <svg
              className="game-graph__svg"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              role="img"
              aria-label={`${text.gameGraph.chartLabel}, ${orderedRounds.length} ${text.gameGraph.rounds}`}
            >
              <defs>
                {series.map(({ player, color }) => (
                  <linearGradient
                    id={`${chartId}-${player.playerId}`}
                    key={player.playerId}
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                  </linearGradient>
                ))}
              </defs>
              {scoreTicks.map(({ score, y }) => (
                <g key={score}>
                  <line
                    x1={chartPadding.left}
                    x2={chartWidth - chartPadding.right}
                    y1={y}
                    y2={y}
                    className="game-graph__gridline"
                  />
                  <text
                    x={chartPadding.left - 8}
                    y={y}
                    className="game-graph__axis-label"
                    textAnchor="end"
                    dominantBaseline="middle"
                  >
                    {formatAxisScore(score)}
                  </text>
                </g>
              ))}
              <line
                x1={chartPadding.left}
                x2={chartWidth - chartPadding.right}
                y1={chartHeight - chartPadding.bottom}
                y2={chartHeight - chartPadding.bottom}
                className="game-graph__axis"
              />
              <text
                x={chartPadding.left / 2}
                y={chartPadding.top + plotHeight / 2}
                className="game-graph__axis-label"
                textAnchor="middle"
                transform={`rotate(-90 ${chartPadding.left / 2} ${chartPadding.top + plotHeight / 2})`}
              >
                {text.gameGraph.yAxis}
              </text>
              {orderedRounds.map((round, index) => {
                const isLabeledRound =
                  index % roundLabelInterval === 0 ||
                  index === orderedRounds.length - 1;

                return isLabeledRound ? (
                  <text
                    key={round.roundId}
                    x={getX(index)}
                    y={chartHeight - chartPadding.bottom + 18}
                    className="game-graph__axis-label"
                    textAnchor="middle"
                  >
                    {index + 1}
                  </text>
                ) : null;
              })}
              <text
                x={chartPadding.left + plotWidth / 2}
                y={chartHeight - 4}
                className="game-graph__axis-label"
                textAnchor="middle"
              >
                {text.gameGraph.xAxis}
              </text>
              {series.map(({ player, color, scores }) => {
                const points = scores.map((score, index) => ({
                  score,
                  x: getX(index),
                  y: getY(score),
                  round: index + 1,
                }));
                const path = points
                  .map(
                    (point, index) =>
                      `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`,
                  )
                  .join(" ");
                const areaPath =
                  points.length > 0
                    ? `${path} L ${points[points.length - 1].x} ${getY(0)} L ${points[0].x} ${getY(0)} Z`
                    : "";

                return (
                  <g key={player.playerId}>
                    {points.length > 0 && (
                      <path
                        d={areaPath}
                        className="game-graph__area"
                        fill={`url(#${chartId}-${player.playerId})`}
                      />
                    )}
                    {points.length > 0 && (
                      <path
                        d={path}
                        className="game-graph__line"
                        stroke={color}
                      />
                    )}
                    {points.map((point) => (
                      <circle
                        key={point.round}
                        cx={point.x}
                        cy={point.y}
                        r={orderedRounds.length < 12 ? "4" : "3"}
                        className="game-graph__point"
                        fill={color}
                        stroke={color}
                      >
                        <title>
                          {`${text.gameGraph.round} ${point.round}: ${player.name}, ${formatScore(point.score)}`}
                        </title>
                      </circle>
                    ))}
                  </g>
                );
              })}
            </svg>
          </div>
          <ul className="game-graph__legend d-flex flex-wrap gap-2 list-unstyled mb-0 px-3 pb-3">
            {series.map(({ player, color, scores }) => (
              <li
                className="game-graph__legend-item"
                key={player.playerId}
                style={{ borderColor: color }}
              >
                <span
                  className="game-graph__legend-dot"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                />
                <span className="text-truncate">{player.name}</span>
                <span className="game-graph__legend-score">
                  {formatScore(scores[scores.length - 1] ?? 0)}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};
