import { Model, Response, Server } from "miragejs";
import { Credentials } from "@/services/userService";
import { AppConfig } from "@/services/appConfig";

/*eslint-disable*/
new Server({
  urlPrefix: new AppConfig().apiUrl,

  models: {
    user: Model,
    cat: Model,
  },

  seeds(server) {
    server.create<string, any, any>("user", {
      email: "dmitry",
      password: "dmitry",
      token: null,
    });
    server.create<string, any, any>("user", {
      email: "anastasia",
      password: "1234",
      token: null,
    });
    server.create<string, any, any>("user", {
      email: "johnsnow@blackcastle.ws",
      password: "khaleesi",
      token: null,
    });

    for (let i = 0; i <= 5; i++) {
      server.create<string, any, any>("cat", {
        id: i,
        name: "Kitty # " + i,
        breed: {
          id: i,
        },
      });
    }
  },

  routes() {
    // @ts-ignore
    this.post(
      "/auth/tokens",
      (schema, request) => {
        const attrs: Credentials = JSON.parse(request.requestBody);
        // @ts-ignore
        const user = schema.users.findBy({
          email: attrs.email,
        });
        if (!user) {
          return new Response(
            401,
            {},
            {
              error: "INVALID_EMAIL",
              message: [
                {
                  property: "email",
                  constraints: {
                    isExist: "Incorrect email",
                  },
                },
              ],
            }
          );
        }

        if (user.password !== attrs.password) {
          return new Response(
            401,
            {},
            {
              error: "INVALID_PASSWORD",
              message: [
                {
                  property: "password",
                  constraints: {
                    correctPassword: "Incorrect password",
                  },
                },
              ],
            }
          );
        }

        user.attrs.token = "str" + new Date().getTime();

        return { data: { authToken: user.attrs.token } };
      },
      { timing: 100 }
    );

    this.get("/v1/cats", (schema) => {
      return {
        // @ts-ignore
        data: schema.cats.all().models,
      };
    });

    this.get("/v1/cats/:id", (schema, request) => {
      return {
        // @ts-ignore
        data: schema.cats.findBy({ id: request.params.id }),
      };
    });

    // uncomment it if you need to pass your requests to the server
    /*this.passthrough((request)=> {
      return true;
    });*/
  },
});
/*eslint-enable*/
