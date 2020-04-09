export async function connectToImu(devicePath) {
  console.log(devicePath);
  fetch("http://localhost:3001/connect", {
    method: "post",
    body: JSON.stringify({ device: devicePath }),
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    return response.json();
  });
}

export async function disconnectImu(devicePath) {
  fetch("http://localhost:3001/disconnect", {
    method: "post",
    body: JSON.stringify({ device: devicePath }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      console.log(response);
      var message = response.json();
      return message;
    })
    .then((message) => {
      console.log(message);
      console.log("message = " + message);
    });
}

export async function calibrate() {
  fetch("http://localhost:3001/calibrate", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      console.log(response);
      var message = response.json();
      return message;
    })
    .then((message) => {
      console.log(message);
    });
}

export async function startStreaming() {
  fetch("http://localhost:3001/collectdata", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      console.log(response);
      var message = response.json();
      return message;
    })
    .then((message) => {
      console.log(message);
    });
}

export async function stopStreaming() {
  fetch("http://localhost:3001/stopdata", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      console.log(response);
      var message = response.json();
      return message;
    })
    .then((message) => {
      console.log(message);
    });
}
