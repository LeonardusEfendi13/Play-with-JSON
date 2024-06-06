// let food = ["Soto Joel", "Mie gerobak 10k", "Indomie basah", "Ayam MME"];

function addFood() {
    // memasukkan data di localstorage kedalam variabel
    let data = JSON.parse(localStorage.getItem("FOOD"));
    // menunjuk elemen input dengan name="inputmakanan"
    var input = document.querySelector("input[name=inputmakanan]");
    // console.log(input.value)

    // memasukkan isi input kedalam array data bila input tidak kosong
    if (input.value != '') {
        data.push(input.value);
        // isi dari localstorage "FOOD" diupdate
        localStorage.setItem("FOOD", JSON.stringify(data));
        // memuat tabel dengan data baru
        generateTable();
        alert("Food successfuly added");
    }
    else {
        alert("No food inputted");
    }
}

function checkStorage() {
    // cek browser support
    if (typeof (Storage) !== "undefined") {
        let data = JSON.parse(localStorage.getItem("FOOD"));
        if (data != null && data.length != 0) {
            // bila array tidak null atau koson, maka return true
            return true;
        }
        else {
            // bila tidak ada "FOOD" dalam localstorage, maka memasukkan array kosong kedalam localstorage "FOOD"
            let food = [];
            localStorage.setItem("FOOD", JSON.stringify(food));
            return false;
        }
    }
}

function generateTable() {
    let data = JSON.parse(localStorage.getItem("FOOD"));
    let i = 0;
    let num;
    let tbody = document.getElementById('food').querySelector('tbody');
    tbody.innerHTML = '';
    if (data.length > 0) {
        for (i = 0; i < data.length; i++) {
            num = i + 1;
            let colNum = '<td>' + num + '</td>';
            let colFood = '<td>' + data[i] + '</td>';
            let colAction = '<td style="text-align:center;"> <button class="btnEdit" id="editbtn"  onclick="editdata(' + i + ')" >Edit</button> <button class="btnDelete" onclick="deletedata(' + i + ')">Delete</button></td>';

            let newRow = '<tr>' + colNum + colFood + colAction + '</tr>';

            tbody.innerHTML += newRow;
        }
    } else {
        tbody.innerHTML = '<tr><td style="text-align: center;" colspan="6">No Food</td></tr>';
    }
}

function loadFoods() {
    let stat = checkStorage();

    if (stat) {
        // bila true maka memuat tabel
        generateTable();
    }
}

function editdata(id) {

    let data = JSON.parse(localStorage.getItem("FOOD"));
    var ubahdata = prompt("Ubah Data", data[id])
    if(ubahdata){
        data[id] = ubahdata;
        localStorage.setItem("FOOD", JSON.stringify(data));
        generateTable();
        alert("Food successfuly edited");
    }
    else{
        alert("Food Failed to Change");
    }

}

function deletedata(id) {
   
    var r = confirm("Are You sure want to delete ?");
    if(r == true){
        let data = JSON.parse(localStorage.getItem("FOOD"));
        data.splice(id, 1);
        localStorage.setItem("FOOD", JSON.stringify(data));
        generateTable();
        alert("Food successfuly deleted");
    }
    else{
        alert("Food Failed to delete ")
    }

}

function randomNum(min) { 
    var n = []; 
    let data = JSON.parse(localStorage.getItem("FOOD"));
    let max = data.length;

    if(max>=3){
        a = Math.floor(Math.random() * max) + min;
        n.push(a); 

        b = Math.floor(Math.random() * max) + min;
        while(b==a){
            b = Math.floor(Math.random() * max) + min;
        }
        n.push(b);

        c = Math.floor(Math.random() * max) + min; 
        while(c==a || c==b){
            c = Math.floor(Math.random() * max) + min;
        }
        n.push(c);

        document.getElementById('breakfast').innerHTML='BREAKFAST <span>&nbsp;&nbsp;:</span> '+data[n[0]];
        document.getElementById('lunch').innerHTML='LUNCH <span>&emsp;&emsp;&nbsp;&nbsp;&nbsp;:</span> '+data[n[1]];
        document.getElementById('dinner').innerHTML='DINNER <span>&emsp;&emsp;&nbsp; :</span> '+data[n[2]];
        alert("Menu successfuly Randomized")
    }
    else{
        alert("Not Enough Menu to Random")
        document.getElementById('breakfast').innerHTML='BREAKFAST <span>&nbsp;&nbsp;:______________</span> ';
        document.getElementById('lunch').innerHTML='LUNCH <span>&emsp;&emsp;&nbsp;&nbsp;&nbsp;:______________</span> ';
        document.getElementById('dinner').innerHTML='DINNER <span>&emsp;&emsp;&nbsp; :______________</span> ';
    }

    return n; 
}
