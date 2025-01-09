const popup = document.querySelector(".add-popup");
const popupBox = document.querySelector(".popup-box");
const notesContainer = document.querySelector(".notes");

let notes = [];

const togglePopUp = () => {
  popup.classList.toggle("d-none");
  popupBox.classList.toggle("d-anima");
  popupBox.classList.toggle("d-no-anima");
};
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
    const h2 = document.createElement("h2");
    h2.innerText = "Nothing to see...";
    notesContainer.appendChild(h2);
  } else {
    notesContainer.innerHTML = "";
    notes.forEach((note, index) => {
      console.log(note);
      const div = document.createElement("div");
      div.classList.add("note");
      div.innerHTML = `<span>
      <input type="checkbox" onchange="${() => tickCompleted(index)}"/> 
      <p class=${notes[index].isCompleted ? "completed" : "none"}>${
        note.note
      }</p>
    </span>
    <span>
      <p onclick=(editNote(${index}))>edit</p>
      <p onclick=(deleteNote(${index}))>delete</p>
      </span>`;
      notesContainer.appendChild(div);
    });
  }
}
renderNotes();
const record = () => {
  const noteInput = document.getElementById("note-input").value;
  document.getElementById("note-input").value = "";
  parseNotes();
  notes.push({ note: noteInput, isCompleted: false });
  //notes.push({ note: noteInput });
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
  deleteNote(index);
}
function deleteNote(index) {
  parseNotes();
  notes.splice(index, 1);
  localStorage.notes = JSON.stringify(notes);
  renderNotes();
}
