var valorTxt = document.getElementById("total");
var totalCompra = 0;
var taxaEntrega = 7;
var numero = 0;
var totalElement;
var camisetaPremium = document.querySelectorAll("#Premium");
var camisetaSurf = document.querySelectorAll("#Surf");
var carrinho = [];






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
        carrinho.push("%0a" + nomeProduto);
        produtosAdicionados.appendChild(mensagemProduto);
        numero++;
        (document.getElementById("numero-carrinho").innerHTML = numero);
        var botaoRemover = document.createElement("button");
        botaoRemover.textContent = "-";
        botaoRemover.classList.add("btn-remover");
        botaoRemover.onclick = function () {
            produtosAdicionados.removeChild(mensagemProduto);
            totalCompra -= valorProduto;
            valorTxt.textContent = "Valor a pagar: R$ " + totalCompra.toFixed(2);
            numero--;
            (document.getElementById("numero-carrinho").innerHTML = numero);
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

