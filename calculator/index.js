(() => {
  let calculatorGrid = document.querySelector(".calculatorGrid");
  let display = document.getElementById("display");
  let displayTotal = document.getElementById("total");

  calculatorGrid.addEventListener("click", handleClickButton);

  let num = "";
  let total = "";
  let operation = "";

  function handleClickButton(e) {
    const block = e.target.closest(".target");
    if (!block) return false;

    const { type, value } = block.dataset;

    if (type === "calc") {
      operations(value);
    }

    if (type === "num" && num.length < 15 && !(num === '0' && value === '0')) {
      if (num === '0'){setNum(value)}
      else {setNum(num + value)};
    }

    if (type === "point" && num.indexOf(".") === -1) {
      setNum(num + value);
    }

    if (type === "op") {
      setNum(+num * -1 + "");
    }
  }

  function operations(type) {
    if (operation) {
      setTotal(mathOperations(operation, total, num));
      operation = "";
    }

    switch (type) {
      case "ac":
        setTotal("");
        setNum("");
        break;
      case "del":
        setNum(num.substr(0, num.length - 1));
        break;
      case "sq":
        if (+num < 0){
          setNum('Invalid data');
          num = '';
        } else
        setNum(Math.sqrt(+num));
        break;
      case "=":
        if (total == ''){
          setNum(num)
        }else{setNum(total);
        setTotal("", "");
        num = '';}                
        break;

      default:
        total === "" ? setTotal(num, type) : setTotal(undefined, type);
        operation = type;
        setNum("");
        break;
    }
  }

  function mathOperations(type, a, b) {
    a = +a;
    b = +b;
    let c = Math.abs(a) % 1 + '';
    let d = Math.abs(b) %1 + '';
    let e = c.length > d.length ? c.length-2 : d.length-2;   

    switch (type) {
      case "-":
        if (! +c && ! +d) return a - b
        else return (a - b).toFixed(e) / 1;
      case "+":
        if (! +c && ! +d) return a + b
        else return (a + b).toFixed(e) / 1;
      case "/":
        return a / b;
      case "*":
        if (! +c && ! +d) return a * b
        else return (a * b).toFixed(c.length-2 + d.length-2) / 1;
      case "^":
        return Math.pow(a, b);
    }
  }

  function setNum(val) {
    num = val;
    display.value = val;
  }

  function setTotal(val = total, operation = "") {
    total = val;
    displayTotal.value = `${val} ${operation}`;
  }
})();
