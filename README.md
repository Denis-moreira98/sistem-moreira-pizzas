# Sistema de pedidos para pizzaria (Moreira Pizzas) 🍕

Este sistema foi desenvolvido especialmente para pizzarias, com o propósito principal de otimizar o atendimento ao cliente. Focando em agilidade e organização, busca proporcionar uma experiência mais ágil e eficiente, enquanto facilita a comunicação entre os garçons e a cozinha.

## Apresentação do Projeto

[![Moreira Pizzas](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/0435dc3f-64ea-4e54-ac8d-34f028fbf8ae)](https://www.youtube.com/watch?v=08vw_p-_Ph4&ab_channel=DenisMoreira)

## Funcionalidades do website

### O website foi feito para utilizar na cozinha ou no setor administrativo.

-  Cadastro de Novos Usuários: Permite o cadastro de novos usuários, especialmente funcionários.
-  Login: Acesso exclusivo para usuários registrados, garantindo segurança e controle de acesso.
-  Visualização de Pedidos em Tempo Real: O painel exibe os pedidos em andamento na cozinha, apresentando-os de forma clara e organizada. Cada pedido é associado a uma mesa e, ao ser clicado, abre um modal detalhando os itens solicitados. Ao finalizar o pedido, é possível encerrá-lo no modal, removendo-o do painel.
-  Cadastro e Remoção de Categorias: Permite adicionar ou remover categorias de produtos conforme necessário. Por exemplo, é possível incluir a categoria "Sobremesas" para melhor organização do cardápio.
-  Visualização do Cardápio: Oferece acesso a todos os produtos disponíveis, organizados por categorias. Além disso, fornece opções para editar, excluir e gerenciar produtos.
   - Cadastro de Novos Produtos: Facilita a inclusão de novos produtos, exigindo o preenchimento de campos essenciais, como nome, preço, descrição e envio de foto. É necessário também selecionar a categoria correspondente.
   - Edição de Produtos: Permite a atualização de todas as informações relacionadas a um produto.
   - Remoção de Produtos: Permite remover produtos do cardápio, desde que não haja pedidos em aberto associados a eles.

## Funcionalidades do mobile

### O aplicativo foi projetado para facilitar o trabalho dos garçons, oferecendo as seguintes funcionalidades:

-  Login: Acesso exclusivo para usuários autenticados, garantindo segurança e controle de acesso.
- Abertura de Novos Pedidos: Permite iniciar um novo pedido simplesmente informando o número da mesa. 
-Funcionalidades da Mesa: Oferece diversas opções para gerenciar os pedidos associados a uma mesa, incluindo:
   - Cancelar Pedido: Possibilidade de cancelar um pedido pressionando o ícone de lixeira ao lado do número da mesa (desde que não haja itens no pedido).
   - Adicionar/Remover Itens: Permite adicionar novos itens ao pedido selecionando a categoria e escolhendo o produto e quantidade desejados, através do botão "+".
   - Remoção de Itens: Facilidade para remover itens do pedido, bastando pressionar o ícone de lixeira ao lado do item desejado.
   - Avançar: Ao concluir as ações na mesa, o usuário pode avançar para a próxima etapa pressionando o botão "Avançar", que o direcionará para a aba de finalização do pedido.
   - Finalização do Pedido: Na aba de finalização do pedido, o garçom pode revisar e confirmar o pedido. Ao fazer isso, o pedido é automaticamente enviado para o painel da cozinha, agilizando o processo de preparação.

### Confira na prática como funciona [aqui](https://www.youtube.com/watch?v=08vw_p-_Ph4&ab_channel=DenisMoreira).

## Repositorio do [Backend](https://github.com/Denis-moreira98/api-pizzaria).

## Tecnologias utilizadas

- Node.js com Express: Utilizado como plataforma para o desenvolvimento do backend, o Node.js proporciona uma base sólida e escalável para a lógica de negócios e a gestão das requisições HTTP.
- PostgreSQL com Prisma: Como sistema de gerenciamento de banco de dados, o PostgreSQL em conjunto com o Prisma oferece uma solução confiável e poderosa para armazenamento e manipulação de dados.
- Next.js com TypeScript: O framework Next.js, combinado com TypeScript, foi escolhido para a construção da interface do usuário no frontend. Essa combinação proporciona um desenvolvimento ágil e robusto, com suporte para tipagem estática e renderização do lado do servidor (SSR).
- SASS e Styled-Components: Ambas as tecnologias foram utilizadas para estilizar a interface do usuário, tanto na versão web quanto na versão mobile. O SASS oferece uma sintaxe poderosa e organizada para a criação de estilos, enquanto o Styled-Components fornece uma abordagem moderna e modular para a estilização de componentes.
- React Native com Expo: Para o desenvolvimento da versão mobile do aplicativo, optou-se por utilizar o React Native em conjunto com o Expo. Essas tecnologias permitem criar aplicativos móveis nativos de forma eficiente, compartilhando grande parte do código entre plataformas iOS e Android. 

<hr>

## Mobile versão

![login-removebg-preview_resized](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/45243aca-360a-43c6-a00c-9e23d64c3e7f)
![abrir_mesa-removebg-preview_resized](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/33bdae0c-4cd3-4b11-ad2b-8a1cacf14cfb)
![mesa_sem_pedidos-removebg-preview_resized](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/b0549e10-8034-4682-9065-31c353fbaa17)![mesa_com_pedidos-removebg-preview_resized](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/2f64c7b0-1044-460e-b0f4-8f5c67e7ef7f)
![finalizar_pedido-removebg-preview_resized](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/49ee7f8c-3384-4a27-809d-c17656555adf)

## Desktop versão

![cadastro](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/7cea8cc4-72ec-4b7c-8b58-03ccc05728d5)
![login](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/9cc550e1-5178-4bb3-9ab2-c83177708ffa)
![Captura de Tela (290)](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/d6617818-844c-4193-b04e-a1305b714f59)
![Captura de Tela (287)](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/e4e5057a-15f4-4857-a891-31663fd88b6b)
![Captura de Tela (284)](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/16ba6746-10a1-4e99-a0aa-c8e92294090c)
![Captura de Tela (285)](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/384c3902-ea0e-4d0a-aaf8-2f2e099361cc)
![Captura de Tela (286)](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/1168c122-60eb-4bd3-8623-d323e3ffdd6e)
![Captura de Tela (290)](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/d6617818-844c-4193-b04e-a1305b714f59)
![Captura de Tela (289)](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/11804cf2-1baf-463b-852e-ddf1e0c05f1a)






