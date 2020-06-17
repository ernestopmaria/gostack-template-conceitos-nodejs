const express = require("express");
const {uuid, isUuid} = require('uuidv4');
const cors = require("cors");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
const likes = 0;

app.get("/repositories", (request, response) => {

  return response.json(repositories);
  // TODO

});

app.post("/repositories", (request, response) => {
 
   const {title, techs, url} = request.body;
  const repository ={id:uuid(), title, techs, url, likes}

 repositories.push(repository);
return response.json(repository);
  // TODO
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, techs, url} = request.body;

  const repositoryIndex = repositories.findIndex(repository=>repository.id===id);
  if (repositoryIndex < 0){
    return request.status(400).json({ error:'id not found'});
  }
  const repo ={ id, title, techs, url};
 repositories[repositoryIndex] = repo;

 return response.json(repo);



  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(repo=>repo.id===id);
  if (repositoryIndex < 0){
    return request.status(400).json({ error:'repositorie not found'})}
  
    repositories.splice(repositoryIndex,1);
    return response.status(204).send();

});



 app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params;
  
    const repo = repositories.find( repository => repository.id === id );
  
    if (!repo) {
      return response.status(400).send({error:'id dont exixt'});
    }
  
    repo.likes += 1;
  
    return response.json(repo);
  
  });



module.exports = app;
