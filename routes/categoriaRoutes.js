const { render } = require("ejs");
const express = require("express");

const router = express.Router();
// ========================================
// USANDO O ARQUIVO DO DATA/JSON
// ========================================

const fs = require("fs");
const path = require("path");

const caminho = path.join(
  __dirname,
  "..",
  "data",
  "categorias.json"
)

const conteudo = fs.readFileSync(caminho, "utf8")

const categorias = JSON.parse(conteudo)


// ========================================
// DADOS
// ========================================



router.get("/", (req, res) => {
    res.render("categorias/index", {
        categorias: categorias
    })
});

router.get("/cadastro", (req,res) => {
    res.render("categorias/form-cadastro", {
      erro: null
    })

})

router.post("/", (req,res) => {
    const {nome, descricao} = req.body

    if(nome.trim()  === "" || descricao.trim() === ""){
      return res.render("categorias/form-cadastro", {
        erro: "Preencha todos os campos"
      })
    }


    let novaCategoria ={
        id: categorias.length + 1,
        nome,
        descricao
    }

    categorias.push(novaCategoria)

    fs.writeFileSync(
      caminho,
      JSON.stringify(categorias,null, 2)
    )

    res.redirect("/categorias")
})

router.get("/excluir/:id", (req, res) => {
  let id = req.params.id;

  for(let i in categorias) {
    if(categorias[i].id == id){
      categorias.splice(i, 1)

      fs.writeFileSync(
        caminho,
        JSON.stringify(categorias,null, 2)
      )
    }
  }
  res.redirect("/categorias")
})

router.get("/editar/:id", (req, res) => {
  let id = req.params.id;
  let categoria = categorias.find(c => c.id == id);

  res.render("categorias/editar", {categoria});

//   res.render("/categorias/editar", {
//     categoria: categorias[id]
//   })
});

router.post("/editar/:id", (req, res) => {
  let {nome, descricao} = req.body;
  let id = req.params.id;

  for(let i in categorias){
    if(categorias[i].id == id){

      categorias[i].nome = nome
      categorias[i].descricao = descricao

      fs.writeFileSync(
        caminho,
        JSON.stringify(categorias, null, 2)
      )
    }
  }
  res.redirect("/categorias")
})

module.exports = router;