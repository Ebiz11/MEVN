
var vm = new Vue({
  el: '#vue-app-one',
  data: {
    api : 'http://localhost:4000/api/ninjas',
    ninjas: [],
    ninjasId: {
      _id:"",
      name:"",
      rank:""
    },
  },

  methods: {
    getNinjas() {
      this.$http.get(this.api).then(
      res => {
        this.ninjas = res.body;
      }, err => {
      });
    },
    deleteNinjas(id){
      let del = confirm("Delete Ninjas?");

      if (del) {
        let apiDelete = `${this.api}/${id}`;

        this.$http.delete(apiDelete).then(
        res => {
          this.getNinjas();
        }, err => {
        });
      }
    },
    getNinjasId(id){
      let apiGetNinjasId = `${this.api}/${id}`;

      this.$http.get(apiGetNinjasId).then(
      res => {
        this.ninjasId._id = res.body[0]._id;
        this.ninjasId.name = res.body[0].name;
        this.ninjasId.rank = res.body[0].rank;
      }, err => {
      });
    },
    updateNinjas (id) {
      let apiUpdateNinjas = `${this.api}/${id}`;

      let data = {
        name: this.ninjasId.name,
        rank: this.ninjasId.rank
      };

      this.$http.put(apiUpdateNinjas, data).then(
        res => {
        // this.ninjas = res.body;

        this.ninjasId._id = '';
        this.ninjasId.name = '';
        this.ninjasId.rank = '';

        this.getNinjas();
      }, err => {
      });

    },
    addNinjas(){
      let data = {
        name: this.$refs.name.value,
        rank: this.$refs.rank.value
      };

      this.$http.post(this.api, data).then(
        res => {
        this.getNinjas();
      }, err => {
      });
    },
  },
  mounted() {
    this.getNinjas();
  }
});
