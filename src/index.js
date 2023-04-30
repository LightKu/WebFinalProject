const apiKey = "Y8WJtjjaHf4Ytss7oQkdihTRgHdDAu3ugMM4IU9J";
const startDate = randomDate();
const endDate = new Date().toISOString().slice(0, 10);
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;
const roverApi = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`;

function randomDate() {
  const yyyy = Math.floor(Math.random() * 2) + 2021;
  const mm = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  let maxDays = 31;

  if (mm === "02") {
    maxDays = yyyy % 4 === 0 ? 29 : 28;
  } else if (mm === "04" || mm === "06" || mm === "09" || mm === "11") {
    maxDays = 30;
  }

  const dd = String(Math.floor(Math.random() * maxDays) + 1).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

console.log(randomDate());

document.addEventListener("DOMContentLoaded", () => {
  const apodImagesDiv = document.getElementById("apod-images");
  const roverImagesDiv = document.getElementById("rover-images");

  if (apodImagesDiv) {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const apodImagesDiv = document.getElementById("apod-images");

        data.forEach((imageData) => {
          if (imageData.media_type === "image") {
            const imageContainer = document.createElement("div");
            imageContainer.className = "image-container";

            const a = document.createElement("a");
            a.href = imageData.url;
            a.setAttribute("data-lightbox", "apod-images");
            a.setAttribute("data-title", imageData.title);

            const img = document.createElement("img");
            img.src = imageData.url;
            img.alt = imageData.title;
            img.width = 300;

            const imageTitle = document.createElement("div");
            imageTitle.className = "image-title";
            imageTitle.textContent = imageData.title;

            a.appendChild(img);
            imageContainer.appendChild(a);
            imageContainer.appendChild(imageTitle);
            apodImagesDiv.appendChild(imageContainer);
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching APOD data:", error);
      });
  }

  if (roverImagesDiv) {
    fetch(roverApi)
      .then((response) => response.json())
      .then((data) => {
        const roverImagesDiv = document.getElementById("rover-images");

        data.photos.forEach((photo) => {
          console.log("Rover data:", data);
          const roverImageContainer = document.createElement("div");
          roverImageContainer.className = "image-container";

          const aNew = document.createElement("a");
          aNew.href = photo.img_src;
          aNew.setAttribute("data-lightbox", "rover-images");
          aNew.setAttribute("data-title", photo.camera.name);

          const image = document.createElement("img");
          image.src = photo.img_src;
          image.alt = photo.camera.name;
          image.width = 300;

          const roverTitle = document.createElement("div");
          roverTitle.className = "rover-title";
          roverTitle.textContent = photo.camera.name;

          aNew.appendChild(image);
          roverImageContainer.appendChild(aNew);
          roverImageContainer.appendChild(roverTitle);
          roverImagesDiv.appendChild(roverImageContainer);
        });
      })
      .catch((error) => {
        console.error("Error fetching Rover data:", error);
      });
  }
});
