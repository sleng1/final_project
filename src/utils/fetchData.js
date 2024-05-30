import { csv } from 'd3-fetch';

export async function fetchCSVData(filePath) {
  const data = await csv(filePath);
  return data.map(d => ({
    team: d.Team,
    player: d.Player,
    points: +d.PTS,
    assists: +d.AST,
    rebounds: +d.REB,
    minutes: +d.MIN
  }));
}