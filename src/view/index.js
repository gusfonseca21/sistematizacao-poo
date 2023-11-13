const returnFields = [
  {
    label: "Nome",
    id: "name",
    type: "text",
    size: 15,
    disabled: true,
  },
  {
    label: "Telefone",
    id: "phone",
    type: "text",
    disabled: true,
    size: 11,
  },
  { label: "Código", id: "code", type: "text", size: 5, disabled: true },
  { label: "Descrição", id: "description", type: "textarea", disabled: true },
  { label: "Solução", id: "solution", type: "textarea", disabled: true },
];
const openFields = [
  {
    label: "Nome",
    id: "name",
    type: "text",
    size: 15,
    minLength: "4",
    maxLength: "30",
    required: true,
  },
  {
    label: "Telefone",
    id: "phone",
    type: "text",
    size: 11,
    minLength: "11",
    maxLength: "11",
    required: true,
  },
  {
    label: "Descrição",
    id: "description",
    type: "textarea",
    minLength: "10",
    maxLength: "200",
    required: true,
  },
  {
    label: "Solução",
    id: "solution",
    type: "textarea",
    minLength: "10",
    maxLength: "200",
    required: true,
  },
];

const selectEl = document.getElementById("select");
const selectedOptionEl = document.getElementById("selected-option");
const complaintsActionEl = document.getElementById("complaints-action");

selectEl.addEventListener("change", function (event) {
  clearActionEl();
  if (event.target.value === "return-all") getAllComplains();
  if (event.target.value === "search-by-id") searchComplaint();
  if (event.target.value === "post") renderPostComplaint();
});

function renderPostComplaint() {
  const formEl = createFormEl(openFields, 1);
  const submitInput = document.createElement("input");
  submitInput.textContent = "Teste";
  submitInput.setAttribute("id", "submit-input");
  submitInput.setAttribute("type", "submit");
  formEl.appendChild(submitInput);
  complaintsActionEl.appendChild(formEl);

  submitInput.addEventListener("click", function (event) {
    event.preventDefault();
    const name = document.getElementById("name-1").value;
    const phone = document.getElementById("phone-1").value;
    const description = document.getElementById("description-1").value;
    const solution = document.getElementById("solution-1").value;

    postComplaint({ name, phone, description, solution });
  });
}

async function getAllComplains() {
  try {
    const response = await fetch("http://localhost:8080/complaint", {
      method: "GET",
    });
    const responseBody = await response.json();

    if (responseBody.data.length > 0) {
      responseBody.data.forEach((complaint) => {
        const formEl = createFormEl(returnFields, complaint.id, true);
        complaintsActionEl.appendChild(formEl);
        document.getElementById(`name-${complaint.id}`).value = complaint.name;
        document.getElementById(`phone-${complaint.id}`).value =
          complaint.phone;
        document.getElementById(`code-${complaint.id}`).value = complaint.code;
        document.getElementById(`description-${complaint.id}`).value =
          complaint.description;
        document.getElementById(`solution-${complaint.id}`).value =
          complaint.solution;
      });
    } else {
      const noComplaintsEl = document.createElement("h4");
      noComplaintsEl.textContent = "Não existem reclamações registradas";
      complaintsActionEl.appendChild(noComplaintsEl);
    }
  } catch (err) {
    const errMessageEl = document.createElement("h4");
    errMessageEl.textContent = "Houve um erro ao requisitar as reclamações";
    complaintsActionEl.appendChild(errMessageEl);
  }
}

function searchComplaint() {
  const fieldDiv = document.createElement("div");
  fieldDiv.classList.add("field");
  const label = document.createElement("label");
  label.textContent = "Buscar pelo código";
  searchInput = document.createElement("input");
  searchInput.setAttribute("type", "string");
  searchInput.setAttribute("maxlength", 5);
  const button = document.createElement("button");
  button.setAttribute("id", "search-button");
  button.textContent = "Buscar";
  fieldDiv.appendChild(label);
  fieldDiv.appendChild(searchInput);
  fieldDiv.appendChild(button);
  complaintsActionEl.appendChild(fieldDiv);

  button.addEventListener("click", async function () {
    const elementExists = document.getElementById("search-complaint-action");
    if (elementExists) {
      elementExists.remove();
    }
    const searchCode = searchInput.value;
    const { data } = await fetchComplaint(searchCode);
    const formEl = createFormEl(returnFields, data.id, true);
    formEl.setAttribute("id", data.id);
    complaintsActionEl.appendChild(formEl);
    document.getElementById(`name-${data.id}`).value = data.name;
    document.getElementById(`phone-${data.id}`).value = data.phone;
    document.getElementById(`code-${data.id}`).value = data.code;
    document.getElementById(`description-${data.id}`).value = data.description;
    document.getElementById(`solution-${data.id}`).value = data.solution;
  });
}

