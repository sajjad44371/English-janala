const createElement = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};

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
        <button id="btn-lesson-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}
        </button>
    `;

    // 4. append to the container
    lessonContainer.appendChild(btnDiv);
  }
};

// load level word
const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((lvl) => {
      const lessonBtn = document.getElementsByClassName("lesson-btn");
      for (const singleBtn of lessonBtn) {
        singleBtn.classList.remove("active");
      }

      const clickBtn = document.getElementById(`btn-lesson-${id}`);
      clickBtn.classList.add("active");
      displayLevelWord(lvl.data);
    });

  letsLearn.style.display = "none";
  vocaWord.style.display = "block";
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `
      <div
            class="vocabularies-body col-span-full text-center bg-[#f8f8f8] rounded-[24px] py-[64px]"
          >
            <img src="./assets/alert-error.png" alt="" class="block mx-auto">
            <p class="bangla text-[#79716B] text-center">
              এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h2 class="bangla text-4xl font-medium mt-3">
              নেক্সট Lesson এ যান
            </h2>
      </div>
    `;
    manageSpinner(false);
    return;
  }

  for (const word of words) {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="word-card bg-white rounded-xl">
            <div class="word-card-content text-center p-[56px]">
              <h3 class="text-3xl font-bold">${
                word.word ? word.word : "শব্দ পাওয়া যায় নি"
              }</h3>
              <p class="text-lg font-medium my-6">Meaning /Pronounciation</p>
              <h2 class="bangla text-xl font-semibold">"${
                word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি"
              } / ${
      word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায় নি"
    }"</h2>
              <div class="card-icon mt-7 flex justify-between items-center">
                <div class="icon-left rounded-xl bg-[#1a91ff1a] hover:bg-[#1a91ff4d] duration-300 text-[#374957]">
                  <button onclick="loadWordDetails(${
                    word.id
                  })"><i class="fa-solid fa-circle-info p-4 cursor-pointer"></i></button>
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
  manageSpinner(false);
};

// load word details
const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayDetails(details.data);
};

const displayDetails = (word) => {
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
      <div>
              <h2 class="text-2xl font-semibold">
                ${word.word} ( <i class="fa-solid fa-microphone-lines"></i> :${
    word.pronunciation
  })
              </h2>
              <div class="my-8">
                <h4 class="text-xl font-semibold">Meaning</h4>
                <p class="text-lg font-medium bangla">${word.meaning}</p>
              </div>
              <div class="mb-8">
                <h4 class="text-xl font-semibold">Example</h4>
                <p class="text-lg font-medium">
                  ${word.sentence}
                </p>
              </div>
              <h4 class="text-xl font-medium bangla">সমার্থক শব্দ গুলো</h4>
              <div class="flex justify-start gap-2.5">
                <div class="bg-[#D7E4EF] rounded-md">
                  <p class="text-lg px-3 py-2">${createElement(
                    word.synonyms
                  )}</p>
                </div>
              </div>
            </div>
  `;
  document.getElementById("my_modal").showModal();
};

// spinner
const manageSpinner = (status) => {
  if (status) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("voca-word").classList.add("hidden");
  } else {
    document.getElementById("voca-word").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

loadLessons();
