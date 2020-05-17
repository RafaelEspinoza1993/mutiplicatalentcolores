<template lang="pug">
  #app.section
    .top
      h1.title Colores
    .center
      .boxes(v-for="(value, index) in data" :key="index" v-clipboard:copy="value.color" @click="clickcopy(value.color)" )
        span.is-size-5.year {{value.year}}
        span.is-size-5.name {{value.name}}
        span.is-size-5.color {{value.color}}
        span.is-size-5.pantone {{value.pantone_value}}
    .back
      a.arrowleft(@click="afterpage(page)" v-if="page != 1")
        span.icon
          i.fas.fa-arrow-left
        .is-size-5 Anterior
      div(v-else)
      a.arrowright(@click="beforepage(page)" v-if="total_pages != page")
        .is-size-5 Siguiente
        span.icon
          i.fas.fa-arrow-right
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      data: [],
      page: 1,
      per_page: 6,
      total: 0,
      total_pages: 0,
      loading: false
    };
  },
  methods: {
    /*
     * Load async data
     */
    loadAsyncData() {
      const params = { page: this.page, per_page: this.per_page };

      this.loading = true;
      axios
        .get("https://reqres.in/api/colors", {
          params
        })
        .then(response => {
          this.data = [];
          this.page = response.data.page;
          this.per_page = response.data.per_page;
          this.total = response.data.total;
          this.total_pages = response.data.total_pages;
          response.data.data.forEach(item => {
            this.data.push(item);
          });
          this.loading = false;
        })
        .catch(error => {
          this.data = [];
          this.total = 0;
          this.loading = false;
          throw error;
        });
    },
    beforepage(page) {
      this.page = page + 1;
      this.loadAsyncData();
    },
    afterpage(page) {
      this.page = page - 1;
      this.loadAsyncData();
    },
    clickcopy(color) {
      alert("Color " + color + " copy!");
    }
  },
  mounted() {
    this.loadAsyncData();
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1920px;
  .top,
  .back,
  .boxes {
    border: 1px solid black;
    border-radius: 10px;
    text-align: center;
    h1 {
      margin: 10px;
    }
  }
  .arrowleft,
  .arrowright,
  .back {
    display: flex;
    align-items: center;
  }
  .back {
    justify-content: space-between;
  }
  .boxes,
  .center {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .center {
    margin: 10px;
    gap: 10px;
  }
  .boxes {
    padding: 0 10px;
    background: #d4d4d4;
    grid-template-rows: repeat(6, 1fr);
    cursor: pointer;
    text-decoration: none;
  }
  .boxes:hover {
    background: white;
  }
  .year {
    grid-area: 1/1/1/1;
    text-align: left;
  }
  .name,
  .color {
    text-align: center;
  }
  .name {
    grid-area: 3/2/3/2;
    width: max-content;
    justify-self: center;
  }
  .color {
    grid-area: 4/2/4/2;
  }
  .pantone {
    grid-area: 6/3/6/3;
    text-align: right;
  }
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #252525;
  }
  @media only screen and (max-width: 1024px) {
    .center {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media only screen and (max-width: 769px) {
    .center {
      grid-template-columns: 1fr;
    }
  }
}
</style>
