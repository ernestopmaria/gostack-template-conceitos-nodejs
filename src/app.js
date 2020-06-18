const express = require("express");
const {uuid, isUuid} = require('uuidv4');
const cors = require("cors");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
const likes = 0;

function logResquest (request, response, next){
  const {method, url} = request;
  const logLabel=`[${method.toUpperCase()}]${url}`;

  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
}

function validateRepositoryId(request, response , next){
  const {id }= request.params;

  if(!isUuid(id)){
      return response.status(400).json({error:"invalid id Respository"});
  }
  return next();
}
app.use(logResquest);
app.use('/repositories/:id/like', validateRepositoryId);
app.use('/repositories/:id', validateRepositoryId);

app.get("/repositories", (request, response) => {

  return response.json(repositories);
  // TODO

});

app.post("/repositories", (request, response) => {
 
   const {title, techs, url} = request.body;
  const repo ={id:uuid(), title, techs, url, likes}

 repositories.push(repo);
return response.json(repo);
  // TODO
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, techs, url} = request.body;

  const repositorieIndex = repositories.findIndex(repo=>repo.id===id);
  if (repositorieIndex < 0){
    return request.status(400).json()
  }
  const repo ={ id, title, techs, url,likes};
 repositories[repositorieIndex] = repo;

 return response.json(repo);



  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repositorieIndex = repositories.findIndex(repo=>repo.id===id);
  if (repositorieIndex < 0){
    return request.status(400).json()}
  
    repositories.splice(repositorieIndex,1);
    return response.status(204).send();

});



 app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params;
  
    const repo = repositories.find( repository => repository.id === id );
  
    if (!repo) {
      return response.status(400).send();
    }
  
    repo.likes += 1;
  
    return response.json(repo);
  
  });



module.exports = app;
