// Função para lidar com o envio do formulário
document.getElementById("infoForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o comportamento padrão de atualizar a página

    // Obter os valores dos campos de entrada
    var title = document.getElementById("title").value;
    var content = document.getElementById("content").value;

    // Criar um novo item de lista com os valores
    var newItem = document.createElement("li");
    newItem.innerHTML = "<strong>" + title + ":</strong> " + content;

    // Adicionar botão de editar ao novo item
    var editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.className = "edit";
    editButton.onclick = function() {
        var newTitle = prompt("Novo título:", title);
        var newContent = prompt("Novo conteúdo:", content);

        // Check if the user clicked "Cancel" or "OK" in the prompt
        if (newTitle !== null && newContent !== null) {
            newItem.innerHTML = "<strong>" + newTitle + ":</strong> " + newContent;
            saveInfoToLocalStorage(newTitle, newContent);
            removeFromLocalStorage(title);
            title = newTitle;
            content = newContent;
        }
    };
    newItem.appendChild(editButton);

    // Adicionar botão de deletar ao novo item
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Deletar";
    deleteButton.className = "delete";
    deleteButton.onclick = function() {
        newItem.remove();
        removeFromLocalStorage(title);
    };
    newItem.appendChild(deleteButton);

    // Adicionar o novo item à lista de informações salvas
    document.getElementById("savedInfo").appendChild(newItem);

    // Limpar os campos do formulário
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    // Salvar informação no local storage
    saveInfoToLocalStorage(title, content);
});

// Função para pesquisar informações
document.getElementById("searchInput").addEventListener("keyup", function() {
    var input, filter, ul, li, strong, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("savedInfo");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        strong = li[i].getElementsByTagName("strong")[0];
        txtValue = strong.textContent || strong.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
});

// Função para salvar informação no local storage
// Função para salvar informação no local storage
// Função para salvar informação no local storage
function saveInfoToLocalStorage(title, content) {
  const infoList = localStorage.getItem('infoList') || '[]';
  const newList = JSON.parse(infoList);
  newList.push({ title, content });
  localStorage.setItem('infoList', JSON.stringify(newList));
}
// Função para remover informação do local storage
function removeFromLocalStorage(title) {
  const infoList = localStorage.getItem('infoList') || '[]';
  const parsedList = JSON.parse(infoList);
  const updatedList = parsedList.filter((item) => item.title !== title);
  localStorage.setItem('infoList', JSON.stringify(updatedList));
}

// Função para carregar informação do local storage
// Função para carregar informação do local storage
function loadInfoFromLocalStorage() {
    const infoList = localStorage.getItem('infoList') || '[]';
    const parsedList = JSON.parse(infoList);
  
    parsedList.forEach((item) => {
      const newItem = document.createElement("li");
      newItem.innerHTML = "<strong>" + item.title + ":</strong> " + item.content;
  
      const editButton = document.createElement("button");
      editButton.textContent = "Editar";
      editButton.className = "edit";
      editButton.onclick = function() {
        var newTitle = prompt("Novo título:", item.title);
        var newContent = prompt("Novo conteúdo:", item.content);
  
        // Check if the user clicked "Cancel" or "OK" in the prompt
        if (newTitle !== null && newContent !== null) {
          newItem.innerHTML = "<strong>" + newTitle + ":</strong> " + newContent;
          saveInfoToLocalStorage(newTitle, newContent);
          removeFromLocalStorage(item.title);
        }
      };
      newItem.appendChild(editButton);
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Deletar";
      deleteButton.className = "delete";
      deleteButton.onclick = function() {
        newItem.remove();
        removeFromLocalStorage(item.title);
      };
      newItem.appendChild(deleteButton);
  
      document.getElementById("savedInfo").appendChild(newItem);
    });
  }

  const themeToggle = document.getElementById('theme-toggle');
let currentTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
  const newTheme = currentTheme === 'light'? 'dark' : 'light';
  updateTheme(newTheme);
});

function updateTheme(newTheme) {
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateCurrentTheme(newTheme);
}

function updateCurrentTheme(newTheme) {
  currentTheme = newTheme;
  themeToggle.textContent = currentTheme;
}
// Chamar função para carregar informação do local storage
loadInfoFromLocalStorage();
const downloadPdfLink = document.getElementById('download-pdf-link');
const filePath = 'C:/Users/Parafal/Documents/Project/Elementia Ficha[1].pdf';

const xhr = new XMLHttpRequest();
xhr.open('GET', filePath, true);
xhr.responseType = 'arraybuffer';
xhr.onload = function() {
  if (xhr.status === 200) {
    const fileBlob = new Blob([xhr.response], { type: 'application/pdf' });
    const url = URL.createObjectURL(fileBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Elementia Ficha[1].pdf';
    a.click();
  }
};
xhr.send();
