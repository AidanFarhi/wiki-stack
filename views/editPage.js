const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (page, author) => layout(html`
  <h3>Edit a Page</h3>
  <hr>
  <form method="POST" action="/wiki/${page.slug}/edit">

    <h5>${author.name}</h5>
    
    <h5>${author.email}</h5>

    <div class="form-group">
      <label for="title" class="col-sm-2 control-label">Page Title</label>
      <div class="col-sm-10">
        <input required name="title" type="text" class="form-control" placeholder="${page.title}"/>
      </div>

      <label for="tags" class="col-sm-2 control-label">Page Tags</label>
      <div class="col-sm-10">
        <input required name="tags" type="text" class="form-control" placeholder="${page.tags.map(tg => `#${tg} `)}"/>
      </div>

      <label for="content" class="col-sm-2 control-label">Page Content</label>
      <div class="col-sm-10">
        <textarea required name="content" type="text" class="form-control" placeholder="${page.content}"></textarea>
      </div>

    </div>


    <div class="form-group">
      <label for="content" class="col-sm-2 control-label">Status</label>
      <div class="col-sm-10">
        <select name="status">
          <option ${page.status == "open" ? "selected" : ""}>open</option>
          <option ${page.status == "closed" ? "selected" : ""}>closed</option>
        </select>
      </div>
    </div>

    <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-primary">submit</button>
    </div>
  </form>
`);
