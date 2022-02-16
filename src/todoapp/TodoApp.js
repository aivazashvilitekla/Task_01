import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

const ITEMS = [
  {
    id: 1,
    title: "lorem ipsum 11",
    completed: false,
  },
  {
    id: 2,
    title: "lorem ipsum 22",
    completed: false,
  },
  {
    id: 3,
    title: "lorem ipsum 33",
    completed: true,
  },
  {
    id: 4,
    title: "lorem ipsum 44",
    completed: true,
  },
];

function TodoApp() {
  const [todos, setTodos] = useState(ITEMS);
  const [value, setValue] = useState("");
  const [taskStatistics, setTaskStatistics] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    const completed = todos.reduce(
      (acc, curr) => (curr.completed ? (acc += 1) : (acc += 0)),
      0
    );
    const notCompleted = todos.reduce(
      (acc, curr) => (!curr.completed ? (acc += 1) : (acc += 0)),
      0
    );
    setTaskStatistics([todos.length, completed, notCompleted]);
  }, [todos]);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const items = localStorage.getItem("items");
    if (items) {
      setTodos(JSON.parse(items));
    }
  }, []);

  function onItemChange(clickedItem) {
    const newValue = todos.map((item) => {
      if (item.id === clickedItem.id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setTodos(newValue);
    localStorage.setItem("items", JSON.stringify(newValue));
  }

  function onAddNewItem(e) {
    e.preventDefault();
    const newItems = [
      {
        id: Date.now(),
        title: value,
        completed: false,
      },
      ...todos,
    ];
    setTodos(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
    setValue("");
  }
  function onDeleteItem(deletedItem) {
    const newList = todos.filter((item) => item.id !== deletedItem.id);
    setTodos(newList);
    localStorage.setItem("items", JSON.stringify(newList));
  }
  return (
    <div>
      <div style={{ padding: "20px" }}>
        <form action="" onSubmit={onAddNewItem}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            ref={inputRef}
          />
        </form>
      </div>

      <ul>
        {todos.map((item) => (
          <li
            key={item.id}
            className={classNames({ completed: item.completed })}
          >
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => onItemChange(item)}
            />
            {item.title}
            <button onClick={() => onDeleteItem(item)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="statistics">
        <p>
          სულ თასქები: <span>{taskStatistics[0]}</span>
        </p>
        <p>
          დასრულებული: <span>{taskStatistics[1]}</span>
        </p>
        <p>
          დაუსრულებელი: <span>{taskStatistics[2]}</span>
        </p>
      </div>
    </div>
  );
}

export default TodoApp;
