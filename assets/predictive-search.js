class PredictiveSearch extends HTMLElement {
  constructor() {
    super();

    this.input = this.querySelector('#searchbox');
    this.predictiveSearchResults = this.querySelector('#predictive-search');

    this.input.addEventListener('input', this.debounce((event) => {
      this.onChange(event);
    }, 300).bind(this));
  }

  onChange() {
    const searchTerm = this.input.value.trim();

    if (!searchTerm.length) {
      this.close();
      return;
    }

    this.getSearchResults(searchTerm);
  }

  getSearchResults(searchTerm) {
    fetch(`/search/suggest?q=${searchTerm}&resources[type]=product,collection&resources[limit]=4&section_id=predictive-search`)
      .then((response) => {
        if (!response.ok) {
          var error = new Error(response.status);
          this.close();
          throw error;
        }

        return response.text();
      })
      .then((text) => {
        
        const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').querySelector('#shopify-section-predictive-search').innerHTML;
       
        if(((resultsMarkup.trim().length<=0) || (searchTerm.length<=0)))
        {
           $('#top-searches').css("display","block");
          $('#recent-search').css("display","block");
          
          if(searchTerm.length>0)
          {
              this.predictiveSearchResults.innerHTML = 'No results found for <b>"'+searchTerm+'"</b>';
          }
        }
        else
        {
          this.predictiveSearchResults.innerHTML = resultsMarkup;
            $('#top-searches').css("display","none");
    $('#recent-search').css("display","none");
        }
        this.open();
       
      })
      
      .catch((error) => {
        this.close();
        throw error;
      });
  }

  open() {
    this.predictiveSearchResults.style.display = 'block';
  
  }

  close() {
    //this.predictiveSearchResults.style.display = 'none';
    
     $('#top-searches').css("display","block");
    $('#recent-search').css("display","block");
    
  }

  debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }
}

customElements.define('predictive-search', PredictiveSearch);
