let valor = document.querySelector(".valor");

function Conta(conta, saldo) {
   this.conta = conta;
   this.saldo = saldo;
}

Conta.prototype.mostraSaldoNaTela = function () {
   document.querySelector(".saldo").textContent = `R$ ${adicionarSaldo()}`;
}

Conta.prototype.deposito = function (valor) {
   retiraMensSaldoInsuf();
   this.saldo += valor;
   salvarSaldo(this.saldo);
   this.mostraSaldoNaTela();  
   limpaInput();

}

Conta.prototype.sacar = function (valor) {
   if (valor > this.saldo) {
      criaMensSaldoInsuf("Saldo insuficiente");
      return;
   }

   retiraMensSaldoInsuf();
   this.saldo -= valor;
   salvarSaldo(this.saldo);
   this.mostraSaldoNaTela();
   limpaInput();
}

Conta.prototype.setSaldo = function (saldo) {
   this.saldo = saldo;
}

document.addEventListener('click', event => {
   const element = event.target;

   // console.log(`Tipo: ${typeof valor} Valor: ${valor}`)
   // console.log(`Target: ${element.value}`)

   if (element.value === 'Depositar') {

      minhaConta.deposito(parseFloat(verificaValor(valor.value)));

   }

   if (element.value === 'Sacar') {

      minhaConta.sacar(parseFloat(verificaValor(valor.value)));
   }
});

const minhaConta = new Conta(0, 0);

minhaConta.setSaldo(adicionarSaldo());
minhaConta.mostraSaldoNaTela();

function salvarSaldo(saldo) {
   const saldoJSON = JSON.stringify(saldo)
   localStorage.setItem('saldo', saldoJSON);
}

function adicionarSaldo() {
   const saldo = localStorage.getItem('saldo');
   const saldoPrincipal = JSON.parse(saldo);

   return saldoPrincipal;
}

function criaMensSaldoInsuf(textoInput) {
   document.querySelector(".erro").innerHTML = textoInput;
   document.querySelector(".erro").style.display = 'block'
   limpaInput();
}  

function retiraMensSaldoInsuf() {
   document.querySelector(".erro").innerHTML = "";
   document.querySelector(".erro").style.display = 'none'
   limpaInput();
}


function limpaInput() {
   valor.value = "";
   valor.focus();
}

function verificaValor(valor) {
   if (valor === "") {
      valor = 0;
   }

   return valor;
}

function soNumbers(e) {
   let event = e || window.event;
   let key = event.keyCode || event.which;
   key = String.fromCharCode(key);
   let numbers = /^[0-9.]+$/;
   if (!numbers.test(key)) {
      event.returnValue = false;
      if (event.preventDefault) event.preventDefault();
   }
}

