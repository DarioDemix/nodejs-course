const feScript = require("./js-fe/script")();
const users = ["Pippo", "Pluto", "Paperino"];

const routesHandler = (req, res) => {
  const { url, method } = req;
  const homepagePath = "/";
  const usersPath = "/users";
  const createUserPath = "/create-user";

  if (url === homepagePath) {
    const usersLink = createLink(usersPath);

    writePage("Greetings", `<h2>Greetings!</h2> ${usersLink}`);
  } else if (url === usersPath) {
    const usersDomList = createUsersDomList(users);
    const submitInput = `<input type="submit" value="add"></input>`;
    const userForm = `<form action="${createUserPath}" method="POST">
                        <input type="text" id="add-user" name="username" placeholder="Insert a usernname..."></input>
                        ${submitInput}
                      </form>`;

    writePage("Users", `${userForm} <ul>${usersDomList}</ul>`);
  } else if (url === createUserPath && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split("=")[1];
      users.push(username);
      res.statusCode = 302;
      res.setHeader("Location", usersPath);
      return res.end();
    });
  } else {
    writePage(
      "Not found",
      `<h1>Sorry, this page doesn't exists.</h1> ${createLink(homepagePath)}`
    );
  }

  return res.end();

  function writePage(title, content) {
    res.write(`<!doctype html>`);
    res.write(`<html>`);
    res.write(`<head>
                <meta charset="utf-8">
                <title>${title}</title>
              </head>`);
    res.write(`<body>
                ${content}
                <script>(${feScript})()</script>
               </body>`);
    res.write(`</html>`);
  }

  function createUsersDomList(users) {
    return users.reduce(
      (accumulator, user) => `${accumulator}<li>${user}</li>`,
      ""
    );
  }

  function createLink(toUrl, message) {
    return `<h2><a href="${toUrl}">${message || "Go to " + toUrl}</a></h2>`;
  }
};

module.exports = routesHandler;
