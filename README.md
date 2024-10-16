
# The Gallery 
> Esta é uma aplicação de galeria de imagens desenvolvida com React, que consome a API [Picsum Photos](https://picsum.photos/v2/list) para exibir uma coleção diversificada de imagens aleatórias. A aplicação permite a visualização de imagens com detalhes, incluindo o nome do autor e as dimensões, além de possibilitar o download das imagens em formato PNG. A interface é totalmente responsiva, com animações fluidas criadas com Framer Motion e recursos de filtragem por cor utilizando o hook use-color-thief para capturar a cor dominante de cada imagem.

![Purple Phone](https://github.com/user-attachments/assets/7e953f16-226c-43e6-977c-9c296f2d454b)


## Tecnologias Utilizadas

- [React.js](https://react.dev/): Biblioteca JavaScript para a construção de interfaces de usuário.
- [Tailwind CSS](https://tailwindcss.com/): Framework de CSS para o design responsivo e estilização da interface.
- [Framer Motion](https://www.framer.com/motion/): Biblioteca para criar animações fluidas e interativas na interface.
- [Jest](https://jestjs.io/): Framework de testes em JavaScript, utilizado para realizar testes unitários e garantir a qualidade do código.
- [use-color-thief](https://www.npmjs.com/package/use-color-thief): Hook React para capturar a cor dominante de imagens, usado para implementar o filtro de imagens por cor.
- [React-Redux](https://react-redux.js.org/): Biblioteca oficial para o gerenciamento de estado global em aplicações React.
- [Redux Toolkit](https://redux-toolkit.js.org/): Conjunto de ferramentas para simplificar a configuração e o uso do Redux.
- [Axios](https://axios-http.com/): Biblioteca para realizar requisições HTTP e consumir APIs.
- [React Type Animation](https://www.npmjs.com/package/react-type-animation): Componente React para criar animações de digitação de texto de forma dinâmica.


## Funcionalidades

- **Visualização de imagens**: Exibe uma galeria de imagens aleatórias obtidas da API [Picsum Photos](https://picsum.photos), permitindo que os usuários visualizem detalhes como o autor e as dimensões de cada imagem.
- **Filtro por cor**: Permite que os usuários filtrem as imagens com base na cor dominante. O filtro usa nomes de cores em português e é implementado com o hook `use-color-thief`, que captura a cor predominante de cada imagem.
- **Favoritos**: Funcionalidade para marcar imagens como favoritas, facilitando o acesso a elas posteriormente.
- **Download de imagens**: Os usuários podem baixar qualquer imagem da galeria em formato PNG, com o nome do arquivo gerado automaticamente usando o nome do autor.
- **Animações interativas**: A aplicação possui transições suaves e animações interativas, implementadas com **Framer Motion** para uma melhor experiência do usuário.
- **Responsividade**: O design da aplicação é totalmente responsivo, garantindo que a galeria seja exibida corretamente em dispositivos de diferentes tamanhos de tela, como celulares, tablets e desktops.
- **Busca por cor**: Ao digitar o nome de uma cor (como "vermelho" ou "azul") na barra de pesquisa, o usuário pode encontrar imagens que correspondam àquela cor dominante.
- **Gerenciamento de estado**: O estado global da aplicação é gerenciado com **Redux Toolkit**, permitindo o controle eficiente de favoritos e da lista de imagens.
- **Consumo de API**: Utiliza **Axios** para realizar requisições à API Picsum Photos, carregando as imagens de forma dinâmica conforme o usuário interage com a galeria.


## Licença
Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

Feito com ♥ por [Jezebel Guedes](https://www.linkedin.com/in/jezebel-guedes/) 👋 Entre em contato!

<hr />
<br />
<br /> 

# Instruções 

> ## Desafio de Galeria de Imagens - Processo Seletivo Frontend Fusion

> OBS : Você receberá um e-mail com a data de início dos desafios, mas eles já estão disponíveis para acesso imediato. 
Se ainda não preencheu o formulário, por favor, acesse o link para completá-lo.
[Forms de inscrição](https://forms.gle/EJKDNKdmVZM3zQTr7)
é importante está inscrito no formulário , pois o seu email precisa ser validado

## Sobre o Desafio

Bem-vindo ao desafio de galeria de imagens do processo seletivo do projeto Frontend Fusion para a vaga de Desenvolvedor React Júnior. Este desafio foi criado para avaliar suas habilidades em desenvolvimento com React e sua capacidade de criar uma aplicação de galeria de imagens. 📸

## Objetivo

Crie uma aplicação de galeria de imagens utilizando React e a API [Picsum Photos](https://picsum.photos/v2/list). Esta aplicação deve incluir:

- Visualização de imagens obtidas da API [Picsum Photos](https://picsum.photos/v2/list).
- Funcionalidade para salvar imagens nos favoritos. 💾

funcionalidade opcional: 
- Opção de aplicar filtros para visualizar imagens por categoria, cor, etc. 🎨

- Ao clicar em uma imagem, exibir informações detalhadas como autor, dimensões, e qualquer outra propriedade relevante disponível na API. 🖼️

## Diferenciais

Para se destacar, recomendamos implementar os seguintes diferenciais:

- **Tailwind CSS:** Utilize Tailwind CSS para estilizar sua aplicação. 🎨
- **Gerenciadores de Estado:** Utilize gerenciadores de estado como Redux ou Context API para gerenciar o estado da aplicação. 📊
- **Responsividade:** Certifique-se de que sua aplicação seja totalmente responsiva e funcione bem em diferentes dispositivos. 📱💻
- **Boas Práticas de Código:** Siga boas práticas de código, como organização de arquivos, componentes reutilizáveis, e uso adequado de hooks. 🧩
- **Acessibilidade:** Implemente boas práticas de acessibilidade para garantir que sua aplicação possa ser utilizada por todos. ♿
- **SEO:** Otimize sua aplicação para motores de busca. 🌐
- **Animações e Transições:** Adicione animações e transições para melhorar a experiência do usuário. 🎞️
- **Testes:** Escreva testes para seus componentes utilizando frameworks como Jest e React Testing Library. 🧪

## Entrega

Faça o deploy da sua aplicação em plataformas como GitHub Pages, Heroku, Vercel, Netlify, ou qualquer outra de sua preferência. Após concluir o desafio, envie o link do deploy e do repositório do código-fonte por e-mail para **projetofrontendfusion@gmail.com**. O e-mail deve incluir:

- Nome
- Link do GitHub
- Link do LinkedIn
- Data de Início
- Data de Entrega
- Link do GitHub com o Código
- Link do Deploy
- Link da Postagem no LinkedIn mostrando os desafios concluídos

**Observação:** É obrigatório entregar todos os três desafios em até **20 dias** após o início. Este é o **Desafio 02 de 03 desafios**. ⏳

## Prazo

Você tem 20 dias para concluir todos os três desafios. 📅

## Avaliação

Os critérios de avaliação incluirão:

- Funcionalidade
- Qualidade do código
- Uso dos diferenciais mencionados
- Estética e design
- Responsividade
- Acessibilidade

## Como Participar

1. Faça um fork deste repositório. 🍴
2. Crie um branch com seu nome: nome-sobrenome.
3. Após completar o desafio, envie o link do deploy, o repositório do código-fonte e o link da postagem no LinkedIn por e-mail para **projetofrontendfusion@gmail.com** com o assunto: **"Entrega + Desafios[02] + Seu Nome"**. 📧

## Exemplo de E-mail:

**Assunto:** Entrega + Desafios[02] + João Silva

---

Olá,

Segue abaixo a entrega do Desafio 02 para o processo seletivo do Frontend Fusion.

**Nome:** João Silva  
**Link do GitHub:** [https://github.com/joaosilva](https://github.com/joaosilva)  
**Link do LinkedIn:** [https://linkedin.com/in/joaosilva](https://linkedin.com/in/joaosilva)  
**Data de Início:** 01/09/2024  
**Data de Entrega:** 20/09/2024  
**Link do GitHub com o Código:** [https://github.com/joaosilva/desafio02](https://github.com/joaosilva/desafio02)  
**Link do Deploy:** [https://joaosilva.netlify.app](https://joaosilva.netlify.app)  
**Link da Postagem no LinkedIn:** [https://linkedin.com/posts/joaosilva/desafio-02](https://linkedin.com/posts/joaosilva/desafio-02)

Agradeço a oportunidade e estou à disposição para qualquer dúvida.

Atenciosamente,  
João Silva

---

Boa sorte e estamos ansiosos para ver seu trabalho! 🚀

Este desafio faz parte do processo seletivo do projeto Frontend Fusion para a vaga de Desenvolvedor React Júnior.
