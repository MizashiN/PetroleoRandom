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
        }
    };
    newItem.appendChild(editButton);

    // Adicionar o novo item à lista de informações salvas
    document.getElementById("savedInfo").appendChild(newItem);

    // Adicionar botão de deletar ao novo item
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Deletar";
    deleteButton.className = "delete";
    deleteButton.onclick = function() {
        newItem.remove();
    };
    newItem.appendChild(deleteButton);

    // Limpar os campos do formulário
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
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

// Get the theme toggle button




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
