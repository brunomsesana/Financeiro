let financas = [];
let financasTable = [];
let moeda = "R$";
let gasto = "Gasto";
let receita = "Receita";
function addReg(tipo, desc, prec){
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    if (tipo == "1"){
        td1.innerHTML = gasto;
        td1.style = "color: #da5757;"
        td2.style = "color: #da5757;"
        td3.style = "color: #da5757;"
    } else if (tipo == "2"){
        td1.innerHTML = receita;
        td1.style = "color: #5fb45f;"
        td2.style = "color: #5fb45f;"
        td3.style = "color: #5fb45f;"
    }
    td2.innerHTML = desc;
    td3.innerHTML = '<span class="moeda">' + moeda + '</span>' + prec;
    let tr = document.createElement("tr")
    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    document.getElementById("regs").append(tr);
    return td1.innerHTML;
}
function addFin(e){
    e.preventDefault();
    let tipo = document.getElementById("tipo").value
    let desc = document.getElementById("descricao").value
    let prec = document.getElementById("preco").value
    let tip = addReg(tipo, desc, prec);
    let preco = parseFloat(prec);
    let GTotal = parseFloat(document.getElementById("GTotal").innerHTML);
    let RTotal = parseFloat(document.getElementById("RTotal").innerHTML);
    let TotalAnt = parseFloat(document.getElementById("Total").innerHTML);
    let Total;
    if (document.getElementById("UniTotal").innerHTML == "-"){
        TotalAnt = TotalAnt * -1;
    }
    if (tipo == "1"){
        document.getElementById("GTotal").innerHTML = (GTotal + preco).toFixed(2);
        Total = (TotalAnt - preco).toFixed(2);
    } else if (tipo == "2"){
        document.getElementById("RTotal").innerHTML = (RTotal + preco).toFixed(2);
        Total = (TotalAnt + preco).toFixed(2);
    }
    if (Total < 0){
        document.getElementById("UniTotal").innerHTML = "-";
        document.getElementById("Total").innerHTML = (Total * -1).toFixed(2);
    } else {
        document.getElementById("UniTotal").innerHTML = "";
        document.getElementById("Total").innerHTML = Total;
    }
    financas.push({
        "Tipo": tip,
        "Descrição": desc,
        "Preço": parseFloat(prec)
    })
    financasTable.push({
        tipo: tipo,
        desc: desc,
        prec: prec
    })
    return false;
}
function save(){
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(financas), "Data");
    ws = wb.Sheets["Data"];
    XLSX.utils.sheet_add_aoa(ws, [["Total:", "", {f: ("SUM(C2:C" + (financas.length+1) + ")")}]], {origin: "A" + (financas.length+2)});
    ws["!merges"] = [{s: {r: financas.length+1, c: 0}, e:{r: financas.length+1, c: 1}}];
    XLSX.writeFile(wb, "Export" + "" + ".xlsx");
}
function load(){

}
function ChangeLang(valor){
    document.getElementById("regs").innerHTML = '<tr>\n<th id="col1">Tipo</th>\n<th id="col2">Descrição</th>\n<th id="col3">Preço</th>\n</tr>';
    if (valor == "en-us"){
        document.getElementById("title").innerHTML = "Financial Control";
        document.getElementById("opt1").innerHTML = "Type of register";
        document.getElementById("opt2").innerHTML = "Expense";
        gasto = "Expense";
        document.getElementById("opt3").innerHTML = "Income";
        receita = "Income";
        document.getElementById("descricao").placeholder = "Description";
        document.getElementById("preco").placeholder = "Price";
        document.getElementById("submit").value = "Insert";
        document.getElementById("col1").innerHTML = "Type";
        document.getElementById("col2").innerHTML = "Description";
        document.getElementById("col3").innerHTML = "Price";
        document.getElementById("R$").innerHTML = "Brazilian Real (R$)";
        document.getElementById("$").innerHTML = "American Dollar ($)";
        document.getElementById("€").innerHTML = "Euro (€)";
        document.getElementById("£").innerHTML = "British Pound (£)";
        document.getElementById("¥").innerHTML = "Japanese Yen (¥)";
        document.getElementById("C$").innerHTML = "Canadian Dollar (C$)";
        document.getElementById("A$").innerHTML = "Australian Dollar (A$)";
        document.getElementById("CHF").innerHTML = "Swiss Franc (CHF)";
        document.getElementById("CNY").innerHTML = "Chinese Yuan (¥)";
        document.getElementById("INR").innerHTML = "Indian Rupee (₹)";
        document.getElementById("RUB").innerHTML = "Russian Ruble (₽)";
        document.getElementById("KRW").innerHTML = "South Korean Won (₩)";
        document.getElementById("ZAR").innerHTML = "South African Rand (R)";
        document.getElementById("TRY").innerHTML = "Turkish Lira (₺)";
        document.getElementById("MXN").innerHTML = "Mexican Peso (MX$)";
        document.getElementById("SGD").innerHTML = "Singapore Dollar (S$)";
        document.getElementById("NZD").innerHTML = "New Zealand Dollar (NZ$)";
        document.getElementById("THB").innerHTML = "Thai Baht (฿)";
        document.getElementById("AED").innerHTML = "UAE Dirham (د.إ)";
        document.getElementById("SAR").innerHTML = "Saudi Riyal (﷼)";
        document.getElementById("ILS").innerHTML = "Israeli Shekel (₪)";
        document.getElementById("Total1").innerHTML = "Total expense:";
        document.getElementById("Total2").innerHTML = "Total income:";
        document.getElementById("Total3").innerHTML = "Total:";
    } else if (valor == "pt-br"){
        document.getElementById("title").innerHTML = "Controle Financeiro";
        document.getElementById("opt1").innerHTML = "Tipo de registro";
        document.getElementById("opt2").innerHTML = "Gasto";
        gasto = "Gasto";
        document.getElementById("opt3").innerHTML = "Receita";
        receita = "Receita";
        document.getElementById("descricao").placeholder = "Descrição";
        document.getElementById("preco").placeholder = "Preço";
        document.getElementById("submit").value = "Inserir";
        document.getElementById("col1").innerHTML = "Tipo";
        document.getElementById("col2").innerHTML = "Descrição";
        document.getElementById("col3").innerHTML = "Preço";
        document.getElementById("R$").innerHTML = "Real Brasileiro (R$)";
        document.getElementById("$").innerHTML = "Dólar Americano ($)";
        document.getElementById("€").innerHTML = "Euro (€)";
        document.getElementById("£").innerHTML = "Libra Esterlina (£)";
        document.getElementById("¥").innerHTML = "Iene Japonês (¥)";
        document.getElementById("C$").innerHTML = "Dólar Canadense (C$)";
        document.getElementById("A$").innerHTML = "Dólar Australiano (A$)";
        document.getElementById("CHF").innerHTML = "Franco Suíço (CHF)";
        document.getElementById("CNY").innerHTML = "Yuan Chinês (¥)";
        document.getElementById("INR").innerHTML = "Rupia Indiana (₹)";
        document.getElementById("RUB").innerHTML = "Rublo Russo (₽)";
        document.getElementById("KRW").innerHTML = "Won Sul-Coreano (₩)";
        document.getElementById("ZAR").innerHTML = "Rand Sul-Africano (R)";
        document.getElementById("TRY").innerHTML = "Lira Turca (₺)";
        document.getElementById("MXN").innerHTML = "Peso Mexicano (MX$)";
        document.getElementById("SGD").innerHTML = "Dólar de Singapura (S$)";
        document.getElementById("NZD").innerHTML = "Dólar Neozelandês (NZ$)";
        document.getElementById("THB").innerHTML = "Baht Tailandês (฿)";
        document.getElementById("AED").innerHTML = "Dirham dos Emirados Árabes Unidos (د.إ)";
        document.getElementById("SAR").innerHTML = "Riyal Saudita (﷼)";
        document.getElementById("ILS").innerHTML = "Shekel Israelense (₪)";
        document.getElementById("Total1").innerHTML = "Gasto total:";
        document.getElementById("Total2").innerHTML = "Receita total:";
        document.getElementById("Total3").innerHTML = "Total:";
    }
    for (let i in financasTable){
        addReg(financasTable[i].tipo, financasTable[i].desc, financasTable[i].prec);
    }
}
function ChangeMoeda(valor){
    moeda = valor;
    let moedas = document.getElementsByClassName("moeda");
    for (let i in moedas){
        moedas[i].innerHTML = moeda;
    }
}