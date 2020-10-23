import { Model, Response, Server } from "miragejs";
import { Credentials } from "@/services/userService";
import { AppConfig } from "@/services/appConfig";

/*eslint-disable*/
new Server({
  urlPrefix: new AppConfig().apiUrl,

  models: {
    user: Model,
    cat: Model
  },

  seeds(server) {
    server.create<string, any, any>("user", {
      email: "dmitry",
      password: "dmitry",
      token: null
    });
    server.create<string, any, any>("user", {
      email: "johnsnow@blackcastle.ws",
      password: "khaleesi",
      token: null
    });

    for (let i=0; i<=5; i++) {
      server.create<string, any, any>("cat", {
        id: i,
        name: 'Kitty # '+ i,
        breed: {
          id: i
        }
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
          password: attrs.password
        });

        if (!user) {
          return new Response(401, {}, { error: "INVALID_CREDS" });
        }

        user.attrs.token = "str" + new Date().getTime();

        return {data: {authToken: user.attrs.token}};
      },
      { timing: 100 }
    );

    this.get("/v1/cats", (schema, request) => {
      return {
        // @ts-ignore
        data: schema.cats.all().models
      }
    })

    this.get("/v1/cats/:id", (schema, request) => {
      return {
        // @ts-ignore
        data: schema.cats.findBy({id: request.params.id})
      }
    })

    /*this.passthrough((request)=> {
      return true;
    });*/
  }
});
/*eslint-enable*/
