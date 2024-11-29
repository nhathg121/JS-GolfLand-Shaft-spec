import "./App.css";
import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import Formtable from "./components/Formtable";
import Header from "./components/Header";

axios.defaults.baseURL = "http://localhost:2000/";

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    image: "",
    torque: "",
    weight: "",
    launch: "",
    cpm: "",
    description: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    brand: "",
    model: "",
    image: "",
    torque: "",
    weight: "",
    launch: "",
    cpm: "",
    description: "",
    _id: "",
  });
  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    // console.log(data.config);

    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();
      setFormData({
        brand: "",
        model: "",
        image: "",
        torque: "",
        weight: "",
        launch: "",
        cpm: "",
        description: "",
      });
      // console.log(data);
    }
  };
  const getFetchData = async () => {
    const data = await axios.get("/");
    // console.log(data);
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };
  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);

    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // console.log(formDataEdit);

    const data = await axios.put("/update", formDataEdit);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
      setEditSection(false);
    }
  };

  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };
  return (
    <>
      <Header />
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>
          Add
        </button>

        {addSection && (
          <Formtable
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleclose={() => setAddSection(false)}
            rest={formData}
          />
        )}
        {editSection && (
          <Formtable
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleclose={() => setEditSection(false)}
            rest={formDataEdit}
          />
        )}

        <div className="tableContainer">
          <table cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <th>Brand</th>
                <th>Model</th>
                <th>Torque</th>
                <th>Weight</th>
                <th>Launch</th>
                <th>CPM</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {dataList[0] ? (
                dataList.map((el, i) => {
                  // console.log("here is :" + el.brand);
                  return (
                    // https://product.hstatic.net/200000836511/product/839f5669-23cc-4094-b82f-b5bcb949004f_e368ed9ea88747cd8a9bd461cb224a57_c6c4114b6c0c492b9de619a623fa0c2b.jpg
                    <tr key={i}>
                      <td>{el.brand}</td>
                      <td>{el.model}</td>
                      <td>{el.torque}</td>
                      <td>{el.weight}</td>
                      <td>{el.launch}</td>
                      <td>{el.cpm}</td>

                      <td>
                        <button
                          className="btn btn-edit"
                          onClick={() => handleEdit(el)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDelete(el._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p style={{ textAlign: "center" }}>No data</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
