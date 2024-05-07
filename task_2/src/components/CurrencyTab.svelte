<script lang="ts">
  export let onClick: (value: string) => void;
  export let isActive: string;
  const buttons = ['RUB', 'USD', 'EUR'];
</script>

<div class="container-btn">
  {#each buttons as item}
    <button
      class={`btn ${item === isActive ? '_active' : ''}`}
      on:click={() => {
        isActive = item;
        onClick(item);
      }}>{item}</button
    >
  {/each}
</div>

<style>
  .btn {
    flex: 0 1 33.333%;
    background-color: #fff;
    border: 1px solid #cdcdcd;
    font-size: 20px;
    padding: 8px 12px;
    border-right: 1px solid #cdcdcd;
    border-left: 0px;
    cursor: pointer;
  }

  .btn:first-child {
    border-radius: 4px 0px 0px 4px;
    border-left: 1px solid #cdcdcd;
  }
  .btn:last-child {
    border-radius: 0px 4px 4px 0px;
  }

  ._active {
    transition: all 0.4s ease 0s;
    background-color: rgb(21, 204, 164);
    color: #fff;
  }

  .container-btn {
    display: flex;
    margin-bottom: 20px;
  }
</style>
