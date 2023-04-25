import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import mobileLight from "./images/bg-mobile-light.jpg";
import cross from "./images/icon-cross.svg";
import styles from "./styles.module.css";
import moonLight from "./images/icon-moon.svg";
import sun from "./images/icon-sun.svg";
import check from "./images/icon-check.svg";
function App() {
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState("");
  const [isDark, setIsdark] = useState(false);
  const [checked, setChecked] = useState(false);
  const [status , setStatus] = useState("All");


  const active = tasks.filter((task) => !task.active);
  const completed = tasks.filter((task) => task.active);
  const array = status === "All" ? tasks : status === "active" ? active : status === "completed" ? completed :null
  
  function handleChange(event) {
    setValue(event.target.value);
  }
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const newItem = {
        content: value,
        active: checked,
        id: Math.random(),
      };
      const updatedArray = [...tasks, newItem];
      setTasks(updatedArray);
    }
  };
  const removeTask = (id) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(id, 1);
    setTasks(updatedTasks);
    console.log(updatedTasks);
  };
  const handleRemoveCompletedTasks = () => {
    const newTasks = tasks.filter((task) => !task.active);
    setTasks(newTasks);
  };

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : ""} `}>
      <div className={styles.logo}>
        <h1>T O D O</h1>
        <img
          onClick={() => {
            setIsdark(!isDark);
          }}
          className={styles.icon}
          src={isDark ? sun : moonLight}
          alt=""
        />
      </div>

      <div className={styles.create}>
        <div
          onClick={() => {
            setChecked(!checked);
          }}
          className={` ${styles.checkbox} ${checked ? styles.active : ""} `}
        >
          {checked ? <img src={check} alt="" /> : null}
        </div>

        <input
          className={styles.inp}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div 
      // style={{height:tasks.length == 0 ? "368px" : "0px"}}
       className={styles.main}>
        <div>
          <ul>
            {array.map((task) => {
              return (
                <>
                  <li className={styles["task-box"]} key={task.content}>
                    <div
                      onClick={() => {
                        let clone = [...tasks];
                        let elementIndex = clone.findIndex(
                          (item) => item.id === task.id
                        );
                        clone[elementIndex].active =
                          !clone[elementIndex].active;
                        setTasks(clone);
                      }}
                      className={` ${styles.checkbox} ${
                        task.active ? styles.active : ""
                      } `}
                    >
                      {task.active ? <img src={check} alt="" /> : null}
                    </div>
                    <h3>{task.content}</h3>
                    <img
                      className={styles.delete}
                      src={cross}
                      alt=""
                      onClick={() => {
                        let clone = [...tasks];
                        let elementIndex = clone.findIndex(
                          (item) => item.id === task.id
                        );
                        removeTask(clone[elementIndex]);
                      }}
                    />
                  </li>
                  <hr className={styles.same} />
                </>
              );
            })}
          </ul>
        </div>

        <div className={styles.summary}>
          <h4> {tasks.length} items left</h4>


          <button className={styles.btn1} onClick={handleRemoveCompletedTasks}>Clear Completed</button>
        </div>
      </div>
      <div className={styles.choice}>
        <button onClick={()=>setStatus("All")} className={styles.btn2}>All</button>
        <button onClick={()=>setStatus("active")} className={styles.activ}>Active</button>
        <button onClick={()=>setStatus("completed")} className={styles.completed}> Completed</button>
      </div>
      
    </div>
  );
}

export default App;


 
