// Perguntas do quiz
const questions = [
  {
    question: "1. Onde, segundo a lenda, está localizada a serpente encantada?",
    options: [
      "No mar, ao redor da ilha",
      "Nas florestas ao redor de São Luís",
      "Nas profundezas da cidade, em galerias subterrâneas",
      "No topo de uma montanha escondida",
    ],
    answer: 2, // Resposta correta: "Nas profundezas da cidade, em galerias subterrâneas"
  },
  {
    question: "2. Como são descritos os olhos da serpente na lenda?",
    options: [
      "Azuis e brilhantes",
      "Verdes e tranquilos",
      "Vermelhos e flamejantes",
      "Amarelos e sombrios",
    ],
    answer: 2, // Resposta correta: "Vermelhos e flamejantes"
  },
  {
    question:
      "3. De acordo com a lenda, qual parte da serpente está sob a Igreja do Carmo?",
    options: ["A cauda", "A cabeça", "A barriga", "As presas"],
    answer: 0,
  },
  {
    question: "4. Por que Ana Jansen foi expulsa de casa por seu pai?",
    options: [
      "Por se recusar a casar com Isidoro Pereira.",
      "Por ter engravidado sem que a paternidade fosse conhecida.",
      "Por querer assumir os negócios da família.",
      " Por ser acusada de bruxaria.",
    ],
    answer: 1,
  },
  {
    question:
      "5. O que Ana Jansen passou a ser chamada após assumir os negócios do marido?",
    options: [
      " Imperatriz do Maranhão",
      " Baronesa de São Luís",
      " Rainha do Maranhão",
      "Dona do Império do Algodão",
    ],
    answer: 2,
  },
  {
    question: "6. Qual lenda cercou a figura de Ana Jansen após sua morte?",
    options: [
      "Ela se transformou em uma bruxa que amaldiçoava as plantações",
      "Sua alma foi condenada a vagar como uma serpente gigante",
      "Ela foi vista conduzindo uma carruagem fantasmagórica pelas ruas",
      "Ela renasceu como uma deusa protetora da cidade",
    ],
    answer: 2,
  },

  {
    question:
      "7. Lenda da Manguda: Onde o fantasma assombrava no final do século XIX",
    options: [
      "Na Igreja de São Pantaleão",
      "Na Fonte do Ribeirão",
      "Na área da Praça Gonçalves Dias",
      "Na Igreja do Carmo",
    ],
    answer: 2, 
  },
  {
    question:
      "8. Lenda da Manguda: Como as testemunhas descreveram o fantasma?",
    options: [
      "Muito alto, com chifres e asas",
      "Muito branco, com uma estranha luz onde deveria estar a cabeça",
      "Uma figura de fogo com olhos brilhantes",
      "Um homem encapuzado com uma foice",
    ],
    answer: 1,
  },
  {
    question:
      "9. Lenda da Manguda: O que foi descoberto sobre as aparições fantasmagóricas?",
    options: [
      "Eram espíritos de antigos escravos",
      "Eram uma ilusão causada pela neblina",
      "Eram bandidos contrabandistas disfarçados com lençóis",
      "Eram alucinações causadas por gás de lampiões"
    ],
    answer: 2,
  },
  {
    question:
    "10. Lenda da Praia do Olho D’água: Quem era o chefe da aldeia indígena mencionada na lenda?",
    options: [
      "Itapema.",
      "Itaporama.",
      "Guraci.",
      "Jaci."
    ],
    answer: 1 
  },
  {
    question:
    "11. Lenda da Praia do Olho D’água: Quem seduziu o jovem amado pela filha de Itaporama?",
    options: [
      "A mãe d'água.",
      "Para criar uma nova lenda popular",
      "Para atrair turistas curiosos",
      "Para encobrir suas atividades criminosas e escapar da atenção da população"
    ],
    answer: 0
  },
  {
    question:
    "12. Lenda da Praia do Olho D’água: O que aconteceu com a filha de Itaporama após a perda do amado?",
    options: [
      "Ela partiu para o palácio da mãe d'água.",
      "Ela se casou com outro jovem da tribo.",
      "Ela mergulhou em tristeza profunda e chorou incessantemente.",
      "Ela se tornou chefe da tribo no lugar de seu pai."
    ],
    answer: 2
  },
  {
    question:
    "13. Lenda do Palácio das Lágrimas: Onde estava localizado o casarão de três pavimentos mencionado na lenda?",
    options: [
      "Na rua da Estrela",
      "Na rua 13 de maio, em frente à Igreja São João",
      "Na rua dos Afogados",
      "Na rua do Sol"
    ],
    answer: 1
  },
  {
    question: "14. Lenda do Palácio das Lágrimas: Qual foi o motivo do assassinato entre os dois irmãos portugueses?",
  options: [
    "Uma disputa por terras",
    "Inveja pela riqueza do irmão",
    "Desacordo sobre o comércio de escravos",
    "Vingança por uma traição"
  ],
  answer: 1
  },
  {
    question: "15.  Lenda do Palácio das Lágrimas: Quem o irmão pobre decidiu assassinar?",
    options: [
      "Seu primo rico",
      "Seu sobrinho",
      "Seu irmão rico",
      "Um escravo que herdou a fortuna"
    ],
    answer: 2 
  }

];

