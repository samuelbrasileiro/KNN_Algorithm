const fs = require("fs");
var dataset = "datacin.csv"

class Pessoa{
	constructor(nick, mesanino, grads, anfiteatro, salaDA, copaNova) {
		this.nick = nick;
		this. mesanino = mesanino;
		this.grads = grads;
		this. anfiteatro = anfiteatro;
		this.salaDA = salaDA;
		this. copaNova = copaNova;
	}
}

async function readDataset(dataset){
	var content = await fs.readFileSync(dataset).toString();
	var splitted = content.split("\n");
	return splitted;
}

readDataset(dataset).then(function(data){
    var datatratado = [...data];
    datatratado.splice(0,1);
    var pontos = [];
	datatratado.map(function(elm){
        //console.log(elm);

        
        var atributos = elm.split(",");
        var alguem = new Pessoa(atributos[0], atributos[1], atributos[2],atributos[3],atributos[4],atributos[5]);
        pontos.push(alguem);
        //console.log(alguem)
    })
    function normaVetor(a){
        var sum = 0;
        for(var i in a){
            sum += a[i] ** 2;
        }
        return Math.sqrt(sum);
    }
    function subtracao(a,b) {
        var pessoaA = [a.mesanino, a.grads, a.anfiteatro, a.salaDA];
        var pessoaB = [b.mesanino, b.grads, b.anfiteatro, b.salaDA];
        var arraySub = [];
        for(var i in pessoaA){
            arraySub.push(pessoaA[i]-pessoaB[i])
        }
        return arraySub;
    }
    function takeDist(a,b){
        return normaVetor(subtracao(a,b));
    }
    
    function KNNNovaCopa(novousuario, k) {
        var distancias = [];
        for(i in pontos){
            distancias.push(takeDist(novousuario,pontos[i]));
        }
        
        
        var distSorted = [... distancias];
        distSorted.sort((a,b)=>{
            return a-b
        })
        
        var resultado = 0;
        for(var i = 0; i < k; i++){
            var menorCara = distSorted[i];

            
            resultado = resultado + parseFloat(pontos[distancias.indexOf(menorCara)].copaNova);
        }
        
        resultado = resultado / k;
        
        return(resultado);
    }


    var userTeste = new Pessoa ("Luis", 5.4, 6.4, 5.6, 5.6);
    var resut = KNNNovaCopa(userTeste, 4);
    console.log(resut);
   
});