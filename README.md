# Sistema para uma pizzaria (Moreira Pizzas)

Esse é um sistema para pizzarias. Tem como objetivo principal facilitar o atendimento ao cliente, prezando por um atendimento mais rápido, de uma forma organizada. Facilitando também a comunicação entre os garçons e a cozinha.

## Funcionalidades do website

### O website foi feito para utilizar na cozinha ou no setor administrativo.

-  Cadastrar novos usuários: É possível realizar cadastro de novos usúarios (funcionários).
-  login: Apenas usúarios logados terão acesso as outras funcionalidades.
-  Painel: A página /dasboard (painel) será utilizada na cozinha, mostrando em tempo real os pedidos que não estão em rascunho. Os pedidos levam a numeração da mesa, e ao clicar abrirá um modal mostrando os itens do pedido. Ao concluir o pedido, é possível encerrar no modal, fazendo então a order sair do painel.
-  Cadastrar novas categorias: Na página /category é possível cadastrar novas categorias de produtos, por exemplo: “Sobremesas”.
- Cadastrar novos produtos: Na página /product é possível cadastrar novos produtos, mas é necessário preencher alguns campos. Como: enviar uma foto do produto, selecionar a categoria que ele pertence, nome, preço e descrição.

## Funcionalidades do mobile

### O app foi planejado para os garçons utilizarem.

-  login: Apenas usuários logados terão acesso as outras funcionalidades.
- Abrir um novo pedido: É possível abrir um novo pedido, basta apenas informar o número da mesa. 
- Funcionalidades da MESA (Cancelar pedido, adicionar/remover itens e avançar): 
   - Caso o cliente tenha desistido de pedir algo é possível cancelar o pedido apertando na lixeira que fica ao lado do número da mesa (desde que não tenha itens no pedido);
   - Você pode adicionar itens a mesa, basta apenas selecionar a categoria e escolher o produto e quantidade, apertando no botão “+”;
   - Para remover itens do pedido, basta aperta na lixeira que fica ao lado do item adicionado.
   - Ao concluir tudo, basta apertar em avançar que será redirecionado para aba “finalizando”.
- Finalizando pedido: Aqui é onde o garçom confirma o pedido, e ao fazer isso, pedido será enviado para o “PAINEL” da cozinha.

 ### Confira na prática como funciona [aqui](https://www.youtube.com/watch?v=JSqVy1BhU6U&ab_channel=DenisMoreira).


## Tecnologias utilizadas

- NodeJS: Foi utilizada a plataforma node para desenvolver o backend do projeto.
- NextJS: O framework Next foi utilizado para construção de interface do usuário frontend.
- SCSS: linguagem de estilo para estilizar a interface do usuário.
-  React Native / Expo: Utilizados para construção do app. (versão mobile) 


![login](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/65ed3063-5d66-46e1-9322-96232bc8d3c1)
![novoPedido](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/cdd65512-6a42-4b03-916f-240c0a136e89)
![mesaAberta](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/325b5b42-5c76-4660-ab6d-8b8a787c4c78)
![mesaComItens](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/1d6967bb-af1a-4f6a-9df0-b1448fb6a473)
![finalizandoPedido](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/de297cba-4915-4618-b480-a93e0868b37d)
  

![cadastro](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/716fd00e-c4c2-4f3e-a19d-9664036a6b2b)
![login](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/e7f1d2ac-1211-4d21-9db8-53445fc5e5ee)
![dashboard](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/5d18b27f-9cd8-43eb-b508-0e215b5f2ab7)
![dashboard com pedido](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/ff9f3f89-02e3-474a-ac99-b3a7bbd61f85)
![modaldatail](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/de36be74-dc17-4ad2-98a6-3856cee57c01)
![novaCategoria](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/033b7ad3-4ef4-49df-90fe-8f3f6d953e98)
![NovoProduto](https://github.com/Denis-moreira98/sistem-moreira-pizzas/assets/72985107/fa52b32c-f66d-4bbb-8505-de78eed003ec)

