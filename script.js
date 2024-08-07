let img = {};
const convertFunction = async (selectFrom, selectTo) => {
    let amount = document.querySelector("input").value;
    document.querySelector("input").value = "";
    let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${selectFrom.value.toLowerCase()}.json`;
    let promise = await fetch(url);
    let fromDigit = document.querySelector("#fromDigit");
    let toDigit = document.querySelector("#toDigit");
    if(amount < 0 || amount === "") {
        document.querySelector("input").placeholder = "Input Positive Amount!!"
        document.querySelector("input").value = "";
        return;
    }

    console.log(promise.ok)
    if(!promise.ok) {
        console.log("not ok")
        fromDigit.innerText = amount;
        toDigit.innerText = "Unknown";
        return 
    }
    let data = await promise.json();
    data = data[selectFrom.value.toLowerCase()];


    let converted = (amount * data[selectTo.value.toLowerCase()]).toFixed(2);
    if(converted == "NaN") {
        converted = "Unknown";
    }
    fromDigit.innerText = amount;
    toDigit.innerText = converted;
    fromDigit.scrollLeft = fromDigit.scrollWidth;
    toDigit.scrollLeft = toDigit.scrollWidth;
    document.querySelector("input").placeholder = "Input Amount"
};

const addingAllCountry = async () => {
    let url = "currencyCode.json"
    let promise = await fetch(url);
    let data = await promise.json();
    let from = document.querySelector("#selectFrom");
    let to = document.querySelector("#selectTo");
    for (let currency in data) {
        from.innerHTML += `<option>${currency}</option>`;
        to.innerHTML += `<option>${currency}</option>`;
        img[currency] = `https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/${data[currency].toLowerCase()}.svg`;
    }
};

const changeSelect = (select, flag) => {
    flag.src = img[select.value];
    document.querySelector("#fromDigit").innerText = "?";
    document.querySelector("#toDigit").innerText = "?";
}

const main = () => {
    addingAllCountry();

    let selectFrom = document.querySelector("#selectFrom");
    selectFrom.addEventListener("change", () => {
        changeSelect(selectFrom, document.querySelector("#fromFlag"));
    });

    let selectTo = document.querySelector("#selectTo");
    selectTo.addEventListener("change", () => {
        changeSelect(selectTo, document.querySelector("#toFlag"));
    });

    document.querySelector("button").addEventListener("click", () => {
        convertFunction(selectFrom, selectTo);
    })

}

main();