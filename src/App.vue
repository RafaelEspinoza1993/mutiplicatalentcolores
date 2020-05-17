<template lang="pug">
  #app.section
    b-loading(:is-full-page='true' :active.sync='loading' :can-cancel='false')
    b-modal(:active.sync='isModalActive')
      .boxesdetail
        span.is-size-5.year.has-text-weight-medium {{dataselected.year}}
        span.is-size-5.name.has-text-weight-medium ¡Copiado!
        span.is-size-5.pantone.has-text-weight-medium {{dataselected.pantone_value}}
    .top
      h1.title.has-text-weight-bold Colores
    .center
      .boxes(v-for="(value, index) in data" :key="index" v-clipboard:copy="value.color" @click="clickcopy(value)" )
        span.is-size-5.year.has-text-weight-medium {{value.year}}
        span.is-size-5.name.has-text-weight-medium {{value.name}}
        span.is-size-5.color.has-text-weight-semibold {{value.color}}
        span.is-size-5.pantone.has-text-weight-medium {{value.pantone_value}}
    footer.back
      a.arrowleft(@click="afterpage(page)" v-if="page != 1")
        span.icon
          i.fas.fa-arrow-left
        .is-size-5.has-text-weight-medium Anterior
      div(v-else)
      a.arrowright(@click="beforepage(page)" v-if="total_pages != page")
        .is-size-5.has-text-weight-medium Siguiente
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
      loading: false,
      isModalActive: false,
      dataselected: []
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
    clickcopy(row) {
      this.dataselected = [];
      this.dataselected = row;
      this.isModalActive = true;
    }
  },
  mounted() {
    this.loadAsyncData();
  }
};
</script>

<style lang="scss">
$grey: #d4d4d4;
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1030px;
  margin: 0 auto;
  .top,
  .back,
  .boxes,
  .boxesdetail {
    border: 1px solid black;
    border-radius: 10px;
    text-align: center;
    h1 {
      margin: 10px;
    }
  }
  .boxesdetail {
    background: $grey;
    width: 310px;
    height: 180px;
    margin: 0 auto;
    padding: 0 10px;
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
  .boxesdetail {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .center {
    margin: 10px 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }
  .boxes {
    padding: 0 10px;
    background: $grey;
    grid-template-rows: repeat(6, 1fr);
    cursor: pointer;
    text-decoration: none;
    width: 315px;
    margin: 5px;
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
}
</style>
