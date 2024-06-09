<script>
  import Scrolly from "./Scrolly.svelte";
  import katexify from "../katexify";
  import { select, selectAll } from "d3-selection";

  // scroll iterator
  let value;

  // Paragraph text for scrolly
  $: steps = [
    `<h1 class='step-title'>Offense Vs Defense</h1>
       <br><br>
      <p>
        Two statistics commonly used in the NBA are Offensive and Defensive Rating. These stats attempt to meaure a player's overall offensive and defensive performance.
      </p>`,
    `<h1 class='step-title'>Quantifying Performances</h1>
      <p>
        The visualization below plots players' defensive ratings over their offensive ratings. A third variable, minutes per game, is measured in the size of the bubble.
      </p>
    <br><br>
    Keep in mind, a higher offensive ratings and a lower defensive rating indicate better performance.
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

<body>
<h2 style="background-color: white" class="body-header">Putting It Together</h2>
<p style="background-color: white" class="body-text">
  The charts above successfully measure players' key offensive and defensive statistics. But how can we compare stats on both ends of the court for the same player?
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
        <img src="lebronoffense.jpg" alt="Lebron Offense" class="chart-image" />
      </div>
      <div class="chart-two">
        <img src="lebrondefense.jpg" alt="Lebron Defense" class="chart-image" />
      </div>
    </div>
  </div>
  <br /><br />
  <p class="body-text" style="padding: 10px; background-color: white">Below, you will find the Offense vs. Defense chart.</p>
</section>
</body>

<style>

  body {
    background-image: url("court2.jpg");
    background-size: 1600px;;
  }

  .chart-one,
  .chart-two {
    width: 100%;
    height: 100%;
  }

  .chart-image {
    width: 60%;
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
