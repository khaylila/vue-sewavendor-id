import Swal from "sweetalert2";

export function fetchData(url, data, success, errors, fnaly) {
  const reqData = {
    method: data.method ?? "POST",
    headers: {
      "Content-Type": "application/json",
      ...data.headers,
    },
  };
  if (data.method == "GET") {
    url += new URLSearchParams(data.body).toString();
  } else {
    if ((data.type ?? null) == null) {
      reqData.body = JSON.stringify(data.body);
    } else {
      reqData.headers = data.headers;
      reqData.body = data.body;
      // delete data.type;
    }
  }
  console.log(reqData);
  console.log(url);
  fetch(url, reqData)
    .then((response) => {
      return response.json();
    })
    .then(success)
    .catch(errors)
    .finally(fnaly);
}

export function showAlert(data) {
  Swal.fire({
    title: "Error!",
    text: "Terjadi kesalahan...",
    icon: "error",
    confirmButtonText: "Oke",
    ...data,
  });
}

export function showAlertWithConfirm(data, result) {
  Swal.fire({
    title: "Error!",
    text: "Terjadi kesalahan...",
    icon: "error",
    confirmButtonText: "Oke",
    ...data,
  }).then(result);
}

export function formatDate(timestamp) {
  const date = new Date(timestamp);

  // Extract year, month, day, hours, minutes, and seconds
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Format the date in yyyy/mm/dd HH:ii:ss format
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}
