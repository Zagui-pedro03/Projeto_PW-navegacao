const express = require("express");
const router = express.Router();
const {cnpj: cnpjValidate} = require("cpf-cnpj-validator");
const res = require("express/lib/response");

let fornecedores = [
    {
        id: 1,
        cnpj: "25.546.722/0001-77",
        email: "zaguipedro03@gmail.com"
    },
    {
        id: 2,
        cnpj: "14.513.979/0001-06",
        email: "lucasacamargo2010@gmail.com"
    }
]

router.get("/", (req, res) => {
    res.render("fornecedores/index", {
        fornecedores:fornecedores
    });
})

router.get("/cadastro", (req,res) => {
    res.render("fornecedores/form-cadastro", {
        erro: null
    });
})

router.post("/", (req, res) => {
    const {cnpj, email} = req.body;
    
    if(cnpj === "" || email === ""){
        return res.render("fornecedores/form-cadastro", {
            erro: "Preencha todos os campos"
        })
    }

    if(!cnpjValidate.isValid(cnpj)){
        return res.render("fornecedores/form-cadastro",{
            erro: "CNPJ inválido"
        })
    }


    let novoFornecedor = {
        id: fornecedores.length+1,
        cnpj: cnpjValidate.format(cnpj),
        email
    }

    fornecedores.push(novoFornecedor);
    console.log(fornecedores);
    res.redirect("/fornecedores");
})

router.get("/excluir/:id", (req, res) => {
  let id = req.params.id;

  for(let i in fornecedores) {
    if(fornecedores[i].id == id){
      fornecedores.splice(i, 1)
    }
  }
  res.redirect("/fornecedores")
})

router.get("/editar/:id", (req, res) => {
  let id = req.params.id;
  let fornecedor = fornecedores.find(c => c.id == id);

  res.render("fornecedores/editar", {fornecedor});


});

router.post("/editar/:id", (req, res) => {
  let {cnpj, email} = req.body;
  let id = req.params.id;

  for(let i in fornecedores){
    if(fornecedores[i].id == id){

      fornecedores[i].email = email
      fornecedores[i].cnpj = cnpj

    }
  }
  res.redirect("/fornecedores")
})

module.exports = router;