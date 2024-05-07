<script lang="ts">
  import CurrencyTab from './CurrencyTab.svelte';
  export let selected: string;
  export let funcConvert: () => void;
  export let convertBtn: (item: string) => void;
  export let titel: string = 'У меня есть';
  export let keyObj: string;
  export let inptObj: { [key: string]: string };

  let timer: ReturnType<typeof setTimeout>;

  const debounce = (func: () => void, deley: number) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, deley);
  };

  const onKeyUp = (e: Event) => {
    let value = (e.target as HTMLInputElement).value.replace(/^\./, '').trim();

    if (/^[\d.]*$/.test(value)) {
      inptObj[keyObj] = value;
    }
    if (!/^[\d.]*$/.test(value) || /(\..*?)\..*/.test(value)) {
      inptObj[keyObj] = value.slice(0, value.length - 1);
    }
    debounce(funcConvert, 500);
  };
</script>

<div class="block">
  <h2>{titel}</h2>
  <CurrencyTab onClick={(item) => convertBtn(item)} isActive={selected} />

  <input
    on:keyup={(e) => onKeyUp(e)}
    bind:value={inptObj[keyObj]}
    type="text"
  />
</div>

<style>
  .block {
    display: flex;
    flex-direction: column;
  }
  input {
    max-width: 100%;
    font-size: 24px;
    font-weight: 700;
    padding: 10px 5px;
  }
</style>
