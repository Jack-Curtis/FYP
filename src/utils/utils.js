export async function connectToImu(devicePath, changeConnectionStatus) {
  fetch("http://localhost:3001/connect", {
    method: "post",
    body: JSON.stringify({ device: devicePath }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        changeConnectionStatus(true);
      } else {
        changeConnectionStatus(false);
      }

      return response.json();
    })
    .then((response) => console.log("Response =", response));
}

export async function disconnectImu(devicePath, changeConnectionStatus) {
  fetch("http://localhost:3001/disconnect", {
    method: "post",
    body: JSON.stringify({ device: devicePath }),
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    if (response.status === 200) {
      changeConnectionStatus(false);
    } else {
      changeConnectionStatus(true);
    }
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
  fetch("http://localhost:3001/startstream", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });
}

export async function stopStreaming() {
  fetch("http://localhost:3001/stopstream", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });
}

export function splitData(d) {
  let splitData = d.split("+");
  return [splitData[0], splitData[1]];
}
