const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () => layout(html`
  <h3>Add a Page</h3>
  <hr>
  <form method="POST" action="/wiki/">
    
    
    <div class="form-group">
      <label for="name" class="col-sm-2 control-label">Name</label>
        <div class="col-sm-10">
          <input id="name" name="name" type="text" class="form-control" placeholder="Name"/>
        </div>
        
      <label for="email" class="col-sm-2 control-label">Email</label>
      <div class="col-sm-10">
        <input id="email" name="email" type="text" class="form-control" placeholder="Email Here"/>
      </div>  

      <label for="title" class="col-sm-2 control-label">Page Title</label>
      <div class="col-sm-10">
        <input id="title" name="title" type="text" class="form-control" placeholder="Page Title"/>
      </div>

      <label for="content" class="col-sm-2 control-label">Content</label>
      <div class="col-sm-10">
        <textarea id="content" name="content" type="textarea" class="form-control" placeholder="Write your post here.."></textarea>
      </div>

      <label for="tags" class="col-sm-2 control-label">Tags</label>
      <div class="col-sm-10">
        <input id="tags" name="tags" type="text" class="form-control" placeholder="Add any tags here. ex) #dev #coding.."/>
      </div>

      <label for="status" class="col-sm-2 control-label">Status</label>
      <div class="col-sm-10">
        <select class="form-control" id="status" name='status'>
          <option value="closed">closed</option>
          <option valut="open">open</option>
        </select>
      </div>
      
    </div>

    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary">submit</button>
    </div>
  
  </form>
`);