async function fetchComplaint(code) {
  try {
    const response = await fetch(`http://localhost:8080/complaint/${code}`, {
      method: "GET",
    });
    const responseBody = await response.json();
    return responseBody;
  } catch (err) {
    const errMessageEl = document.createElement("h4");
    errMessageEl.textContent = "Não existem reclamações com esse código";
    complaintsActionEl.appendChild(errMessageEl);
  }
}

async function postComplaint(complaint) {
  try {
    const response = await fetch("http://localhost:8080/complaint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(complaint),
    });
    const responseBody = await response.json();

    if (responseBody.status === 201) {
      clearActionEl();
      const errMessageEl = document.createElement("h4");
      errMessageEl.textContent = "Reclamação registrada com sucesso";
      complaintsActionEl.appendChild(errMessageEl);
    }
  } catch (err) {
    console.log(err);
  }
}

async function updateComplaint(complaint) {
  try {
    const response = await fetch(
      `http://localhost:8080/complaint/${complaint.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(complaint),
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

async function deleteComplaint(complaintId) {
  try {
    const response = await fetch(
      `http://localhost:8080/complaint/${complaintId}`,
      {
        method: "DELETE",
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

function createFormEl(fields, complaintId, manage) {
  const formEl = document.createElement("form");
  formEl.setAttribute("id", complaintId);
  formEl.classList.add("return-all");

  fields.forEach((field) => {
    const fieldDiv = document.createElement("div");
    fieldDiv.classList.add("field");
    const label = document.createElement("label");
    label.textContent = field.label;
    label.setAttribute("for", `${field.id}-${complaintId}`);

    let inputOrTextArea;

    if (field.type === "textarea") {
      inputOrTextArea = document.createElement("textarea");
    } else {
      inputOrTextArea = document.createElement("input");
      inputOrTextArea.setAttribute("type", field.type);
    }
    inputOrTextArea?.setAttribute("id", `${field.id}-${complaintId}`);

    if (field.disabled) {
      inputOrTextArea.setAttribute("disabled", "true");
    }

    if (field.required) {
      inputOrTextArea.setAttribute("required", "true");
    }

    if (field.minLength) {
      inputOrTextArea.setAttribute("minlength", field.minLength);
    }

    if (field.maxLength) {
      inputOrTextArea.setAttribute("maxlength", field.maxLength);
    }

    if (field.size) {
      inputOrTextArea.setAttribute("size", field.size);
    }

    fieldDiv.appendChild(label);
    fieldDiv.appendChild(inputOrTextArea);
    formEl.appendChild(fieldDiv);
  });

  if (manage) {
    const editBtn = document.createElement("button");
    editBtn.textContent = "Editar";
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Excluir";

    formEl.appendChild(editBtn);
    formEl.appendChild(deleteBtn);

    editBtn.addEventListener("click", function (event) {
      deleteBtn.remove();
      editBtn.remove();
      event.preventDefault();
      enableInputs(complaintId);
      const confirmButton = document.createElement("button");
      confirmButton.textContent = "Confirmar";
      const cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancelar";
      formEl.appendChild(confirmButton);
      formEl.appendChild(cancelButton);

      confirmButton.addEventListener("click", async function (event) {
        event.preventDefault();
        const name = document.getElementById(`name-${complaintId}`).value;
        const phone = document.getElementById(`phone-${complaintId}`).value;
        const code = document.getElementById(`code-${complaintId}`).value;
        const description = document.getElementById(
          `description-${complaintId}`
        ).value;
        const solution = document.getElementById(
          `solution-${complaintId}`
        ).value;
        const response = await updateComplaint({
          id: complaintId,
          name,
          phone,
          code,
          description,
          solution,
        });

        if (response.status === 200) {
          confirmButton.remove();
          cancelButton.remove();
          formEl.appendChild(editBtn);
          formEl.appendChild(deleteBtn);
          disableInputs(complaintId);
        }
      });

      cancelButton.addEventListener("click", function (event) {
        event.preventDefault();
        confirmButton.remove();
        cancelButton.remove();
        formEl.appendChild(editBtn);
        formEl.appendChild(deleteBtn);
        disableInputs(complaintId);
      });
    });

    deleteBtn.addEventListener("click", async function (event) {
      event.preventDefault();
      const response = await deleteComplaint(complaintId);
      if (response.status === 200) {
        formEl.remove();
      }
    });
  }

  return formEl;
}

function clearActionEl() {
  complaintsActionEl.innerHTML = "";
}

function disableInputs(complaintId) {
  document.getElementById(`name-${complaintId}`).disabled = true;
  document.getElementById(`phone-${complaintId}`).disabled = true;
  document.getElementById(`description-${complaintId}`).disabled = true;
  document.getElementById(`solution-${complaintId}`).disabled = true;
}

function enableInputs(complaintId) {
  document.getElementById(`name-${complaintId}`).disabled = false;
  document.getElementById(`phone-${complaintId}`).disabled = false;
  document.getElementById(`description-${complaintId}`).disabled = false;
  document.getElementById(`solution-${complaintId}`).disabled = false;
}
