const express = require("express")
const router = express.Router()

const fs = require("fs")
const path = require("path")

const caminho = path.join(
    __dirname,
    "..",
    "data",
    "produtos.json"
)
const conteudo = fs.readFileSync(caminho, "utf8")

const produtos = JSON.parse(conteudo)

router.get("/", (req, res) => {
    res.render("produtos/index",{
        produtos: produtos
    })
})

router.get("/cadastro", (req, res) => {
    res.render("produtos/form-cadastro", {
        erro: null
    })
})

router.post("/", (req, res) => {
    const { nome, preco } = req.body

    if (nome === "" || String(preco) === "") {
        return res.render("produtos/form-cadastro", {
            erro: "Preencha todos os campos"
        })
    }
    else if(Number(isNaN(preco))){
        return res.render("produtos/form-cadastro", {
            erro: "O preço só deve conter números!"
        })
    }

    let novoProduto = {
        id: produtos.length + 1,
        nome,
        preco: Number(preco).toFixed(2).replace(".",",")
    }

    produtos.push(novoProduto)

    fs.writeFileSync(
        caminho,
        JSON.stringify(produtos,null, 2)
    )
    res.redirect("/produtos")
})

router.get("/excluir/:id", (req, res) => {
  let id = req.params.id;

  for(let i in produtos) {
    if(produtos[i].id == id){
      produtos.splice(i, 1)
    }
  }
  fs.writeFileSync(
        caminho,
        JSON.stringify(produtos,null, 2)
    )
  res.redirect("/produtos")
})

router.get("/editar/:id", (req, res) => {
  let id = req.params.id;
  let produto = produtos.find(c => c.id == id);

  res.render("produtos/editar", {produto});


});

router.post("/editar/:id", (req, res) => {
  let {nome, preco} = req.body;
  let id = req.params.id;

  for(let i in produtos){
    if(produtos[i].id == id){

      produtos[i].nome = nome
      produtos[i].preco = Number(preco).toFixed(2)

    }
  }
  fs.writeFileSync(
        caminho,
        JSON.stringify(produtos,null, 2)
    )
  res.redirect("/produtos")
})

module.exports = router;