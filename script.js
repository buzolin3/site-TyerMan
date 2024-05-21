var valorTxt = document.getElementById("total");
var totalCompra = 0;
var taxaEntrega = 7;
var numero = 0;
var totalElement;
var camisetaPremium = document.querySelectorAll("#Premium");
var camisetaSurf = document.querySelectorAll("#Surf");
var carrinho = [];
var opcaoEntrega;
var entregaRadio = document.getElementById("entregaRadio");
var retiradaRadio = document.getElementById("retiradaRadio");
var dinheiroRadio = document.getElementById("flexRadioDefault1");
var cartaoRadio = document.getElementById("flexRadioDefault2");
var pixRadio = document.getElementById("flexRadioDefault3");
var troco = document.getElementById("troco");
var chavePix = document.getElementById("chavePix");

document.addEventListener('DOMContentLoaded', function () {
    var entrega = document.getElementById("entrega");
    var retirada = document.getElementById("retirada");

    entregaRadio.addEventListener('change', function () {
        if (this.checked) {
            opcaoEntrega = "Entrega: ";
            entrega.classList.add('d-block');
            entrega.classList.remove('d-none');
            retirada.classList.remove('d-block');
            retirada.classList.add('d-none');
        }
    });

    retiradaRadio.addEventListener('change', function () {
        if (this.checked) {
            opcaoEntrega = "Retirada: ";
            entrega.classList.add('d-none');
            entrega.classList.remove('d-block');
            retirada.classList.remove('d-none');
            retirada.classList.add('d-block');
        }
    });

    dinheiroRadio.addEventListener('change',function () {
        if(this.checked){
            troco.classList.remove('d-none');
            troco.classList.add('d-block');
            chavePix.classList.add('d-none');
            chavePix.classList.remove('d-block');
        }
    })

    cartaoRadio.addEventListener('change',function () {
        if(this.checked){
            troco.classList.add('d-none');
            troco.classList.remove('d-block');
            chavePix.classList.add('d-none');
            chavePix.classList.remove('d-block');
        }
    })

    pixRadio.addEventListener('change',function () {
        if(this.checked){
            troco.classList.add('d-none');
            troco.classList.remove('d-block');
            chavePix.classList.add('d-block');
            chavePix.classList.remove('d-none');
        }
    })
});


//Coloca classe no media query
function checkWindowSize() {
    const elementos = document.querySelectorAll('.offcanvas-camiseta');
    const largura = window.innerWidth;

    elementos.forEach(elemento => {
        if (largura >= 300 && largura <= 700) {
            elemento.classList.add('w-100');
            elemento.classList.add('top-0');
            elemento.classList.remove('w-75');
        } else {
            elemento.classList.add('w-75');
            elemento.classList.remove('top-0');
            elemento.classList.remove('w-100');
        }
    });
}

// Verifica o tamanho da janela ao carregar a página
window.addEventListener('load', checkWindowSize);

// Verifica o tamanho da janela ao redimensionar a janela
window.addEventListener('resize', checkWindowSize);

//Mostrar todos produtos
function mostrarTodos() {
    camisetaPremium.forEach(function (camisetaPremium) {
        camisetaPremium.classList.remove('d-none');
        camisetaPremium.classList.add('d-block');
    });
    camisetaSurf.forEach(function (camisetaSurf) {
        camisetaSurf.classList.remove('d-none');
        camisetaSurf.classList.add('d-block');
    });
}


//Mostrar as Surfs na tela
function mostrarSurf() {
    camisetaPremium.forEach(function (camisetaPremium) {
        camisetaPremium.classList.add('d-none')
    })
    camisetaSurf.forEach(function (camisetaSurf) {
        camisetaSurf.classList.remove('d-none');
        camisetaSurf.classList.add('d-block');
    });
}

//Mostrar as Premium na tela
function mostrarPremium() {
    camisetaSurf.forEach(function (camisetaSurf) {
        camisetaSurf.classList.add('d-none')
    })
    camisetaPremium.forEach(function (camisetaPremium) {
        camisetaPremium.classList.remove('d-none');
        camisetaPremium.classList.add('d-block');
    });
}

