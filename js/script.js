const letsLearn = document.getElementById("lets-learn");
const vocaWord = document.getElementById("voca-word");

// load lessons
const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((les) => displayLesson(les.data));

  letsLearn.style.display = "block";
  vocaWord.style.display = "none";
};

const displayLesson = (lessons) => {
  // 1. get the container
  const lessonContainer = document.getElementById("lesson-container");
  lessonContainer.innerHTML = "";

  // 2. loop each elements
  for (const lesson of lessons) {
    // 3. create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}
        </button>
    `;

    // 4. append to the container
    lessonContainer.appendChild(btnDiv);
  }
};

// load level word
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((lvl) => displayLevelWord(lvl.data));

  letsLearn.style.display = "none";
  vocaWord.style.display = "block";
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  for (const word of words) {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="word-card bg-white rounded-xl">
            <div class="word-card-content text-center p-[56px]">
              <h3 class="text-3xl font-bold">${word.word}</h3>
              <p class="text-lg font-medium my-6">Meaning /Pronounciation</p>
              <h2 class="bangla text-xl font-semibold">"${word.meaning} / ${word.pronunciation}"</h2>
              <div class="card-icon mt-7 flex justify-between items-center">
                <div class="icon-left rounded-xl bg-[#1a91ff1a] hover:bg-[#1a91ff4d] duration-300 text-[#374957]">
                  <button><i class="fa-solid fa-circle-info p-4 cursor-pointer"></i></button>
                </div>
                <div
                  class="icon-right rounded-xl bg-[#1a91ff1a] hover:bg-[#1a91ff4d] duration-300 text-[#374957]"
                >
                  <button><i class="fa-solid fa-volume-high p-4 cursor-pointer"></i></button>
                </div>
              </div>
            </div>
          </div>
    `;
    wordContainer.appendChild(div);
  }
};

loadLessons();
