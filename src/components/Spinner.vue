<template>
<div style="{ display: block; text-align: center;}">
  <div class="spin"></div>
  Loading... please wait !

</div>
</template>

<script>
export default {

}
</script>

<style>
    .spin{
        display: block;
        width: 45px;
        height: 45px;
        margin: 45px auto;
        border: 3px solid transparent;
        border-radius: 50%;
        border-top-color: #ff8000;
        animation: spin 1s ease infinite;
    }
    @keyframes spin {
        to {
            transform: rotateZ(360deg);
        }
        0%{
            border-top-color: #ff8000;
        }
        50%{
            border-top-color: #ffee00;
        }
        80%{
            border-top-color: #00ffbf;
        }
        100%{
            border-top-color: #0084ff;
        }
    }
</style>
