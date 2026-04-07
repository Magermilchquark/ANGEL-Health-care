// Smooth scroll + active dot update
document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

window.addEventListener('scroll', () => {
    const sections = ['home', 'whoami', 'whatcanido', 'usecases'];
    const scrollPos = window.scrollY + window.innerHeight / 2;

    sections.forEach((id, index) => {
        const section = document.getElementById(id);
        const dot = document.querySelectorAll('.dot')[index];
        if (
            section.offsetTop <= scrollPos &&
            section.offsetTop + section.offsetHeight > scrollPos
        ) {
            document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
        }
    });
});

// Use Case Slider
const sliderTrack = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.use-card');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

let currentIndex = 0;

function updateSlider() {
    const slideWidth = slides[0].clientWidth;
    sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= slides.length) {
        currentIndex = 0;  // zurück zum Anfang
    }
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = slides.length - 1;  // zum letzten Slide
    }
    updateSlider();
});

function updateSlider() {
    const slideWidth = slides[0].clientWidth;
    sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}


//Video auf MAterial.002 anwenden

const modelViewer = document.querySelector("#viewer");

customElements.whenDefined("model-viewer").then(() => {
  const videoTexture = modelViewer.createVideoTexture("assets/models/ANGEL_Augen.mp4");

  modelViewer.addEventListener("load", async () => {
    const materials = modelViewer.model.materials;
    const targetMaterial = materials.find(mat => mat.name === "Material.002");

    if (!targetMaterial) {
      console.warn("Material_002 nicht gefunden. Existierende Materialien:");
      materials.forEach(m => console.log(m.name));
      return;
    }

    targetMaterial.pbrMetallicRoughness.baseColorTexture.setTexture(videoTexture);

    videoTexture.source.play();
    videoTexture.source.loop = true;
    videoTexture.source.muted = true;
  });
});



modelViewer.addEventListener("load", () => {
  modelViewer.model.materials.forEach((mat, i) => {
    console.log(`Material ${i}: ${mat.name}`);
  });
});



