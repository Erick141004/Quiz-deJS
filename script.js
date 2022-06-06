const info_box = document.querySelector(".info_box");

function inst_btn(){
    info_box.classList.add("activeInfo");
}

function voltar(){
    info_box.classList.remove("activeInfo");
}

info_box.classList.remove("activeInfo");