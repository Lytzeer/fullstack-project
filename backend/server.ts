Bun.serve({
  port: 5001,
  fetch(req) {
    return new Response("Hello World", {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
});
