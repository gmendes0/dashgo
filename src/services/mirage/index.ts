import { createServer, Factory, Model } from "miragejs";
import { faker } from "@faker-js/faker";

interface User {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend<User>({
        name(n) {
          // return `User ${n + 1}`;

          return faker.name.fullName();
        },
        email(n) {
          return faker.internet.email().toLowerCase();
        },
        created_at(n) {
          return faker.date.recent(10).toJSON();
        },
      }),
    },

    seeds(server) {
      server.createList("user", 10);
    },

    routes() {
      // As chamadas para o mock api dever ser feitos a partir de /api/...
      this.namespace = "api";

      // Delay para a resposta. Útil para testar loadings
      this.timing = 750;

      this.get("/users");
      this.post("/users");

      // Reseta o namespace para nao conflitar com /api do nextjs
      this.namespace = "";

      // Passa as rotas /api pelo mirage, porem, passa a diante as rotas que nao estao listadas acima
      this.passthrough();
    },
  });

  return server;
}
