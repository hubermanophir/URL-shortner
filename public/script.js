const submitBtn = document.getElementById("submit");
const userUrl = document.getElementById("url_input");
const shortUrlContainer = document.getElementById("short-url-container");
const allShortLinks = document.getElementById("all-short-link");
const customAlertContainer = document.getElementById("custom-alert-container");
const listItems = document.getElementsByTagName("li");
const acc = document.getElementsByClassName("accordion");

document.addEventListener("DOMContentLoaded", async (e) => {
  await getAllUrl();
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      let panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
});

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const value = userUrl.value;
  if (value === "") {
    customAlertContainer.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Oops!</strong>  Please make sure input field is not empty
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
  } else {
    if (shortUrlContainer.childNodes.length !== 0) {
      shortUrlContainer.lastChild.remove();
    }
    await postingNewUrl(value);
  }
});

async function postingNewUrl(url) {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/api/shorturl/",
      data: {
        url: url,
      },
    });
    makeShortUrlDiv(response.data.shortUrlId);
  } catch (err) {
    if (err.response.data.error === `invalid url`) {
      customAlertContainer.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Oops!</strong>  Please make sure you have entered a valid url address
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
      console.log(err.response.data.error);
      throw err.response.data.error;
    } else {
      customAlertContainer.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Oops!</strong>  website doe's not exist please make sure the address is correct
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
      throw err.response.data.error;
    }
  }
}

async function getAllUrl() {
  const response = await axios
    .get(`http://localhost:3000/api/shorturl/`)
    .then((res) => {
      console.log(res.data);
      urlArrayToList(res.data);
    });
}

function makeShortUrlDiv(shortUrl) {
  const div = document.createElement("div");
  div.setAttribute("id", "short-url");
  const a = document.createElement("a");
  const shortAddress = `http://localhost:3000/api/shorturl/${shortUrl}`;
  a.setAttribute("href", shortAddress);
  a.setAttribute("target", "_blank");
  a.innerText = shortAddress;
  div.appendChild(a);
  shortUrlContainer.appendChild(div);
}

function urlArrayToList(urlArray) {
  for (const url of urlArray) {
    const button = document.createElement("button");
    button.setAttribute("class", "accordion");
    button.innerText = `http://localhost:3000/api/shorturl/${url.shortUrlId}`;
    const div = document.createElement("div");
    div.setAttribute("class", "panel");
    const p = document.createElement("p");
    p.innerHTML = `Short url address: <a target="blank" href="http://localhost:3000/api/shorturl/${url.shortUrlId}">http://localhost:3000/api/shorturl/${url.shortUrlId}</a><br>Original address: ${url.originalUrl}<br>Number of redirects:${url.redirects}<br>Creation date:${url.date}`;
    div.appendChild(p);
    allShortLinks.appendChild(button);
    allShortLinks.appendChild(div);
  }
}

async function makeFormWithSubmitToStatistics(shortUrlId) {
  const form = document.createElement("form");
  form.setAttribute("method", "GET");
  form.setAttribute("action", `/api/statistic/${shortUrlId}`);
  form.setAttribute("class", "statistic-form");
  form.setAttribute("target", "_blank");
  const submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "statistics >");
  submit.setAttribute("class", "statistics-button");
  form.appendChild(submit);
  return form;
}
