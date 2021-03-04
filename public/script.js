const submitBtn = document.getElementById("submit");
const userUrl = document.getElementById("url_input");
submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const value = userUrl.value;
  await postingNewUrl(value);
});

async function postingNewUrl(url) {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/api/shorturl/",
      headers: {
        url: url,
      },
    });
  } catch (err) {
    throw err.response.data.error;
  }
}
