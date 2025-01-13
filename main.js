const popup = document.querySelector(".new-note-popup");
const popupBox = document.querySelector(".popup-box");
const notesContainer = document.querySelector(".notes");
const filterNote = document.getElementById("filter");

let notes = [];
let completedNotes = [];
let incompleteNotes = [];

filterNote.addEventListener("change", () => {
  const val = document.getElementById("filter").value;
  if (val == "all") {
    renderNotes(notes);
  } else if (val == "completed") {
    renderCompleted();
  } else {
    renderIncomplete();
  }
});

const togglePopUp = () => {
  popup.classList.toggle("d-none");
  popupBox.classList.toggle("d-anima");
  popupBox.classList.toggle("d-no-anima");
};
function toggleTheme() {
  document.querySelector("body").classList.toggle("dark");
}
function parseNotes() {
  if (localStorage.notes) {
    notes = JSON.parse(localStorage.notes);
  } else {
    localStorage.notes = JSON.stringify(notes);
  }
}
function renderNotes(notes) {
  if (notes.length == 0) {
    notesContainer.innerHTML = `<img src="detective.svg" alt="empty"/><h2>Empty...</h2>`;
  } else {
    notesContainer.innerHTML = "";
    notes.forEach((note, index) => {
      const div = document.createElement("div");
      div.classList.add("note");
      div.innerHTML = `<span>
      <input type="checkbox" ${
        note.isCompleted ? "checked" : ""
      } onchange="tickCompleted(${index})"/> 
      <p>${note.note}</p>
    </span>
    <div class="modify-note">
      <button onclick=(editNote(${index}))><img src="pen.svg" alt="edit"/></button>
      <button onclick=(deleteNote(${index}))><img src="delete.svg" alt="delete" /></button>
      </div>`;
      notesContainer.appendChild(div);
    });
  }
}
parseNotes();
renderNotes(notes);
const record = (index = 1000) => {
  const noteInput = document.getElementById("note-input").value;
  document.getElementById("note-input").value = "";
  parseNotes();
  notes.push({ note: noteInput, isCompleted: false });
  localStorage.notes = JSON.stringify(notes);
  togglePopUp();
  renderNotes(notes);
};

function renderCompleted() {
  parseNotes();
  completedNotes = notes.filter((note) => note.isCompleted == true);
  renderNotes(completedNotes);
}

function renderIncomplete() {
  parseNotes();
  incompleteNotes = notes.filter((note) => note.isCompleted == false);
  renderNotes(incompleteNotes);
}

function tickCompleted(index) {
  parseNotes();
  notes[index].isCompleted = !notes[index].isCompleted;
  localStorage.notes = JSON.stringify(notes);
}
function editNote(index) {
  parseNotes();
  togglePopUp();
  document.getElementById("note-input").value = notes[index].note;
}
function deleteNote(index) {
  parseNotes();
  notes.splice(index, 1);
  localStorage.notes = JSON.stringify(notes);
  renderNotes(notes);
}

//late night visit
