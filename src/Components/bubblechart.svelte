<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  let teams = [];
  let selectedTeam = '';
  let players = [];
  let data = [];

  // Load and parse the CSV data
  async function loadData() {
    data = await d3.csv('/final_project/dataforfinal/2024_playoffs_data.csv');
    teams = Array.from(new Set(data.map(d => d.Team)));
    selectedTeam = teams[0];
    updateChart();
  }

  function updateChart() {
    players = data.filter(d => d.Team === selectedTeam);
    drawChart(players);
  }

  function drawChart(data) {
    const width = 800;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };

    const svg = d3.select('#chart')
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => +d.AST)]).nice()
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => +d.PTS)]).nice()
      .range([height - margin.bottom, margin.top]);

    const r = d3.scaleSqrt()
      .domain([0, d3.max(data, d => +d.FGM)])
      .range([0, 20]);

    const xAxis = g => g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80));

    const yAxis = g => g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(height / 40));

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', margin.top / 2)
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')
      .attr('font-weight', 'bold')
      .text('NBA Playoffs 2024: Offensive Performance Analysis by Team');

    // Add X axis label
    svg.append('text')
      .attr('text-anchor', 'end')
      .attr('x', width / 2 + margin.left)
      .attr('y', height - 10)
      .text('Assists');

    // Add Y axis label
    svg.append('text')
      .attr('text-anchor', 'end')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2 + margin.top)
      .attr('y', 20)
      .text('Points');

    svg.append('g')
      .attr('stroke', 'black')
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', d => x(d.AST))
      .attr('cy', d => y(d.PTS))
      .attr('r', d => r(d.FGM))
      .attr('fill', 'steelblue')
      .append('title')
      .text(d => `${d.Player}\nAST: ${d.AST}\nPTS: ${d.PTS}\nFGM: ${d.FGM}`);
  }

  onMount(loadData);
</script>

<main>
  <label for="team-select">Select Team:</label>
  <select id="team-select" bind:value={selectedTeam} on:change={updateChart}>
    {#each teams as team}
      <option value={team}>{team}</option>
    {/each}
  </select>
  <svg id="chart"></svg>
</main>

<style>
  main {
    font-family: Arial, sans-serif;
    margin: 20px;
  }
  label {
    margin-right: 10px;
  }
  select {
    margin-bottom: 20px;
  }
</style>
