# Site de delivery: Consumo de API com Golang 🍕

Este repositório contém um site de delivery desenvolvido para consumir APIs utilizando Golang no back-end. O projeto tem como objetivo integrar restaurantes, comidas e usuários em uma plataforma simples e funcional com uma interface amigável.

## ⭐ Features:
- Home Page com informações de restaurantes e comidas;
- Página com os restaurantes registrados na API;
- Página com todas as comidas da API;
- Uma página de usuários (que simula amigos adicionados) consumidos pela API;
- Detalhes de todos os itens;
- Comentários simulados para algumas comidas.

A intenção deste trabalho é utilizar a linguagem de programação Golang para consumo de APIs e um framework como o React no front-end.

Lista das APIs consumidas neste trabalho:
- [Usuários](https://apifakedelivery.vercel.app/users)
- [Detalhes do usuário](https://apifakedelivery.vercel.app/users/1)
- [Restaurantes](https://apifakedelivery.vercel.app/restaurants)
- [Detalhes do restaurante](https://apifakedelivery.vercel.app/restaurants/1)
- [Comidas](https://apifakedelivery.vercel.app/foods)
- [Detalhes das comidas](https://apifakedelivery.vercel.app/foods/1)

## 🛠️ Tecnologias & Ferramentas
<h3>⚡ Front-end</h3>
<p>
  <img alt="React" title="React" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"/>
  <img alt="Vite" title="Vite" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg"/>
  <img alt="JavaScript" title="JavaScript" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"/>
</p>

<h3>🖥️ Back-end</h3>
<p>
  <img alt="Golang" title="Golang" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg"/>
</p>

<h3>🔧 Outros</h3>
<p>
  <img alt="Git" title="Git" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"/>
  <img alt="GitHub" title="GitHub" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"/>
</p>

## ⚙️ Como Rodar?
``` bash
# 1) Clone o repositório:
git clone https://github.com/brunowasch/delivery-go.git
# 2) Acesse a pasta e instale as dependências:
cd delivery-go && npm install
# 3) Entre na pasta e acesse a pasta "web":
cd web
# 4) Instale as dependências:
npm install
# 5) Inicie:
npm run dev
# 6) Depois que rodar, acesse:
http://localhost:5173
-
# Se quiser acessar o back-end (Obrigatório ter Golang instalado em seu dispositivo):
cd delivery-go && cd server
# Inicie:
go run main.go
```
Você também pode acessar o projeto pelo seguinte link:
https://brunowasch.github.io/delivery-go/

# 👨‍💻 Desenvolvido por:
Bruno Waschburger Silva - https://github.com/brunowasch

Marcelo Rangel Barros - https://github.com/Marcelo844

---

Este projeto foi desenvolvido a fins educativos para um trabalho da disciplina de Design Gráfico, pertencente ao curso técnico em informática da Escola Técnica Estadual Monteiro Lobato. Todos os direitos reservados aos autores
