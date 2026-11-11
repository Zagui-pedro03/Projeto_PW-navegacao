## Gerenciador de Clientes

# Integrantes

- Pedro Borges Zagui
- Lucas Camargo

# Objetivo

Realizar o CRUD de Categorias, Clientes, Fornecedores e Produtos, onde é possível realizar cada etapa do CRUD (Create, Read, Update, Delete)

# Estrutura de pastas

''' 
meu-projeto/
├── data/
│   ├── clientes.json
│   ├── fornecedores.json
│   └── funcionarios.json
│   ├── produtos.json
│
│
├── routes/
│   ├── clientes.js
│   ├── fornecedores.js
│   └── funcionarios.js
│   └── Produtos.js
│
views/
├── categorias/
│   ├── editar.ejs
│   ├── form-cadastro.ejs
│   └── index.ejs
│
├── clientes/
│   ├── editar.ejs
│   ├── form-cadastro.ejs
│   └── index.ejs
│
├── fornecedores/
│   ├── editar.ejs
│   ├── form-cadastro.ejs
│   └── index.ejs
│
├── partials/
│   ├── footer.ejs
│   ├── header.ejs
│   └── nav.ejs
│
├── produtos/
│   ├── editar.ejs
│   ├── form-cadastro.ejs
│   └── index.ejs
│
└── index.ejs
│
├── node_modules/
├── app.js
├── package-lock.json
├── .gitignore
├── package.json
└── README.md
'''
# Entidades Utilizadas

O sistema possui quatro entidades principais:

- **Clientes**
- **Fornecedores**
- **Produtos**
- **Categorias**

Cada entidade possui funcionalidades de cadastro,
listagem, edição e exclusão de registros (CRUD).

# Tecnologias utilizadas

- Node.js + Express
- Bootstrap
- EJS (Template Engine)

# Linguagem principal

- JavaScript


## Implementação dos .json com ChatGPT

# Prompt utilizado

chat, tenho um projeto utilizando Node Express, e quero implementar arquivos .json para armazenar dados, me mostre como eu posso utilizá-los para armazenar utilizando Node.js e listando no EJS os dados

# Resposta da IA

A IA proporcionou um caminho explicativo sobre como criar, utilizar e armazenar dados dentro dos arquivos .json exigidos:

- Explicou como criar os arquivos .json detro da pasta data
- Explicou e mostrou a aplicação dos pacotes 'path' e 'fs'
- Mostrou a listagem dos dados num arquivo EJS
- Foi utilizado como exemplo de clientes (mostrado pela própria IA)
- Explicou como realizar o CRUD dos dados

# Sugestões da IA

- Utilizar o módulo fs para ler, criar e atualizar arquivos .json
- Utilizar o módulo path para construir corretamente os caminhos dos arquivos
- Utilizar JSON.stringify() para converter objetos JavaScript em JSON antes de salvar.
- Utilizar JSON.parse() para converter os dados do arquivo JSON em objetos JavaScript.

# Alterações implementadas

Foi adicionado a pasta 'data' e seus arquivos .JSON, foram excluídos todos os arrays utilizados anteriormente para salvar os dados dos arquivos, foi requerido os pacotes 'fs' para manipulação de arquivos (como leitura e escrita), e o pacote 'path' (utilização de caminhos).

 Em cada parte do CRUD, foi atualizado para o atual modelo de armazenamento de dados, para salvar os dados, utilizamos a função do pacotes 'fs' onde permite registrar coisas novas no arquivo destinado, fizemos isso utilizando o 'fs.writeFileSync()', onde passamos como primeiro parâmetro o caminho criado utilizando o pacote 'path', e como segundo parâmetro, passamos o registro de clientes como JSON.stringify(), onde transformamos os objetos JS para arquivos de texto (json).

 # Ajustes feitos manualmente

Tirando a etapa de explicação da IA sobre como realizar a manipulação dos .JSON no arquivo de clientes, realizamos todo o resto (ou seja, todas as outras partes) sozinhos, sem escrita de IA.

