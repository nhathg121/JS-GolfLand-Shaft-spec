import React from "react";
import "../App.css";
import { MdClose } from "react-icons/md";

const Formtable = ({ handleSubmit, handleOnChange, handleclose, rest }) => {
  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handleclose}>
          <MdClose />
        </div>
        <label htmlFor="brand">Brand : </label>
        <input
          type="text"
          id="name"
          name="brand"
          onChange={handleOnChange}
          value={rest.brand}
        />

        <label htmlFor="model">Model: </label>
        <input
          type="text"
          id="model"
          name="model"
          onChange={handleOnChange}
          value={rest.model}
        />

        <label htmlFor="torque">Torque : </label>
        <input
          type="text"
          id="torque"
          name="torque"
          onChange={handleOnChange}
          value={rest.torque}
        />
        <label htmlFor="weight">weight : </label>
        <input
          type="text"
          id="weight"
          name="weight"
          onChange={handleOnChange}
          value={rest.weight}
        />
        <label htmlFor="launch">Launch : </label>
        <input
          type="text"
          id="launch"
          name="launch"
          onChange={handleOnChange}
          value={rest.launch}
        />
        <label htmlFor="cpm">CPM : </label>
        <input
          type="text"
          id="cpm"
          name="cpm"
          onChange={handleOnChange}
          value={rest.cpm}
        />

        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default Formtable;
