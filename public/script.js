const submitBtn = document.getElementById("submit");
const userUrl = document.getElementById("url_input");
const shortUrlContainer = document.getElementById("short-url-container");
const allShortLinks = document.getElementById("all-short-link");
submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const value = userUrl.value;
  if (shortUrlContainer.childNodes.length !== 0) {
    shortUrlContainer.lastChild.remove();
  }
  await postingNewUrl(value);
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
    console.log(response.data.shortUrlId);
    makeShortUrlDiv(response.data.shortUrlId);
  } catch (err) {
    throw err.response.data.error;
  }
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
