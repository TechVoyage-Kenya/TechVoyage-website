import React, { useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import ButtonNoBackground from "../components/common/Button-noBackground";
import { usePageTitle } from "../utils/usePageTitle";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask } from "../redux/reducers/tasksSlice";

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
};

export const TasksBoard = () => {
  usePageTitle("TechVoyage | Tasks Board");

  return (
    <div className=" w-full pt-5">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        <h1 className="pt-28 pl-12 text-4xl font-bold pb-2 text-center">
          Tasks Board
        </h1>
        <Board />
      </motion.div>
    </div>
  );
};

const Board = () => {
  const dispatch = useDispatch();

  const cards = useSelector((state) => state.tasks?.value);

  return (
    <div className="flex h-full max-h-screen overflow-x-auto w-full gap-3 pl-12 pr-12 pb-12">
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-accent1"
        cards={cards}
        dispatch={dispatch}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-yellow-400"
        cards={cards}
        dispatch={dispatch}
      />
      <Column
        title="In progress"
        column="doing"
        headingColor="text-blue-400"
        cards={cards}
        dispatch={dispatch}
      />
      <Column
        title="Complete"
        column="done"
        headingColor="text-emerald-400"
        cards={cards}
        dispatch={dispatch}
      />
      <BurnBarrel dispatch={dispatch} />
    </div>
  );
};
const Column = ({ title, headingColor, cards, column, dispatch }) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e) => {
    const cardId = Number(e.dataTransfer.getData("cardId"));
    console.log(cardId, typeof cardId);

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      console.log(cardToTransfer);

      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        console.log("hello");
        console.log(cardToTransfer);

        copy.push(cardToTransfer);
        console.log(copy);
      } else {
        console.log("here");

        const insertAtIndex = copy.findIndex((el) => {
          return el.id === before;
        });
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      console.log(copy);

      fetch("https://tech-voyage-express-js.vercel.app/api/tasks/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ tasks: copy }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return console.error("Error ");
          }
        })
        .then((data) => {
          dispatch(addTask(data?.tasks));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="lg:w-96 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium md:text-2xl ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`max-h-[90vh] h-full w-full overflow-y-auto transition-colors ${
          active ? "bg-hover" : "bg-hover/0"
        }`}
      >
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} dispatch={dispatch} />
      </div>
    </div>
  );
};

const Card = ({ title, id, column, handleDragStart, assignedTo, dueDate }) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-grab rounded border border-accent2 bg-accent1/60 p-3 active:cursor-grabbing"
      >
        <p className="text-lg text-neutral-100">{title}</p>
        <p className="text-md text-text">Assigned to: {assignedTo}</p>
        <p className="text-md text-text">
          Due: {new Date(dueDate).toLocaleDateString()}
        </p>
      </motion.div>
    </>
  );
};

const DropIndicator = ({ beforeId, column }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

const BurnBarrel = ({ dispatch }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    fetch(`https://tech-voyage-express-js.vercel.app/api/tasks/${cardId}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log(cardId);

        dispatch(deleteTask(cardId));
        setActive(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

const AddCard = ({ column, dispatch }) => {
  const theme = createTheme({
    components: {
      MuiPopover: {
        styleOverrides: {
          root: {
            backgroundColor: "#027A7F", // Background color for the calendar popover
            color: "#FFFFFF",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: "#FFFFFF", // Input text color
            "&::placeholder": {
              // Placeholder color
              color: "#AAAAAA",
            },
          },
        },
      },
      MuiCalendarPicker: {
        styleOverrides: {
          root: {
            backgroundColor: "#027A7F ", // Calendar background
            color: "#FFFFFF",
          },
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          root: {
            backgroundColor: "#027A7F", // Default color for day cells
            color: "#FFFFFF", // Text color for day cells
            "&:hover": {
              backgroundColor: "#46BEB3 ", // Background color on hover
              color: "#FFFFFF ", // Text color on hover
            },
            "&.Mui-selected": {
              backgroundColor: "#FF6347 ",
              color: "#FFFFFF ",
            },
            "&.Mui-today": {
              backgroundColor: "#FFD700", // Highlight today's date
              color: "#FFFFFF", // Text color for today's date
            },
          },

          "&.MuiPickersDay-root:hover": {
            backgroundColor: "#46BEB3 ", // Hover color
            color: "#FFFFFF ", // Text color on hover
          },
        },
      },
      MuiDatePickerToolbar: {
        styleOverrides: {
          root: {
            backgroundColor: "#027A7F ", // Background color for the toolbar
            color: "#FFFFFF ", // Text color for the toolbar
          },
        },
      },
      MuiStaticDatePicker: {
        styleOverrides: {
          root: {
            backgroundColor: "#027A7F ", // Background color for the static date picker
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: "#C4E7F3", // Set default color for all icons
          },
        },
      },
    },
  });

  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const [assignedTo, setAssignedTo] = useState(""); // New state for assigned user
  const members = useSelector((state) => state.profiles.profiles);
  const [dueDate, setDueDate] = React.useState(dayjs("2022-04-17"));
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim().length || !assignedTo || !dueDate) return; // Validate inputsn;

    const newCard = {
      column,
      title: text.trim(),

      assignedTo,
      dueDate: dueDate.format("YYYY-MM-DD"), // Include due date
    };

    fetch(`https://tech-voyage-express-js.vercel.app/api/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newCard),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.error("Error adding task");
        }
      })
      .then((data) => {
        console.log(data.data);

        dispatch(addTask(data?.data));
        setAdding(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-accent1 bg-accent1/20 p-3 text-md focus:outline-0"
          />

          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full rounded border border-accent1 bg-accent1/20 p-3 text-md focus:outline-0"
          >
            <option value="" disabled>
              Select a member...
            </option>
            {members.map((member) => (
              <option
                key={member.user_id}
                value={member.user_id}
                className="text-black"
              >
                {member.full_name}
              </option>
            ))}
          </select>

          <div className="w-full rounded border border-accent1 bg-accent1/20 text-md text-text placeholder-text/40 focus:outline-0 exclude-theme-toggle">
            <ThemeProvider theme={theme}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dueDate}
                  onChange={(newValue) => setDueDate(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="w-full rounded border border-accent1 bg-accent1/20 p-3 focus:outline-0"
                      placeholder="Select a date"
                    />
                  )}
                />
              </LocalizationProvider>
            </ThemeProvider>
          </div>

          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <ButtonNoBackground
              text="Close"
              clickAction={() => setAdding(false)}
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-primary px-3 py-1.5 text-md text-neutral-950 transition-colors hover:bg-secondary"
            >
              Add
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-md hover:font-bold transition-colors"
        >
          Add card
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};
