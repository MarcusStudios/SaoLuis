import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

(function () {
  // Configuração do Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAcKZ4TuYq11pa0tUGll_5JNMPM-KMtWCo",
    authDomain: "saoluis-2d35b.firebaseapp.com",
    databaseURL: "https://saoluis-2d35b-default-rtdb.firebaseio.com",
    projectId: "saoluis-2d35b",
    storageBucket: "saoluis-2d35b.firebasestorage.app",
    messagingSenderId: "470166381424",
    appId: "1:470166381424:web:aa206a3076b8b20835a5b5",
    measurementId: "G-20L0WBR7XE",
  };

  // Inicializa o Firebase e Firestore
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const rankingCollection = collection(db, "ranking");
  const q = query(rankingCollection, orderBy("movimentos", "asc"), limit(10));
  let tempoInicio;

  // Nome correto da coleção

  // Array responsável por armazenar o jogo
  var pecas = [];
  var resposta = [];

  var telaInicio = document.querySelector("#tela-inicio");
  telaInicio.addEventListener("click", comecaJogo, false);

  var telaFinal = document.querySelector("#tela-final");

  function init() {
    for (var i = 1; i < 9; i++) {
      var peca = document.querySelector("#peca" + i);
      peca.addEventListener("click", movePeca, false);
      pecas.push(peca);
    }

    pecas.push(null);
    resposta = [...pecas];
    render();
  }

  function render() {
    for (var i in pecas) {
      var peca = pecas[i];

      if (peca) {
        peca.style.left = (i % 3) * 230 + 5 + "px";
        if (i < 3) {
          peca.style.top = "15px";
        } else if (i < 6) {
          peca.style.top = "245px";
        } else {
          peca.style.top = "475px";
        }
      }
    }
  }

  function movePeca() {
    var index = pecas.indexOf(this);

    if (index % 3 !== 0 && !pecas[index - 1]) {
      pecas[index - 1] = this;
      pecas[index] = null;
    } else if (index % 3 !== 2 && !pecas[index + 1]) {
      pecas[index + 1] = this;
      pecas[index] = null;
    } else if (index > 2 && !pecas[index - 3]) {
      pecas[index - 3] = this;
      pecas[index] = null;
    } else if (index < 6 && !pecas[index + 3]) {
      pecas[index + 3] = this;
      pecas[index] = null;
    }

    render();

    if (verificaVitoria()) {
      fimDeJogo();
    }
  }

  function verificaVitoria() {
    for (var i in pecas) {
      if (pecas[i] !== resposta[i]) {
        return false;
      }
    }
    return true;
  }

  function fimDeJogo() {
    const nomeJogador = prompt("Digite seu nome para salvar no ranking:");
    const tempoFim = Date.now(); // Marca o final do jogo
    const tempoDecorrido = Math.floor((tempoFim - tempoInicio) / 1000); // Em segundos
    const movimentos = Math.floor(Math.random() * 100); // Substituir pela lógica real
  
    if (nomeJogador) {
      salvarPontuacao(nomeJogador, movimentos, tempoDecorrido);
      carregarRanking();
    }
  }
  

  async function salvarPontuacao(nome, movimentos, tempo) {
    try {
      await addDoc(rankingCollection, { nome, movimentos, tempo });
      console.log("Pontuação salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar pontuação:", error);
    }
  }
  

  async function carregarRanking() {
    const tbody = document.querySelector("#ranking-table tbody");
    tbody.innerHTML = ""; // Limpa a tabela antes de popular
  
    try {
      const q = query(
        rankingCollection,
        orderBy("movimentos", "asc"),
        limit(10)
      );
      const querySnapshot = await getDocs(q);
  
      let posicao = 1;
      querySnapshot.forEach((doc) => {
        const { nome, movimentos, tempo } = doc.data();
  
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${posicao++}</td>
          <td>${nome}</td>
          <td>${tempo}s</td>
          
        `;
        tbody.appendChild(row);
      });
    } catch (error) {
      console.error("Erro ao carregar ranking:", error);
    }
  }
  

  document.addEventListener("DOMContentLoaded", carregarRanking);

  function randomSort(oldArray) {
    let newArray;
    do {
      newArray = [];

      while (newArray.length < oldArray.length) {
        const i = Math.floor(Math.random() * oldArray.length);
        if (newArray.indexOf(oldArray[i]) < 0) {
          newArray.push(oldArray[i]);
        }
      }
    } while (!validaJogo(newArray));
    return newArray;
  }

  function validaJogo(array) {
    let inversoes = 0;
    const elementos = array.length;

    for (let i = 0; i < elementos - 1; i++) {
      for (let j = i + 1; j < elementos; j++) {
        if (
          array[i] &&
          array[j] &&
          array[i].dataset.value < array[j].dataset.value
        ) {
          inversoes++;
        }
      }
    }
    return inversoes % 2 === 0;
  }

  function comecaJogo() {
    tempoInicio = Date.now(); // Marca o início do jogo
    pecas = randomSort(pecas);
  
    this.style.opacity = "0";
    this.style.zIndex = "-1";
    this.removeEventListener("click", comecaJogo, false);
  
    render();
  }
  

  init();
})();
