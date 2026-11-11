const express = require("express");
const router = express.Router();

const fs = require("fs")
const path = require("path")

const caminho = path.join(
    __dirname,
    "..",
    "data",
    "clientes.json"
)
const conteudo = fs.readFileSync(caminho, "utf8")

const clientes = JSON.parse(conteudo)



router.get("/", (req, res) => {
    res.render("clientes/index", {
        clientes: clientes
    })
});

router.get("/cadastro", (req, res) => {
    res.render("clientes/form-cadastro", {
        erro: null
    })
})

router.post("/", (req, res) => {
    const {nome, email} = req.body;

    if(nome.trim() === "" || email.trim() === ""){
        return res.render("clientes/form-cadastro", {
            erro: "Preencha todos os campos!"
        })
    }

    let novoCliente = {
        id: clientes.length+1,
        nome,
        email
    }

    clientes.push(novoCliente);

    fs.writeFileSync(
        caminho,
        JSON.stringify(clientes, null, 2)
    )
    res.redirect("/clientes")
})

router.get("/excluir/:id", (req, res) => {
  let id = req.params.id;

  for(let i in clientes) {
    if(clientes[i].id == id){
      clientes.splice(i, 1)
    }
  }
  fs.writeFileSync(
        caminho,
        JSON.stringify(clientes, null, 2)
    )
  res.redirect("/clientes")
})

router.get("/editar/:id", (req, res) => {
  let id = req.params.id;
  let cliente = clientes.find(c => c.id == id);

  res.render("clientes/editar", {cliente});

});

router.post("/editar/:id", (req, res) => {
  let {nome, email} = req.body;
  let id = req.params.id;

  for(let i in clientes){
    if(clientes[i].id == id){

      clientes[i].nome = nome
      clientes[i].email = email

    }
    fs.writeFileSync(
        caminho,
        JSON.stringify(clientes, null, 2)
    )
  }
  res.redirect("/clientes")
})


module.exports = router;