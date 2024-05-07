<script lang="ts">
  import Block from './components/Block.svelte';
  const switchIcon = '/src/icons/switch-arrow-button-svgrepo-com.svg';
  let conversionRate: number = 0;
  let selectedСurrency: string = 'RUB';
  let selectedExchangeСurrency: string = 'USD';

  let inptObj: { [key: string]: string } = {
    newRateValue: '',
    userValue: '',
  };

  async function convertNewRate() {
    await getCurrentRate();

    inptObj.newRateValue = (conversionRate * Number(inptObj.userValue)).toFixed(
      3
    );
  }

  async function convertoReverseRate() {
    await getCurrentRate();

    inptObj.userValue = (Number(inptObj.newRateValue) / conversionRate).toFixed(
      3
    );
  }
  // https://v6.exchangerate-api.com/v6/daff82882d3f7cf4d019916b/latest/
  async function getCurrentRate() {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/6dcca3ceb9465dc40bb41dbb/latest/${selectedСurrency}`
      );
      let res = await response.json();
      conversionRate = res.conversion_rates[selectedExchangeСurrency];
    } catch (err) {
      console.error(err);
    }
  }
</script>

<div class="container">
  <Block
    titel={'У меня есть'}
    funcConvert={() => convertNewRate()}
    {inptObj}
    convertBtn={(item) => {
      selectedСurrency = item;
      convertNewRate();
    }}
    selected={selectedСurrency}
    keyObj="userValue"
  />
  <button
    on:click={() => {
      let a = selectedСurrency;
      let b = selectedExchangeСurrency;
      selectedСurrency = b;
      selectedExchangeСurrency = a;
      convertNewRate();
    }}
  >
    <img src={switchIcon} alt="switch" />
  </button>
  <Block
    titel={'Хочу приобрести'}
    funcConvert={() => convertoReverseRate()}
    {inptObj}
    convertBtn={(item) => {
      selectedExchangeСurrency = item;
      convertNewRate();
    }}
    selected={selectedExchangeСurrency}
    keyObj="newRateValue"
  />
</div>

<style>
  .block {
    display: flex;
    flex-direction: column;
  }
  .container {
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    gap: 30px;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 50px 1fr;
    align-content: center;
    padding: 0 30px;
  }

  @media (max-width: 767.98px) {
    .container {
      grid-template-columns: 1fr;
    }
  }
  button {
    background-color: #fff;
    border: none;
    cursor: pointer;
    align-self: center;
    padding: 0;
  }
</style>
