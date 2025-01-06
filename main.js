const popup = document.querySelector(".add-popup");
const popupBox = document.querySelector(".popup-box");
const notesContainer = document.querySelector(".notes");

const notes = [{ note: "Wancky note 1" }, { note: "Dancky note 100" }];
const togglePopUp = () => {
  popup.classList.toggle("d-none");
  popupBox.classList.toggle("d-anima");
  popupBox.classList.toggle("d-no-anima");
};
function renderNotes() {
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
      <input type="checkbox" />
      <p>${note.note}</p>
    </span>
    <span>
      <p>edit</p>
      <p>delete</p>
      </span>`;
      notesContainer.appendChild(div);
    });
  }
}
renderNotes();
const record = () => {
  const noteInput = document.getElementById("note-input").value;
  document.getElementById("note-input").value = "";
  notes.push({ note: noteInput });
  console.log(notes);
  togglePopUp();
  renderNotes();
};
