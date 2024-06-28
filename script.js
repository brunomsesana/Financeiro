let financas = [];
let financasTable = [];
let moeda = "R$";
let gasto = "Gasto";
let receita = "Receita";
let quantRows = 0;
let btns = "";
let stybtns = "";
let tipoTitle = "Tipo"
let descTitle = "Descrição"
let precTitle = "Preço"
function addReg(tipo, desc, prec){
    quantRows ++;
    let td1 = document.createElement("td");
    td1.id = "td1(" + quantRows + ")";
    let td2 = document.createElement("td");
    td2.id = "td2(" + quantRows + ")";
    let td3 = document.createElement("td");
    td3.id = "td3(" + quantRows + ")";
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
    td3.innerHTML = '<span class="moeda">' + moeda + '</span><span id="prec' + quantRows + '">' + prec + '</span>';
    let tr = document.createElement("tr")
    tr.id = "row" + quantRows;
    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    document.getElementById("regs").append(tr);
    let rect = tr.getBoundingClientRect();
    let button = document.createElement("button");
    button.style.position = "absolute";
    document.getElementById("btns").append(button);
    button.style.left = (rect.right - 50) + "px";
    button.style.top = (rect.top + 2.5) + "px";
    button.innerHTML = '<img src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png" alt="" width="15px">';
    button.id = "btn" + quantRows;
    button.setAttribute('onclick', 'edit(' + quantRows + ')');
    document.getElementById("stybtns").innerHTML += "#" + button.id + "{display: none;}#" + button.id + ":hover{display: block;}" + "body:has(#" + tr.id + ":hover) #" + button.id + "{display:block;}"
}
function addFin(e){
    e.preventDefault();
    let tipo = document.getElementById("tipo").value
    let desc = document.getElementById("descricao").value
    let prec = document.getElementById("preco").value
    addReg(tipo, desc, prec);
    let preco = parseFloat(prec);
    let GTotal = parseFloat(document.getElementById("GTotal").innerHTML);
    let RTotal = parseFloat(document.getElementById("RTotal").innerHTML);
    let TotalAnt = parseFloat(document.getElementById("Total").innerHTML);
    let Total;
    let tipoText = "";
    if (document.getElementById("UniTotal").innerHTML == "-"){
        TotalAnt = TotalAnt * -1;
    }
    if (tipo == "1"){
        document.getElementById("GTotal").innerHTML = (GTotal + preco).toFixed(2);
        Total = (TotalAnt - preco).toFixed(2);
        tipoText = gasto;
    } else if (tipo == "2"){
        document.getElementById("RTotal").innerHTML = (RTotal + preco).toFixed(2);
        Total = (TotalAnt + preco).toFixed(2);
        tipoText = receita;
    }
    if (Total < 0){
        document.getElementById("UniTotal").innerHTML = "-";
        document.getElementById("Total").innerHTML = (Total * -1).toFixed(2);
    } else {
        document.getElementById("UniTotal").innerHTML = "";
        document.getElementById("Total").innerHTML = Total;
    }
    financas.push({
        "Tipo": tipo,
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
    XLSX.utils.sheet_add_aoa(ws, [[tipoTitle, descTitle, precTitle]], {origin: "A1"});
    ws["!merges"] = [{s: {r: financas.length+1, c: 0}, e:{r: financas.length+1, c: 1}}];
    let date = new Date()
    XLSX.writeFile(wb, "Export (" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + Math.floor(Date.now() / 3600000) + ":" + Math.floor(Date.now() / 60000) + ":" + Math.floor(Date.now() / 1000) + ").xlsx");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(financas), "View");
    ws2 = wb.Sheets["View"];
    XLSX.utils.sheet_add_aoa(ws2, [{f: ("INDEX(Data!A2:A" + (financas.length+1) + "," + 0 + ")")}]);
}
function load(){

}
function ChangeLang(valor){
    document.getElementById("regs").innerHTML = '<tr>\n<th id="col1">Tipo</th>\n<th id="col2">Descrição</th>\n<th id="col3">Preço</th>\n</tr>';
    quantRows = 0;
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
        document.getElementById("save").innerHTML = "Export";
        document.getElementById("load").innerHTML = "Import";
        tipoTitle = "Type";
        descTitle = "Description";
        precTitle = "Price";
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
        document.getElementById("save").innerHTML = "Exportar";
        document.getElementById("load").innerHTML = "Importar";
        tipoTitle = "Tipo";
        descTitle = "Descrição";
        precTitle = "Preço";
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
function edit(row){
    let inps = document.getElementsByTagName("input");
    let sels = document.getElementsByTagName("select");
    let btts = document.getElementsByTagName("button");
    btns = document.getElementById("btns").innerHTML;
    document.getElementById("btns").innerHTML = "";
    stybtns = document.getElementById("stybtns").innerHTML;
    document.getElementById("stybtns").innerHTML = "";
    for (let i in inps){
        inps[i].disabled = true;
    }
    for (let i in sels){
        sels[i].disabled = true;
    }
    for (let i in btts){
        btts[i].disabled = true;
    }
    let select = document.createElement("select");
    let td1 = document.getElementById("td1(" + row + ")");
    let td2 = document.getElementById("td2(" + row + ")");
    let td3 = document.getElementById("td3(" + row + ")");
    let opt1 = document.createElement("option");
    opt1.innerHTML = gasto;
    opt1.value = "1";
    let opt2 = document.createElement("option");
    opt2.innerHTML = receita;
    opt2.value = "2";
    if (td1.innerHTML == "Gasto" || td1.innerHTML == "Expense"){
        opt1.setAttribute('selected', 'true');
    } else if (td1.innerHTML == "Receita" || td1.innerHTML == "Income"){
        opt2.setAttribute('selected', 'true');
    }
    select.append(opt1);
    select.append(opt2);
    select.style.width = "50%";
    select.id = "tip" + row;
    td1.innerHTML = select.outerHTML;
    let desc = document.createElement("input");
    desc.id = "desc" + row;
    desc.value = td2.innerHTML;
    let prec = document.createElement("input");
    prec.type = "number";
    prec.value = document.getElementById("prec" + row).innerHTML;
    prec.id = "prec" + row;
    td2.innerHTML="";
    td2.append(desc);
    td3.innerHTML="";
    td3.append(prec);
    let tr = document.getElementById("row" + row);
    let rect = tr.getBoundingClientRect();
    let button = document.createElement("button");
    button.style.position = "absolute";
    document.getElementById("btns").append(button);
    button.style.left = (rect.right - 50) + "px";
    button.style.top = (rect.top + 2.5) + "px";
    button.innerHTML = '<img src="https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/check-mark-icon.png" alt="" width="15px">';
    button.id = "btn" + row;
    button.setAttribute('onclick', 'saveEdit(' + row + ')');
}
function saveEdit(row){
    let tipoAnt = financasTable[row-1].tipo;
    let precAnt = parseFloat(financasTable[row-1].prec);
    let inps = document.getElementsByTagName("input");
    let sels = document.getElementsByTagName("select");
    let btts = document.getElementsByTagName("button");
    for (let i in inps){
        inps[i].disabled = false;
    }
    for (let i in sels){
        sels[i].disabled = false;
    }
    for (let i in btts){
        btts[i].disabled = false;
    }
    document.getElementById("btns").innerHTML = btns;
    document.getElementById("stybtns").innerHTML = stybtns;
    let tipo = document.getElementById("tip" + row).value;
    let desc = document.getElementById("desc" + row).value;
    let prec = document.getElementById("prec" + row).value;
    if (tipo == "1"){
        document.getElementById("td1(" + row + ")").innerHTML = gasto;
        document.getElementById("td1(" + row + ")").style = "color: #da5757;"
        document.getElementById("td2(" + row + ")").style = "color: #da5757;"
        document.getElementById("td3(" + row + ")").style = "color: #da5757;"
    } else if (tipo == "2"){
        document.getElementById("td1(" + row + ")").innerHTML = receita;
        document.getElementById("td1(" + row + ")").style = "color: #5fb45f;"
        document.getElementById("td2(" + row + ")").style = "color: #5fb45f;"
        document.getElementById("td3(" + row + ")").style = "color: #5fb45f;"
    }
    document.getElementById("td2(" + row + ")").innerHTML = desc;
    document.getElementById("td3(" + row + ")").innerHTML = '<span class="moeda">' + moeda + '</span><span id="prec' + row + '">' + prec + '</span>';
    financas[row-1] = {
        "Tipo": tipo,
        "Descrição": desc,
        "Preço": parseFloat(prec)
    }
    financasTable[row-1] = {
        tipo: tipo,
        desc: desc,
        prec: prec
    }
    let preco = parseFloat(prec);
    let GTotal = parseFloat(document.getElementById("GTotal").innerHTML);
    let RTotal = parseFloat(document.getElementById("RTotal").innerHTML);
    let TotalAnt = parseFloat(document.getElementById("Total").innerHTML);
    let Total;
    if (document.getElementById("UniTotal").innerHTML == "-"){
        TotalAnt = TotalAnt * -1;
    }
    console.log(document.getElementById("RTotal").innerHTML);
    if (tipoAnt == "1"){
        document.getElementById("GTotal").innerHTML = (GTotal - precAnt).toFixed(2);
        Total = TotalAnt + precAnt;
        TotalAnt = TotalAnt + precAnt;
    } else {
        document.getElementById("RTotal").innerHTML = (RTotal - precAnt).toFixed(2);
        Total = TotalAnt - precAnt;
        TotalAnt = TotalAnt - precAnt;
    }
    console.log(document.getElementById("RTotal").innerHTML);
    if (tipo == "1"){
        document.getElementById("GTotal").innerHTML = (parseFloat(document.getElementById("GTotal").innerHTML) + preco).toFixed(2);
        Total = (TotalAnt - preco);
    } else if (tipo == "2"){
        document.getElementById("RTotal").innerHTML = (parseFloat(document.getElementById("RTotal").innerHTML) + preco).toFixed(2);
        Total = (TotalAnt + preco);
    }
    console.log(document.getElementById("RTotal").innerHTML);
    if (Total < 0){
        Total = Total * -1;
        document.getElementById("UniTotal").innerHTML = "-";
    } else {
        document.getElementById("UniTotal").innerHTML = "";
    }
    document.getElementById("Total").innerHTML = Total.toFixed(2);
}