<script>
  import Scrolly from "./Scrolly.svelte";
  import katexify from "../katexify";
  import { select, selectAll } from "d3-selection";

  // scroll iterator
  let value;

  // Paragraph text for scrolly
  $: steps = [
    `<h1 class='step-title'>Offensive Obliteration</h1>
       <br><br>
      <p>
        This visualization allows for a clear comparison between teams, highlighting which teams excel offensively and how specific offensive features correlate with their overall win shares. Teams with longer bars have higher win shares, indicating a stronger offensive performance, while the color segmentation within each bar provides insights into the specific offensive strengths of each team. 
      </p>`,
    `<h1 class='step-title'>Defensive Demeanor</h1>
      <p>
        Each bar in the chart represents a different team, with the length of the bar indicating the total defensive win shares. The bars are divided into segments, each representing contributions from essential defensive metrics such as blocks (BLK), steals (STL), defensive rebounds (DREB), and opponent field goal percentage (OFG%).
        </p>
    <br><br>
    The color segmentation within each bar reveals which specific defensive features are the strongest for each team. For instance, a team with a significant portion of its bar in the 'blocks' segment highlights its strength in shot-blocking.
  `,
  ];

  const target2event = {
    0: () => {
      // console.log('0' )
    },
    1: () => {
      select("#chart1").style("background-color", "red");
      select("#chart2").style("background-color", "green");
    },

    2: () => {
      select("#chart1").style("background-color", "purple");
      select("#chart2").style("background-color", "coral");
    },
  };

  $: if (typeof value !== "undefined") target2event[value]();
</script>

<h2 class="body-header">Analyzing metrics on Both Ends of the Court</h2>
<p class="body-text">
  From these 2 bubble charts, our goal is to display each players performance and contribution
  on both sides of the ball, the larger the radius of circle indicates their presence on the Court is an asset to their teams success
  :
</p>
<section>
  <!-- scroll container -->
  <div class="section-container">
    <div class="steps-container">
      <Scrolly bind:value>
        {#each steps as text, i}
          <div class="step" class:active={value === i}>
            <div class="step-content">{@html text}</div>
          </div>
        {/each}
        <div class="spacer" />
      </Scrolly>
    </div>
    <div class="charts-container">
      <div class="chart-one">
        <img src="dist/offense.jpg" alt="Jordan Offense" class="chart-image" />
      </div>
      <div class="chart-two">
        <img src="dist/defense.jpg" alt="Jordan Defense" class="chart-image" />
      </div>
    </div>
  </div>
  <br /><br />
  <p class="body-text">You'll find the defense bubble chart below.</p>
</section>

<style>
  .chart-one,
  .chart-two {
    width: 100%;
    height: 100%;
  }

  .chart-image {
    width: 100%;
    height: auto; /* Maintain aspect ratio */
    max-height: 100%; /* Ensure it doesn't exceed the container height */
    display: block;
    margin: auto;
  }

  /* space after scroll is finished */
  .spacer {
    height: 40vh;
  }

  .charts-container {
    position: sticky;
    top: 10%;
    display: grid;
    width: 50%;
    grid-template-columns: 100%;
    grid-row-gap: 2rem;
    grid-column-gap: 0rem;
    grid-template-rows: repeat(2, 1fr);
    height: 85vh;
    border: 3px solid black;
  }

  .section-container {
    margin-top: 1em;
    text-align: center;
    transition: background 100ms;
    display: flex;
  }

  .step {
    height: 110vh;
    display: flex;
    place-items: center;
    justify-content: center;
  }

  .step-content {
    font-size: 18px;
    background: var(--bg);
    color: #ccc;
    border-radius: 1px;
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: background 500ms ease;
    text-align: left;
    width: 75%;
    margin: auto;
    max-width: 500px;
    font-family: var(--font-main);
    line-height: 1.3;
    border: 5px solid var(--default);
  }

  .step.active .step-content {
    background: #f1f3f3ee;
    color: var(--squid-ink);
  }

  .steps-container {
    height: 100%;
  }

  .steps-container {
    flex: 1 1 40%;
    z-index: 10;
  }

  /* Comment out the following line to always make it 'text-on-top' */
  @media screen and (max-width: 950px) {
    .section-container {
      flex-direction: column-reverse;
    }

    .steps-container {
      pointer-events: none;
    }

    .charts-container {
      top: 7.5%;
      width: 95%;
      margin: auto;
    }

    .step {
      height: 130vh;
    }

    .step-content {
      width: 95%;
      max-width: 768px;
      font-size: 17px;
      line-height: 1.6;
    }

    .spacer {
      height: 100vh;
    }
  }
</style>
