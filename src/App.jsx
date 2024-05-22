import { useState } from 'react'
import './App.css'
import ToDo from './components/ToDo';
import ToDoForm from './components/ToDoForm';
import Search from './components/Search';
import Filter from './components/Filter';

function App() {
  const [toDos, setToDos] = useState([
    {
      id:1,
      text: "Exemplo de tarefa",
      category: "Pessoal",
      isCompleted: false,
    },
  ]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");

  const addToDo = (text, category) => {
    const newToDo = [
      ...toDos,
      {
        id: Math.floor(Math.random() * 10000),
        text,
        category,
        isCompleted: false,
      },
    ];

    setToDos(newToDo);
  }

  const removeToDo = (id) => {
    const toDoList = [...toDos];
    const filteredToDos = toDoList.filter((toDo) => toDo.id !== id ? toDo : null);
    setToDos(filteredToDos);
  }

  const completeToDo = (id) => {
    const toDoList = [...toDos];
    toDoList.map((toDo) => toDo.id === id ? toDo.isCompleted = !toDo.isCompleted : toDo);
    setToDos(toDoList);
  }

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch}/>
      <Filter filter={filter} setFilter={setFilter} setSort={setSort}/>
      <div className="to-do-list">
        {toDos
        .filter((toDo) => filter === "All" ? true : filter === "Completed" ? toDo.isCompleted : !toDo.isCompleted)
        .filter((toDo) => toDo.text.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => sort === "Asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text))
        .map((toDo) => (
          <ToDo key={toDo.id} toDo={toDo} removeToDo={removeToDo} completeToDo={completeToDo}/>
        ))}
      </div>
      <ToDoForm addToDo={addToDo} />
    </div>
  );
}

export default App;
