// SeqTableData.js
const SeqTableData = {
  sequentialcircuit: {
    headers: ["Property", "Combinational", "Sequential"],
    rows: [
      {
        property: "Output depends on",
        combinational: "Current inputs only",
        sequential: "Inputs + stored state",
      },
      {
        property: "Memory elements",
        combinational: "None",
        sequential: "Flip-flops / Latches",
      },
      {
        property: "Feedback paths",
        combinational: "No",
        sequential: "Yes",
      },
      {
        property: "Clock required",
        combinational: "No (usually)",
        sequential: "Yes (synchronous)",
      },
      {
        property: "Examples",
        combinational: "Adder, Mux, Decoder",
        sequential: "Counter, Register, FSM",
      },
    ],
  },
  SRLatch: {
    headers: ["S", "R", "Q (next)", "Q̄ (next)", "Action"],
    rows: [
      {
        S: "0",
        R: "0",
        "Q (next)": "Q",
        "Q̄ (next)": "Q̄",
        Action: "No change (memory)",
      },
      { S: "1", R: "0", "Q (next)": "1", "Q̄ (next)": "0", Action: "Set" },
      { S: "0", R: "1", "Q (next)": "0", "Q̄ (next)": "1", Action: "Reset" },
      {
        S: "1",
        R: "1",
        "Q (next)": "?",
        "Q̄ (next)": "?",
        Action: "⚠ Forbidden",
      },
    ],
  },
};

export default SeqTableData;