// Exemplo de como acessar as questões e respostas
questions.forEach((question) => {
  console.log(question.question); // Agora a numeração está antes da pergunta
  question.options.forEach((option, optionIndex) => {
    console.log(`${optionIndex + 1}. ${option}`);
  });
  console.log(`Resposta correta: ${question.options[question.answer]}\n`);
});

let currentQuestionIndex = 0;
let timerInterval;
let timeLeft = 30;
let score = 0; // Variável para armazenar a pontuação

function startQuiz() {
  showQuestion();
  updateQuestionCounter();
  startTimer();
}

function startTimer() {
  timeLeft = 30;
  updateTimer();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      goToNextQuestion();
    }
  }, 1000);
}

function updateTimer() {
  const timeLeftElement = document.getElementById("time-left");
  timeLeftElement.textContent = timeLeft;
}

function showQuestion() {
  const questionContainer = document.getElementById("question-container");

  // Esconde a questão anterior (desaparece com efeito)
  questionContainer.classList.remove("visible");

  // Aguarda meio segundo para permitir o efeito de transição
  setTimeout(() => {
    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");

    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.classList.add("option");
      button.textContent = option;
      button.onclick = () => selectAnswer(index);
      optionsContainer.appendChild(button);
    });

    // Torna a questão visível após configurada
    questionContainer.classList.add("visible");
  }, 500); // Meio segundo de atraso
}

function selectAnswer(selectedIndex) {
  clearInterval(timerInterval);
  const correctAnswer = questions[currentQuestionIndex].answer;
  const options = document.querySelectorAll(".option");

  if (selectedIndex === correctAnswer) {
    options[selectedIndex].classList.add("correct");
    score++; // Incrementa a pontuação
  } else {
    options[selectedIndex].classList.add("wrong");
    options[correctAnswer].classList.add("correct");
  }

  // Desabilita as opções para não poderem ser selecionadas novamente
  options.forEach((option) => option.classList.add("disabled"));

  // Exibe o feedback
  const feedback = document.createElement("div");
  feedback.classList.add("feedback");
  feedback.textContent = selectedIndex === correctAnswer ? "Resposta Correta!" : "Resposta Errada!";
  document.getElementById("question-container").appendChild(feedback);

  // Remove o feedback após 2 segundos e vai para a próxima questão
  setTimeout(() => {
    feedback.remove();
    goToNextQuestion();
  }, 2000);
}

function goToNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    updateQuestionCounter();
    startTimer();
  } else {
    showFinalScreen(); // Mostra a tela final quando o quiz terminar
  }
}

function updateQuestionCounter() {
  const questionCounter = document.getElementById("question-counter");
  questionCounter.textContent = `${currentQuestionIndex + 1} de ${questions.length} Questões`;
}

// Função para mostrar a tela final com a pontuação
// Função para mostrar a tela final
function showFinalScreen() {
  const finalScreen = document.getElementById("final-screen");
  const finalScore = document.getElementById("final-score");
  finalScore.textContent = `Sua pontuação foi: ${score} de ${questions.length}`;
  
  // Esconde todas as telas do quiz
  const quizScreens = document.querySelectorAll('.quiz-screen');
  quizScreens.forEach(screen => {
    screen.style.display = 'none';
  });

  // Exibe a tela final
  finalScreen.style.display = 'block'; // Torna a tela final visível
}

// Função para reiniciar o quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0; // Reseta a pontuação
  
  // Esconde a tela final
  const finalScreen = document.getElementById("final-screen");
  finalScreen.style.display = 'none'; // Esconde a tela final

  // Exibe novamente as telas de quiz
  const quizScreens = document.querySelectorAll('.quiz-screen');
  quizScreens.forEach(screen => {
    screen.style.display = 'block'; // Exibe a tela de quiz
  });

  startQuiz(); // Reinicia o quiz
}

// Função para voltar para a tela de jogos
function goToGameScreen() {
  window.location.href = "../index.html"; // Redireciona para a tela de jogos
}



// Inicializa o quiz quando a página carregar
window.onload = startQuiz;
