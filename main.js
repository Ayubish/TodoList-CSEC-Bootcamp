const popup = document.querySelector(".new-note-popup");
const popupBox = document.querySelector(".popup-box");
const notesContainer = document.querySelector(".notes");

let notes = [];

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
function renderNotes() {
  parseNotes();
  if (notes.length == 0) {
    notesContainer.innerHTML = `<img src="detective.svg" alt="empty"/><h2>Empty...</h2>`;
  } else {
    notesContainer.innerHTML = "";
    notes.forEach((note, index) => {
      console.log(note);
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
renderNotes();
const record = (index = 1000) => {
  const noteInput = document.getElementById("note-input").value;
  document.getElementById("note-input").value = "";
  parseNotes();
  notes.push({ note: noteInput, isCompleted: false });
  localStorage.notes = JSON.stringify(notes);

  togglePopUp();
  renderNotes();
};

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
  renderNotes();
}
