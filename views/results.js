const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (pages) => layout(html`
  <h3>Results</h3>
  <hr>
  <form method="GET" action="/wiki/search">
    <input type="text" name="search" placeholder="Search for a tag"/>
    <button type="submit">Search</button>
  </form>
  <hr>
  <ul class="list-unstyled">
    <ul>
      ${pages.forEach(el => console.log(el.slug))}
      ${pages.map(el => `<a href='/wiki/${el.slug}'>${el.title}</a><br/>`)}
    </ul>
  </ul>`);