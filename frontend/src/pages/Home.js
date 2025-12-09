import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Items from '../components/Items';
import { Chartss } from '../components/Chartss';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import LoadingBar from 'react-top-loading-bar';
import { createExpense, getUserExpenses } from '../utils/renders';
import NavBar from '../components/NavBar';

function Home() {
  const navigate = useNavigate();
  const [selectDate, setSelectedDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [salary, setSalary] = useState(1000000); // initial salary
  const [editingSalary, setEditingSalary] = useState(false); // edit mode
  const [userdata] = useState(JSON.parse(localStorage.getItem("User")));
  const [userexp, setUserexp] = useState([]);
  let [ngetSalary, setnGetSalry] = useState('')
  const ref = useRef(null);

  document.title = "Home";

  useEffect(() => {
    if (!localStorage.getItem("User")) {
      navigate("/login");
      return;
    }

    async function fetchExpenses() {
      const data = await getUserExpenses(userdata._id);
      setUserexp(data || []);
    }

    fetchExpenses();
  }, [userdata._id, navigate]);

  const getTotal = () => {
    return userexp.reduce((sum, item) => sum + Number(item.amount), 0);
  };



  const handleAddExpense = async () => {
    if (!amount || !category || !selectDate) {
      alert("Please fill all fields");
      return;
    }

    const expInfo = {
      usersid: userdata._id,
      category,
      date: selectDate,
      amount,
    };

    ref.current.staticStart();
    await createExpense(expInfo);
    ref.current.complete();

    const updatedExpenses = await getUserExpenses(userdata._id);
    setUserexp(updatedExpenses || []);

    // Clear inputs
    setAmount(0);
    setCategory("");
    setSelectedDate("");
  };

  return (
    <div className="min-h-screen font-mont w-full bg-zinc-900">
      <LoadingBar color="orange" ref={ref} />

      <NavBar data={userexp} />

      <div className="Feed w-full lg:w-4/5 mx-auto h-auto lg:h-[calc(100%-6rem)] flex flex-col lg:flex-row gap-6 p-4">

        <div className="leftbox w-full lg:w-1/2 bg-zinc-800/30 rounded-2xl p-4">
          <Chartss exdata={userexp} />
        </div>

        <div className="rightbox flex flex-col items-center w-full lg:w-1/2 gap-6">

          <div className="createnew bg-gray-800 w-full md:w-4/5 lg:w-full rounded-3xl p-6 flex flex-col justify-center items-center gap-4">


            <div className="font-bold text-2xl md:text-3xl text-white">
              Create Transaction
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full">
              <input
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                placeholder="Amount"
                className="h-12 w-full text-base p-4 rounded-xl outline-none"
              />

              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="bg-white w-full outline-none border border-gray-300 text-gray-900 text-sm rounded-xl p-2.5"
              >
                <option value="">--Select--</option>
                <option value="Grocery">Grocery</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Shopping">Shopping</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Fun">Fun</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex flex-col md:grid md:grid-cols-2 w-full gap-4">

              <DatePicker
                selected={selectDate}
                onChange={(date) => setSelectedDate(date)}
                className="p-3 w-full rounded-xl outline-none bg-zinc-950 text-white"
                placeholderText="Date"
                showYearDropdown
              />

              <a
                onClick={handleAddExpense}
                href="#_"
                className="h-12 flex justify-center items-center font-bold text-xl rounded-xl bg-gray-800 border-2 hover:bg-indigo-600 text-white transition-all cursor-pointer"
              >
                +
              </a>

            </div>
          </div>

          <div className="w-full md:w-4/5 lg:w-5/6 p-5 rounded-xl border-white border-2 grid gap-6 overflow-y-scroll max-h-[420px]">

            <div className="text-2xl md:text-3xl text-white font-bold">
              Total Expense: ₹ {getTotal().toLocaleString()}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {Array.isArray(userexp) &&
                userexp.map((item) => (
                  <Items key={item._id} data={item} />
                ))}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
