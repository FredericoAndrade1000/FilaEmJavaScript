let minhaFila = new Fila(10);

function adicionarElemento() {
  const novoNome = document.getElementById("txtNovoNome").value.trim();
  const cpf = document.getElementById("txtNovoCpf").value.trim();
  const data = obterDataAtual();
  const hora = obterHoraAtual();
  
  if (!novoNome || !cpf) {
    alert("Por favor, preencha o nome e o CPF.");
    return;
  }

  const novoAtendimento = new Atendimento(novoNome, cpf, data, hora);
  
  minhaFila.enqueue(novoAtendimento);

  atualizarFila();
}

function realizarAtendimento() {
  if (minhaFila.isEmpty()) {
    alert("Não há ninguém na fila para atender.");
    return;
  }
  const pessoa = minhaFila.dequeue();
  const mensagem = document.getElementById("mensagem-remocao");

  const tempoEspera = calcularDiferencaHoras(pessoa.hora, obterHoraAtual())
  
  mensagem.innerHTML = `Próximo a ser atendido(a): ${pessoa.nome}, chegou ${pessoa.hora} e está sendo atendida ${obterHoraAtual()}. Tempo de espera: ${tempoEspera}`;
  mensagem.style.display = "block";

  atualizarFila();
}

function buscarCpf() {
  const cpf = document.getElementById("txtNovoCpf").value.trim();
  const atendimento = new Atendimento(null, cpf);

  if (Array.isArray(minhaFila.itens)) {
    const posicao = minhaFila.itens.findIndex(iten => iten.equals(atendimento));
    if (posicao >= 0) {
      alert(`CPF encontrado na fila! Posição: ${posicao + 1}`);
    } else {
      alert("CPF não encontrado na fila.");
    }
  } else {
    alert("Fila não encontrada.");
  }

}

function atualizarFila() {
  const fila = document.getElementById("fila");
  fila.innerHTML = "";
  for (let i = 0; i < minhaFila.itens.length; i++) {
    const elemento = document.createElement("li");
    const pessoa = minhaFila.itens[i];
    elemento.innerHTML = `
      <span>${i + 1}.</span>
      <span>Nome: ${pessoa.nome} - </span>
      <span>Data: ${pessoa.data} - </span>
      <span>Hora: ${pessoa.hora}</span>
    `;
    fila.appendChild(elemento);
  }
}

function obterDataAtual() {
  let dataAtual = new Date();
  let dia = dataAtual.getDate();
  let mes = dataAtual.getMonth() + 1;
  let ano = dataAtual.getFullYear();
  let dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
  return dataFormatada;
}

function obterHoraAtual() {
  const data = new Date();
  const hora = data.getHours().toString().padStart(2, '0');
  const minuto = data.getMinutes().toString().padStart(2, '0');
  const segundo = data.getSeconds().toString().padStart(2, '0');
  return `${hora}:${minuto}:${segundo}`;
}

function calcularDiferencaHoras(hora1, hora2) {
  const [h1, m1, s1] = hora1.split(':').map(Number);
  const [h2, m2, s2] = hora2.split(':').map(Number);

  const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);

  const horas = Math.floor(diferencaSegundos / 3600);
  const minutos = Math.floor((diferencaSegundos % 3600) / 60);
  const segundos = diferencaSegundos % 60;

  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}
