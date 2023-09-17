import { createServer, Model } from "miragejs";
import fakerData from "./db.json";

const server = createServer({
  models: {
    user: Model,
  },

  seeds(server) {
    fakerData.users.forEach((user: any) => {
      return server.create("user", user);
    });
  },

  routes() {
    this.passthrough();
    this.namespace = "/api";
    this.logging = false;
    this.timing = 1000;

    this.get("/analytics", () => {
      const allUsers = server.db.users.length;
      const pendingUser = server.db.users.filter((v) => {
        return v.status === "pending";
      }).length;
      const activeUser = server.db.users.filter((v) => {
        return v.status === "active";
      }).length;
      const allAgent = server.db.agents.length;
      const total = allUsers + allAgent;
      return {
        users: {
          value: new Intl.NumberFormat().format(allUsers),
          percent: ((allUsers * 100) / total).toFixed(2),
          total: allUsers,
        },
        pendingUser: {
          value: new Intl.NumberFormat().format(pendingUser),
          percent: ((pendingUser * 100) / total).toFixed(2),
          total: allUsers,
        },
        activeUser: {
          value: new Intl.NumberFormat().format(activeUser),
          percent: ((activeUser * 100) / total).toFixed(2),
          total: allUsers,
        },

        agents: {
          value: new Intl.NumberFormat().format(allAgent),
          percent: ((allAgent * 100) / total).toFixed(2),
          total: allAgent,
        },
        money: {
          value: "900,104FRW",
          percent: 62,
        },
      };
    });
    this.post("/login", (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      console.log(attrs);
      const user = schema.all("user").models.find((user) => {
        return user.attrs["phone_number"] === attrs.phone_number;
      });
      if (!user) {
        throw { status: 404, message: "User not found" };
      }
      if (user.attrs["password"].toString() !== attrs.password.toString()) {
        throw { status: 400, message: "Incorrect password" };
      }
      return {
        status: 200,
        message: "Login success",
        data: { ...user.attrs, accessToken: "---Here-goes-the-token---" },
      };
    });
    this.get("/accounts", (schema, request) => {
      console.log(request.queryParams);
      const search = request.queryParams["search"];
      const show = request.queryParams["show"];
      const filterDate = request.queryParams["filterDate"];
      const sort = request.queryParams["sort"]; // example it is like +name,-created_at

      function parseSortField(sortField) {
        const order = sortField[0];
        const field = sortField.slice(1);
        return [field, order];
      }
      let users;

      users = schema
        .all("user")
        .models.sort((a: any, b: any) => {
          if (sort) {
            const [field, order] = parseSortField(sort);
            const aValue = a.attrs[field];
            const bValue = b.attrs[field];

            const comparison = order === "+" ? 1 : -1;

            if (aValue < bValue) return comparison;
            if (aValue > bValue) return -comparison;
          } else {
            return a.attrs["id"] - b.attrs["id"];
          }
        })
        .filter((user) => {
          return (
            user.attrs["role"] === "normal-user" && // Filter by role
            (!search ||
              user.attrs["first_name"]
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              user.attrs["last_name"]
                .toLowerCase()
                .includes(search.toLowerCase())) && // Filter by search
            (!filterDate ||
              new Date(user.attrs["created_at"]).toLocaleDateString() ===
              new Date(filterDate).toLocaleDateString())
          );
        });

      // Add Sorting
      if (sort) {
        // Utility function to parse sort fields like +name or -created_at
        function parseSortField(sortField) {
          const order = sortField[0];
          const field = sortField.slice(1);
          return [field, order];
        }

        const sortFields = sort.split(","); // Split the sort query parameter by comma
        users = users.sort((a, b) => {
          for (const sortField of sortFields) {
            const [field, order] = parseSortField(sortField); // Parse the sort field (+name or -created_at)
            const aValue = a.attrs[field];
            const bValue = b.attrs[field];
            const comparison = order === "+" ? 1 : -1;

            if (aValue < bValue) return comparison;
            if (aValue > bValue) return -comparison;
          }
          return 0; // If all fields are equal
        });
      }

      // console.log(users.map((user) => user.attrs["first_name"]));

      return {
        results: users.slice(0, Number(show)),
        total: users.length,
      };
    });
    this.get("/accounts/:id", (schema, request) => {
      const id = request.params.id;
      const user = schema.all("user").models.find((user) => {
        return Number(user.attrs["id"]) === Number(id);
      });
      if (!user) {
        throw { status: 404, message: "Account not found" };
      }
      return user.attrs;
    });
    this.put("/accounts/:id", (schema, request) => {
      const id = request.params.id;
      const attrs = JSON.parse(request.requestBody);
      const user = schema.all("user").models.find((user) => {
        return Number(user.attrs["id"]) === Number(id);
      });
      if (!user) {
        throw { status: 404, message: "Account not found" };
      }
      user.update({
        // ...user,
        ...attrs,
        updated_at: new Date().toISOString(),
      });

      return user.attrs;
    });
    this.post("/accounts", (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      const user = schema.create("user", {
        ...attrs,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        role: "normal-user",
        status: "pending",
        password: 12345678,
        restructuring: (Math.random() * 100).toFixed(0),
        new_restructuring: null,
        restructuring_reason: null,
        suspend_withdrawal: false,
        suspend_withdrawal_started_at: null,
        suspend_withdrawal_ended_at: null,
        suspend_withdrawal_reason: null,
        pause_fee: false,
        pause_fee_started_at: null,
        pause_fee_ended_at: null,
        pause_fee_reason: null,
      });
      return user.attrs;
    });
    this.get("/agents", (schema, request) => {
      const search = request.queryParams["search"];
      const show = request.queryParams["show"];
      const filterDate = request.queryParams["filterDate"];
      const sort = request.queryParams["sort"]; // example it is like +name,-created_at

      function parseSortField(sortField) {
        const order = sortField[0];
        const field = sortField.slice(1);
        return [field, order];
      }
      let agents;

      agents = schema
        .all("agent")
        .models.sort((a: any, b: any) => {
          if (sort) {
            const [field, order] = parseSortField(sort);
            const aValue = a.attrs[field];
            const bValue = b.attrs[field];

            const comparison = order === "+" ? 1 : -1;

            if (aValue < bValue) return comparison;
            if (aValue > bValue) return -comparison;
          } else {
            return a.attrs["id"] - b.attrs["id"];
          }
        })
        .filter((agent) => {
          return (
            (!search ||
              agent.attrs["first_name"]
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              agent.attrs["last_name"]
                .toLowerCase()
                .includes(search.toLowerCase())) && // Filter by search
            (!filterDate ||
              new Date(agent.attrs["created_at"]).toLocaleDateString() ===
              new Date(filterDate).toLocaleDateString())
          );
        });

      return {
        results: agents.slice(0, Number(show)),
        total: agents.length,
      };
    });
    this.get("/admins", (schema, request) => {
      const search = request.queryParams["search"];
      const show = request.queryParams["show"];
      const filterDate = request.queryParams["filterDate"];
      const sort = request.queryParams["sort"]; // example it is like +name,-created_at

      function parseSortField(sortField) {
        const order = sortField[0];
        const field = sortField.slice(1);
        return [field, order];
      }
      let agents;

      agents = schema
        .all("admin")
        .models.sort((a: any, b: any) => {
          if (sort) {
            const [field, order] = parseSortField(sort);
            const aValue = a.attrs[field];
            const bValue = b.attrs[field];

            const comparison = order === "+" ? 1 : -1;

            if (aValue < bValue) return comparison;
            if (aValue > bValue) return -comparison;
          } else {
            return a.attrs["id"] - b.attrs["id"];
          }
        })
        .filter((agent) => {
          return (
            (!search ||
              agent.attrs["first_name"]
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              agent.attrs["last_name"]
                .toLowerCase()
                .includes(search.toLowerCase())) && // Filter by search
            (!filterDate ||
              new Date(agent.attrs["created_at"]).toLocaleDateString() ===
              new Date(filterDate).toLocaleDateString())
          );
        });

      return {
        results: agents.slice(0, Number(show)),
        total: agents.length,
      };
    });
    this.put("/agents/:id", (schema, request) => {
      const id = request.params.id;
      const attrs = JSON.parse(request.requestBody);
      const user = schema.all("agent").models.find((user) => {
        return Number(user.attrs["id"]) === Number(id);
      });
      if (!user) {
        throw { status: 404, message: "Agent not found" };
      }
      user.update({
        ...attrs,
        updated_at: new Date().toISOString(),
      });

      return user.attrs;
    });
    this.put("/admins/:id", (schema, request) => {
      const id = request.params.id;
      const attrs = JSON.parse(request.requestBody);
      const user = schema.all("admin").models.find((user) => {
        return Number(user.attrs["id"]) === Number(id);
      });
      if (!user) {
        throw { status: 404, message: "Admin not found" };
      }
      user.update({
        ...attrs,
        updated_at: new Date().toISOString(),
      });

      return user.attrs;
    });
    this.get("/agents/:id", (schema, request) => {
      const id = request.params.id;
      const user = schema.all("agent").models.find((user) => {
        return Number(user.attrs["id"]) === Number(id);
      });
      if (!user) {
        throw { status: 404, message: "Agent not found" };
      }
      return user.attrs;
    });
    this.get("/admins/:id", (schema, request) => {
      const id = request.params.id;
      const user = schema.all("admin").models.find((user) => {
        return Number(user.attrs["id"]) === Number(id);
      });
      if (!user) {
        throw { status: 404, message: "Admin not found" };
      }
      return user.attrs;
    });
    this.post("/agents", (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      const user = schema.create("agent", {
        ...attrs,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: "active",
      });
      return user.attrs;
    });
    this.post("/admins", (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      const admin = schema.create("admin", {
        ...attrs,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: "active",
      });
      return admin.attrs;
    });
    this.post("/requests", (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      const user = schema.create("request", {
        ...attrs,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: "pending",
      });
      return user.attrs;
    });
    this.get("/requests", (schema, request) => {
      const search = request.queryParams["search"];
      const show = request.queryParams["show"];
      const filterDate = request.queryParams["filterDate"];
      const sort = request.queryParams["sort"]; // example it is like +name,-created_at

      function parseSortField(sortField) {
        const order = sortField[0];
        const field = sortField.slice(1);
        return [field, order];
      }
      let requests;

      requests = schema
        .all("request")
        .models.sort((a: any, b: any) => {
          if (sort) {
            const [field, order] = parseSortField(sort);
            const aValue = a.attrs[field];
            const bValue = b.attrs[field];

            const comparison = order === "+" ? 1 : -1;

            if (aValue < bValue) return comparison;
            if (aValue > bValue) return -comparison;
          } else {
            return a.attrs["id"] - b.attrs["id"];
          }
        })
        .filter((request) => {
          return (
            (!search ||
              request.attrs["first_name"]
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              request.attrs["last_name"]
                .toLowerCase()
                .includes(search.toLowerCase())) && // Filter by search
            (!filterDate ||
              new Date(request.attrs["created_at"]).toLocaleDateString() ===
              new Date(filterDate).toLocaleDateString())
          );
        });

      return {
        results: requests.slice(0, Number(show)),
        total: requests.length,
      };
    });
    this.get("/requests/:id", (schema, request) => {
      const id = request.params.id;
      const user = schema.all("request").models.find((user) => {
        return Number(user.attrs["id"]) === Number(id);
      });
      if (!user) {
        throw { status: 404, message: "Request not found" };
      }
      return user.attrs;
    });
    this.put("/requests/:id", (schema, request) => {
      const id = request.params.id;
      const attrs = JSON.parse(request.requestBody);
      const user = schema.all("request").models.find((user) => {
        return Number(user.attrs["id"]) === Number(id);
      });
      if (!user) {
        throw { status: 404, message: "Request not found" };
      }
      user.update({
        ...attrs,
        updated_at: new Date().toISOString(),
      });

      return user.attrs;
    });
    this.get("/transactions", (schema, request) => {
      const search = request.queryParams["search"];
      const show = request.queryParams["show"];
      const filterDate = request.queryParams["filterDate"];
      const sort = request.queryParams["sort"]; // example it is like +name,-created_at

      function parseSortField(sortField) {
        const order = sortField[0];
        const field = sortField.slice(1);
        return [field, order];
      }
      let agents;

      agents = schema
        .all("transaction")
        .models.sort((a: any, b: any) => {
          if (sort) {
            const [field, order] = parseSortField(sort);
            const aValue = a.attrs[field];
            const bValue = b.attrs[field];

            const comparison = order === "+" ? 1 : -1;

            if (aValue < bValue) return comparison;
            if (aValue > bValue) return -comparison;
          } else {
            return a.attrs["id"] - b.attrs["id"];
          }
        })
        .filter((agent) => {
          return (
            (!search ||
              agent.attrs["names"]
                .toLowerCase()
                .includes(search.toLowerCase())) && // Filter by search
            (!filterDate ||
              new Date(agent.attrs["created_at"]).toLocaleDateString() ===
              new Date(filterDate).toLocaleDateString())
          );
        });

      return {
        results: agents.slice(0, Number(show)),
        total: agents.length,
      };
    });
    this.post("/transactions", (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      const admin = schema.create("transaction", {
        ...attrs,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: "active",
      });
      return admin.attrs;
    });
    this.put("/transactions/:id", (schema, request) => {
      const id = request.params.id;
      const attrs = JSON.parse(request.requestBody);
      const user = schema.all("transaction").models.find((user) => {
        return Number(user.attrs["id"]) === Number(id);
      });
      if (!user) {
        throw { status: 404, message: "Transaction not found" };
      }
      user.update({
        ...attrs,
        updated_at: new Date().toISOString(),
      });

      return user.attrs;
    });
  },
});

server.pretender.handledRequest = function (verb) {
  if (verb.toLowerCase() !== "get" && verb.toLowerCase() !== "head") {
    localStorage.setItem("db", JSON.stringify(server.db.dump()));
  }
};
