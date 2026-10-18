const express = require("express");
const router = express.Router();

let clientes = [
    {
        id: 1,
        nome: "Pedro",
        email: "zaguipedro03@gmail.com"
    },
    {
        id: 2,
        nome: "Lucas",
        email: "lucasacamargo2010@gmail.com"
    }
];

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

    if(nome === "" || email === ""){
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
    res.redirect("/clientes")
})

router.get("/excluir/:id", (req, res) => {
  let id = req.params.id;

  for(let i in clientes) {
    if(clientes[i].id == id){
      clientes.splice(i, 1)
    }
  }
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
  }
  res.redirect("/clientes")
})


module.exports = router;