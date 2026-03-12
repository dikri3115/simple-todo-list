let todos = JSON.parse(localStorage.getItem("todos")) || []

function simpanData(){
    localStorage.setItem("todos", JSON.stringify(todos))
}
// tamppilan todolist
function tampilkanTodo(){
    let list = document.getElementById("todoList");
        list.innerHTML = ""
        todos.forEach((todo, index) => {
            let li = document.createElement("li");
            let checkbox = document.createElement("input");
                checkbox.type = "checkbox"
                checkbox.checked= todo.done;

                checkbox.onclick = function(){
                    todos[index].done = checkbox.checked;
                    simpanData()
                    tampilkanTodo()
                }
            let span = document.createElement("span")
                span.textContent = todo.text;
                span.className = "todo-text"

                if(todo.done){
                    span.classList.add("completed")
                }
            let hapus = document.createElement("button")
                hapus.textContent = "Delete"
                hapus.classList.add("delete")

                hapus.onclick = function(){
                    todos.splice(index, 1)
                    simpanData()
                    tampilkanTodo()
                }
            
            li.appendChild(checkbox)
            li.appendChild(span)
            li.appendChild(hapus)

            list.appendChild(li)
        });
}
// pop-up pemberitahuan
function bukaModal(pesan){
    let modal = document.getElementById("modal")
    let textModal = document.getElementById("modalText")
        textModal.textContent = pesan;
        modal.style.display = "flex";
}
function tutupModal(){
    document.getElementById("modal").style.display = "none"
}

// toggle slider dark mode
const toggle = document.getElementById("toggleTheme")
const icon = document.getElementById("themeIcon")

toggle.addEventListener("change", function(){
    document.body.classList.toggle("dark")
        if(document.body.classList.contains("dark")){
            icon.textContent = "🌙"
            localStorage.setItem("theme", "dark")
        }else{
            icon.textContent = "🌞"
        }
})

// proses input todolist
function masukanTugas(){
    let input = document.getElementById("inputTodo")
    let text = input.value

    if (text === ""){
        bukaModal("Tugas kosong!!")
        return
    }
    todos.push({
        text:text
    })
    input.value = ""

    simpanData()
    tampilkanTodo()
}

// Date Time
function updateWaktu(){
    const sekarang = new Date()

    const tanggal = sekarang.toLocaleDateString("id-ID")
    const waktu = sekarang.toLocaleTimeString("id-ID")
    
    document.getElementById("tanggal").textContent = tanggal
    document.getElementById("jam").textContent  = waktu
}

setInterval(updateWaktu, 1000);
updateWaktu();

tampilkanTodo()