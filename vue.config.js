

module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            }
        }
    },
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                bypass: function(req, res) {
                  if (req.headers.accept.indexOf("html") !== -1) {
                    //console.log("Skipping proxy for browser request.");
                    return "/index.html";
                  } else{
                    //console.log(req.path);
                    const name = req.path
                      .split("/api/")[1]
                      .split("/")
                      .join("_");
                    const mock = require(`./mock/${name}`);
                    const result = mock(req.method);
                    //console.log(result)
                    delete require.cache[require.resolve(`./mock/${name}`)];
                    return res.send(result);
                  }
                  //return false;
                }
            }
        }
    }
}