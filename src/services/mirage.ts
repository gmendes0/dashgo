import {
  ActiveModelSerializer,
  createServer,
  Factory,
  Model,
  Response,
} from "miragejs";
import { faker } from "@faker-js/faker";

interface User {
  name: string;
  email: string;
  created_at: string;
}

interface QueryParams {
  page?: number;
  per_page?: number;
}

export function makeServer() {
  const server = createServer({
    // ACTIVE RECORD PATTERN
    serializers: {
      application: ActiveModelSerializer,
    },

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
      server.createList("user", 200);
    },

    routes() {
      // As chamadas para o mock api dever ser feitos a partir de /api/...
      this.namespace = "api";

      // Delay para a resposta. Útil para testar loadings
      this.timing = 750;

      this.get("/users", function (this: any, schema, request) {
        const params: QueryParams | undefined = request.queryParams;

        const total: Number = schema.all("user").length;
        const start = (Number(params?.page) - 1) * Number(params?.per_page);
        const end = start + Number(params?.per_page);

        const users = this.serialize(schema.all("user")).users.slice(
          start,
          end
        );

        // console.log("page: ", users.length);

        return new Response(200, { "X-TOTAL-COUNT": String(total) }, { users });
      });

      this.get("/users/:id");

      this.post("/users");

      // Reseta o namespace para nao conflitar com /api do nextjs
      this.namespace = "";

      // Passa as rotas /api pelo mirage, porem, passa a diante as rotas que nao estao listadas acima
      this.passthrough();
    },
  });

  return server;
}
