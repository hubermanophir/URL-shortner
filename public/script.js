// const { default: axios } = require("axios");

// const { default: axios } = require("axios");

const submitBtn = document.getElementById("submit");
const userUrl = document.getElementById("url_input");
const shortUrlContainer = document.getElementById("short-url-container");
const allShortLinks = document.getElementById("all-short-link");
const customAlertContainer = document.getElementById("custom-alert-container");
const listItems = document.getElementsByTagName("li");
const accordionDiv = document.getElementById("accordion");

document.addEventListener("DOMContentLoaded", async (e) => {
  await getAllUrl();
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

async function urlArrayToList(urlArray) {
  const ul = document.createElement("ul");
  for (const url of urlArray) {
    const li = document.createElement("li");
    li.setAttribute("class", "short-url-li");
    li.innerHTML = `<a target="_blank" href ="http://localhost:3000/api/shorturl/${url.shortUrlId}" >http://localhost:3000/api/shorturl/${url.shortUrlId}</a>`;
    const form = await makeFormWithSubmitToStatistics(url.shortUrlId);
    li.appendChild(form);
    ul.appendChild(li);
  }
  allShortLinks.appendChild(ul);
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

` 
<h3>Section 1</h3>
<div>
  <p>
    Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam.
    Integer ut neque. Vivamus nisi metus, molestie vel, gravida in,
    condimentum sit amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi.
    Proin viverra leo ut odio. Curabitur malesuada. Vestibulum a velit
    eu ante scelerisque vulputate.
  </p>
</div>
<h3>Section 2</h3>
<div>
  <p>
    Sed non urna. Donec et ante. Phasellus eu ligula. Vestibulum sit
    amet purus. Vivamus hendrerit, dolor at aliquet laoreet, mauris
    turpis porttitor velit, faucibus interdum tellus libero ac justo.
    Vivamus non quam. In suscipit faucibus urna.
  </p>
</div>
<h3>Section 3</h3>
<div>
  <p>
    Nam enim risus, molestie et, porta ac, aliquam ac, risus. Quisque
    lobortis. Phasellus pellentesque purus in massa. Aenean in pede.
    Phasellus ac libero ac tellus pellentesque semper. Sed ac felis. Sed
    commodo, magna quis lacinia ornare, quam ante aliquam nisi, eu
    iaculis leo purus venenatis dui.
  </p>
  <ul>
    <li>List item one</li>
    <li>List item two</li>
    <li>List item three</li>
  </ul>
</div>
<h3>Section 4</h3>
<div>
  <p>
    Cras dictum. Pellentesque habitant morbi tristique senectus et netus
    et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis
    in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean
    lacinia mauris vel est.
  </p>
  <p>
    Suspendisse eu nisl. Nullam ut libero. Integer dignissim consequat
    lectus. Class aptent taciti sociosqu ad litora torquent per conubia
    nostra, per inceptos himenaeos.
  </p>
</div>
<h3>Section 5</h3>
<div>
  <p>
    Cras dictum. Pellentesque habitant morbi tristique senectus et netus
    et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis
    in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean
    lacinia mauris vel est.
  </p>
  <p>
    Suspendisse eu nisl. Nullam ut libero. Integer dignissim consequat
    lectus. Class aptent taciti sociosqu ad litora torquent per conubia
    nostra, per inceptos himenaeos.
  </p>
</div>`;
