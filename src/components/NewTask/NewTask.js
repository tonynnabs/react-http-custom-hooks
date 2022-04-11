import React from "react";
import useHttp from "../../hooks/use-http";
import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
 
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();
  const sendData = (text, data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: text };
    props.onAddTask(createdTask);
  };
  const enterTaskHandler = (textInput) => {
    sendTaskRequest(
      {
        url: "https://react-http-request-c314b-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { text: textInput },
      },
      sendData.bind(null, textInput)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