//Adicionar Carrinho
function adicionarCarrinho(nomeProduto, valorProduto) {
    var produtosAdicionados = document.getElementById("produtosAdicionados");
    var mensagemProduto = document.createElement("p");
    var radioCor = document.getElementsByName('options-cor');
    var selectedColor;
    var radioTamanho = document.getElementsByName('options-tamanho');
    var selectedTamanho;

    //Verifique qual radio está selecionado
    for (var i = 0; i < radioCor.length; i++) {
        if (radioCor[i].checked) {
            selectedColor = radioCor[i].value;
            break;
        }
    }

    for (var x = 0; x < radioTamanho.length; x++) {
        if (radioTamanho[x].checked) {
            selectedTamanho = radioTamanho[x].value;
            break;
        }
    }

    mensagemProduto.id = "produtoCarrinho"

    if (selectedColor && selectedTamanho) {
        mensagemProduto.innerHTML = "1 - " + nomeProduto + "<br>" + " Cor: " + selectedColor + "<br>" + " Tamanho: " + selectedTamanho;
        carrinho.push("%0a" + nomeProduto + " " + selectedColor + " " + selectedTamanho);
        produtosAdicionados.appendChild(mensagemProduto);
        numero++;
        (document.getElementById("numero-carrinho").innerHTML = numero);
        (document.getElementById("numero-carrinho2").innerHTML = numero);
        var botaoRemover = document.createElement("button");
        botaoRemover.textContent = "-";
        botaoRemover.classList.add("btn-remover");
        botaoRemover.onclick = function () {
            produtosAdicionados.removeChild(mensagemProduto);
            totalCompra -= valorProduto;
            valorTxt.textContent = "Valor a pagar: R$ " + totalCompra.toFixed(2);
            numero--;
            (document.getElementById("numero-carrinho").innerHTML = numero);
            (document.getElementById("numero-carrinho2").innerHTML = numero);
        };
        mensagemProduto.appendChild(botaoRemover);
        produtosAdicionados.appendChild(mensagemProduto);
        totalCompra += valorProduto;
        valorTxt.textContent = "Valor a pagar:  R$ " + totalCompra.toFixed(2);
        radioCor[i].checked = false;
        radioTamanho[x].checked = false;
        alert('Produto Adicionado ao Carrinho');
    } else {
        alert('Selecione um tamanho e uma cor')
    }
    return 0;
}


// Função enviar Pedido para Whatsapp
function enviarPedido() {
    var nome = document.getElementById("nome").value;
    var celular = document.getElementById("celular").value;
    var email = document.getElementById("email").value;
    var cpf = document.getElementById("cpf").value;
    var opcaoPagamento;
    var cidade = document.getElementById("cidade").value
    var bairro = document.getElementById("bairro").value;
    var rua = document.getElementById("rua").value;
    var numeroCasa = document.getElementById("numeroCasa").value;
    var complemento = document.getElementById("complemento").value;

    //Verifica se escolheu cartão ou dinheiro e o troco
    if (cartaoRadio.checked) {
        opcaoPagamento = "Cartão "
    } else if (dinheiroRadio.checked) {
        opcaoPagamento = "Dinheiro " + "%0a" + "%0a" + "Troco para: " + troco.value;
    } else if (pixRadio.checked) {
        opcaoPagamento = "Pix "
    }

    //API para enviar para Whatsapp
    var linkEntrega = "https://api.whatsapp.com/send/?phone=16997696990&text=" +
        "Pedido" + "%0a" +
        "%0a" + "Nome do Cliente: " + nome + "%0a" +
        "%0a" + "Celular: " + celular + "%0a" +
        "%0a" + "Email: " + email + "%0a" +
        "%0a" + "CPF: " + cpf + "%0a" +
        "%0a" + "Produtos Selecionados: " + carrinho + "%0a" +
        "%0a" + "Valor a pagar: " + totalCompra + "%0a" +
        "%0a" + "Opção Pagamento: " + opcaoPagamento + "%0a" +
        "%0a" + "Opção Entrega: " + opcaoEntrega + "%0a" +
        "%0a" + "Cidade: " + cidade + "%0a" +
        "%0a" + "Bairro: " + bairro + "%0a" +
        "%0a" + "Rua: " + rua + "%0a" +
        "%0a" + "Numero Casa: " + numeroCasa + "%0a" +
        "%0a" + "Complemento: " + complemento; "%0a";

    var linkRetirada = "https://api.whatsapp.com/send/?phone=16997696990&text=" +
        "Pedido" + "%0a" +
        "%0a" + "Nome do Cliente: " + nome + "%0a" +
        "%0a" + "Celular: " + celular + "%0a" +
        "%0a" + "Email: " + email + "%0a" +
        "%0a" + "CPF: " + cpf + "%0a" +
        "%0a" + "Produtos Selecionados: " + carrinho + "%0a" +
        "%0a" + "Valor a pagar: " + totalCompra + "%0a" +
        "%0a" + "Opção Pagamento: " + opcaoPagamento + "%0a" +
        "%0a" + "Opção Entrega: " + opcaoEntrega + "%0a";



    //Verificando se todos campos obrigatorios foram preenchidos
    
    if(!entregaRadio.checked && !retiradaRadio.checked){
        alert("Selecione uma opção de entrega");
    } else if(nome.trim() === "" || celular.trim() === "" || email.trim() === "" || cpf.trim() === ""){
        alert("Por favor, preencha todos os campos obrigatórios.")
    } else if(entregaRadio.checked){
        if(cidade.trim() === "" || bairro.trim() === "" || rua.trim() === "" || numeroCasa.trim() === ""){
            alert("Por favor, preencha todos os campos obrigatórios.");
        } else{
            window.location.href = linkEntrega;
        }
    } else if(retiradaRadio.checked){
        window.location.href = linkRetirada;
    }
}
