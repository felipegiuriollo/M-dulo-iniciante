// array, objetos

// value -> Seria uma propriedade do meu objeto
let meta = {
    value: 'Ler um livro por mês',
    checked: false,
    imprime: (info) => {
        console.log(info) // Dentro do parenteses estamos passando um argumento 
    }
}

meta.imprime(meta.checked)

// Arrow function
const criarMeta = () => {};

// Name function
function criarMeta () {};



---
Aqui eu estou criando 2 objetos, um contendo somente uma meta que no caso é a ler livro, e o outro um array envolvendo o meta anterior junto de uma nova meta
let meta = {
    value: 'Ler um livro por mês',
    checked: true
 }

let metas = [
    meta,
    {
        value: "Caminhar todo dia",
        checked: false
    }
]

console.log(metas[0].value)

---