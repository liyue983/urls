new Vue({
  el: '#app',
  data: {
    error: '',
    success: false,
    name: '',
    url: '',
  },
  methods: {
    createPuny() {
      const body = {
        name: this.name,
        url: this.url
      };

      fetch('/api/puny', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json'
        }
      }).then(response => {
        return response.json();
      }).then(result => {
        if (result.err) {
          this.error = result.err;
        } else {
          this.success = true;
        }
      });
    }
  }
});