import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
   name: string;
   email: string;
   password: string;
}

class CreateUserService {
   async execute({ name, email, password }: UserRequest) {
      // verificar se ele enviou o email
      if (!email) {
         throw new Error("Email incorreto!");
      }
      //verificar se esse email já está cadastrado na plataforma
      const userAlreadyExists = await prismaClient.user.findFirst({
         where: {
            email: email,
         },
      });
      if (userAlreadyExists) {
         throw new Error("Usuário já existente!");
      }

      const passwordHash = await hash(password, 8);

      //Cadastrar usuario no banco de dados
      const user = await prismaClient.user.create({
         data: {
            name: name,
            email: email,
            passage: passwordHash,
         },
         select: {
            id: true,
            email: true,
            name: true,
         },
      });

      return user;
   }
}

export { CreateUserService };
